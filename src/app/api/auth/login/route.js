import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { authRateLimit } from '@/lib/rateLimit';
import { sanitizeNoSql } from '@/lib/sanitize';
import { generateCsrfToken } from '@/lib/csrf';

export async function POST(req) {
  try {
    // 1. Strict IP Rate Limiting for Authentication (Brute Force Protection)
    const limitState = authRateLimit(req);
    if (!limitState.success) {
      return NextResponse.json(
        { 
          message: `Too many login attempts. Please try again in ${limitState.resetSeconds} seconds.`,
          retryAfter: limitState.resetSeconds
        }, 
        { 
          status: 429,
          headers: {
            'Retry-After': String(limitState.resetSeconds),
            'X-RateLimit-Limit': String(limitState.limit),
            'X-RateLimit-Remaining': String(limitState.remaining)
          }
        }
      );
    }

    // 2. Strict Input Parsing & NoSQL Injection Sanitization
    const rawBody = await req.json().catch(() => ({}));
    const sanitizedBody = sanitizeNoSql(rawBody);

    const { email, password } = sanitizedBody;
    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ message: 'Please provide a valid email and password' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('Fatal: JWT_SECRET environment variable is missing.');
      return NextResponse.json({ message: 'Authentication configuration error.' }, { status: 500 });
    }

    // 3. Optional Development Admin Shortcut (Strictly disabled in production)
    const devAdminEmail = (process.env.ADMIN_DEFAULT_EMAIL || '').trim().toLowerCase();
    const devAdminPass = process.env.ADMIN_DEFAULT_PASSWORD;
    if (
      process.env.NODE_ENV !== 'production' &&
      devAdminEmail &&
      devAdminPass &&
      cleanEmail === devAdminEmail &&
      cleanPass === devAdminPass
    ) {
      const payload = { id: 'dev_admin_01', email: devAdminEmail, role: 'admin' };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
      const csrfToken = generateCsrfToken();

      const response = NextResponse.json({ 
        message: 'Login successful',
        user: { email: devAdminEmail, role: 'admin' },
        csrfToken: csrfToken,
        redirectTo: '/admin'
      }, { status: 200 });

      response.cookies.set('admin_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 86400
      });

      response.cookies.set('csrf_token', csrfToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
        maxAge: 86400
      });

      return response;
    }

    // 4. Database User Lookup (MongoDB) with Parameterized Query & Bcrypt Verification
    try {
      await connectToDatabase();
      const user = await User.findOne({ email: cleanEmail }).select('+password');
      if (user) {
        const isMatch = await user.matchPassword(cleanPass);
        if (isMatch) {
          const payload = { id: user._id, email: user.email, role: user.role };
          const token = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
          const csrfToken = generateCsrfToken();

          const response = NextResponse.json({ 
            message: 'Login successful',
            user: { email: user.email, role: user.role },
            csrfToken: csrfToken,
            redirectTo: user.role === 'admin' ? '/admin' : '/'
          }, { status: 200 });

          response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 86400
          });

          response.cookies.set('csrf_token', csrfToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 86400
          });

          return response;
        }
      }
    } catch (dbErr) {
      console.warn('MongoDB lookup warning:', dbErr.message);
    }

    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });

  } catch (error) {
    return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
  }
}
