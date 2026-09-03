import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { helpService } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';
import { ShieldAlert, Search, CheckCircle2, Ticket, LifeBuoy, Clock, UserCheck } from 'lucide-react';

export const CommunityHelpPage = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const [activeTab, setActiveTab] = useState('need'); // 'need' or 'track'

  // Submit Request Form State
  const [form, setForm] = useState({
    requesterName: '',
    contactPhone: '',
    location: 'Bahudarmai Ward 1',
    wardNumber: 1,
    category: 'blood',
    urgency: 'high',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [ticketResult, setTicketResult] = useState(null);
  const [submitError, setSubmitError] = useState('');

  // Track Ticket State
  const [ticketNoInput, setTicketNoInput] = useState('');
  const [trackedRequest, setTrackedRequest] = useState(null);
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [trackError, setTrackError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHelpSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await helpService.requestHelp({
        ...form,
        wardNumber: Number(form.wardNumber),
      });

      if (res.data.success) {
        setTicketResult(res.data);
      }
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Help request submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackSubmit = async (e) => {
    e.preventDefault();
    if (!ticketNoInput.trim()) return;
    setTrackingLoading(true);
    setTrackError('');
    setTrackedRequest(null);
    try {
      const res = await helpService.trackTicket(ticketNoInput.trim());
      if (res.data.success) {
        setTrackedRequest(res.data.request);
      }
    } catch (err) {
      setTrackError(err.response?.data?.message || 'Ticket reference not found');
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3">
        <span className="bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          {currentLang === 'ne' ? 'सामुदायिक आपतकालीन तथा उद्धार सहयोग' : 'Community Emergency & Assistance'}
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('help.title')}
        </h1>
        <p className={`text-slate-600 text-sm ${currentLang === 'ne' ? 'font-ne' : ''}`}>
          {t('help.subtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 justify-center gap-4">
        <button
          onClick={() => setActiveTab('need')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'need'
              ? 'border-[#02529C] text-[#02529C]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          {t('help.tabNeed')}
        </button>
        <button
          onClick={() => setActiveTab('track')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'track'
              ? 'border-[#02529C] text-[#02529C]'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          {t('help.tabTrack')}
        </button>
      </div>

      {/* Tab 1: Submit Help Request */}
      {activeTab === 'need' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
          {ticketResult ? (
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 bg-blue-100 text-[#02529C] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  {currentLang === 'ne' ? 'सहयोग अनुरोध दर्ता भयो!' : 'Help Request Received!'}
                </h3>
                <p className={`text-xs text-slate-600 ${currentLang === 'ne' ? 'font-ne' : ''}`}>
                  {currentLang === 'ne'
                    ? 'तपाईंको टिकट नम्बर दर्ता भएको छ। स्थिति ट्र्याक गर्न तलको टिकट नम्बर सुरक्षित राख्नुहोस्।'
                    : 'Your emergency ticket has been recorded. Save your ticket reference number below for tracking.'}
                </p>
              </div>

              <div className="p-6 bg-[#012A52] text-white rounded-2xl max-w-sm mx-auto space-y-1 shadow-md border border-blue-900">
                <span className="text-[10px] text-blue-200 uppercase font-bold tracking-widest block">
                  {currentLang === 'ne' ? 'तपाईंको टिकट नम्बर' : 'Your Ticket Number'}
                </span>
                <span className="text-2xl font-mono font-black text-yellow-300">
                  {ticketResult.ticketNo}
                </span>
              </div>

              <button
                onClick={() => {
                  setTicketResult(null);
                  setForm({
                    requesterName: '',
                    contactPhone: '',
                    location: 'Bahudarmai Ward 1',
                    wardNumber: 1,
                    category: 'blood',
                    urgency: 'high',
                    description: '',
                  });
                }}
                className="px-6 py-2.5 bg-[#02529C] hover:bg-[#013F7A] text-white text-xs font-bold rounded-xl"
              >
                {currentLang === 'ne' ? 'अर्को अनुरोध पठाउनुहोस्' : 'Submit Another Request'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleHelpSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 bg-red-50 text-red-800 text-xs rounded-xl font-medium border border-red-200">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === 'ne' ? 'तपाईंको पूरा नाम *' : 'Your Full Name *'}
                  </label>
                  <input
                    type="text"
                    required
                    name="requesterName"
                    value={form.requesterName}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === 'ne' ? 'सम्पर्क फोन नम्बर *' : 'Contact Phone Number *'}
                  </label>
                  <input
                    type="text"
                    required
                    name="contactPhone"
                    value={form.contactPhone}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === 'ne' ? 'सहयोग श्रेणी *' : 'Help Category *'}
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="blood">{currentLang === 'ne' ? 'रक्तदान / आपातकालीन रगत' : 'Blood Donation Emergency'}</option>
                    <option value="medical">{currentLang === 'ne' ? 'चिकित्सा तथा स्वास्थ्य सहयोग' : 'Medical & Hospital Support'}</option>
                    <option value="food">{currentLang === 'ne' ? 'खाद्यान्न तथा राहत' : 'Food & Relief Packages'}</option>
                    <option value="disaster">{currentLang === 'ne' ? 'विपद् उद्धार' : 'Disaster Rescue'}</option>
                    <option value="legal">{currentLang === 'ne' ? 'कानूनी / सामाजिक सल्लाह' : 'Social / Legal Counseling'}</option>
                    <option value="other">{currentLang === 'ne' ? 'अन्य आपतकालीन सहयोग' : 'Other Emergency Support'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {currentLang === 'ne' ? 'सम्बन्धित वडा *' : 'Relevant Ward Number *'}
                  </label>
                  <select
                    name="wardNumber"
                    value={form.wardNumber}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                      <option key={w} value={w}>
                        {currentLang === 'ne' ? `बहुदरमाई वडा नं. ${w}` : `Bahudarmai Ward No. ${w}`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {currentLang === 'ne' ? 'समस्याको विस्तृत विवरण *' : 'Detailed Description of Request *'}
                </label>
                <textarea
                  rows="4"
                  required
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-[#02529C] hover:bg-[#013F7A] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <ShieldAlert className="w-5 h-5 text-yellow-300" />
                <span>{submitting ? (currentLang === 'ne' ? 'दर्ता हुँदैछ...' : 'Submitting Ticket...') : (currentLang === 'ne' ? 'आपतकालीन टिकट पठाउनुहोस्' : 'Submit Emergency Ticket')}</span>
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 2: Track Existing Ticket */}
      {activeTab === 'track' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
          <form onSubmit={handleTrackSubmit} className="flex gap-2">
            <input
              type="text"
              required
              placeholder="Enter Ticket Reference No (e.g. HELP-2026-0001)"
              value={ticketNoInput}
              onChange={(e) => setTicketNoInput(e.target.value)}
              className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold"
            />
            <button
              type="submit"
              disabled={trackingLoading}
              className="px-6 py-3 bg-[#02529C] hover:bg-[#013F7A] text-white text-xs font-bold rounded-xl shadow-xs"
            >
              {trackingLoading ? 'Searching...' : 'Track Ticket'}
            </button>
          </form>

          {trackError && (
            <div className="p-4 bg-red-50 text-red-800 text-xs font-medium rounded-xl border border-red-200">
              {trackError}
            </div>
          )}

          {trackedRequest && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-mono text-xs font-bold text-slate-500">
                  {trackedRequest.ticketNo}
                </span>
                <StatusBadge status={trackedRequest.status} type="help" />
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block">Requester Name</span>
                  <span className="font-bold text-slate-900">{trackedRequest.requesterName}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Category</span>
                  <span className="font-semibold uppercase text-emerald-800">{trackedRequest.category}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Description</span>
                  <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                    {trackedRequest.description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityHelpPage;
