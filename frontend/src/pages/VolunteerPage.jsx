import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { volunteerService } from '../services/api';
import { CheckCircle2, HeartHandshake } from 'lucide-react';

export const VolunteerPage = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: 'Bahudarmai Ward 1',
    wardNumber: 1,
    skills: '',
    interests: '',
    availability: 'anytime',
    preferredActivities: ['social_service'],
    shortBio: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleActivityToggle = (act) => {
    setFormData((prev) => {
      const exists = prev.preferredActivities.includes(act);
      const updated = exists
        ? prev.preferredActivities.filter((a) => a !== act)
        : [...prev.preferredActivities, act];
      return { ...prev, preferredActivities: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    try {
      const res = await volunteerService.apply(formData);
      if (res.data.success) {
        setSubmittedSuccess(true);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Volunteer registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submittedSuccess) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center shadow-lg space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Welcome to BYC Volunteer Network!
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Thank you for offering your time and skills. Our Volunteer Coordinator will contact you when upcoming events or emergency community help tasks match your interests.
          </p>
        </div>
      </div>
    );
  }

  const activityOptions = [
    { label: 'Sports Tournaments', value: 'sports' },
    { label: 'Educational Workshops', value: 'education' },
    { label: 'Social Welfare & Blood Drives', value: 'social_service' },
    { label: 'Environmental Protection', value: 'environment' },
    { label: 'Disaster Relief Response', value: 'disaster_response' },
    { label: 'Event Logistics & Management', value: 'event_management' },
    { label: 'Technology & Digital Support', value: 'technology' },
    { label: 'Other Activities', value: 'other' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
          Volunteer Registration
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Your Time Can Make a Difference
        </h1>
        <p className="text-slate-600 text-sm">
          Join our active network of dedicated young volunteers driving real impact across Bahudarmai.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
        {errorMessage && (
          <div className="p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-2xl border border-red-200">
            {errorMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.fullName')} *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.email')} *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.phone')} *</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+977 9800000000"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.ward')} *</label>
            <select
              name="wardNumber"
              value={formData.wardNumber}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
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
            name="address"
            required
            value={formData.address}
            onChange={handleChange}
            placeholder="e.g. Bahudarmai Ward 3, Main Chowk"
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
          />
        </div>

        {/* Preferred Activity Options Checkbox Grid */}
        <div className="space-y-3">
          <label className="block text-xs font-bold text-slate-700">
            Preferred Volunteer Activity Areas *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {activityOptions.map((opt) => {
              const isSelected = formData.preferredActivities.includes(opt.value);
              return (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => handleActivityToggle(opt.value)}
                  className={`p-3 text-xs font-bold rounded-xl text-left border transition-all ${
                    isSelected
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.availability')}</label>
            <select
              name="availability"
              value={formData.availability}
              onChange={handleChange}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            >
              <option value="anytime">Anytime / On-Call</option>
              <option value="weekends">Weekends Only</option>
              <option value="weekdays">Weekdays</option>
              <option value="emergency_only">Emergency Crisis Only</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.skills')}</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. First Aid, Photography, Crowd Control"
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">Short Introduction / Motivation</label>
          <textarea
            name="shortBio"
            rows="3"
            value={formData.shortBio}
            onChange={handleChange}
            placeholder="Tell us why you want to volunteer with BYC..."
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-4 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-md transition-colors"
        >
          {submitting ? 'Submitting Application...' : 'Register as Volunteer'}
        </button>
      </form>
    </div>
  );
};

export default VolunteerPage;
