import mongoose from 'mongoose';

const bilingualString = {
  en: { type: String, required: true },
  ne: { type: String, default: '' },
};

const achievementSchema = new mongoose.Schema(
  {
    title: bilingualString,
    description: bilingualString,
    category: {
      type: String,
      enum: ['sports', 'community', 'award', 'milestone'],
      default: 'milestone',
    },
    year: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Achievement', achievementSchema);
