import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { bloodDonorService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { Heart, ShieldCheck, Search, CheckCircle2, PhoneCall } from 'lucide-react';

export const BloodDonationPage = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bloodGroup, setBloodGroup] = useState('');
  const [wardNumber, setWardNumber] = useState('');

  // Register Modal
  const [showRegModal, setShowRegModal] = useState(false);
  const [regForm, setRegForm] = useState({
    fullName: '',
    bloodGroup: 'O+',
    wardNumber: 1,
    address: 'Bahudarmai Ward 1',
    phone: '',
    email: '',
    consentToContact: true,
  });
  const [regSubmitting, setRegSubmitting] = useState(false);
  const [regSuccess, setRegSuccess] = useState(false);

  // Request Contact Modal
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [reqForm, setReqForm] = useState({ requesterName: '', requesterPhone: '', message: '' });
  const [reqSubmitting, setReqSubmitting] = useState(false);
  const [reqSuccess, setReqSuccess] = useState(false);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const res = await bloodDonorService.search({ bloodGroup, wardNumber });
      if (res.data.success) {
        setDonors(res.data.donors);
      }
    } catch (err) {
      console.error('Error searching donors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, [bloodGroup, wardNumber]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setRegSubmitting(true);
    try {
      const res = await bloodDonorService.register(regForm);
      if (res.data.success) {
        setRegSuccess(true);
        fetchDonors();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    } finally {
      setRegSubmitting(false);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    setReqSubmitting(true);
    try {
      const res = await bloodDonorService.requestContact({
        donorId: selectedDonor._id,
        ...reqForm,
      });
      if (res.data.success) {
        setReqSuccess(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Contact request failed');
    } finally {
      setReqSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase">
          <Heart className="w-4 h-4 fill-red-600" />
          <span>{currentLang === 'ne' ? 'जीवनरक्षक रक्तदाता सञ्जाल' : 'Life-Saving Donor Network'}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('blood.title')}
        </h1>
        <p className={`text-slate-600 text-sm ${currentLang === 'ne' ? 'font-ne' : ''}`}>
          {t('blood.subtitle')}
        </p>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-[#012A52] text-white rounded-3xl p-6 sm:p-8 shadow-md flex items-start gap-4 border border-blue-900">
        <ShieldCheck className="w-8 h-8 text-yellow-300 shrink-0 mt-1" />
        <div className="space-y-1">
          <h3 className="text-base font-bold text-yellow-300">
            {currentLang === 'ne' ? 'गोपनीयता तथा सुरक्षा ग्यारेन्टी' : 'Privacy Safeguard Guaranteed'}
          </h3>
          <p className={`text-xs text-blue-100 leading-relaxed ${currentLang === 'ne' ? 'font-ne' : ''}`}>
            {t('blood.privacyNotice')}
          </p>
        </div>
      </div>

      {/* Filter and Register Action */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              {currentLang === 'ne' ? 'रक्त समूह' : 'Blood Group'}
            </label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 w-full"
            >
              <option value="">{currentLang === 'ne' ? 'सबै रक्त समूह' : 'All Blood Groups'}</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">
              {currentLang === 'ne' ? 'वडा नम्बर' : 'Ward Number'}
            </label>
            <select
              value={wardNumber}
              onChange={(e) => setWardNumber(e.target.value)}
              className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 w-full"
            >
              <option value="">{currentLang === 'ne' ? 'सबै वडाहरू (१ - ९)' : 'All Wards (1 - 9)'}</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                <option key={w} value={w}>
                  {currentLang === 'ne' ? `वडा नं. ${w}` : `Ward No. ${w}`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setRegSuccess(false);
            setShowRegModal(true);
          }}
          className="w-full md:w-auto px-6 py-3 bg-[#D32F2F] hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 flex items-center justify-center gap-2"
        >
          <Heart className="w-4 h-4 fill-white" />
          <span>{t('blood.registerBtn')}</span>
        </button>
      </div>

      {/* Donors List */}
      {loading ? (
        <LoadingSpinner message={currentLang === 'ne' ? 'रक्तदाताहरू खोजिँदैछ...' : 'Searching blood donors...'} />
      ) : donors.length === 0 ? (
        <EmptyState
          title={currentLang === 'ne' ? 'कुनै रक्तदाता भेटिएनन्' : 'No blood donors matched'}
          description={currentLang === 'ne' ? 'कृपया अर्को वडा वा रक्त समूह छान्नुहोस्।' : 'Try selecting a different blood group or ward filter.'}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div key={donor._id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4 hover:border-[#D32F2F] transition-all">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-[#D32F2F] font-black text-lg flex items-center justify-center shadow-2xs">
                  {donor.bloodGroup}
                </div>
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase rounded-md">
                  {currentLang === 'ne' ? 'उपलब्ध' : 'Available'}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">{donor.fullName}</h3>
                <p className="text-xs text-slate-500">
                  {currentLang === 'ne' ? `बहुदरमाई वडा नं. ${donor.wardNumber}, पर्सा` : `Bahudarmai Ward ${donor.wardNumber}, Parsa`}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 font-mono">
                  {donor.maskedPhone || '976772****'}
                </span>
                <button
                  onClick={() => {
                    setSelectedDonor(donor);
                    setReqSuccess(false);
                  }}
                  className="px-3 py-1.5 bg-[#02529C] hover:bg-[#013F7A] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{currentLang === 'ne' ? 'सम्पर्क अनुरोध' : 'Request Contact'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal 1: Register as Blood Donor */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {currentLang === 'ne' ? 'रक्तदाताको रूपमा दर्ता हुनुहोस्' : 'Register as a Blood Donor'}
              </h3>
              <button onClick={() => setShowRegModal(false)} className="text-slate-400">✕</button>
            </div>

            {regSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">
                  {currentLang === 'ne' ? 'दर्ता सफल भयो!' : 'Registration Successful!'}
                </h4>
                <p className="text-xs text-slate-600">
                  {currentLang === 'ne'
                    ? 'बहुदरमाई युवा क्लब जीवनरक्षक संजालमा जोडिनुभएकोमा धन्यवाद।'
                    : 'Thank you for registering as a life-saving blood donor with BYC.'}
                </p>
                <button
                  onClick={() => setShowRegModal(false)}
                  className="w-full py-2.5 bg-[#02529C] text-white text-xs font-bold rounded-xl"
                >
                  {currentLang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === 'ne' ? 'पूरा नाम *' : 'Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={regForm.fullName}
                    onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {currentLang === 'ne' ? 'रक्त समूह *' : 'Blood Group *'}
                    </label>
                    <select
                      value={regForm.bloodGroup}
                      onChange={(e) => setRegForm({ ...regForm, bloodGroup: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {currentLang === 'ne' ? 'वडा नम्बर *' : 'Ward Number *'}
                    </label>
                    <select
                      value={regForm.wardNumber}
                      onChange={(e) => setRegForm({ ...regForm, wardNumber: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                        <option key={w} value={w}>
                          {currentLang === 'ne' ? `वडा नं. ${w}` : `Ward ${w}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === 'ne' ? 'फोन नम्बर *' : 'Phone Number *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRegModal(false)}
                    className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                  >
                    {currentLang === 'ne' ? 'रद्द गर्नुहोस्' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={regSubmitting}
                    className="w-1/2 py-2.5 text-xs font-bold text-white bg-[#D32F2F] hover:bg-red-700 rounded-xl"
                  >
                    {regSubmitting ? (currentLang === 'ne' ? 'बुझाउँदैछ...' : 'Submitting...') : (currentLang === 'ne' ? 'दर्ता गर्नुहोस्' : 'Register')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal 2: Request Donor Contact via Emergency Dispatch */}
      {selectedDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-4 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {currentLang === 'ne' ? 'रक्तदाता सम्पर्क अनुरोध' : 'Request Donor Contact'}
              </h3>
              <button onClick={() => setSelectedDonor(null)} className="text-slate-400">✕</button>
            </div>

            {reqSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">
                  {currentLang === 'ne' ? 'अनुरोध प्राप्त भयो!' : 'Request Dispatched!'}
                </h4>
                <p className="text-xs text-slate-600">
                  {currentLang === 'ne'
                    ? 'हाम्रो आपतकालीन समूहले तपाईंलाई तुरुन्त ९७६७७२११३३ बाट सम्पर्क गर्नेछ।'
                    : 'BYC Emergency Dispatch team will connect you with the donor shortly.'}
                </p>
                <button
                  onClick={() => setSelectedDonor(null)}
                  className="w-full py-2.5 bg-[#02529C] text-white text-xs font-bold rounded-xl"
                >
                  {currentLang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-3">
                <div className="p-3 bg-red-50 rounded-xl text-xs text-red-900 font-medium border border-red-200">
                  {currentLang === 'ne'
                    ? `रक्तदाता: ${selectedDonor.fullName} (${selectedDonor.bloodGroup})`
                    : `Selected Donor: ${selectedDonor.fullName} (${selectedDonor.bloodGroup})`}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === 'ne' ? 'तपाईंको नाम *' : 'Your Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={reqForm.requesterName}
                    onChange={(e) => setReqForm({ ...reqForm, requesterName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === 'ne' ? 'तपाईंको सम्पर्क फोन *' : 'Your Contact Phone *'}
                  </label>
                  <input
                    type="text"
                    required
                    value={reqForm.requesterPhone}
                    onChange={(e) => setReqForm({ ...reqForm, requesterPhone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === 'ne' ? 'अस्पताल / आपतकालीन विवरण' : 'Hospital / Emergency Details'}
                  </label>
                  <textarea
                    rows="2"
                    value={reqForm.message}
                    onChange={(e) => setReqForm({ ...reqForm, message: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  ></textarea>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedDonor(null)}
                    className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                  >
                    {currentLang === 'ne' ? 'रद्द गर्नुहोस्' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    disabled={reqSubmitting}
                    className="w-1/2 py-2.5 text-xs font-bold text-white bg-[#02529C] hover:bg-[#013F7A] rounded-xl"
                  >
                    {reqSubmitting ? (currentLang === 'ne' ? 'पठाउँदैछ...' : 'Sending...') : (currentLang === 'ne' ? 'अनुरोध पठाउनुहोस्' : 'Dispatch Request')}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BloodDonationPage;
