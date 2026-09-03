import React from 'react';

export const StatusBadge = ({ status, type = 'general' }) => {
  let badgeClass = 'bg-slate-100 text-slate-700 border-slate-200';

  if (type === 'member') {
    switch (status) {
      case 'approved':
        badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        break;
      case 'pending':
        badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'rejected':
        badgeClass = 'bg-red-50 text-red-700 border-red-200';
        break;
      case 'changes_requested':
        badgeClass = 'bg-sky-50 text-sky-700 border-sky-200';
        break;
      default:
        break;
    }
  } else if (type === 'event') {
    switch (status) {
      case 'upcoming':
        badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        break;
      case 'ongoing':
        badgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'completed':
        badgeClass = 'bg-slate-100 text-slate-600 border-slate-200';
        break;
      case 'cancelled':
        badgeClass = 'bg-red-50 text-red-700 border-red-200';
        break;
      default:
        break;
    }
  } else if (type === 'help') {
    switch (status) {
      case 'pending':
        badgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'assigned':
      case 'in_progress':
        badgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'resolved':
        badgeClass = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        break;
      case 'rejected':
        badgeClass = 'bg-red-50 text-red-700 border-red-200';
        break;
      default:
        break;
    }
  }

  const label = status ? status.replace('_', ' ').toUpperCase() : '';

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeClass}`}>
      {label}
    </span>
  );
};

export default StatusBadge;
