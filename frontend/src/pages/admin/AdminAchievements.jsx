import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { achievementService } from '../../services/api';
import BilingualText from '../../components/common/BilingualText';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ImageInput from '../../components/common/ImageInput';
import { Plus, Trash2 } from 'lucide-react';

export const AdminAchievements = () => {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    titleEn: '',
    titleNe: '',
    descEn: '',
    descNe: '',
    category: 'award',
    year: 2026,
    image: '',
  });

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const res = await achievementService.getAll();
      if (res.data.success) setAchievements(res.data.achievements);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await achievementService.create({
        title: { en: form.titleEn, ne: form.titleNe },
        description: { en: form.descEn, ne: form.descNe },
        category: form.category,
        year: Number(form.year),
        image: form.image || '/byc_committee_banner.jpg',
      });
      setShowModal(false);
      fetchAchievements();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this achievement?')) return;
    try {
      await achievementService.delete(id);
      fetchAchievements();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.achievements')}</h1>
          <p className="text-xs text-slate-500">Record club milestones, sports trophies, and district awards.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Achievement</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching achievements..." />
      ) : achievements.length === 0 ? (
        <EmptyState title="No achievements listed" description="Click 'Add Achievement' to record club milestones." />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Image</th>
                  <th className="p-4">Year</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {achievements.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <img src={item.image} alt="Trophy" className="w-10 h-8 object-cover rounded border border-slate-200" />
                    </td>
                    <td className="p-4 font-mono font-bold text-emerald-700">{item.year}</td>
                    <td className="p-4 font-bold text-slate-900">
                      <BilingualText content={item.title} />
                    </td>
                    <td className="p-4 uppercase text-[10px] font-bold text-slate-500">{item.category}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleDelete(item._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg">
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Add Achievement Milestone</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Year *</label>
                  <input
                    type="number"
                    required
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="sports">Sports Trophy</option>
                    <option value="award">District Award</option>
                    <option value="community">Community Milestone</option>
                  </select>
                </div>
              </div>

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

              {/* Image Input Component with Link & File Upload */}
              <ImageInput
                label="Milestone Photo"
                value={form.image}
                onChange={(imgVal) => setForm({ ...form, image: imgVal })}
                placeholder="https://..."
              />

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl">
                  Cancel
                </button>
                <button type="submit" className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-700 rounded-xl">
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAchievements;
