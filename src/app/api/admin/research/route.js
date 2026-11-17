import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Manuscript from '@/models/Manuscript';
import { checkRole } from '@/lib/auth';
import { verifyRequestCsrf } from '@/lib/csrf';
import { sanitizeNoSql } from '@/lib/sanitize';
import { handleApiError } from '@/lib/errorHandler';

export async function POST(request) {
  try {
    // 1. Role-Based Access Control (Admin/Editor only)
    const isAuthorized = await checkRole(['admin', 'editor']);
    if (!isAuthorized) {
      return NextResponse.json({ message: 'Unauthorized: Admin or Editor privilege required.' }, { status: 401 });
    }

    // 2. Anti-CSRF Token Verification
    const isCsrfValid = verifyRequestCsrf(request);
    if (!isCsrfValid) {
      return NextResponse.json({ message: 'Invalid or missing CSRF token.' }, { status: 403 });
    }

    // 3. Input Validation & Sanitization
    const rawData = await request.json().catch(() => ({}));
    const sanitizedData = sanitizeNoSql(rawData);

    if (!sanitizedData.title || typeof sanitizedData.title !== 'string') {
      return NextResponse.json({ message: 'Manuscript title is required.' }, { status: 400 });
    }

    // 4. Parameterized Database Write
    await connectToDatabase();
    const newManuscript = await Manuscript.create(sanitizedData);
    
    return NextResponse.json({ message: 'Manuscript created successfully', manuscript: newManuscript }, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Failed to create manuscript due to a server error.');
  }
}
