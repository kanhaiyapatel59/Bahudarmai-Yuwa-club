import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { eventService } from '../../services/api';
import BilingualText from '../../components/common/BilingualText';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import StatusBadge from '../../components/common/StatusBadge';
import ImageInput from '../../components/common/ImageInput';
import { Plus, Trash2, Users } from 'lucide-react';

export const AdminEvents = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Participants Modal
  const [participantsModal, setParticipantsModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [partLoading, setPartLoading] = useState(false);

  // Form State
  const [form, setForm] = useState({
    titleEn: '',
    titleNe: '',
    descEn: '',
    descNe: '',
    category: 'sports',
    bannerImage: '',
    startDate: '',
    endDate: '',
    locationEn: '',
    locationNe: '',
    organizerEn: 'BYC Committee',
    organizerNe: 'बहुदरमाई युवा क्लब समिति',
    status: 'upcoming',
    maxParticipants: 100,
    contactPhone: '9767721133',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await eventService.getEvents({ limit: 100 });
      if (res.data.success) setEvents(res.data.events);
    } catch (err) {
      console.error('Error fetching admin events:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: { en: form.titleEn, ne: form.titleNe },
        description: { en: form.descEn, ne: form.descNe },
        category: form.category,
        bannerImage: form.bannerImage || '/byc_committee_banner.jpg',
        startDate: form.startDate,
        endDate: form.endDate || form.startDate,
        location: { en: form.locationEn, ne: form.locationNe },
        organizer: { en: form.organizerEn, ne: form.organizerNe },
        status: form.status,
        maxParticipants: Number(form.maxParticipants),
        contactPhone: form.contactPhone,
      };

      if (editingId) {
        await eventService.update(editingId, payload);
      } else {
        await eventService.create(payload);
      }

      setShowModal(false);
      setEditingId(null);
      fetchEvents();
    } catch (err) {
      alert(err.response?.data?.message || 'Event operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventService.delete(id);
      fetchEvents();
    } catch (err) {
      alert('Failed to delete event');
    }
  };

  const handleViewParticipants = async (eventId) => {
    setPartLoading(true);
    setParticipantsModal(true);
    try {
      const res = await eventService.getParticipants(eventId);
      if (res.data.success) {
        setParticipants(res.data.registrations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPartLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.events')}</h1>
          <p className="text-xs text-slate-500">Create & edit community events and view registered participants.</p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setForm({
              titleEn: '',
              titleNe: '',
              descEn: '',
              descNe: '',
              category: 'sports',
              bannerImage: '',
              startDate: '',
              endDate: '',
              locationEn: '',
              locationNe: '',
              organizerEn: 'BYC Committee',
              organizerNe: 'बहुदरमाई युवा क्लब समिति',
              status: 'upcoming',
              maxParticipants: 100,
              contactPhone: '9767721133',
            });
            setShowModal(true);
          }}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create Event</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching events..." />
      ) : events.length === 0 ? (
        <EmptyState title="No events created" description="Click 'Create Event' to post your first event." />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Event Banner</th>
                  <th className="p-4">Event Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Start Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Participants</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {events.map((event) => (
                  <tr key={event._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <img src={event.bannerImage} alt="Banner" className="w-12 h-8 object-cover rounded-md border border-slate-200" />
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      <BilingualText content={event.title} />
                    </td>
                    <td className="p-4 font-semibold uppercase text-[10px] text-slate-600">{event.category}</td>
                    <td className="p-4">{new Date(event.startDate).toLocaleDateString()}</td>
                    <td className="p-4">
                      <StatusBadge status={event.status} type="event" />
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => handleViewParticipants(event._id)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded text-xs font-bold hover:bg-emerald-100"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>View Registered</span>
                      </button>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal: Create / Edit Event Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingId ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleCreateOrUpdate} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Title (English) *</label>
                  <input
                    type="text"
                    required
                    value={form.titleEn}
                    onChange={(e) => setForm({ ...form, titleEn: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">शीर्षक (नेपाली)</label>
                  <input
                    type="text"
                    value={form.titleNe}
                    onChange={(e) => setForm({ ...form, titleNe: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne"
                  />
                </div>
              </div>

              {/* Image Input Component with Link & File Upload */}
              <ImageInput
                label="Event Banner Image"
                value={form.bannerImage}
                onChange={(imgVal) => setForm({ ...form, bannerImage: imgVal })}
                placeholder="https://..."
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="sports">Sports</option>
                    <option value="education">Education</option>
                    <option value="social_service">Social Service</option>
                    <option value="environment">Environment</option>
                    <option value="culture">Culture</option>
                    <option value="youth_dev">Youth Development</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Status *</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Date *</label>
                  <input
                    type="date"
                    required
                    value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={form.contactPhone}
                    onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Location (English) *</label>
                  <input
                    type="text"
                    required
                    value={form.locationEn}
                    onChange={(e) => setForm({ ...form, locationEn: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">स्थान (नेपाली)</label>
                  <input
                    type="text"
                    value={form.locationNe}
                    onChange={(e) => setForm({ ...form, locationNe: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Description (English) *</label>
                <textarea
                  rows="3"
                  required
                  value={form.descEn}
                  onChange={(e) => setForm({ ...form, descEn: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">विवरण (नेपाली)</label>
                <textarea
                  rows="3"
                  value={form.descNe}
                  onChange={(e) => setForm({ ...form, descNe: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl"
                >
                  {submitting ? 'Saving...' : 'Save Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Participants View Modal */}
      {participantsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 animate-fade-in max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Registered Participants List</h3>
              <button onClick={() => setParticipantsModal(false)} className="text-slate-400">✕</button>
            </div>

            {partLoading ? (
              <LoadingSpinner message="Loading participant roster..." />
            ) : participants.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No registrations recorded for this event yet.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {participants.map((p) => (
                  <div key={p._id} className="py-2.5 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-bold text-slate-900 block">{p.participantName}</span>
                      <span className="text-slate-500">{p.phone} | {p.email}</span>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded">
                      {p.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvents;
