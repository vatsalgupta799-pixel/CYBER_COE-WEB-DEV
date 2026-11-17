import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import PracticeLab from '@/models/PracticeLab';
import { checkRole } from '@/lib/auth';
import { verifyRequestCsrf } from '@/lib/csrf';
import { sanitizeNoSql } from '@/lib/sanitize';
import { handleApiError } from '@/lib/errorHandler';

export async function GET(req) {
  try {
    const isAuthorized = await checkRole(['admin', 'student', 'editor']);
    if (!isAuthorized) {
      return NextResponse.json({ message: 'Unauthorized: Student or Admin session required.' }, { status: 401 });
    }

    await connectToDatabase();
    const labs = await PracticeLab.find({});
    return NextResponse.json(labs, { status: 200 });
  } catch (error) {
    return handleApiError(error, 'Error fetching practice labs.');
  }
}

export async function POST(req) {
  try {
    const isAuthorized = await checkRole(['admin']);
    if (!isAuthorized) {
      return NextResponse.json({ message: 'Unauthorized: Admin privilege required.' }, { status: 401 });
    }

    const isCsrfValid = verifyRequestCsrf(req);
    if (!isCsrfValid) {
      return NextResponse.json({ message: 'Invalid or missing CSRF token.' }, { status: 403 });
    }

    const rawBody = await req.json().catch(() => ({}));
    const sanitizedBody = sanitizeNoSql(rawBody);

    await connectToDatabase();
    const lab = await PracticeLab.create(sanitizedBody);
    return NextResponse.json(lab, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Error creating practice lab.');
  }
}
