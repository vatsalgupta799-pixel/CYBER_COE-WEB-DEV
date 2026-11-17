import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import News from '@/models/News';
import { checkRole } from '@/lib/auth';
import { verifyRequestCsrf } from '@/lib/csrf';
import { sanitizeNoSql } from '@/lib/sanitize';
import { handleApiError } from '@/lib/errorHandler';

export async function GET() {
  try {
    await connectToDatabase();
    const news = await News.find({}).sort({ date: -1 });
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return handleApiError(error, 'Error fetching news.');
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
    const news = await News.create(sanitizedBody);
    return NextResponse.json(news, { status: 201 });
  } catch (error) {
    return handleApiError(error, 'Error creating news item.');
  }
}
