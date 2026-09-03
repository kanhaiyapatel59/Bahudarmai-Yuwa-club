import mongoose from 'mongoose';

const bilingualString = {
  en: { type: String, default: '' },
  ne: { type: String, default: '' },
};

const leadershipSchema = new mongoose.Schema(
  {
    name: {
      en: { type: String, required: true },
      ne: { type: String, required: true },
    },
    position: {
      en: { type: String, required: true },
      ne: { type: String, required: true },
    },
    roleCategory: {
      type: String,
      enum: ['executive', 'coordinator', 'advisor'],
      default: 'executive',
    },
    order: {
      type: Number,
      default: 0,
    },
    photo: {
      type: String,
      default: '/byc_committee_banner.jpg',
    },
    shortBio: bilingualString,
    phone: {
      type: String,
      default: '9767721133',
    },
    email: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Leadership', leadershipSchema);
