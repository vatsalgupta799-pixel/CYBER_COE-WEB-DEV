import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['ongoing', 'completed'], default: 'ongoing' },
  participants: [{ type: String }],
  link: { type: String },
  image: { type: String } // Store image URL as string
}, { timestamps: true });

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
