import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { newsNoticeService } from '../../services/api';
import BilingualText from '../../components/common/BilingualText';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ImageInput from '../../components/common/ImageInput';
import { Plus, Trash2 } from 'lucide-react';

export const AdminNewsNotices = () => {
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    type: 'notice',
    titleEn: '',
    titleNe: '',
    contentEn: '',
    contentNe: '',
    category: 'General',
    featuredImage: '',
    author: 'BYC Committee',
    isPublished: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await newsNoticeService.getAllAdmin();
      if (res.data.success) setItems(res.data.items);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await newsNoticeService.create({
        type: form.type,
        title: { en: form.titleEn, ne: form.titleNe },
        content: { en: form.contentEn, ne: form.contentNe },
        category: form.category,
        featuredImage: form.featuredImage || '/byc_committee_banner.jpg',
        author: form.author,
        isPublished: form.isPublished,
      });

      setShowModal(false);
      fetchItems();
    } catch (err) {
      alert('Operation failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this article/notice?')) return;
    try {
      await newsNoticeService.delete(id);
      fetchItems();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.news')}</h1>
          <p className="text-xs text-slate-500">Publish news articles and official committee notice announcements.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Publish Post</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching posts..." />
      ) : items.length === 0 ? (
        <EmptyState title="No posts published" description="Click 'Publish Post' to create your first article or notice." />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Featured Image</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Author</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <img src={item.featuredImage} alt="Thumbnail" className="w-10 h-8 object-cover rounded border border-slate-200" />
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase text-white ${
                          item.type === 'notice' ? 'bg-amber-600' : 'bg-emerald-700'
                        }`}
                      >
                        {item.type}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      <BilingualText content={item.title} />
                    </td>
                    <td className="p-4">{item.category}</td>
                    <td className="p-4">{item.author}</td>
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
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Publish News / Notice</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Post Type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                  >
                    <option value="notice">Notice</option>
                    <option value="news">News Article</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>
              </div>

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
                label="Featured Post Image"
                value={form.featuredImage}
                onChange={(imgVal) => setForm({ ...form, featuredImage: imgVal })}
                placeholder="https://..."
              />

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Content (English) *</label>
                <textarea
                  rows="3"
                  required
                  value={form.contentEn}
                  onChange={(e) => setForm({ ...form, contentEn: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">सामग्री विवरण (नेपाली)</label>
                <textarea
                  rows="3"
                  value={form.contentNe}
                  onChange={(e) => setForm({ ...form, contentNe: e.target.value })}
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
                  className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-700 rounded-xl"
                >
                  {submitting ? 'Publishing...' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsNotices;
