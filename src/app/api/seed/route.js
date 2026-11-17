import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import User from '@/models/User';
import Manuscript from '@/models/Manuscript';
import { handleApiError } from '@/lib/errorHandler';

export async function GET(request) {
  // Block database wipe in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ message: 'Seeding is strictly disabled in production.' }, { status: 403 });
  }

  try {
    await connectToDatabase();
    
    // 1. Seed Admin
    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@cybercoe.edu';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'ChangeMeSecurely123!';
    
    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const admin = new User({
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      await admin.save();
    }

    // 2. Seed Manuscripts (sample)
    const count = await Manuscript.countDocuments();
    if (count === 0) {
      await Manuscript.create({
        title: 'Zero Trust Architecture in Enterprise Cloud Environments',
        journal: 'IEEE Security & Privacy',
        date: '2026',
        points: ['Identity verification', 'Least privilege posture'],
        type: 'SCI'
      });
    }

    return NextResponse.json({ 
      message: 'Database seeded successfully',
      adminUser: adminEmail
    }, { status: 200 });

  } catch (error) {
    return handleApiError(error, 'Error during database seeding.');
  }
}
