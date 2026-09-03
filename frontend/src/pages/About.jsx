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
        <span className="bg-blue-100 text-[#02529C] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          {currentLang === 'ne' ? 'हाम्रो परिचय' : 'Who We Are'}
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {currentLang === 'ne' ? 'बहुदरमाई युवा क्लब (BYC) सम्बन्धी' : 'About Bahudarmai Yuwa Club (BYC)'}
        </h1>
        <p className={`text-slate-600 text-base leading-relaxed ${currentLang === 'ne' ? 'font-ne' : ''}`}>
          {currentLang === 'ne'
            ? 'बहुदरमाई नगरपालिका, पर्सामा युवा सशक्तिकरण, समाजसेवा, खेलकुद तथा सामुदायिक विकासमा निरन्तर समर्पित संस्था।'
            : 'Empowering youth, driving community service, and fostering unity across Bahudarmai Municipality, Parsa, Nepal.'}
        </p>
      </div>

      {/* Message from President */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-4 aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-md">
            <img
              src={settings?.presidentMessage?.photo || "/byc_committee_banner.jpg"}
              alt="BYC President"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:col-span-8 space-y-4">
            <span className="text-[#02529C] text-xs font-bold uppercase tracking-wider">
              {currentLang === 'ne' ? 'अध्यक्षको सन्देश' : 'Leadership Message'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              <BilingualText content={settings?.presidentMessage?.name} fallback="धनञ्जय पटेल (Dhananjay Patel)" />
            </h2>
            <p className="text-slate-500 font-medium text-sm">
              <BilingualText content={settings?.presidentMessage?.title} fallback="अध्यक्ष, बहुदरमाई युवा क्लब कार्यसमिति" />
            </p>
            <div className={`text-slate-700 text-sm sm:text-base leading-relaxed italic bg-slate-50 p-6 rounded-2xl border border-slate-100 ${currentLang === 'ne' ? 'font-ne' : ''}`}>
              "<BilingualText content={settings?.presidentMessage?.message} fallback="बहुदरमाई युवा क्लब पिपरा (पर्सा) युवा सशक्तिकरण, समाजसेवा, खेलकुद तथा सांस्कृतिक जगेर्नाका लागि निरन्तर समर्पित छ।" />"
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#02529C] flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {currentLang === 'ne' ? 'हाम्रो उद्देश्य (Our Mission)' : 'Our Mission'}
          </h3>
          <p className={`text-slate-600 text-sm leading-relaxed ${currentLang === 'ne' ? 'font-ne' : ''}`}>
            {currentLang === 'ne'
              ? 'स्थानीय युवाहरूलाई संगठित गरी खेलकुद, शिक्षा, स्वास्थ्य, रक्तदान र वातावरण संरक्षणका माध्यमबाट समाजको सकारात्मक रूपान्तरण गर्ने।'
              : 'To mobilize local youth through sports, education, healthcare, blood donation drives, and ecological stewardship for holistic community development.'}
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-xs space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#D32F2F] flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {currentLang === 'ne' ? 'हाम्रो दीर्घकालीन सोच (Our Vision)' : 'Our Vision'}
          </h3>
          <p className={`text-slate-600 text-sm leading-relaxed ${currentLang === 'ne' ? 'font-ne' : ''}`}>
            {currentLang === 'ne'
              ? 'बहुदरमाई नगरपालिकालाई सशक्त, शिक्षित, समृद्ध र आत्मनिर्भर समाजका रूपमा स्थापित गर्नु।'
              : 'To build an empowered, educated, resilient, and self-sustaining community in Bahudarmai Municipality led by patriotic youth.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
