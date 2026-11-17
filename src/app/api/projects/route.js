import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Project from '@/models/Project';
import { checkRole } from '@/lib/auth';
import { verifyRequestCsrf } from '@/lib/csrf';
import { sanitizeNoSql } from '@/lib/sanitize';
import { handleApiError } from '@/lib/errorHandler';

export async function GET() {
  try {
    await connectToDatabase();
    const projects = await Project.find({});
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return handleApiError(error, 'Error fetching projects.');
  }
}

export async function POST(req) {
  try {
    const isAuthorized = await checkRole(['admin', 'editor']);
    if (!isAuthorized) {
      return NextResponse.json({ message: 'Unauthorized: Admin or Editor privilege required.' }, { status: 401 });
    }

    const isCsrfValid = verifyRequestCsrf(req);
    if (!isCsrfValid) {
      return NextResponse.json({ message: 'Invalid or missing CSRF token.' }, { status: 403 });
    }

    const rawBody = await req.json().catch(() => ({}));
    const sanitizedBody = sanitizeNoSql(rawBody);

    await connectToDatabase();
    const project = await Project.create(sanitizedBody);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Error creating project.');
  }
}
