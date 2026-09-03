import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { newsNoticeService } from '../services/api';
import BilingualText from '../components/common/BilingualText';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { formatDate } from '../utils/dateFormatter';
import { Newspaper, Bell, Calendar, User, Search } from 'lucide-react';

export const NewsNoticePage = () => {
  const { t } = useTranslation();
  const { currentLang } = useLanguage();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchNewsNotices = async () => {
    setLoading(true);
    try {
      const res = await newsNoticeService.getAll({
        type: typeFilter,
        search: searchTerm,
      });
      if (res.data.success) {
        setItems(res.data.items);
      }
    } catch (err) {
      console.error('Error fetching news & notices:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsNotices();
  }, [typeFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchNewsNotices();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('nav.news')}
        </h1>
        <p className="text-slate-600 text-sm">
          Stay updated with official BYC announcements, news coverage, and press releases.
        </p>
      </div>

      {/* Tabs & Search Filter */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setTypeFilter('')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              typeFilter === ''
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Updates
          </button>
          <button
            onClick={() => setTypeFilter('news')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              typeFilter === 'news'
                ? 'bg-emerald-700 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            News Articles
          </button>
          <button
            onClick={() => setTypeFilter('notice')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors ${
              typeFilter === 'notice'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Official Notices
          </button>
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-80">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news or notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-emerald-600"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow-xs shrink-0"
          >
            Search
          </button>
        </form>
      </div>

      {/* Grid */}
      {loading ? (
        <LoadingSpinner message="Loading updates..." />
      ) : items.length === 0 ? (
        <EmptyState title="No updates found" description="No news or notices match your search criteria." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="aspect-video relative overflow-hidden bg-slate-100">
                  <img src={item.featuredImage} alt="News thumbnail" className="w-full h-full object-cover" />
                  <div
                    className={`absolute top-3 left-3 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full shadow-xs ${
                      item.type === 'notice'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-700 text-white'
                    }`}
                  >
                    {item.type}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                      {formatDate(item.publishedAt || item.createdAt, currentLang)}
                    </span>
                    <span className="font-semibold text-slate-600">{item.category}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 line-clamp-2 leading-snug">
                    <BilingualText content={item.title} />
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    <BilingualText content={item.content} />
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-100 mt-4">
                <Link
                  to={`/news/${item.slug}`}
                  className="block text-center py-2.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Read Full Article
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsNoticePage;
