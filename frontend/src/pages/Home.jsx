import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import BilingualText from '../components/common/BilingualText';
import { siteSettingsService, eventService } from '../services/api';
import { localizeNumber } from '../utils/numberLocalizer';
import { formatDate } from '../utils/dateFormatter';
import {
  Trophy,
  GraduationCap,
  HeartHandshake,
  Trees,
  UserCheck,
  Sparkles,
  ArrowRight,
  Calendar,
  MapPin,
  ShieldAlert,
  ChevronRight,
  Flame,
  Award,
} from 'lucide-react';

export const Home = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const [settings, setSettings] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, eventsRes] = await Promise.allSettled([
          siteSettingsService.getPublic(),
          eventService.getEvents({ limit: 6 }),
        ]);

        if (settingsRes.status === 'fulfilled' && settingsRes.value?.data?.success) {
          setSettings(settingsRes.value.data.settings);
        }
        if (eventsRes.status === 'fulfilled' && eventsRes.value?.data?.success) {
          setUpcomingEvents(eventsRes.value.data.events);
        }
      } catch (err) {
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = settings?.stats || { youthMembers: 520, communityEvents: 54, socialInitiatives: 28, peopleReached: 1250 };

  const latestPostedEvent = upcomingEvents[0] || {
    title: { en: 'Historic & Mythological 5-Day Shree Bahudarmai Mela 2026', ne: 'ऐतिहासिक एवम् पौराणिक ५ दिवसीय श्री बहुदरमाई मेला' },
    bannerImage: '/byc_committee_banner.jpg',
    startDate: new Date(),
    location: { en: 'Bahudarmai Municipality-02, Pipra (Parsa)', ne: 'बहुदरमाई न.पा.-२, पिपरा (पर्सा)' },
  };

  const heroBackgroundImage = '/byc_temple_bg.jpg';

  const focusCards = [
    {
      icon: Trophy,
      title: currentLang === 'ne' ? 'खेलकुद तथा प्रतियोगिता' : 'Sports & Athletics',
      desc: currentLang === 'ne' ? 'फुटबल, क्रिकेट, भलिबल, प्रतियोगिताहरू र युवा प्रतिभा विकास।' : 'Football, cricket, volleyball tournaments, and athletic training.',
      path: '/activities/sports',
      color: 'bg-blue-50 text-[#02529C] border-blue-200',
    },
    {
      icon: GraduationCap,
      title: currentLang === 'ne' ? 'शिक्षा तथा क्षमता अभिबृद्धि' : 'Education & Leadership',
      desc: currentLang === 'ne' ? 'छात्रवृत्ति, वर्कसप, कम्प्युटर शिक्षा र करियर मार्गनिर्देशन।' : 'Scholarships, workshops, digital skills, and youth leadership training.',
      path: '/activities/education',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    },
    {
      icon: HeartHandshake,
      title: currentLang === 'ne' ? 'सामाजिक सेवा' : 'Social Service',
      desc: currentLang === 'ne' ? 'सामुदायिक सहयोग, राहत कार्यक्रम, रक्तदान शिविर र विपद् व्यवस्थापन।' : 'Community assistance, relief packages, blood donation & disaster support.',
      path: '/activities/social-service',
      color: 'bg-red-50 text-[#D32F2F] border-red-200',
    },
    {
      icon: Trees,
      title: currentLang === 'ne' ? 'वातावरण तथा हरियाली' : 'Environment & Ecology',
      desc: currentLang === 'ne' ? 'वृक्षारोपण, सरसफाइ अभियान र वातावरण संरक्षण सचेतना।' : 'Tree plantations, clean community drives, and ecological awareness.',
      path: '/activities/environment',
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      icon: UserCheck,
      title: currentLang === 'ne' ? 'युवा सशक्तिकरण' : 'Youth Development',
      desc: currentLang === 'ne' ? 'नेतृत्व, सीप, उद्यमशीलता र व्यक्तित्व विकास।' : 'Leadership, entrepreneurship, advocacy, and career mentoring.',
      path: '/activities/youth-development',
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      icon: Sparkles,
      title: currentLang === 'ne' ? 'संस्कृति तथा सम्पदा' : 'Culture & Heritage',
      desc: currentLang === 'ne' ? 'स्थानीय चाडपर्व, सांस्कृतिक कार्यक्रम र सामुदायिक परम्परा जगेर्ना।' : 'Local festivals, cultural preservation, and community heritage.',
      path: '/activities/culture',
      color: 'bg-amber-50 text-amber-700 border-amber-200',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16 bg-slate-50 text-slate-900">
      {/* 1. Hero Section with 100% Clear Natural Temple Background */}
      <section className="relative bg-slate-900 text-white min-h-[580px] flex items-center shadow-lg border-b border-slate-800 overflow-hidden">
        {/* Real Bahudarmai Temple Background Image (No Blue Overlay) */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/byc_temple_bg.jpg"
            alt="Bahudarmai Temple Background"
            className="w-full h-full object-cover opacity-100 scale-100"
          />
          {/* Subtle Dark Vignette Shadow for White Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-black/70"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold shadow-xs backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-yellow-300" />
                <span>{t('home.hero.motto')}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
                <BilingualText content={settings?.heroTitle} fallback="Bahudarmai Yuwa Club" />
              </h1>

              <p className="text-base sm:text-lg text-blue-100 max-w-2xl leading-relaxed font-normal">
                <BilingualText
                  content={settings?.heroSubtitle}
                  fallback="Bahudarmai Municipality-02, Pipra (Parsa) • Estd. 2080 BYC"
                />
              </p>

              {/* Action Buttons Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 flex-wrap">
                <Link
                  to="/join"
                  className="w-full sm:w-auto px-7 py-3.5 text-sm font-black text-[#02529C] bg-white hover:bg-blue-50 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('home.hero.joinBtn')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/volunteer"
                  className="w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/30 rounded-xl backdrop-blur-md transition-all text-center"
                >
                  {t('home.hero.volunteerBtn')}
                </Link>

                <Link
                  to="/about"
                  className="w-full sm:w-auto px-5 py-3.5 text-sm font-semibold text-blue-200 hover:text-white transition-colors text-center"
                >
                  {t('home.hero.exploreBtn')}
                </Link>
              </div>

              {/* Right-to-Left Sliding Ticker Bar showing Club Name directly below Join BYC row */}
              <div className="pt-2 max-w-xl mx-auto lg:mx-0">
                <div className="bg-[#012243]/90 border border-blue-400/30 rounded-xl px-3 py-2 text-xs overflow-hidden flex items-center gap-2 shadow-inner">
                  <span className="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
                  <div className="overflow-hidden flex-1 relative">
                    <div className="animate-marquee flex items-center gap-6 whitespace-nowrap font-medium text-blue-100">
                      <span className="font-bold text-white">Bahudarmai Yuwa Club</span>
                      <span className="text-blue-300">•</span>
                      <span className="font-ne font-bold text-yellow-300">बहुदरमाई युवा क्लब</span>
                      <span className="text-blue-300">•</span>
                      <span>Bahudarmai Municipality-02, Pipra (Parsa)</span>
                      <span className="text-blue-300">•</span>
                      <span className="font-ne">बहुदरमाई न.पा.-२, पिपरा (पर्सा)</span>
                      <span className="text-blue-300">•</span>
                      <span className="text-yellow-300 font-semibold">Estd. 2080 BYC</span>
                      <span className="text-blue-300">•</span>
                      <span className="font-ne text-blue-100">युवा • एकता • सेवा • प्रगति</span>
                      <span className="text-blue-300">•</span>

                      {/* Duplicate repeat for infinite right-to-left marquee scroll */}
                      <span className="font-bold text-white">Bahudarmai Yuwa Club</span>
                      <span className="text-blue-300">•</span>
                      <span className="font-ne font-bold text-yellow-300">बहुदरमाई युवा क्लब</span>
                      <span className="text-blue-300">•</span>
                      <span>Bahudarmai Municipality-02, Pipra (Parsa)</span>
                      <span className="text-blue-300">•</span>
                      <span className="font-ne">बहुदरमाई न.पा.-२, पिपरा (पर्सा)</span>
                      <span className="text-blue-300">•</span>
                      <span className="text-yellow-300 font-semibold">Estd. 2080 BYC</span>
                      <span className="text-blue-300">•</span>
                      <span className="font-ne text-blue-100">युवा • एकता • सेवा • प्रगति</span>
                      <span className="text-blue-300">•</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Event Highlight Card */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="bg-white/10 border border-white/20 rounded-2xl p-5 shadow-2xl backdrop-blur-md space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-extrabold text-yellow-300 bg-black/20 border border-white/20 px-2.5 py-0.5 rounded-md uppercase">
                    <Flame className="w-3.5 h-3.5 text-yellow-300" />
                    Featured Activity
                  </span>
                  <span className="text-[11px] text-blue-100 font-medium">Pipra, Parsa</span>
                </div>

                <div className="aspect-video rounded-xl overflow-hidden relative bg-black/20 border border-white/10">
                  <img
                    src={latestPostedEvent.bannerImage}
                    alt="Recent Activity"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-sm font-bold text-white line-clamp-1 leading-snug">
                    <BilingualText content={latestPostedEvent.title} />
                  </h3>
                  <div className="flex items-center justify-between text-xs text-blue-100 pt-1">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-yellow-300" />
                      {formatDate(latestPostedEvent.startDate, currentLang)}
                    </span>
                    <Link
                      to={`/events/${latestPostedEvent.slug || ''}`}
                      className="text-yellow-300 hover:underline font-bold text-[11px]"
                    >
                      View Details ↗
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Impact Statistics Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#02529C] mb-1">
              {localizeNumber(stats.youthMembers, currentLang)}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-700">
              {t('home.stats.youthMembers')}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-slate-800 mb-1">
              {localizeNumber(stats.communityEvents, currentLang)}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-700">
              {t('home.stats.communityEvents')}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#D32F2F] mb-1">
              {localizeNumber(stats.socialInitiatives, currentLang)}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-700">
              {t('home.stats.socialInitiatives')}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs text-center">
            <div className="text-3xl sm:text-4xl font-black text-[#02529C] mb-1">
              {localizeNumber(stats.peopleReached, currentLang)}
            </div>
            <div className="text-xs sm:text-sm font-bold text-slate-700">
              {t('home.stats.peopleReached')}
            </div>
          </div>
        </div>
      </section>

      {/* 3. About BYC Overview Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#012A52] to-[#02529C] rounded-3xl text-white p-8 sm:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-yellow-300 text-xs font-bold uppercase tracking-wider">
                {t('home.about.title')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t('home.about.subtitle')}
              </h2>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
                {t('home.about.desc')}
              </p>
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#02529C] bg-white hover:bg-blue-50 rounded-xl transition-colors shadow-sm"
                >
                  <span>{t('home.about.learnMore')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
              <span className="text-xs font-bold text-yellow-300 uppercase block mb-1">
                {t('home.about.presidentTitle')}
              </span>
              <h4 className="text-base font-bold text-white mb-2">
                <BilingualText content={settings?.presidentMessage?.name} fallback="धनञ्जय पटेल (Dhananjay Patel)" />
              </h4>
              <p className="text-xs text-blue-100 italic leading-relaxed mb-3">
                "<BilingualText content={settings?.presidentMessage?.message} fallback="बहुदरमाई युवा क्लब पिपरा (पर्सा) युवा सशक्तिकरण, समाजसेवा, खेलकुद तथा सांस्कृतिक जगेर्नाका लागि निरन्तर समर्पित छ।" />"
              </p>
              <span className="text-[11px] text-blue-200 block font-semibold">
                <BilingualText content={settings?.presidentMessage?.title} fallback="अध्यक्ष, बहुदरमाई युवा क्लब" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Core Focus Areas */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('home.focus.title')}
          </h2>
          <p className="text-slate-600 text-sm">
            {t('home.focus.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusCards.map((card, idx) => {
            const IconComponent = card.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-[#02529C] transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-xl ${card.color} border flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 mt-4">
                  <Link
                    to={card.path}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#02529C] hover:text-[#013F7A]"
                  >
                    <span>{t('home.about.learnMore')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Featured Events */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {t('home.featuredEvents.title')}
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              {t('home.featuredEvents.subtitle')}
            </p>
          </div>
          <Link
            to="/events"
            className="inline-flex items-center gap-1 text-sm font-bold text-[#02529C] hover:text-[#013F7A]"
          >
            <span>{t('home.featuredEvents.viewAll')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {upcomingEvents.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500 text-sm">
            No upcoming events scheduled right now. Check back soon for new BYC activities!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
                    <img
                      src={event.bannerImage}
                      alt="Event banner"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-[#02529C] text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-md">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center text-xs font-semibold text-[#02529C] gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(event.startDate, currentLang)}</span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                      <BilingualText content={event.title} />
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      <BilingualText content={event.description} />
                    </p>
                    <div className="flex items-center text-xs text-slate-500 gap-1 pt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">
                        <BilingualText content={event.location} />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 mt-4">
                  <Link
                    to={`/events/${event.slug}`}
                    className="block text-center py-2 text-xs font-bold text-[#02529C] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    {t('home.featuredEvents.details')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 6. Emergency Help Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-red-900 via-slate-900 to-[#012A52] text-white rounded-3xl p-8 sm:p-12 shadow-md">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950 text-red-300 border border-red-800 text-xs font-bold uppercase">
              <ShieldAlert className="w-4 h-4" />
              <span>BYC Emergency Help System</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t('home.helpCTA.title')}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {t('home.helpCTA.subtitle')}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/help"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-[#D32F2F] hover:bg-red-700 rounded-xl shadow-md transition-all text-center"
              >
                {t('home.helpCTA.needHelpBtn')}
              </Link>
              <Link
                to="/volunteer"
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl transition-all text-center"
              >
                {t('home.helpCTA.wantHelpBtn')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
