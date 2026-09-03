import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Member from './src/models/Member.js';
import Leadership from './src/models/Leadership.js';
import Event from './src/models/Event.js';
import NewsNotice from './src/models/NewsNotice.js';
import BloodDonor from './src/models/BloodDonor.js';
import SiteSettings from './src/models/SiteSettings.js';

dotenv.config();

const mongoUri = 'mongodb+srv://kanhaiya:patel@foodyham.anqqbp7.mongodb.net/byc_db?retryWrites=true&w=majority';

async function seedAtlas() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected to Atlas successfully!');

    await User.deleteMany({});
    await Member.deleteMany({});
    await Leadership.deleteMany({});
    await Event.deleteMany({});
    await NewsNotice.deleteMany({});
    await BloodDonor.deleteMany({});
    await SiteSettings.deleteMany({});

    // Super Admin User
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

    const approvedMember = await Member.create({
      user: memberUser._id,
      memberCode: 'BYC-2080-0001',
      fullName: 'Rohan Shrestha',
      dob: new Date('1998-05-14'),
      gender: 'male',
      phone: '9767721133',
      email: 'rohan@example.com',
      address: 'Bahudarmai Ward 2, Pipra',
      wardNumber: 2,
      occupation: 'IT Professional',
      education: 'Bachelor in CS',
      skills: ['Web Design', 'Event Organizing'],
      interests: ['Sports', 'Technology'],
      status: 'approved',
      idCardIssued: true,
      approvedAt: new Date(),
    });

    memberUser.memberId = approvedMember._id;
    await memberUser.save();

    // 38 Committee Members
    const officialLeaders = [
      { name: { en: 'Dhananjay Patel', ne: 'धनञ्जय पटेल' }, position: { en: 'President', ne: 'अध्यक्ष' }, roleCategory: 'executive', order: 1, phone: '9767721133', photo: '/byc_committee_banner.jpg' },
      { name: { en: 'Pooja Yadav', ne: 'पूजा यादव' }, position: { en: 'Vice President', ne: 'उपाध्यक्ष' }, roleCategory: 'executive', order: 2, phone: '9767721133', photo: '/byc_committee_banner.jpg' },
      { name: { en: 'Rajan Patel', ne: 'राजन पटेल' }, position: { en: 'Secretary', ne: 'सचिव' }, roleCategory: 'executive', order: 3, phone: '9767721133', photo: '/byc_committee_banner.jpg' },
      { name: { en: 'Aman Patel', ne: 'अमन पटेल' }, position: { en: 'Joint Secretary', ne: 'सह-सचिव' }, roleCategory: 'executive', order: 4, phone: '9767721133', photo: '/byc_committee_banner.jpg' },
      { name: { en: 'Arjun Gupta', ne: 'अर्जुन गुप्ता' }, position: { en: 'Treasurer', ne: 'कोषाध्यक्ष' }, roleCategory: 'executive', order: 5, phone: '9767721133', photo: '/byc_committee_banner.jpg' },
      { name: { en: 'Baliram Patel', ne: 'बलिराम पटेल' }, position: { en: 'Coordinator', ne: 'संयोजक' }, roleCategory: 'coordinator', order: 6, phone: '9767721133', photo: '/byc_committee_banner.jpg' },
      { name: { en: 'Ajay Yadav', ne: 'अजय यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 7 },
      { name: { en: 'Sanju Thakur', ne: 'संजू ठाकुर' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 8 },
      { name: { en: 'Ramnath Paswan', ne: 'रामनाथ पासवान' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 9 },
      { name: { en: 'Ajay Shah', ne: 'अजय शाह' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 10 },
      { name: { en: 'Sukesh Patel', ne: 'सुकेश पटेल' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 11 },
      { name: { en: 'Anil Ku. Yadav', ne: 'अनिल कु. यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 12 },
      { name: { en: 'Pradip Yadav', ne: 'प्रदिप यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 13 },
      { name: { en: 'Lalbabu Patel', ne: 'लालबाबु पटेल' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 14 },
      { name: { en: 'Chhotelal Yadav', ne: 'छोटेलाल यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 15 },
      { name: { en: 'Sunita Yadav', ne: 'सुनिता यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 16 },
      { name: { en: 'Sailesh Yadav', ne: 'शैलेश यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 17 },
      { name: { en: 'Ajay Pr. Shah', ne: 'अजय प्र. शाह' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 18 },
      { name: { en: 'Mandip Yadav', ne: 'मन्दिप यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 19 },
      { name: { en: 'Sachin Gupta', ne: 'सचिन गुप्ता' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 20 },
      { name: { en: 'Amit Patel', ne: 'अमित पटेल' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 21 },
      { name: { en: 'Suman Patel', ne: 'सुमन पटेल' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 22 },
      { name: { en: 'Mannu Patel', ne: 'मन्नु पटेल' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 23 },
      { name: { en: 'Anil Yadav', ne: 'अनिल यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 24 },
      { name: { en: 'Mithilesh Chaubey', ne: 'मिथलेश चौबे' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 25 },
      { name: { en: 'Vishal Patel', ne: 'विशाल पटेल' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 26 },
      { name: { en: 'Hiramati Yadav', ne: 'हिरामती यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 27 },
      { name: { en: 'Niraj Pr. Patel', ne: 'निरज प्र. पटेल' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 28 },
      { name: { en: 'Prabhat Sah Teli', ne: 'प्रभात साह तेली' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 29 },
      { name: { en: 'Roshan Pr. Patel', ne: 'रोशन प्र. पटेल' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 30 },
      { name: { en: 'Keshu Gupta', ne: 'केशु गुप्ता' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 31 },
      { name: { en: 'Vikas Ku. Patel', ne: 'विकास कु. पटेल' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 32 },
      { name: { en: 'Dipesh Ku. Yadav', ne: 'दिपेश कु. यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 33 },
      { name: { en: 'Ripu Kumar', ne: 'रिपु कुमार' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 34 },
      { name: { en: 'Pappu Yadav', ne: 'पप्पु यादव' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 35 },
      { name: { en: 'Ranjit Shah', ne: 'रंजित शाह' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 36 },
      { name: { en: 'Rambabu Gupta', ne: 'रामबाबु गुप्ता' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 37 },
      { name: { en: 'Neha Ku. Singh', ne: 'नेहा कु. सिंह' }, position: { en: 'Executive Member', ne: 'सदस्य' }, roleCategory: 'executive', order: 38 },
    ];
    await Leadership.insertMany(officialLeaders);

    // Events
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

    await Event.create({
      slug: 'byc-annual-football-tournament-2026',
      title: { en: 'BYC Annual Youth Football Cup 2026', ne: 'बहुदरमाई युवा क्लब वार्षिक फुटबल प्रतियोगिता २०२६' },
      description: { en: 'Inter-ward championship empowering young sports talent with trophy prizes and scout matches.', ne: 'वडास्तरीय युवा फुटबल प्रतियोगिता, ट्रफी पुरस्कार तथा खेलकुद प्रतिभा प्रवर्द्धन।' },
      category: 'sports',
      bannerImage: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80',
      startDate: new Date('2026-10-15'),
      endDate: new Date('2026-10-18'),
      location: { en: 'Bahudarmai Pipra School Ground, Ward 2', ne: 'बहुदरमाई पिपरा खेल मैदान, वडा नं. २' },
      organizer: { en: 'BYC Sports Department', ne: 'बहुदरमाई युवा क्लब खेलकुद विभाग' },
      status: 'upcoming',
      isRegistrationRequired: true,
      maxParticipants: 16,
      contactPhone: '9767721133',
    });

    // NewsNotice
    await NewsNotice.create({
      type: 'notice',
      slug: 'official-welcome-bahudarmai-mela',
      title: { en: 'Hearty Welcome to All Devotees at Shree Bahudarmai Mela', ne: 'ऐतिहासिक एवम् पौराणिक ५ दिवसीय श्री बहुदरमाई मेला मा पाल्नुहुने सम्पूर्ण श्रद्धालु भक्तजनहरूलाई हार्दिक स्वागत गर्दछौं।' },
      content: { en: 'Bahudarmai Yuwa Club Pipra (Parsa) extends a warm welcome to all devotees participating in the historic 5-day Shree Bahudarmai Mela.', ne: 'बहुदरमाई युवा क्लब पिपरा (पर्सा) द्वारा आयोजित ५ दिवसीय ऐतिहासिक एवम् पौराणिक मेलामा सम्पूर्ण महानुभावहरूलाई हार्दिक स्वागत गर्दछौं।' },
      category: 'Festival Notice',
      featuredImage: '/byc_committee_banner.jpg',
      author: 'Dhananjay Patel (President)',
      isPublished: true,
      publishedAt: new Date(),
    });

    // Blood Donor
    await BloodDonor.create({
      fullName: 'Bibek Shah',
      bloodGroup: 'O+',
      wardNumber: 2,
      address: 'Bahudarmai Ward 2, Pipra',
      isAvailable: true,
      phone: '9767721133',
      email: 'bibek@example.com',
      consentToContact: true,
    });

    // Site Settings
    await SiteSettings.create({
      heroTitle: { en: 'Bahudarmai Yuwa Club', ne: 'बहुदरमाई युवा क्लब' },
      heroSubtitle: { en: 'Bahudarmai Municipality-02, Pipra (Parsa) • Estd. 2080 BYC', ne: 'बहुदरमाई न.पा.-२, पिपरा (पर्सा) • स्था. २०८० BYC' },
      stats: { youthMembers: 1, communityEvents: 2, socialInitiatives: 0, peopleReached: 82 },
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

    console.log('✅ MongoDB Atlas Seeded Successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error seeding Atlas:', err);
    process.exit(1);
  }
}

seedAtlas();
