import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { galleryService } from '../../services/api';
import BilingualText from '../../components/common/BilingualText';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import ImageInput from '../../components/common/ImageInput';
import { Plus, Trash2 } from 'lucide-react';

export const AdminGallery = () => {
  const { t } = useTranslation();
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    titleEn: '',
    titleNe: '',
    category: 'events',
    coverImage: '',
  });

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const res = await galleryService.getAll();
      if (res.data.success) setAlbums(res.data.albums);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await galleryService.create({
        title: { en: form.titleEn, ne: form.titleNe },
        category: form.category,
        coverImage: form.coverImage || '/byc_committee_banner.jpg',
        images: [
          {
            url: form.coverImage || '/byc_committee_banner.jpg',
            caption: { en: form.titleEn, ne: form.titleNe },
          },
        ],
      });
      setShowModal(false);
      fetchAlbums();
    } catch (err) {
      alert('Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this photo album?')) return;
    try {
      await galleryService.delete(id);
      fetchAlbums();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.gallery')}</h1>
          <p className="text-xs text-slate-500">Upload and manage photo albums across categories.</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Create Album</span>
        </button>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching gallery albums..." />
      ) : albums.length === 0 ? (
        <EmptyState title="No photo albums created" description="Click 'Create Album' to upload pictures." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {albums.map((album) => (
            <div key={album._id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs p-4 space-y-3">
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 relative">
                <img src={album.coverImage} alt="Album cover" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-700 text-white text-[10px] font-bold uppercase rounded">
                  {album.category}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 truncate">
                  <BilingualText content={album.title} />
                </h3>
                <button onClick={() => handleDelete(album._id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg shrink-0">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Create Photo Album</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Album Title (English) *</label>
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

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="events">Events</option>
                  <option value="sports">Sports</option>
                  <option value="social_service">Social Service</option>
                  <option value="environment">Environment</option>
                  <option value="culture">Culture</option>
                  <option value="volunteers">Volunteers</option>
                </select>
              </div>

              {/* Image Input Component with Link & File Upload */}
              <ImageInput
                label="Album Cover Photo"
                value={form.coverImage}
                onChange={(imgVal) => setForm({ ...form, coverImage: imgVal })}
                placeholder="https://..."
              />

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button type="submit" className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-700 rounded-xl">
                  Save Album
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGallery;
