import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { helpService } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';
import { ShieldAlert, Search, CheckCircle2, Ticket, LifeBuoy, Clock, UserCheck } from 'lucide-react';

export const CommunityHelpPage = () => {
  const { t } = useTranslation();

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
      const res = await helpService.trackTicket(ticketNoInput.trim().toUpperCase());
      if (res.data.success) {
        setTrackedRequest(res.data.helpRequest);
      }
    } catch (err) {
      setTrackError(err.response?.data?.message || 'Ticket number not found');
    } finally {
      setTrackingLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          Community Emergency & Assistance
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('help.title')}
        </h1>
        <p className="text-slate-600 text-sm">
          {t('help.subtitle')}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 justify-center gap-4">
        <button
          onClick={() => setActiveTab('need')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'need'
              ? 'border-emerald-700 text-emerald-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          {t('help.tabNeed')}
        </button>
        <button
          onClick={() => setActiveTab('track')}
          className={`py-3 px-6 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'track'
              ? 'border-emerald-700 text-emerald-700'
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
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-slate-900">
                  Help Request Received!
                </h3>
                <p className="text-xs text-slate-600">
                  Your emergency ticket has been recorded. Save your ticket reference number below for tracking.
                </p>
              </div>

              <div className="p-6 bg-slate-900 text-white rounded-2xl max-w-sm mx-auto space-y-1 shadow-md">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest block">
                  Your Ticket Number
                </span>
                <span className="text-2xl font-mono font-black text-amber-400">
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
                className="px-6 py-2.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleHelpSubmit} className="space-y-6">
              {submitError && (
                <div className="p-4 bg-red-50 text-red-700 text-xs font-bold rounded-2xl border border-red-200">
                  {submitError}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone *</label>
                  <input
                    type="tel"
                    required
                    name="contactPhone"
                    placeholder="+977 9800000000"
                    value={form.contactPhone}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="blood">Blood Requirement</option>
                    <option value="medical">Medical Assistance</option>
                    <option value="education">Education Support</option>
                    <option value="food">Food & Grain Relief</option>
                    <option value="disaster">Disaster / Cold Wave Assistance</option>
                    <option value="financial">Financial / Welfare Support</option>
                    <option value="other">Other Community Need</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Urgency Level *</label>
                  <select
                    name="urgency"
                    value={form.urgency}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    <option value="low">Low (Standard Request)</option>
                    <option value="medium">Medium (Within 24-48 hours)</option>
                    <option value="high">High (Urgent Attention)</option>
                    <option value="critical">Critical (Immediate Emergency)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ward Number *</label>
                  <select
                    name="wardNumber"
                    value={form.wardNumber}
                    onChange={handleChange}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((w) => (
                      <option key={w} value={w}>
                        Ward No. {w}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Specific Location / Tole *</label>
                  <input
                    type="text"
                    required
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Ward 2 Health Post area"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Description of Help Needed *</label>
                <textarea
                  rows="4"
                  required
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Explain the situation clearly so BYC volunteers can coordinate assistance..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md transition-colors"
              >
                {submitting ? 'Submitting Request...' : t('help.submitBtn')}
              </button>
            </form>
          )}
        </div>
      )}

      {/* Tab 2: Track Ticket */}
      {activeTab === 'track' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <form onSubmit={handleTrackSubmit} className="space-y-4 max-w-md mx-auto text-center">
            <h3 className="text-xl font-bold text-slate-900">Track Help Ticket Status</h3>
            <div className="flex gap-2">
              <input
                type="text"
                required
                placeholder="e.g. HELP-2026-0101"
                value={ticketNoInput}
                onChange={(e) => setTicketNoInput(e.target.value)}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-center uppercase font-bold focus:outline-none focus:border-emerald-600"
              />
              <button
                type="submit"
                disabled={trackingLoading}
                className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs shrink-0"
              >
                {trackingLoading ? 'Searching...' : 'Track'}
              </button>
            </div>
          </form>

          {trackError && (
            <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl text-center border border-red-200 max-w-md mx-auto">
              {trackError}
            </div>
          )}

          {trackedRequest && (
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200 space-y-4 max-w-lg mx-auto">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <span className="font-mono text-xs font-bold text-slate-500">Ticket: {trackedRequest.ticketNo}</span>
                <StatusBadge status={trackedRequest.status} type="help" />
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-400">Requester:</span>
                  <span className="font-bold">{trackedRequest.requesterName}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Category:</span>
                  <span className="font-bold uppercase text-emerald-700">{trackedRequest.category}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Urgency:</span>
                  <span className="font-bold uppercase text-red-600">{trackedRequest.urgency}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">Location:</span>
                  <span className="font-semibold">{trackedRequest.location}</span>
                </div>

                {trackedRequest.assignedVolunteer && (
                  <div className="p-3 bg-emerald-100/60 rounded-xl text-emerald-900 space-y-1">
                    <span className="font-bold block">Assigned BYC Volunteer:</span>
                    <span>{trackedRequest.assignedVolunteer.fullName} ({trackedRequest.assignedVolunteer.phone})</span>
                  </div>
                )}

                {trackedRequest.adminNotes && (
                  <div className="p-3 bg-amber-50 rounded-xl text-amber-900 border border-amber-200">
                    <span className="font-bold block text-[11px]">Committee Progress Note:</span>
                    <span>{trackedRequest.adminNotes}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityHelpPage;
