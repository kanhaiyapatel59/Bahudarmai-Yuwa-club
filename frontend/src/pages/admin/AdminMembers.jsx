import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { memberService } from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { Search, CheckCircle, XCircle, Clock } from 'lucide-react';

export const AdminMembers = () => {
  const { t } = useTranslation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [actionModal, setActionModal] = useState(false);
  const [actionStatus, setActionStatus] = useState('approved');
  const [rejectionReason, setRejectionReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const res = await memberService.getAll({ search, status });
      if (res.data.success) {
        setMembers(res.data.members);
      }
    } catch (err) {
      console.error('Error fetching members:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [status]);

  const handleUpdateStatusSubmit = async (e) => {
    e.preventDefault();
    if (!selectedMember) return;
    setSubmitting(true);
    try {
      const res = await memberService.updateStatus(selectedMember._id, {
        status: actionStatus,
        rejectionReason,
      });

      if (res.data.success) {
        setActionModal(false);
        setSelectedMember(null);
        fetchMembers();
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Status update failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.members')}</h1>
          <p className="text-xs text-slate-500">Manage membership applications and assign official Member ID codes.</p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending Review</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching membership applications..." />
      ) : members.length === 0 ? (
        <EmptyState title="No members found" description="No application records match your filter criteria." />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Member Name</th>
                  <th className="p-4">Member Code</th>
                  <th className="p-4">Ward / Address</th>
                  <th className="p-4">Phone / Email</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {members.map((member) => (
                  <tr key={member._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{member.fullName}</td>
                    <td className="p-4 font-mono font-bold text-emerald-700">
                      {member.memberCode || '—'}
                    </td>
                    <td className="p-4">
                      Ward {member.wardNumber}, {member.address}
                    </td>
                    <td className="p-4 space-y-0.5">
                      <div className="font-semibold">{member.phone}</div>
                      <div className="text-[10px] text-slate-400">{member.email}</div>
                    </td>
                    <td className="p-4">
                      <StatusBadge status={member.status} type="member" />
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedMember(member);
                          setActionStatus(member.status === 'pending' ? 'approved' : member.status);
                          setActionModal(true);
                        }}
                        className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-[11px] rounded-lg transition-colors"
                      >
                        Manage Status
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Modal Window */}
      {actionModal && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Manage Application Status</h3>
              <button onClick={() => setActionModal(false)} className="text-slate-400">✕</button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
              <div className="font-bold text-slate-900">{selectedMember.fullName}</div>
              <div className="text-slate-500">{selectedMember.phone} | {selectedMember.email}</div>
            </div>

            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Set Application Status</label>
                <select
                  value={actionStatus}
                  onChange={(e) => setActionStatus(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="approved">Approve & Issue Member ID Code</option>
                  <option value="pending">Keep Pending Review</option>
                  <option value="rejected">Reject Application</option>
                </select>
              </div>

              {actionStatus === 'rejected' && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Rejection Reason</label>
                  <textarea
                    rows="2"
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Enter reason for rejection..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  ></textarea>
                </div>
              )}

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setActionModal(false)}
                  className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-xl"
                >
                  {submitting ? 'Updating...' : 'Save Status'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMembers;
