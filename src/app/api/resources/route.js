import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Resource from '@/models/Resource';
import { checkRole } from '@/lib/auth';
import { verifyRequestCsrf } from '@/lib/csrf';
import { sanitizeNoSql } from '@/lib/sanitize';
import { handleApiError } from '@/lib/errorHandler';

export async function GET() {
  try {
    const isAuthorized = await checkRole(['admin', 'student', 'editor']);
    if (!isAuthorized) {
      return NextResponse.json({ message: 'Unauthorized: Student or Admin session required.' }, { status: 401 });
    }

    await connectToDatabase();
    const resources = await Resource.find({});
    return NextResponse.json(resources, { status: 200 });
  } catch (error) {
    return handleApiError(error, 'Error fetching resources.');
  }
}

export async function POST(req) {
  try {
    const isAuthorized = await checkRole(['admin', 'editor']);
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
    const resource = await Resource.create(sanitizedBody);
    return NextResponse.json(resource, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Error creating resource.');
  }
}
