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
    leadershipService.getAll().then((res) => {
      if (res.data.success) {
        setLeadership(res.data.members);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          कार्यसमिति (Executive Committee)
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          बहुदरमाई युवा क्लब कार्यसमिति (BYC Committee)
        </h1>
        <p className="text-slate-600 text-sm font-ne">
          बहुदरमाई न.पा.-२, पिपरा (पर्सा) • सम्पर्क: 9767721133
        </p>
      </div>

      {/* Official Executive Committee Poster Banner Card with Zoom Modal Trigger */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-600 p-0.5 bg-white shrink-0">
              <img src="/byc_logo.jpg" alt="BYC Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-ne">
                आधिकारिक कार्यसमिति ब्यानर (Official BYC Committee Poster)
              </h2>
              <span className="text-xs text-emerald-700 font-semibold">
                बहुदरमाई न.पा.-२, पिपरा (पर्सा) • स्था. २०८०
              </span>
            </div>
          </div>

          <button
            onClick={() => setShowPosterModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
          >
            <ZoomIn className="w-4 h-4" />
            <span>View Full Poster Banner</span>
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
              <ZoomIn className="w-4 h-4 text-emerald-700" />
              Click to Zoom Poster
            </span>
          </div>
        </div>
      </div>

      {/* Committee Grid */}
      {loading ? (
        <LoadingSpinner message="Loading committee members..." />
      ) : leadership.length === 0 ? (
        <EmptyState title="No committee members listed" description="Leadership information will appear here." />
      ) : (
        <div className="space-y-10">
          {/* Key Executive Officers Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-700" />
              <span>मुख्य पदाधिकारीहरू (Executive Officers)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {leadership.slice(0, 6).map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-3xl border-2 border-emerald-500/20 p-6 text-center shadow-xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-slate-100 border-4 border-emerald-600 shadow-md">
                    <img
                      src={member.photo || '/byc_committee_banner.jpg'}
                      alt="Leader Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-slate-900">
                      <BilingualText content={member.name} />
                    </h4>
                    <span className="inline-block px-3 py-1 bg-emerald-700 text-white text-xs font-bold rounded-full shadow-xs">
                      <BilingualText content={member.position} />
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed font-ne">
                    <BilingualText content={member.shortBio} />
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-600 font-bold">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{member.phone || '9767721133'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Committee Members Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-700" />
              <span>कार्यसमिति सदस्यहरू (Executive Committee Members)</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {leadership.slice(6).map((member) => (
                <div
                  key={member._id}
                  className="bg-white rounded-2xl border border-slate-200 p-4 text-center shadow-2xs hover:border-emerald-500 transition-colors space-y-2"
                >
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto bg-slate-100 border-2 border-slate-200">
                    <img
                      src={member.photo || '/byc_committee_banner.jpg'}
                      alt="Member"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div>
                    <h5 className="text-xs font-bold text-slate-900 truncate">
                      <BilingualText content={member.name} />
                    </h5>
                    <span className="text-[10px] text-emerald-700 font-semibold block font-ne">
                      <BilingualText content={member.position} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Poster Zoom Modal */}
      {showPosterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setShowPosterModal(false)}
            className="absolute top-6 right-6 text-white p-3 rounded-full bg-slate-800/80 hover:bg-emerald-600 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-5xl w-full text-center space-y-4">
            <div className="max-h-[85vh] flex items-center justify-center overflow-hidden rounded-2xl bg-white p-2">
              <img
                src="/byc_committee_banner.jpg"
                alt="Full Executive Committee Banner"
                className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
            <p className="text-white text-xs font-ne">
              बहुदरमाई युवा क्लब, बहुदरमाई न.पा.-२, पिपरा (पर्सा) • सम्पर्क: 9767721133
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadershipPage;
