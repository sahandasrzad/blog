import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: false },
  content: { type: String, required: true },
  category: { type: Number, required: true },
  views: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
