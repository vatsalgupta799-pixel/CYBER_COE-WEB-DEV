import mongoose from 'mongoose';

const PersonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  email: { type: String },
  image: { type: String }, // Store image URL as string
  socialLinks: {
    linkedin: { type: String },
    github: { type: String },
    twitter: { type: String }
  }
}, { timestamps: true });

export default mongoose.models.Person || mongoose.model('Person', PersonSchema);
