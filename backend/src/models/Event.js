import mongoose from 'mongoose';

const bilingualString = {
  en: { type: String, required: true },
  ne: { type: String, default: '' },
};

const eventSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    title: bilingualString,
    description: bilingualString,
    category: {
      type: String,
      enum: ['sports', 'education', 'social_service', 'environment', 'culture', 'youth_dev', 'other'],
      default: 'other',
    },
    bannerImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80',
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    location: bilingualString,
    organizer: bilingualString,
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
    },
    isRegistrationRequired: {
      type: Boolean,
      default: true,
    },
    maxParticipants: {
      type: Number,
      default: 100,
    },
    registrationDeadline: {
      type: Date,
    },
    contactPhone: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
