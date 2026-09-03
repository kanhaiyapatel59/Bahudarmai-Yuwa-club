import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { bloodDonorService } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { Heart, ShieldCheck, Search, CheckCircle2, PhoneCall } from 'lucide-react';

export const BloodDonationPage = () => {
  const { t } = useTranslation();

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
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase">
          <Heart className="w-4 h-4 fill-red-600" />
          <span>Life-Saving Donor Network</span>
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('blood.title')}
        </h1>
        <p className="text-slate-600 text-sm">
          {t('blood.subtitle')}
        </p>
      </div>

      {/* Privacy Notice Banner */}
      <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex items-start gap-4 border border-emerald-800">
        <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0 mt-1" />
        <div className="space-y-1">
          <h3 className="text-base font-bold text-emerald-300">Privacy Safeguard Guaranteed</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            {t('blood.privacyNotice')}
          </p>
        </div>
      </div>

      {/* Filter and Register Action */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Blood Group</label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full sm:w-48 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="">All Blood Groups</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 mb-1">Location / Ward</label>
            <select
              value={wardNumber}
              onChange={(e) => setWardNumber(e.target.value)}
              className="w-full sm:w-48 p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
            >
              <option value="">All Wards</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                <option key={w} value={w}>
                  Ward No. {w}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={() => {
            setShowRegModal(true);
            setRegSuccess(false);
          }}
          className="w-full md:w-auto px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
        >
          {t('blood.registerBtn')}
        </button>
      </div>

      {/* Donor Directory Grid */}
      {loading ? (
        <LoadingSpinner message="Searching registered blood donors..." />
      ) : donors.length === 0 ? (
        <EmptyState
          title="No donors found"
          description="No available blood donors found matching your blood group or ward filter."
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors.map((donor) => (
            <div
              key={donor._id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-black text-xl flex items-center justify-center shadow-2xs">
                  {donor.bloodGroup}
                </div>

                <span
                  className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${
                    donor.isAvailable
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {donor.isAvailable ? t('blood.statusAvailable') : t('blood.statusUnavailable')}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">{donor.fullName}</h3>
                <p className="text-xs text-slate-500 font-medium">
                  {donor.address} (Ward No. {donor.wardNumber})
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <button
                  disabled={!donor.isAvailable}
                  onClick={() => {
                    setSelectedDonor(donor);
                    setReqSuccess(false);
                  }}
                  className={`w-full py-2.5 text-xs font-bold rounded-xl transition-colors ${
                    donor.isAvailable
                      ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  {t('blood.requestContact')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal 1: Register as Donor */}
      {showRegModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            {regSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Registered as Donor!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you for registering. Your contact info is kept confidential and protected from web exposure.
                </p>
                <button
                  onClick={() => setShowRegModal(false)}
                  className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Register as Blood Donor</h3>
                  <button type="button" onClick={() => setShowRegModal(false)} className="text-slate-400">
                    ✕
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.fullName')} *</label>
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
                    <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group *</label>
                    <select
                      value={regForm.bloodGroup}
                      onChange={(e) => setRegForm({ ...regForm, bloodGroup: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                    >
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Ward Number *</label>
                    <select
                      value={regForm.wardNumber}
                      onChange={(e) => setRegForm({ ...regForm, wardNumber: Number(e.target.value) })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                        <option key={w} value={w}>
                          Ward No. {w}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.address')} *</label>
                  <input
                    type="text"
                    required
                    value={regForm.address}
                    onChange={(e) => setRegForm({ ...regForm, address: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.phone')} * (Private)</label>
                  <input
                    type="tel"
                    required
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    placeholder="+977 9800000000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="pt-2 flex items-start gap-2 text-xs text-slate-600">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={regForm.consentToContact}
                    onChange={(e) => setRegForm({ ...regForm, consentToContact: e.target.checked })}
                    className="mt-0.5"
                  />
                  <label htmlFor="consent">I consent to be contacted by BYC in emergency blood needs.</label>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowRegModal(false)}
                    className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={regSubmitting}
                    className="w-1/2 py-2.5 text-xs font-bold text-white bg-red-600 rounded-xl"
                  >
                    {regSubmitting ? 'Registering...' : 'Confirm Registration'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Modal 2: Request Contact Form */}
      {selectedDonor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-fade-in">
            {reqSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Request Sent!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your contact request for donor <span className="font-bold text-slate-900">{selectedDonor.fullName}</span> has been dispatched to BYC emergency team.
                </p>
                <button
                  onClick={() => setSelectedDonor(null)}
                  className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Request Donor Contact</h3>
                  <button type="button" onClick={() => setSelectedDonor(null)} className="text-slate-400">
                    ✕
                  </button>
                </div>

                <div className="p-3 bg-red-50 rounded-2xl text-xs text-red-800 font-medium">
                  Donor: <span className="font-bold">{selectedDonor.fullName}</span> ({selectedDonor.bloodGroup}, Ward {selectedDonor.wardNumber})
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={reqForm.requesterName}
                    onChange={(e) => setReqForm({ ...reqForm, requesterName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    value={reqForm.requesterPhone}
                    onChange={(e) => setReqForm({ ...reqForm, requesterPhone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Hospital / Emergency Details</label>
                  <textarea
                    rows="2"
                    value={reqForm.message}
                    onChange={(e) => setReqForm({ ...reqForm, message: e.target.value })}
                    placeholder="e.g. Surgery at Narayani Hospital, require 2 units today..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  ></textarea>
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedDonor(null)}
                    className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={reqSubmitting}
                    className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-700 rounded-xl"
                  >
                    {reqSubmitting ? 'Sending...' : 'Send Request'}
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
