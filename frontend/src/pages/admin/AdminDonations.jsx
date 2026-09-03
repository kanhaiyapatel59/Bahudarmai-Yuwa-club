import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { donationService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

export const AdminDonations = () => {
  const { t } = useTranslation();
  const [donations, setDonations] = useState([]);
  const [stats, setStats] = useState({ totalAmount: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dRes, sRes] = await Promise.all([
        donationService.getAllAdmin(),
        donationService.getStats(),
      ]);
      if (dRes.data.success) setDonations(dRes.data.donations);
      if (sRes.data.success) setStats(sRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await donationService.updateStatus(id, { status });
      fetchData();
    } catch (err) {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.donations')}</h1>
          <p className="text-xs text-slate-500">Financial donation records and verification overview.</p>
        </div>

        <div className="bg-emerald-900 text-white px-4 py-2 rounded-2xl text-right">
          <span className="text-[10px] text-emerald-300 uppercase font-bold block">Verified Total</span>
          <span className="text-xl font-black font-mono">NPR {stats.totalAmount}</span>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching donation records..." />
      ) : donations.length === 0 ? (
        <EmptyState title="No donation records" description="Submitted donation transactions will appear here." />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Donor Name</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Cause</th>
                  <th className="p-4">Payment Method</th>
                  <th className="p-4">Ref ID</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {donations.map((d) => (
                  <tr key={d._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{d.donorName}</td>
                    <td className="p-4 font-mono font-bold text-emerald-700">NPR {d.amount}</td>
                    <td className="p-4 uppercase text-[10px] font-bold text-slate-500">{d.cause}</td>
                    <td className="p-4 font-semibold text-slate-800 uppercase text-[10px]">{d.paymentMethod}</td>
                    <td className="p-4 font-mono text-slate-500">{d.transactionReference || '—'}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        d.status === 'completed' || d.status === 'verified'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}>
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      {d.status !== 'completed' && (
                        <button
                          onClick={() => updateStatus(d._id, 'completed')}
                          className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] rounded-lg"
                        >
                          Verify & Complete
                        </button>
                      )}
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

export default AdminDonations;
