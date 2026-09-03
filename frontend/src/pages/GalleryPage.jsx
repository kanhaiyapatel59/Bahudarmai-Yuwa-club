import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { galleryService } from '../services/api';
import BilingualText from '../components/common/BilingualText';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

export const GalleryPage = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activeLightbox, setActiveLightbox] = useState(null); // { albumTitle, images, currentIndex }

  const categories = [
    { label: 'All Photos', value: '' },
    { label: 'Events', value: 'events' },
    { label: 'Sports', value: 'sports' },
    { label: 'Social Service', value: 'social_service' },
    { label: 'Environment', value: 'environment' },
    { label: 'Culture', value: 'culture' },
    { label: 'Volunteers', value: 'volunteers' },
  ];

  useEffect(() => {
    const fetchGallery = async () => {
      setLoading(true);
      try {
        const res = await galleryService.getAll({ category: selectedCategory });
        if (res.data.success) {
          setAlbums(res.data.albums);
        }
      } catch (err) {
        console.error('Error fetching gallery:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, [selectedCategory]);

  const openLightbox = (albumTitle, images, idx = 0) => {
    setActiveLightbox({ albumTitle, images, currentIndex: idx });
  };

  const nextPhoto = () => {
    if (!activeLightbox) return;
    setActiveLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  };

  const prevPhoto = () => {
    if (!activeLightbox) return;
    setActiveLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('nav.gallery')}
        </h1>
        <p className="text-slate-600 text-sm">
          Visual memories of BYC sports championships, volunteer activities, tree plantation, and community events.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-4 py-2 text-xs font-bold rounded-full transition-colors ${
              selectedCategory === cat.value
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <LoadingSpinner message="Loading photo gallery..." />
      ) : albums.length === 0 ? (
        <EmptyState title="No gallery albums found" description="No photos uploaded under this category yet." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {albums.map((album) => (
            <div
              key={album._id}
              onClick={() => openLightbox(album.title, album.images.length > 0 ? album.images : [{ url: album.coverImage, caption: album.title }])}
              className="group bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="aspect-video relative overflow-hidden bg-slate-900">
                <img
                  src={album.coverImage}
                  alt="Album cover"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold uppercase px-2.5 py-1 rounded-full">
                  {album.category}
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <h3 className="text-lg font-bold line-clamp-1">
                    <BilingualText content={album.title} />
                  </h3>
                  <span className="text-xs text-slate-300 flex items-center gap-1 font-medium">
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
                    {album.images?.length || 1} Photos
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveLightbox(null)}
            className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-full bg-slate-800/60 transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevPhoto}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-slate-800/80 hover:bg-emerald-600 transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPhoto}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-3 rounded-full bg-slate-800/80 hover:bg-emerald-600 transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full text-center space-y-4">
            <div className="max-h-[70vh] flex items-center justify-center overflow-hidden rounded-2xl">
              <img
                src={activeLightbox.images[activeLightbox.currentIndex]?.url}
                alt="Lightbox View"
                className="max-h-[70vh] max-w-full object-contain rounded-xl shadow-2xl"
              />
            </div>
            <div className="text-white space-y-1">
              <h4 className="text-lg font-bold">
                <BilingualText content={activeLightbox.albumTitle} />
              </h4>
              {activeLightbox.images[activeLightbox.currentIndex]?.caption && (
                <p className="text-xs text-slate-400">
                  <BilingualText content={activeLightbox.images[activeLightbox.currentIndex].caption} />
                </p>
              )}
              <span className="text-[11px] text-emerald-400 font-semibold block pt-1">
                Photo {activeLightbox.currentIndex + 1} of {activeLightbox.images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
