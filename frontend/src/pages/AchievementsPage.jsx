import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { achievementService } from '../services/api';
import BilingualText from '../components/common/BilingualText';
import LoadingSpinner from '../components/common/LoadingSpinner';
import EmptyState from '../components/common/EmptyState';
import { Trophy, Award, Calendar, Milestone } from 'lucide-react';

export const AchievementsPage = () => {
  const { t } = useTranslation();
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    achievementService.getAll().then((res) => {
      if (res.data.success) {
        setAchievements(res.data.achievements);
      }
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          {t('nav.achievements')}
        </h1>
        <p className="text-slate-600 text-sm">
          Celebrating regional sports trophies, community awards, and club milestones achieved since establishment.
        </p>
      </div>

      {loading ? (
        <LoadingSpinner message="Loading achievements & impact timeline..." />
      ) : achievements.length === 0 ? (
        <EmptyState title="No achievements listed" description="Milestones and awards will appear here." />
      ) : (
        <div className="space-y-16">
          {/* Milestone Timeline View */}
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4 flex items-center gap-2">
              <Milestone className="w-6 h-6 text-emerald-600" />
              <span>BYC Impact Timeline (2022 – 2026)</span>
            </h2>

            <div className="relative border-l-2 border-emerald-500/30 ml-4 pl-6 space-y-8">
              {achievements.map((item, idx) => (
                <div key={idx} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-600 border-4 border-white shadow-xs group-hover:scale-125 transition-transform"></div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 shadow-2xs hover:border-emerald-500/40 transition-colors space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                        Year {item.year}
                      </span>
                      <span className="text-slate-400 font-semibold uppercase text-[10px]">{item.category}</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">
                      <BilingualText content={item.title} />
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      <BilingualText content={item.description} />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementsPage;
