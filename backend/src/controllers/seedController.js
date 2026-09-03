import User from '../models/User.js';
import Member from '../models/Member.js';
import Volunteer from '../models/Volunteer.js';
import Event from '../models/Event.js';
import NewsNotice from '../models/NewsNotice.js';
import BloodDonor from '../models/BloodDonor.js';
import HelpRequest from '../models/HelpRequest.js';
import Donation from '../models/Donation.js';
import Leadership from '../models/Leadership.js';
import Achievement from '../models/Achievement.js';
import GalleryAlbum from '../models/GalleryAlbum.js';
import SiteSettings from '../models/SiteSettings.js';

export const runSeedData = async (req, res, next) => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Member.deleteMany({});
    await Volunteer.deleteMany({});
    await Event.deleteMany({});
    await NewsNotice.deleteMany({});
    await BloodDonor.deleteMany({});
    await HelpRequest.deleteMany({});
    await Donation.deleteMany({});
    await Leadership.deleteMany({});
    await Achievement.deleteMany({});
    await GalleryAlbum.deleteMany({});
    await SiteSettings.deleteMany({});

    // 1. Create Super Admin User & Member User
    const adminUser = await User.create({
      name: 'BYC Admin',
      email: 'admin@byc.org.np',
      password: 'adminpassword123',
      role: 'super_admin',
      languagePreference: 'ne',
    });

    const memberUser = await User.create({
      name: 'Rohan Shrestha',
      email: 'rohan@example.com',
      password: 'memberpassword123',
      role: 'member',
      languagePreference: 'ne',
    });

    // 3. Official Leadership & Member Data
    const executiveNames = [
      'Ajay Yadav', 'Sanju Thakur', 'Ramnath Paswan', 'Ajay Shah',
      'Sukesh Patel', 'Anil Ku. Yadav', 'Pradip Yadav', 'Lalbabu Patel',
      'Chhotelal Yadav', 'Sunita Yadav', 'Sailesh Yadav', 'Ajay Pr. Shah',
      'Mandip Yadav', 'Sachin Gupta', 'Amit Patel', 'Suman Patel',
      'Mannu Patel', 'Anil Yadav', 'Mithilesh Chaubey', 'Vishal Patel',
      'Hiramati Yadav', 'Niraj Pr. Patel', 'Prabhat Sah Teli', 'Roshan Pr. Patel',
      'Keshu Gupta', 'Vikas Ku. Patel', 'Dipesh Ku. Yadav', 'Ripu Kumar',
      'Pappu Yadav', 'Ranjit Shah', 'Rambabu Gupta', 'Neha Ku. Singh'
    ];

    // Seed Member Collection for Admin Members Page
    const memberDocs = executiveNames.map((name, idx) => ({
      memberCode: `BYC-2080-${String(idx + 1).padStart(4, '0')}`,
      fullName: name,
      phone: '9767721133',
      email: `${name.toLowerCase().replace(/[^a-z]/g, '')}@byc.org.np`,
      address: 'Bahudarmai Ward 2, Pipra',
      wardNumber: 2,
      occupation: 'Executive Member',
      status: 'approved',
      idCardIssued: true,
      approvedAt: new Date(),
    }));

    await Member.insertMany(memberDocs);

    // Seed Leadership Collection
    const officialLeaders = [
      { name: { en: 'Dhananjay Patel', ne: 'धनञ्जय पटेल' }, position: { en: 'President', ne: 'अध्यक्ष' }, roleCategory: 'executive', order: 1, phone: '9767721133', photo: '/byc_committee_banner.jpg', shortBio: { en: 'Club President leading BYC youth activities in Pipra, Parsa.', ne: 'बहुदरमाई युवा क्लब अध्यक्ष, पिपरा (पर्सा)।' } },
      { name: { en: 'Pooja Yadav', ne: 'पूजा यादव' }, position: { en: 'Vice President', ne: 'उपाध्यक्ष' }, roleCategory: 'executive', order: 2, phone: '9767721133', photo: '/byc_committee_banner.jpg', shortBio: { en: 'Vice President driving youth & women empowerment initiatives.', ne: 'बहुदरमाई युवा क्लब उपाध्यक्ष।' } },
      { name: { en: 'Rajan Patel', ne: 'राजन पटेल' }, position: { en: 'Secretary', ne: 'सचिव' }, roleCategory: 'executive', order: 3, phone: '9767721133', photo: '/byc_committee_banner.jpg', shortBio: { en: 'Club Secretary overseeing administration & public relations.', ne: 'बहुदरमाई युवा क्लब सचिव।' } },
      { name: { en: 'Aman Patel', ne: 'अमन पटेल' }, position: { en: 'Joint Secretary', ne: 'सह-सचिव' }, roleCategory: 'executive', order: 4, phone: '9767721133', photo: '/byc_committee_banner.jpg', shortBio: { en: 'Joint Secretary coordinating committee events.', ne: 'बहुदरमाई युवा क्लब सह-सचिव।' } },
      { name: { en: 'Arjun Gupta', ne: 'अर्जुन गुप्ता' }, position: { en: 'Treasurer', ne: 'कोषाध्यक्ष' }, roleCategory: 'executive', order: 5, phone: '9767721133', photo: '/byc_committee_banner.jpg', shortBio: { en: 'Club Treasurer managing financial transparency & donations.', ne: 'बहुदरमाई युवा क्लब कोषाध्यक्ष।' } },
      { name: { en: 'Baliram Patel', ne: 'बलिराम पटेल' }, position: { en: 'Coordinator', ne: 'संयोजक' }, roleCategory: 'coordinator', order: 6, phone: '9767721133', photo: '/byc_committee_banner.jpg', shortBio: { en: 'Event Coordinator supervising field activities.', ne: 'बहुदरमाई युवा क्लब संयोजक।' } },
      ...executiveNames.map((name, i) => ({
        name: { en: name, ne: name },
        position: { en: 'Executive Member', ne: 'कार्यसमिति सदस्य' },
        roleCategory: 'executive',
        order: 7 + i,
        phone: '9767721133',
        photo: '/byc_committee_banner.jpg',
      })),
    ];

    await Leadership.insertMany(officialLeaders);

    // 4. Create Recent Events
    await Event.create({
      slug: 'historic-shree-bahudarmai-5-day-mela-2026',
      title: { en: 'Historic & Mythological 5-Day Shree Bahudarmai Mela 2026', ne: 'ऐतिहासिक एवम् पौराणिक ५ दिवसीय श्री बहुदरमाई मेला २०८०/२०८२' },
      description: { en: 'Grand 5-day cultural & mythological mela organized by Bahudarmai Yuwa Club in Pipra (Parsa) welcoming thousands of devotees.', ne: 'बहुदरमाई युवा क्लब, पिपरा (पर्सा) द्वारा आयोजित ५ दिवसीय ऐतिहासिक एवम् पौराणिक श्री बहुदरमाई मेला।' },
      category: 'culture',
      bannerImage: '/byc_committee_banner.jpg',
      startDate: new Date('2026-10-01'),
      endDate: new Date('2026-10-05'),
      location: { en: 'Bahudarmai Municipality-02, Pipra (Parsa)', ne: 'बहुदरमाई न.पा.-२, पिपरा (पर्सा)' },
      organizer: { en: 'Bahudarmai Yuwa Club Committee', ne: 'बहुदरमाई युवा क्लब समिति' },
      status: 'upcoming',
      isRegistrationRequired: true,
      maxParticipants: 500,
      contactPhone: '9767721133',
    });

    // 5. Site Settings
    await SiteSettings.create({
      heroTitle: { en: 'Bahudarmai Yuwa Club', ne: 'बहुदरमाई युवा क्लब' },
      heroSubtitle: { en: 'Bahudarmai Municipality-02, Pipra (Parsa) • Estd. 2080 BYC', ne: 'बहुदरमाई न.पा.-२, पिपरा (पर्सा) • स्था. २०८० BYC' },
      stats: { youthMembers: 38, communityEvents: 2, socialInitiatives: 0, peopleReached: 1250 },
      presidentMessage: {
        name: { en: 'Dhananjay Patel', ne: 'धनञ्जय पटेल' },
        title: { en: 'President, Bahudarmai Yuwa Club', ne: 'अध्यक्ष, बहुदरमाई युवा क्लब' },
        message: { en: 'Bahudarmai Yuwa Club stands firmly for unity, progress, youth leadership, and unselfish service across Pipra and Bahudarmai Municipality.', ne: 'बहुदरमाई युवा क्लब पिपरा (पर्सा) युवा सशक्तिकरण, समाजसेवा, खेलकुद तथा सांस्कृतिक जगेर्नाका लागि निरन्तर समर्पित छ।' },
        photo: '/byc_committee_banner.jpg',
      },
      contactInfo: {
        phone: '9767721133',
        email: 'info@byc.org.np',
        address: { en: 'Bahudarmai Municipality-02, Pipra (Parsa), Nepal', ne: 'बहुदरमाई न.पा.-२, पिपरा (पर्सा), नेपाल' },
      },
      socialLinks: {
        facebook: 'https://facebook.com/bahudarmaiyuwa',
        instagram: 'https://instagram.com/bahudarmaiyuwa',
      },
    });

    return res.json({
      success: true,
      message: 'Cloud Database successfully seeded with 38 BYC Members & Leadership!',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
};
