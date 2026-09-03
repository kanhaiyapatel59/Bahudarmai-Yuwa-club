import mongoose from 'mongoose';

const bilingualString = {
  en: { type: String, required: true },
  ne: { type: String, default: '' },
};

const newsNoticeSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['news', 'notice'],
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: bilingualString,
    content: bilingualString,
    category: {
      type: String,
      default: 'General',
    },
    featuredImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80',
    },
    author: {
      type: String,
      default: 'BYC Committee',
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model('NewsNotice', newsNoticeSchema);
