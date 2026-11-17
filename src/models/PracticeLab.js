import mongoose from 'mongoose';

const PracticeLabSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  category: { type: String },
  difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] }
}, { timestamps: true });

export default mongoose.models.PracticeLab || mongoose.model('PracticeLab', PracticeLabSchema);
