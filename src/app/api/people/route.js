import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Person from '@/models/Person';
import { checkRole } from '@/lib/auth';
import { verifyRequestCsrf } from '@/lib/csrf';
import { sanitizeNoSql } from '@/lib/sanitize';
import { handleApiError } from '@/lib/errorHandler';

export async function GET() {
  try {
    await connectToDatabase();
    const people = await Person.find({});
    return NextResponse.json(people, { status: 200 });
  } catch (error) {
    return handleApiError(error, 'Error fetching faculty and team members.');
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
    const person = await Person.create(sanitizedBody);
    return NextResponse.json(person, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Error creating person profile.');
  }
}
