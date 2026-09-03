import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { leadershipService } from '../../services/api';
import BilingualText from '../../components/common/BilingualText';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ImageInput from '../../components/common/ImageInput';
import { Plus, Edit2, Trash2, Phone, X, Shield } from 'lucide-react';

export const AdminLeadership = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [form, setForm] = useState({
    nameEn: '',
    nameNe: '',
    positionEn: 'Executive Member',
    positionNe: 'कार्यसमिति सदस्य',
    roleCategory: 'executive',
    photo: '',
    phone: '9767721133',
    email: '',
    shortBioEn: '',
    shortBioNe: '',
  });

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await leadershipService.getAll();
      if (res.data && res.data.success) {
        setMembers(res.data.members || []);
      }
    } catch (err) {
      console.error('Error fetching leadership members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const openAddModal = () => {
    setEditingMember(null);
    setForm({
      nameEn: '',
      nameNe: '',
      positionEn: 'Executive Member',
      positionNe: 'कार्यसमिति सदस्य',
      roleCategory: 'executive',
      photo: '',
      phone: '9767721133',
      email: '',
      shortBioEn: '',
      shortBioNe: '',
    });
    setShowModal(true);
  };

  const openEditModal = (m) => {
    setEditingMember(m);
    setForm({
      nameEn: typeof m.name === 'object' ? m.name?.en || '' : m.name || '',
      nameNe: typeof m.name === 'object' ? m.name?.ne || '' : '',
      positionEn: typeof m.position === 'object' ? m.position?.en || 'Executive Member' : m.position || 'Executive Member',
      positionNe: typeof m.position === 'object' ? m.position?.ne || 'कार्यसमिति सदस्य' : 'कार्यसमिति सदस्य',
      roleCategory: m.roleCategory || 'executive',
      photo: m.photo || '',
      phone: m.phone || '9767721133',
      email: m.email || '',
      shortBioEn: typeof m.shortBio === 'object' ? m.shortBio?.en || '' : m.shortBio || '',
      shortBioNe: typeof m.shortBio === 'object' ? m.shortBio?.ne || '' : '',
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name: { en: form.nameEn, ne: form.nameNe || form.nameEn },
        position: { en: form.positionEn, ne: form.positionNe || form.positionEn },
        roleCategory: form.roleCategory,
        photo: form.photo || '/byc_committee_banner.jpg',
        phone: form.phone || '9767721133',
        email: form.email,
        shortBio: { en: form.shortBioEn, ne: form.shortBioNe },
      };

      if (editingMember) {
        await leadershipService.update(editingMember._id, payload);
      } else {
        await leadershipService.create(payload);
      }

      setShowModal(false);
      fetchMembers();
    } catch (err) {
      alert('Operation failed. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this executive member?')) return;
    try {
      await leadershipService.delete(id);
      fetchMembers();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.leadership')}</h1>
          <p className="text-xs text-slate-500">
            Manage Executive Committee members, officers, and contact phone numbers.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-[#02529C] hover:bg-[#013F7A] text-white font-bold text-xs rounded-xl shadow-xs transition-colors shrink-0"
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
          <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#02529C]" />
              Executive Committee ({members.length} Members)
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Photo</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Position</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Contact Phone</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((m) => (
                  <tr key={m._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <img
                        src={m.photo || '/byc_committee_banner.jpg'}
                        alt="Avatar"
                        className="w-10 h-10 object-cover rounded-full border border-slate-200 shadow-xs"
                      />
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      <BilingualText content={m.name} />
                    </td>
                    <td className="p-4 font-semibold text-[#02529C]">
                      <BilingualText content={m.position} />
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-blue-50 text-[#02529C] border border-blue-200 rounded-full text-[10px] font-bold uppercase">
                        {m.roleCategory || 'executive'}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-medium text-slate-600">
                      {m.phone || '9767721133'}
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(m)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit Member"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(m._id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Member"
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

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {editingMember ? 'Edit Executive Member' : 'Add Executive Member'}
              </h3>
              <button onClick={() => setShowModal(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
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
                    placeholder="e.g. Ajay Yadav"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#02529C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">नाम (नेपाली)</label>
                  <input
                    type="text"
                    value={form.nameNe}
                    onChange={(e) => setForm({ ...form, nameNe: e.target.value })}
                    placeholder="उदा. अजय यादव"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne focus:outline-none focus:border-[#02529C]"
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
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#02529C]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">पद (नेपाली)</label>
                  <input
                    type="text"
                    placeholder="उदा. सदस्य"
                    value={form.positionNe}
                    onChange={(e) => setForm({ ...form, positionNe: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-ne focus:outline-none focus:border-[#02529C]"
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
                  placeholder="9767721133"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#02529C]"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 text-xs font-bold text-white bg-[#02529C] hover:bg-[#013F7A] rounded-xl shadow-md transition-colors"
                >
                  {editingMember ? 'Update Member' : 'Save Member'}
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
