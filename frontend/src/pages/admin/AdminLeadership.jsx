import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { leadershipService } from '../../services/api';
import BilingualText from '../../components/common/BilingualText';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ImageInput from '../../components/common/ImageInput';
import { Plus, Trash2 } from 'lucide-react';

export const AdminLeadership = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    nameEn: '',
    nameNe: '',
    positionEn: '',
    positionNe: '',
    roleCategory: 'executive',
    photo: '',
    bioEn: '',
    bioNe: '',
    phone: '9767721133',
    email: '',
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await leadershipService.getAll();
      if (res.data.success) setMembers(res.data.members);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await leadershipService.create({
        name: { en: form.nameEn, ne: form.nameNe },
        position: { en: form.positionEn, ne: form.positionNe },
        roleCategory: form.roleCategory,
        photo: form.photo || '/byc_committee_banner.jpg',
        shortBio: { en: form.bioEn, ne: form.bioNe },
        phone: form.phone,
        email: form.email,
      });
      setShowModal(false);
      fetchMembers();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this leader profile?')) return;
    try {
      await leadershipService.delete(id);
      fetchMembers();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.leadership')}</h1>
          <p className="text-xs text-slate-500">Manage Executive Committee members and coordinators.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Executive Member</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching committee members..." />
      ) : members.length === 0 ? (
        <EmptyState title="No leadership profiles" description="Click 'Add Executive Member' to add committee leaders." />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Photo</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Position</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Contact</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m) => (
                  <tr key={m._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <img src={m.photo || '/byc_committee_banner.jpg'} alt="Avatar" className="w-9 h-9 object-cover rounded-full border border-slate-200" />
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      <BilingualText content={m.name} />
                    </td>
                    <td className="p-4 font-semibold text-emerald-700">
                      <BilingualText content={m.position} />
                    </td>
                    <td className="p-4 uppercase text-[10px] font-bold text-slate-500">{m.roleCategory}</td>
                    <td className="p-4">{m.phone || m.email || '—'}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(m._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Executive Member</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Name (English) *</label>
                  <input
                    type="text"
                    required
                    value={form.nameEn}
                    onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">नाम (नेपाली)</label>
                  <input
                    type="text"
                    value={form.nameNe}
                    onChange={(e) => setForm({ ...form, nameNe: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Position (English) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Executive Member"
                    value={form.positionEn}
                    onChange={(e) => setForm({ ...form, positionEn: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">पद (नेपाली)</label>
                  <input
                    type="text"
                    placeholder="उदा. सदस्य"
                    value={form.positionNe}
                    onChange={(e) => setForm({ ...form, positionNe: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne"
                  />
                </div>
              </div>

              {/* Image Input Component with Link & File Upload */}
              <ImageInput
                label="Member Profile Photo"
                value={form.photo}
                onChange={(imgVal) => setForm({ ...form, photo: imgVal })}
                placeholder="https://..."
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-700 rounded-xl">
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeadership;
