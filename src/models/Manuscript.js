import mongoose from 'mongoose';

const ManuscriptSchema = new mongoose.Schema({
  title: { type: String, required: true },
  journal: { type: String, required: true },
  date: { type: String, required: true },
  points: [{ type: String }],
  type: { type: String, enum: ['SCI', 'Scopus'], required: true }
}, { timestamps: true });

export default mongoose.models.Manuscript || mongoose.model('Manuscript', ManuscriptSchema);
