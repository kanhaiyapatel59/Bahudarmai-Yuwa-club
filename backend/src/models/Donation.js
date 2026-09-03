import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema(
  {
    donorName: {
      type: String,
      required: true,
    },
    donorEmail: {
      type: String,
      default: '',
    },
    donorPhone: {
      type: String,
      default: '',
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'NPR',
    },
    cause: {
      type: String,
      enum: ['youth_dev', 'education', 'sports', 'social_welfare', 'emergency', 'environment', 'general'],
      default: 'general',
    },
    paymentMethod: {
      type: String,
      enum: ['esewa', 'khalti', 'bank_transfer', 'cash'],
      default: 'bank_transfer',
    },
    transactionReference: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'verified', 'completed', 'failed'],
      default: 'pending',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Donation', donationSchema);
