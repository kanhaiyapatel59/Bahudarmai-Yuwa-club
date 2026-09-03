import mongoose from 'mongoose';

const bloodDonorSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
      required: [true, 'Blood group is required'],
    },
    wardNumber: {
      type: Number,
      required: [true, 'Ward number is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    lastDonatedDate: {
      type: Date,
      default: null,
    },
    consentToContact: {
      type: Boolean,
      required: true,
      default: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      select: false, // Hidden by default from public search results to protect privacy
    },
    email: {
      type: String,
      default: '',
      select: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model('BloodDonor', bloodDonorSchema);
