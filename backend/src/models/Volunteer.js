import mongoose from 'mongoose';

const volunteerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    wardNumber: {
      type: Number,
      required: [true, 'Ward number is required'],
    },
    skills: [{ type: String }],
    interests: [{ type: String }],
    availability: {
      type: String,
      enum: ['weekdays', 'weekends', 'emergency_only', 'anytime'],
      default: 'anytime',
    },
    preferredActivities: [
      {
        type: String,
        enum: ['sports', 'education', 'social_service', 'environment', 'disaster_response', 'event_management', 'technology', 'other'],
      },
    ],
    shortBio: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'assigned'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Volunteer', volunteerSchema);
