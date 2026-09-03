import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { donationService } from '../services/api';
import { Heart, CheckCircle2, ShieldCheck, Wallet, Landmark } from 'lucide-react';

export const DonatePage = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    donorName: '',
    donorEmail: '',
    donorPhone: '',
    amount: 1000,
    cause: 'social_welfare',
    paymentMethod: 'bank_transfer',
    transactionReference: '',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await donationService.record({
        ...form,
        amount: Number(form.amount),
      });

      if (res.data.success) {
        setSubmittedSuccess(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Donation record submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          Support Community Causes
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Donate to Bahudarmai Yuwa Club
        </h1>
        <p className="text-slate-600 text-sm">
          Your voluntary financial contributions directly fund youth sports equipment, child scholarships, winter blankets, and emergency relief.
        </p>
      </div>

      {/* Payment Details Card (eSewa / Khalti / Bank Transfer placeholders) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-6 rounded-3xl space-y-4 shadow-md">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
            <Landmark className="w-5 h-5" />
            <span>Official Bank Transfer Account</span>
          </div>
          <div className="space-y-1 text-xs">
            <p className="text-slate-400">Bank Name: <span className="text-white font-bold">[OFFICIAL BANK NAME]</span></p>
            <p className="text-slate-400">Account Name: <span className="text-white font-bold">BAHUDARMAI YUWA CLUB</span></p>
            <p className="text-slate-400">Account No: <span className="text-white font-bold font-mono">0000-1111-2222-3333</span></p>
            <p className="text-slate-400">Branch: <span className="text-white font-bold">Parsa Branch, Nepal</span></p>
          </div>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4 shadow-md border border-slate-800">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
            <Wallet className="w-5 h-5" />
            <span>Digital Wallet (eSewa / Khalti)</span>
          </div>
          <div className="space-y-1 text-xs">
            <p className="text-slate-400">eSewa ID: <span className="text-white font-bold font-mono">9800000000</span></p>
            <p className="text-slate-400">Khalti ID: <span className="text-white font-bold font-mono">9800000000</span></p>
            <p className="text-slate-400">Account Holder: <span className="text-white font-bold">BYC Treasurer</span></p>
          </div>
        </div>
      </div>

      {/* Record Submission Form */}
      <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-6">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
          Submit Donation Record
        </h3>

        {submittedSuccess ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-slate-900">Donation Record Received!</h4>
            <p className="text-xs text-slate-600">
              Thank you for your generous contribution. The BYC finance committee will verify the transaction reference and update your record.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Donor Name *</label>
                <input
                  type="text"
                  required
                  value={form.donorName}
                  onChange={(e) => setForm({ ...form, donorName: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Donor Email</label>
                <input
                  type="email"
                  value={form.donorEmail}
                  onChange={(e) => setForm({ ...form, donorEmail: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Donor Phone *</label>
                <input
                  type="tel"
                  required
                  value={form.donorPhone}
                  onChange={(e) => setForm({ ...form, donorPhone: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Donation Amount (NPR) *</label>
                <input
                  type="number"
                  required
                  min="100"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-emerald-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Cause *</label>
                <select
                  value={form.cause}
                  onChange={(e) => setForm({ ...form, cause: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="social_welfare">Social Welfare & Relief</option>
                  <option value="youth_dev">Youth Leadership</option>
                  <option value="education">Education & Scholarships</option>
                  <option value="sports">Sports Equipment</option>
                  <option value="environment">Tree Plantation</option>
                  <option value="emergency">Emergency Response</option>
                  <option value="general">General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Payment Method Used *</label>
                <select
                  value={form.paymentMethod}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                >
                  <option value="bank_transfer">Direct Bank Transfer</option>
                  <option value="esewa">eSewa</option>
                  <option value="khalti">Khalti</option>
                  <option value="cash">Cash / Hand Delivery</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Transaction Reference / Voucher ID</label>
              <input
                type="text"
                value={form.transactionReference}
                onChange={(e) => setForm({ ...form, transactionReference: e.target.value })}
                placeholder="e.g. Bank Voucher No. or eSewa Ref ID"
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md transition-colors"
            >
              {submitting ? 'Recording Donation...' : 'Record Donation'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default DonatePage;
