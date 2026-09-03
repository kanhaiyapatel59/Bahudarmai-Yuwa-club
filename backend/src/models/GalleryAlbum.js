import mongoose from 'mongoose';

const bilingualString = {
  en: { type: String, required: true },
  ne: { type: String, default: '' },
};

const galleryAlbumSchema = new mongoose.Schema(
  {
    title: bilingualString,
    category: {
      type: String,
      enum: ['events', 'sports', 'social_service', 'environment', 'culture', 'volunteers', 'community'],
      default: 'events',
    },
    coverImage: {
      type: String,
      required: true,
    },
    images: [
      {
        url: { type: String, required: true },
        caption: {
          en: { type: String, default: '' },
          ne: { type: String, default: '' },
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('GalleryAlbum', galleryAlbumSchema);
