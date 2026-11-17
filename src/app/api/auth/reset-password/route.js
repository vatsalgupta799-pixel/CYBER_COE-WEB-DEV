import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import { authRateLimit } from '@/lib/rateLimit';
import { sanitizeNoSql } from '@/lib/sanitize';
import { handleApiError } from '@/lib/errorHandler';
import crypto from 'crypto';

export async function POST(req) {
  try {
    // 1. Strict Auth Rate Limiting
    const limitState = authRateLimit(req);
    if (!limitState.success) {
      return NextResponse.json(
        { 
          message: `Too many password reset attempts. Please try again in ${limitState.resetSeconds} seconds.`,
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

    // 2. Input Sanitization & Validation
    const rawBody = await req.json().catch(() => ({}));
    const sanitizedBody = sanitizeNoSql(rawBody);
    const { token, password } = sanitizedBody;

    if (!token || !password || typeof token !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ message: 'Missing or invalid token / new password.' }, { status: 400 });
    }

    const cleanToken = token.trim();
    const cleanPass = password.trim();

    if (cleanPass.length < 6) {
      return NextResponse.json({ message: 'New password must be at least 6 characters long.' }, { status: 400 });
    }

    // 3. Parameterized Token Verification
    await connectToDatabase();
    
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(cleanToken)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired password reset token.' }, { status: 400 });
    }

    // 4. Update Password & Invalidate Token
    user.password = cleanPass;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return NextResponse.json({ message: 'Password has been successfully updated.' }, { status: 200 });

  } catch (error) {
    return handleApiError(error, 'An unexpected error occurred while resetting your password.');
  }
}
