import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';
import Manuscript from '../src/models/Manuscript.js';

dotenv.config({ path: '.env.local' });
dotenv.config({ path: '.env' });

async function seed() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('Error: MONGODB_URI is not set in environment or .env.local');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB');

    // 1. Seed Initial Admin User if not present
    const adminEmail = process.env.ADMIN_DEFAULT_EMAIL || 'admin@cybercoe.edu';
    const adminPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'ChangeMeSecurely123!';

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const admin = new User({
        email: adminEmail,
        password: adminPassword,
        role: 'admin'
      });
      await admin.save();
      console.log(`Admin user created: ${adminEmail}`);
    } else {
      console.log(`Admin user ${adminEmail} already exists.`);
    }

    // 2. Seed Sample Manuscript
    const manuscriptCount = await Manuscript.countDocuments();
    if (manuscriptCount === 0) {
      await Manuscript.create({
        title: 'Zero Trust Architecture in Higher Education Networks',
        journal: 'IEEE Transactions on Network Security',
        date: '2026',
        points: ['Micro-segmentation', 'Continuous verification', 'Least privilege access'],
        type: 'SCI'
      });
      console.log('Sample manuscript created.');
    }

    console.log('Seeding completed successfully.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
}

seed();
