import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import BilingualText from '../components/common/BilingualText';
import { siteSettingsService } from '../services/api';
import { Target, Compass, Award, Shield, Users, Heart } from 'lucide-react';

export const About = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    siteSettingsService.getPublic().then((res) => {
      if (res.data.success) setSettings(res.data.settings);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          Who We Are
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          About Bahudarmai Yuwa Club (BYC)
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Empowering youth, driving community service, and fostering unity across Bahudarmai Municipality, Parsa, Nepal.
        </p>
      </div>

      {/* Message from President */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-md">
            <img
              src={settings?.presidentMessage?.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80"}
              alt="BYC President"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-8 space-y-4">
            <span className="text-emerald-700 text-xs font-bold uppercase tracking-wider">
              Leadership Message
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              <BilingualText content={settings?.presidentMessage?.name} fallback="[PRESIDENT NAME]" />
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              <BilingualText content={settings?.presidentMessage?.title} fallback="President, BYC Executive Committee" />
            </p>
            <div className="text-slate-700 text-sm sm:text-base leading-relaxed italic bg-slate-50 p-6 rounded-2xl border border-slate-100">
              "<BilingualText content={settings?.presidentMessage?.message} fallback="Bahudarmai Yuwa Club stands firmly for unity, progress, youth leadership, and unselfish service. We welcome all community members and youth to join our mission." />"
            </div>
          </div>
        </div>
      </div>

      {/* Official History Placeholder Section */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg space-y-4">
        <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
          Our Roots & Journey
        </span>
        <h3 className="text-2xl font-bold">History of Bahudarmai Yuwa Club</h3>
        <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 text-slate-300 text-sm leading-relaxed space-y-3">
          <p className="font-mono text-amber-400 text-xs">
            [BYC OFFICIAL HISTORY WILL BE ADDED HERE ONCE PROVIDED]
          </p>
          <p>
            Bahudarmai Yuwa Club was established by proactive local youth of Parsa district with the objective of organizing sports events, fostering youth skills, facilitating education support, and mobilizing volunteers during community emergencies.
          </p>
        </div>
      </div>

      {/* Vision, Mission & Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Vision</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            [BYC OFFICIAL VISION WILL BE ADDED]
            <br />
            To build an empowered, educated, healthy, and unified youth community in Bahudarmai that actively leads social progress and rural development.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Our Mission</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            [BYC OFFICIAL MISSION WILL BE ADDED]
            <br />
            Mobilize youth energy through sports tournaments, educational scholarships, environmental conservation, emergency blood donor dispatch, and disaster relief.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Core Values</h3>
          <ul className="text-slate-600 text-sm space-y-2">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Youth Empowerment & Leadership
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Transparency & Institutional Integrity
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Community Inclusivity & Respect
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
              Selfless Volunteer Service
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
