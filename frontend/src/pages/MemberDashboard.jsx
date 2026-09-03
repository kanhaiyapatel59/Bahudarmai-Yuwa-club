import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { memberService } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { User, ShieldCheck, Calendar, HeartHandshake, QrCode, Phone, Mail, MapPin, Printer, Download, CheckCircle2, Clock } from 'lucide-react';

export const MemberDashboard = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const { user } = useAuth();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await memberService.getMyStatus();
        if (res.data.success) {
          setMember(res.data.member);
        }
      } catch (err) {
        console.log('No membership application bound yet');
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, []);

  const handlePrintCard = () => {
    window.print();
  };

  if (loading) return <LoadingSpinner message={currentLang === 'ne' ? 'ड्यासबोर्ड लोड हुँदैछ...' : 'Loading your member portal...'} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#012A52] via-[#02529C] to-[#013F7A] text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-blue-900">
        <div className="flex items-center space-x-4 text-center md:text-left">
          <div className="w-16 h-16 rounded-2xl bg-white text-[#02529C] border-2 border-yellow-300 flex items-center justify-center font-black text-2xl shadow-inner shrink-0">
            {user?.name?.charAt(0) || 'M'}
          </div>
          <div>
            <span className="text-xs font-bold text-yellow-300 uppercase tracking-wider block">
              {currentLang === 'ne' ? 'सदस्य ड्यासबोर्ड' : 'Official Member Portal'}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{currentLang === 'ne' ? `स्वागत छ, ${user?.name}` : `Welcome, ${user?.name}`}</h1>
            <p className="text-xs text-blue-100 mt-1">{user?.email}</p>
          </div>
        </div>

        <div>
          {member ? (
            <StatusBadge status={member.status} type="member" />
          ) : (
            <span className="px-3.5 py-1.5 bg-yellow-400/20 border border-yellow-300 text-yellow-300 rounded-full text-xs font-bold">
              {currentLang === 'ne' ? 'आवेदन फारम बाँकी' : 'Membership Form Pending'}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Official Digital Member ID Badge Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-tr from-[#011830] via-[#012A52] to-[#02529C] text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-blue-400/30 relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl"></div>

            <div className="flex items-center justify-between border-b border-blue-400/20 pb-4">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-yellow-300 p-0.5 bg-white shrink-0">
                  <img src="/byc_logo.jpg" alt="BYC Logo" className="w-full h-full object-contain rounded-full" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white tracking-wider block">
                    BAHUDARMAI YUWA CLUB
                  </span>
                  <span className="text-[9px] font-ne text-yellow-300 block">
                    बहुदरमाई युवा क्लब
                  </span>
                </div>
              </div>
              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                member?.status === 'approved' 
                  ? 'bg-emerald-950 text-emerald-300 border-emerald-700' 
                  : 'bg-yellow-950 text-yellow-300 border-yellow-700'
              }`}>
                {member?.status === 'approved' ? (currentLang === 'ne' ? 'प्रमाणित सदस्य' : 'Official ID') : (currentLang === 'ne' ? 'समीक्षामा' : 'Pending Review')}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 border-2 border-yellow-300/80 shrink-0 shadow-md">
                <img
                  src={member?.profilePhoto || "/byc_committee_banner.jpg"}
                  alt="Member Photo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-extrabold text-white">
                  {member?.fullName || user?.name}
                </h3>
                <p className="text-xs text-yellow-300 font-mono font-bold">
                  ID: {member?.memberCode || 'BYC-2026-PENDING'}
                </p>
                <span className="text-[10px] text-blue-200 block">
                  {member?.address || 'Bahudarmai, Parsa'} ({currentLang === 'ne' ? `वडा नं. ${member?.wardNumber || 1}` : `Ward ${member?.wardNumber || 1}`})
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-blue-400/20 flex items-center justify-between text-xs text-blue-100">
              <div>
                <span className="text-[10px] block text-blue-200 uppercase font-bold">
                  {currentLang === 'ne' ? 'जारी मिति (Issued Date)' : 'Issued Date'}
                </span>
                <span className="text-white font-semibold">
                  {member?.approvedAt ? new Date(member.approvedAt).toLocaleDateString() : (currentLang === 'ne' ? 'स्वीकृति पर्खिदै' : 'Pending Approval')}
                </span>
              </div>
              <div className="w-12 h-12 bg-white p-1 rounded-xl shadow-xs flex items-center justify-center">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
            </div>
          </div>

          {member?.status === 'approved' && (
            <button
              onClick={handlePrintCard}
              className="w-full py-3 bg-[#02529C] hover:bg-[#013F7A] text-white text-xs font-bold rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>{currentLang === 'ne' ? 'सदस्यता कार्ड प्रिन्ट / डाउनलोड गर्नुहोस्' : 'Print / Download Official Member ID Card'}</span>
            </button>
          )}
        </div>

        {/* Right Column: Detailed Status Timeline & Member Rights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#02529C]" />
              <span>{currentLang === 'ne' ? 'सदस्यता आवेदन स्थिति तथा अधिकार' : 'Membership Application Status'}</span>
            </h3>

            {member ? (
              <div className="space-y-6">
                {/* Status Timeline Message Box */}
                {member.status === 'approved' ? (
                  <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-emerald-950">
                    <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>{currentLang === 'ne' ? 'बधाई छ! तपाईंको बहुदरमाई युवा क्लब सदस्यता स्वीकृत भएको छ।' : 'Membership Approved & Verified!'}</span>
                    </div>
                    <p className={`text-xs text-slate-700 leading-relaxed ${currentLang === 'ne' ? 'font-ne' : ''}`}>
                      {currentLang === 'ne'
                        ? `तपाईंको आधिकारिक सदस्य आईडी कोड ${member.memberCode || 'BYC-2026'} जारी गरिएको छ। अब तपाईं क्लबको साधारण सभा, खेलकुद प्रतियोगिता, सामाजिक सेवा र मतदान प्रक्रियामा सहभागी हुन सक्नुहुन्छ।`
                        : `Your official Member ID code is ${member.memberCode || 'BYC-2026'}. You now hold official voting rights, event registration access, and volunteer leadership eligibility across Bahudarmai Municipality.`}
                    </p>
                  </div>
                ) : member.status === 'pending' ? (
                  <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2 text-amber-950">
                    <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                      <Clock className="w-5 h-5 text-amber-600" />
                      <span>{currentLang === 'ne' ? 'आवेदन प्राप्त भयो (कार्यसमिति समीक्षा अन्तर्गत)' : 'Under Review (Pending Approval)'}</span>
                    </div>
                    <p className={`text-xs text-slate-700 leading-relaxed ${currentLang === 'ne' ? 'font-ne' : ''}`}>
                      {currentLang === 'ne'
                        ? 'तपाईंको सदस्यता आवेदन बहुदरमाई युवा क्लब कार्यसमिति समक्ष समीक्षाको लागि पेस भएको छ। कार्यसमितिले छानबिन गरी स्वीकृति दिएपछि तपाईंको आधिकारिक सदस्य परिचयपत्र जारी हुनेछ।'
                        : 'Your membership application is currently under review by the BYC Executive Committee. Once verified by an Administrator, your official digital Member ID Card will activate automatically.'}
                    </p>
                  </div>
                ) : (
                  <div className="p-5 bg-red-50 text-red-900 rounded-2xl border border-red-200 space-y-2 text-xs">
                    <div className="font-bold text-red-800 text-sm">Application Rejected</div>
                    <p className="text-slate-700">{member.rejectionReason || 'Application details did not meet the verification criteria.'}</p>
                  </div>
                )}

                {/* Member Profile Details */}
                <div className="grid grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 block font-medium mb-0.5">{currentLang === 'ne' ? 'पूरा नाम' : 'Full Name'}</span>
                    <span className="font-bold text-slate-800 text-sm">{member.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium mb-0.5">{currentLang === 'ne' ? 'सम्पर्क फोन' : 'Phone Number'}</span>
                    <span className="font-bold text-slate-800 text-sm">{member.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium mb-0.5">{currentLang === 'ne' ? 'वडा नम्बर' : 'Ward Number'}</span>
                    <span className="font-bold text-slate-800 text-sm">{currentLang === 'ne' ? `बहुदरमाई वडा नं. ${member.wardNumber}` : `Ward No. ${member.wardNumber}`}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium mb-0.5">{currentLang === 'ne' ? 'पेशा / व्यवसाय' : 'Occupation'}</span>
                    <span className="font-bold text-slate-800 text-sm">{member.occupation || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <p className="text-xs text-slate-500">
                  {currentLang === 'ne'
                    ? 'तपाईंले सदस्यता आवेदन फारम बुझाउनु भएको छैन।'
                    : "You haven't submitted your official BYC membership application form yet."}
                </p>
                <a
                  href="/join"
                  className="inline-block px-6 py-2.5 bg-[#02529C] hover:bg-[#013F7A] text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  {currentLang === 'ne' ? 'सदस्यता आवेदन फारम भर्नुहोस्' : 'Fill Membership Application Form'}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
