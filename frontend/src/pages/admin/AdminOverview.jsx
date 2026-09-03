import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { memberService, volunteerService, eventService, helpService, donationService, contactService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { Users, HeartHandshake, Calendar, LifeBuoy, DollarSign, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminOverview = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    membersCount: 0,
    volunteersCount: 0,
    eventsCount: 0,
    helpCount: 0,
    donationsTotal: 0,
    messagesCount: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const [mRes, vRes, eRes, hRes, dRes, cRes] = await Promise.all([
          memberService.getAll({ limit: 1 }),
          volunteerService.getAll({ limit: 1 }),
          eventService.getEvents({ limit: 1 }),
          helpService.getAllAdmin({ limit: 1 }),
          donationService.getStats(),
          contactService.getAllAdmin({ limit: 1 }),
        ]);

        setStats({
          membersCount: mRes.data.total || 0,
          volunteersCount: vRes.data.total || 0,
          eventsCount: eRes.data.total || 0,
          helpCount: hRes.data.total || 0,
          donationsTotal: dRes.data.totalAmount || 0,
          messagesCount: cRes.data.total || 0,
        });
      } catch (err) {
        console.error('Error fetching admin overview:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOverview();
  }, []);

  if (loading) return <LoadingSpinner message="Calculating dashboard statistics..." />;

  const statCards = [
    { title: t('admin.totalMembers'), count: stats.membersCount, icon: Users, color: 'bg-emerald-50 text-emerald-700', path: '/admin/members' },
    { title: t('admin.activeVolunteers'), count: stats.volunteersCount, icon: HeartHandshake, color: 'bg-blue-50 text-blue-700', path: '/admin/volunteers' },
    { title: t('admin.activeEvents'), count: stats.eventsCount, icon: Calendar, color: 'bg-amber-50 text-amber-700', path: '/admin/events' },
    { title: t('admin.pendingHelp'), count: stats.helpCount, icon: LifeBuoy, color: 'bg-red-50 text-red-700', path: '/admin/help-requests' },
    { title: `NPR ${stats.donationsTotal}`, count: 'Donations Recorded', icon: DollarSign, color: 'bg-purple-50 text-purple-700', path: '/admin/donations' },
    { title: 'Contact Messages', count: stats.messagesCount, icon: Mail, color: 'bg-teal-50 text-teal-700', path: '/admin/messages' },
  ];

  return (
    <div className="space-y-8">
      {/* Title */}
      <div className="space-y-1">
        <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.overview')}</h1>
        <p className="text-xs text-slate-500">
          Executive summary of BYC platform registrations, help requests, and member management metrics.
        </p>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.path}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex items-center justify-between group"
            >
              <div className="space-y-1">
                <span className="text-xs font-bold text-slate-500 block">{card.title}</span>
                <span className="text-2xl font-black text-slate-900 block">{card.count}</span>
              </div>
              <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Shortcuts Banner */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-4">
        <h3 className="text-base font-bold text-slate-900">Executive Shortcuts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            to="/admin/members"
            className="p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-800 hover:text-emerald-800 flex items-center justify-between transition-all"
          >
            <span>Approve Membership Applications</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </Link>
          <Link
            to="/admin/events"
            className="p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-800 hover:text-emerald-800 flex items-center justify-between transition-all"
          >
            <span>Create New Community Event</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </Link>
          <Link
            to="/admin/help-requests"
            className="p-4 bg-slate-50 hover:bg-emerald-50 rounded-2xl border border-slate-200 hover:border-emerald-300 text-xs font-bold text-slate-800 hover:text-emerald-800 flex items-center justify-between transition-all"
          >
            <span>Assign Help Tickets to Volunteers</span>
            <ArrowUpRight className="w-4 h-4 text-emerald-600" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
