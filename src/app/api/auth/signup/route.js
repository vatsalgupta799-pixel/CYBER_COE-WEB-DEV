import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';
import { authRateLimit } from '@/lib/rateLimit';
import { sanitizeNoSql, sanitizeString } from '@/lib/sanitize';
import { generateCsrfToken } from '@/lib/csrf';
import { handleApiError } from '@/lib/errorHandler';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  try {
    // 1. Strict Auth Rate Limiting (10 requests / 15 mins)
    const limitState = authRateLimit(req);
    if (!limitState.success) {
      return NextResponse.json(
        { 
          message: `Too many signup attempts. Please try again in ${limitState.resetSeconds} seconds.`,
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

    // 2. Input Validation & Sanitization
    const rawBody = await req.json().catch(() => ({}));
    const sanitizedBody = sanitizeNoSql(rawBody);
    const { email, password } = sanitizedBody;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ message: 'Please provide a valid email address and password.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanPass = password.trim();

    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json({ message: 'Please provide a valid email format.' }, { status: 400 });
    }

    if (cleanPass.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters long.' }, { status: 400 });
    }

    // 3. Parameterized Database Operations
    await connectToDatabase();
    const userExists = await User.findOne({ email: cleanEmail });
    if (userExists) {
      return NextResponse.json({ message: 'An account with this email already exists.' }, { status: 400 });
    }

    const user = await User.create({
      email: cleanEmail,
      password: cleanPass,
      role: 'student' // default role
    });

    // 4. Secure JWT Generation
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error('Fatal: JWT_SECRET environment variable is missing.');
      return NextResponse.json({ message: 'Authentication configuration error.' }, { status: 500 });
    }
    const payload = { id: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    const csrfToken = generateCsrfToken();

    // 5. Secure Cookie Configuration
    const response = NextResponse.json({ 
      message: 'Signup successful',
      user: { email: user.email, role: user.role },
      csrfToken
    }, { status: 201 });

    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400 // 1 day
    });

    response.cookies.set('csrf_token', csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 86400
    });

    return response;

  } catch (error) {
    return handleApiError(error, 'An unexpected error occurred during signup.');
  }
}
