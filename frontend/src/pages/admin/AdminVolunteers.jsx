import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { volunteerService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

export const AdminVolunteers = () => {
  const { t } = useTranslation();
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    volunteerService.getAll().then((res) => {
      if (res.data.success) setVolunteers(res.data.volunteers);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.volunteers')}</h1>
        <p className="text-xs text-slate-500">Directory of registered community volunteers and skills.</p>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching volunteers list..." />
      ) : volunteers.length === 0 ? (
        <EmptyState title="No volunteers registered" description="Volunteer registrations will appear here." />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Full Name</th>
                  <th className="p-4">Ward / Address</th>
                  <th className="p-4">Contact Info</th>
                  <th className="p-4">Preferred Areas</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {volunteers.map((vol) => (
                  <tr key={vol._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{vol.fullName}</td>
                    <td className="p-4">Ward {vol.wardNumber}, {vol.address}</td>
                    <td className="p-4 space-y-0.5">
                      <div className="font-semibold">{vol.phone}</div>
                      <div className="text-[10px] text-slate-400">{vol.email}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {vol.preferredActivities.map((act, i) => (
                          <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-semibold">
                            {act}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-semibold uppercase text-[10px] text-emerald-700">{vol.availability}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {vol.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVolunteers;
