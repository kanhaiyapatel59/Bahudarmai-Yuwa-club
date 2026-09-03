import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { newsNoticeService } from '../services/api';
import BilingualText from '../components/common/BilingualText';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatDate } from '../utils/dateFormatter';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

export const ArticleDetail = () => {
  const { slug } = useParams();
  const { currentLang } = useLanguage();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const res = await newsNoticeService.getBySlug(slug);
        if (res.data.success) {
          setItem(res.data.item);
        }
      } catch (err) {
        console.error('Error fetching article:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [slug]);

  if (loading) return <LoadingSpinner message="Loading article..." />;
  if (!item)
    return (
      <div className="max-w-xl mx-auto py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-800">Article Not Found</h2>
        <Link to="/news" className="text-emerald-700 font-bold hover:underline">
          Back to News & Notices
        </Link>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link to="/news" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-emerald-700">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to News & Notices</span>
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-xs">
          <span
            className={`px-3 py-1 font-bold uppercase rounded-full text-white ${
              item.type === 'notice' ? 'bg-amber-600' : 'bg-emerald-700'
            }`}
          >
            {item.type}
          </span>
          <span className="text-slate-500 font-semibold">{item.category}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
          <BilingualText content={item.title} />
        </h1>

        <div className="flex items-center gap-6 text-xs text-slate-500 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>{formatDate(item.publishedAt || item.createdAt, currentLang)}</span>
          </div>
          {item.author && (
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-600" />
              <span>By {item.author}</span>
            </div>
          )}
        </div>
      </div>

      <div className="aspect-video rounded-3xl overflow-hidden bg-slate-100 shadow-md">
        <img src={item.featuredImage} alt="Article cover" className="w-full h-full object-cover" />
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-6 text-slate-800 text-sm sm:text-base leading-relaxed whitespace-pre-line">
        <BilingualText content={item.content} />
      </div>
    </div>
  );
};

export default ArticleDetail;
