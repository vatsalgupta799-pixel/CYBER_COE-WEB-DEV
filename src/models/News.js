import mongoose from 'mongoose';

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  author: { type: String },
  image: { type: String }, // Store image URL as string
  tags: [{ type: String }]
}, { timestamps: true });

export default mongoose.models.News || mongoose.model('News', NewsSchema);
