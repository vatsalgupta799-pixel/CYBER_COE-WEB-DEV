import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Manuscript from '@/models/Manuscript';
import { handleApiError } from '@/lib/errorHandler';

export async function GET(request) {
  try {
    await connectToDatabase();
    const manuscripts = await Manuscript.find({}).sort({ createdAt: -1 });
    return NextResponse.json(manuscripts, { status: 200 });
  } catch (error) {
    return handleApiError(error, 'Error fetching research manuscripts.');
  }
}
