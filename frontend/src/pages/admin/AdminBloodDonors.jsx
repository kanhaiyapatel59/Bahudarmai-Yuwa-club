import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { bloodDonorService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

export const AdminBloodDonors = () => {
  const { t } = useTranslation();
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const res = await bloodDonorService.getAllAdmin();
      if (res.data.success) setDonors(res.data.donors);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const toggleAvailability = async (id, currentVal) => {
    try {
      await bloodDonorService.updateAvailability(id, !currentVal);
      fetchDonors();
    } catch (err) {
      alert('Failed to update availability');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.donors')}</h1>
        <p className="text-xs text-slate-500">Verified blood donor registry with direct phone numbers for emergency dispatch.</p>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching donor records..." />
      ) : donors.length === 0 ? (
        <EmptyState title="No blood donors registered" description="Donor registrations will appear here." />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Group</th>
                  <th className="p-4">Donor Name</th>
                  <th className="p-4">Phone Number (Admin View)</th>
                  <th className="p-4">Ward / Address</th>
                  <th className="p-4">Availability</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donors.map((d) => (
                  <tr key={d._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4">
                      <span className="w-9 h-9 rounded-xl bg-red-100 text-red-700 font-black flex items-center justify-center text-sm border border-red-200">
                        {d.bloodGroup}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-900">{d.fullName}</td>
                    <td className="p-4 font-mono font-bold text-emerald-800">{d.phone || 'N/A'}</td>
                    <td className="p-4">Ward {d.wardNumber}, {d.address}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          d.isAvailable ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {d.isAvailable ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => toggleAvailability(d._id, d.isAvailable)}
                        className="px-3 py-1.5 bg-slate-900 text-white font-bold text-[10px] rounded-lg"
                      >
                        Toggle Status
                      </button>
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

export default AdminBloodDonors;
