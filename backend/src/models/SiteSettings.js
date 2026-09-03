import mongoose from 'mongoose';

const bilingualString = {
  en: { type: String, default: '' },
  ne: { type: String, default: '' },
};

const siteSettingsSchema = new mongoose.Schema(
  {
    heroTitle: bilingualString,
    heroSubtitle: bilingualString,
    stats: {
      youthMembers: { type: Number, default: 500 },
      communityEvents: { type: Number, default: 50 },
      socialInitiatives: { type: Number, default: 25 },
      peopleReached: { type: Number, default: 1000 },
    },
    presidentMessage: {
      name: bilingualString,
      title: bilingualString,
      message: bilingualString,
      photo: { type: String, default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80' },
    },
    contactInfo: {
      phone: { type: String, default: '+977 9800000000 [OFFICIAL PHONE NUMBER]' },
      email: { type: String, default: 'info@byc.org.np' },
      address: bilingualString,
      mapEmbedUrl: { type: String, default: '' },
    },
    socialLinks: {
      facebook: { type: String, default: 'https://facebook.com/bahudarmaiyuwa' },
      instagram: { type: String, default: 'https://instagram.com/bahudarmaiyuwa' },
      youtube: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
  },
  { timestamps: true }
);

export default mongoose.model('SiteSettings', siteSettingsSchema);
