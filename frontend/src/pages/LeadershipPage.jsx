import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { leadershipService } from '../services/api';
import BilingualText from '../components/common/BilingualText';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { Phone, Mail, Shield, ZoomIn, X, Users } from 'lucide-react';

export const LeadershipPage = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const [leadership, setLeadership] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPosterModal, setShowPosterModal] = useState(false);

  useEffect(() => {
    leadershipService
      .getAll()
      .then((res) => {
        if (res.data && res.data.success) {
          setLeadership(res.data.members || []);
        }
      })
      .catch((err) => {
        console.error('Leadership fetch error:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-blue-100 text-[#02529C] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          {currentLang === 'ne' ? 'कार्यसमिति' : 'Executive Committee'}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          {currentLang === 'ne' ? 'बहुदरमाई युवा क्लब कार्यसमिति' : 'Bahudarmai Yuwa Club Executive Committee'}
        </h1>
        <p className={`text-slate-600 text-sm ${currentLang === 'ne' ? 'font-ne' : ''}`}>
          {currentLang === 'ne'
            ? 'बहुदरमाई न.पा.-२, पिपरा (पर्सा) • सम्पर्क: ९७६७७२११३३'
            : 'Bahudarmai Municipality-02, Pipra (Parsa) • Contact: 9767721133'}
        </p>
      </div>

      {/* Official Executive Committee Poster Banner Card with Zoom Modal Trigger */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#02529C] p-0.5 bg-white shrink-0">
              <img src="/byc_logo.jpg" alt="BYC Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h2 className={`text-lg font-bold text-slate-900 ${currentLang === 'ne' ? 'font-ne' : ''}`}>
                {currentLang === 'ne'
                  ? 'आधिकारिक कार्यसमिति ब्यानर'
                  : 'Official Executive Committee Poster Banner'}
              </h2>
              <span className={`text-xs text-[#02529C] font-semibold ${currentLang === 'ne' ? 'font-ne' : ''}`}>
                {currentLang === 'ne'
                  ? 'बहुदरमाई न.पा.-२, पिपरा (पर्सा) • स्था. २०८०'
                  : 'Bahudarmai Municipality-02, Pipra (Parsa) • Estd. 2080 BYC'}
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowPosterModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#02529C] hover:bg-[#013F7A] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            <ZoomIn className="w-4 h-4" />
            <span>{currentLang === 'ne' ? 'पूरा ब्यानर हेर्नुहोस्' : 'View Full Poster Banner'}</span>
          </button>
        </div>

        <div
          onClick={() => setShowPosterModal(true)}
          className="aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 shadow-inner relative group cursor-pointer"
        >
          <img
            src="/byc_committee_banner.jpg"
            alt="Bahudarmai Yuwa Club Executive Committee Poster"
            className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="px-4 py-2 bg-white/90 text-slate-900 text-xs font-bold rounded-xl shadow-lg flex items-center gap-2">
              <ZoomIn className="w-4 h-4 text-[#02529C]" />
              {currentLang === 'ne' ? 'ब्यानर जुम गर्न थिच्नुहोस्' : 'Click to Zoom Poster'}
            </span>
          </div>
        </div>
      </div>

      {/* Committee Grid */}
      {loading ? (
        <LoadingSpinner message={currentLang === 'ne' ? 'कार्यसमिति विवरण लोड हुँदैछ...' : 'Loading committee members...'} />
      ) : leadership.length === 0 ? (
        <EmptyState
          title={currentLang === 'ne' ? 'कार्यसमिति सदस्यहरू भेटिएनन्' : 'No committee members listed'}
          description={currentLang === 'ne' ? 'नेतृत्व विवरण चाँडै थपिनेछ।' : 'Leadership information will appear here.'}
        />
      ) : (
        <div className="space-y-10">
          {/* Key Executive Officers Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#02529C]" />
              <span>{currentLang === 'ne' ? 'मुख्य पदाधिकारीहरू' : 'Executive Officers'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadership.slice(0, 6).map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-[#02529C] transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#02529C] bg-slate-100 shrink-0">
                        <img
                          src={member.photo || '/byc_committee_banner.jpg'}
                          alt="Leader"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900">
                          <BilingualText content={member.name} />
                        </h4>
                        <span className="text-xs font-bold text-[#02529C] block">
                          <BilingualText content={member.position} />
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                          {member.roleCategory}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      <BilingualText content={member.shortBio} fallback="" />
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-mono">
                      <Phone className="w-3.5 h-3.5 text-[#02529C]" />
                      {member.phone || '9767721133'}
                    </span>
                    <span className="text-[10px] bg-blue-50 text-[#02529C] font-bold px-2 py-0.5 rounded">
                      BYC
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Executive Members Section */}
          {leadership.length > 6 && (
            <div className="space-y-4 pt-6">
              <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#02529C]" />
                <span>
                  {currentLang === 'ne' ? 'कार्यसमिति सदस्यहरू (३२ जना)' : 'Executive Committee Members (32 Members)'}
                </span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {leadership.slice(6).map((member) => (
                  <div
                    key={member._id}
                    className="bg-white p-3 rounded-xl border border-slate-200 text-center hover:border-[#02529C] transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-900 block truncate">
                      <BilingualText content={member.name} />
                    </span>
                    <span className="text-[10px] text-[#02529C] font-semibold block">
                      <BilingualText content={member.position} />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Poster Zoom Lightbox Modal */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-white">
              <h3 className="text-sm font-bold font-ne">
                {currentLang === 'ne'
                  ? 'बहुदरमाई युवा क्लब - आधिकारिक कार्यसमिति पोष्टर ब्यानर'
                  : 'Bahudarmai Yuwa Club - Official Executive Committee Poster Banner'}
              </h3>
              <button
                onClick={() => setShowPosterModal(false)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-2 overflow-auto flex-1 flex items-center justify-center bg-black">
              <img
                src="/byc_committee_banner.jpg"
                alt="Bahudarmai Yuwa Club Official Poster Banner Full View"
                className="max-w-full max-h-[80vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipPage;
