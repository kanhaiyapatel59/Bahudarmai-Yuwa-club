import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Trophy, GraduationCap, HeartHandshake, Trees, UserCheck, Sparkles, ArrowRight } from 'lucide-react';

const activitiesData = {
  sports: {
    title: 'Sports & Tournaments',
    subtitle: 'Promoting healthy youth lifestyle, teamwork, and athletic talent across Parsa.',
    icon: Trophy,
    color: 'bg-amber-50 text-amber-700 border-amber-200',
    details: [
      'Annual BYC Youth Football Tournament with trophy prizes and scout matches.',
      'Cricket, volleyball, and athletics events for ward-level talent selection.',
      'Youth sports equipment distribution to local ward schools.',
    ],
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80',
  },
  education: {
    title: 'Education & Skill Workshops',
    subtitle: 'Empowering children and youth with educational support, digital literacy, and career coaching.',
    icon: GraduationCap,
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    details: [
      'Stationery, book distribution, and merit scholarships for underprivileged children.',
      'Basic computer literacy and digital safety workshops for local students.',
      'Career counseling sessions led by university volunteers.',
    ],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80',
  },
  'social-service': {
    title: 'Social Service & Emergency Support',
    subtitle: 'Standing by community members during medical emergencies, blood needs, and cold waves.',
    icon: HeartHandshake,
    color: 'bg-red-50 text-red-700 border-red-200',
    details: [
      'Free health screening camps and blood donation drives with Red Cross.',
      'Winter blanket distribution to elderly and low-income families.',
      'Emergency food and relief package distribution during natural disasters.',
    ],
    image: 'https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&q=80',
  },
  environment: {
    title: 'Environment & Climate Initiatives',
    subtitle: 'Building a clean, green, and ecologically sustainable Bahudarmai Municipality.',
    icon: Trees,
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    details: [
      'Annual 500+ tree plantation drives along public highways and schools.',
      'Weekly clean community drives in public markets and wards.',
      'Plastic reduction and waste management awareness campaigns.',
    ],
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80',
  },
  'youth-development': {
    title: 'Youth Empowerment & Leadership',
    subtitle: 'Nurturing public speaking, leadership skills, and youth entrepreneurship.',
    icon: UserCheck,
    color: 'bg-purple-50 text-purple-700 border-purple-200',
    details: [
      'Youth leadership summits and public speaking training programs.',
      'Basic entrepreneurship and small-business mentoring workshops.',
      'Civic responsibility and anti-substance abuse awareness sessions.',
    ],
    image: 'https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?auto=format&fit=crop&q=80',
  },
  culture: {
    title: 'Culture & Local Heritage',
    subtitle: 'Preserving Madhesh cultural traditions, local festivals, and artistic expression.',
    icon: Sparkles,
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    details: [
      'Cultural programs during major festivals (Chhath, Dashain, Holi, Maghi).',
      'Local music, folk dance, and traditional art competitions.',
      'Community harmony and inter-faith dialogue events.',
    ],
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80',
  },
};

export const Activities = () => {
  const { category } = useParams();
  const activeCategory = category && activitiesData[category] ? category : 'sports';
  const data = activitiesData[activeCategory];
  const Icon = data.icon;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Category Pills Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {Object.keys(activitiesData).map((catKey) => {
          const cat = activitiesData[catKey];
          const isActive = catKey === activeCategory;
          return (
            <Link
              key={catKey}
              to={`/activities/${catKey}`}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-all ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat.title}
            </Link>
          );
        })}
      </div>

      {/* Main Focus Detail Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${data.color}`}>
                <Icon className="w-4 h-4" />
                <span>Focus Category</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {data.title}
              </h1>
              <p className="text-slate-600 text-base leading-relaxed">
                {data.subtitle}
              </p>
              <div className="space-y-3 pt-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Key Initiatives & Programs
                </h4>
                {data.details.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-slate-700 text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 flex gap-4">
              <Link
                to="/volunteer"
                className="px-6 py-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors"
              >
                Volunteer For This Area
              </Link>
              <Link
                to="/events"
                className="px-6 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                View Related Events
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 min-h-[350px] relative bg-slate-100">
            <img
              src={data.image}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
