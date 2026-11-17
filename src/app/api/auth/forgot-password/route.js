import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { authRateLimit } from '@/lib/rateLimit';
import { sanitizeNoSql } from '@/lib/sanitize';
import { handleApiError } from '@/lib/errorHandler';
import crypto from 'crypto';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req) {
  try {
    // 1. Strict IP Rate Limiting (5-10 requests / 15 mins)
    const limitState = authRateLimit(req);
    if (!limitState.success) {
      return NextResponse.json(
        { 
          message: `Too many password reset requests. Please try again in ${limitState.resetSeconds} seconds.`,
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

    // 2. Input Validation & NoSQL Injection Defense
    const rawBody = await req.json().catch(() => ({}));
    const sanitizedBody = sanitizeNoSql(rawBody);
    const { email } = sanitizedBody;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ message: 'Please provide a valid email address.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json({ message: 'Please provide a valid email format.' }, { status: 400 });
    }

    // 3. Parameterized Query Lookup
    await connectToDatabase();
    const user = await User.findOne({ email: cleanEmail });

    // Consistent response to prevent user enumeration
    const genericResponse = { 
      message: 'If an account with that email exists, password reset instructions have been generated.',
      mockLink: ''
    };

    if (!user) {
      return NextResponse.json(genericResponse, { status: 200 });
    }

    // 4. Generate High-Entropy Reset Token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // 10-minute expiry
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save({ validateBeforeSave: false });

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const resetUrl = `${baseUrl}/reset-password?token=${resetToken}`;

    // Only return mockLink in non-production for local simulation testing
    if (process.env.NODE_ENV !== 'production') {
      genericResponse.mockLink = resetUrl;
    }

    return NextResponse.json(genericResponse, { status: 200 });

  } catch (error) {
    return handleApiError(error, 'An unexpected error occurred while processing the reset request.');
  }
}
