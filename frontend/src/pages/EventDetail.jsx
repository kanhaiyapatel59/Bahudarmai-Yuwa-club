import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { eventService } from '../services/api';
import BilingualText from '../components/common/BilingualText';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatusBadge from '../components/common/StatusBadge';
import { formatDate } from '../utils/dateFormatter';
import { Calendar, MapPin, Phone, Users, CheckCircle2, ArrowLeft } from 'lucide-react';

export const EventDetail = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { currentLang } = useLanguage();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [registrationsCount, setRegistrationsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Form inputs
  const [participantName, setParticipantName] = useState(user?.name || '');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState(user?.email || '');
  const [submitting, setSubmitting] = useState(false);
  const [registeredSuccess, setRegisteredSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await eventService.getBySlug(slug);
        if (res.data.success) {
          setEvent(res.data.event);
          setRegistrationsCount(res.data.registrationsCount || 0);
        }
      } catch (err) {
        console.error('Error loading event detail:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMessage('');
    try {
      const res = await eventService.register({
        eventId: event._id,
        participantName,
        phone,
        email,
      });

      if (res.data.success) {
        setRegisteredSuccess(true);
        setRegistrationsCount((prev) => prev + 1);
      }
    } catch (err) {
      setErrorMessage(err.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading event details..." />;
  if (!event)
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Event Not Found</h2>
        <Link to="/events" className="text-emerald-700 font-bold hover:underline">
          Return to All Events
        </Link>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back Link */}
      <Link to="/events" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Events List</span>
      </Link>

      {/* Banner */}
      <div className="aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden bg-slate-900 shadow-md relative">
        <img src={event.bannerImage} alt="Event Banner" className="w-full h-full object-cover" />
        <div className="absolute top-4 left-4">
          <StatusBadge status={event.status} type="event" />
        </div>
      </div>

      {/* Content & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase text-emerald-700 tracking-wider">
              {event.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900">
              <BilingualText content={event.title} />
            </h1>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Event Description & Schedule
            </h3>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">
              <BilingualText content={event.description} />
            </p>
          </div>
        </div>

        {/* Sidebar Event Info & Action Box */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              Event Details
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 text-slate-700">
                <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block">Date</span>
                  <span className="font-semibold">{formatDate(event.startDate, currentLang)}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block">Location</span>
                  <span className="font-semibold">
                    <BilingualText content={event.location} />
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-slate-700">
                <Users className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <span className="text-slate-400 block">Registered Participants</span>
                  <span className="font-semibold">{registrationsCount} / {event.maxParticipants}</span>
                </div>
              </div>

              {event.contactPhone && (
                <div className="flex items-center gap-3 text-slate-700">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <div>
                    <span className="text-slate-400 block">Contact Info</span>
                    <span className="font-semibold">{event.contactPhone}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Registration Action */}
            {event.isRegistrationRequired && event.status === 'upcoming' && (
              <div className="pt-2">
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-3 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl shadow-xs transition-colors"
                >
                  {t('events.register')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Registration Modal Window */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 relative animate-fade-in">
            {registeredSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Registration Successful!</h3>
                <p className="text-xs text-slate-600">
                  You are registered for <BilingualText content={event.title} />. Please arrive on time at the designated location.
                </p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setRegisteredSuccess(false);
                  }}
                  className="w-full py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-base font-bold text-slate-900">Register for Event</h3>
                  <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                    ✕
                  </button>
                </div>

                {errorMessage && (
                  <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200">
                    {errorMessage}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.fullName')}</label>
                  <input
                    type="text"
                    required
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.phone')}</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+977 9800000000"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('forms.email')}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl"
                  >
                    {submitting ? 'Submitting...' : 'Confirm Registration'}
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

export default EventDetail;
