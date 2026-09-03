import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { helpService, volunteerService } from '../../services/api';
import StatusBadge from '../../components/common/StatusBadge';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';

export const AdminHelpRequests = () => {
  const { t } = useTranslation();
  const [requests, setRequests] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Status Modal
  const [selectedReq, setSelectedReq] = useState(null);
  const [status, setStatus] = useState('assigned');
  const [assignedVolunteer, setAssignedVolunteer] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [hRes, vRes] = await Promise.all([
        helpService.getAllAdmin(),
        volunteerService.getAll({ limit: 100 }),
      ]);
      if (hRes.data.success) setRequests(hRes.data.requests);
      if (vRes.data.success) setVolunteers(vRes.data.volunteers);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedReq) return;
    setSubmitting(true);
    try {
      await helpService.updateStatus(selectedReq._id, {
        status,
        assignedVolunteer: assignedVolunteer || undefined,
        adminNotes,
      });
      setSelectedReq(null);
      fetchData();
    } catch (err) {
      alert('Failed to update ticket');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.help')}</h1>
        <p className="text-xs text-slate-500">Track community emergency tickets and assign registered volunteers.</p>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching help tickets..." />
      ) : requests.length === 0 ? (
        <EmptyState title="No help tickets" description="Submitted community help tickets will appear here." />
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="p-4">Ticket No</th>
                  <th className="p-4">Requester</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Urgency</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Assigned Volunteer</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((r) => (
                  <tr key={r._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-emerald-700">{r.ticketNo}</td>
                    <td className="p-4 space-y-0.5">
                      <div className="font-bold text-slate-900">{r.requesterName}</div>
                      <div className="text-[10px] text-slate-400">{r.contactPhone}</div>
                    </td>
                    <td className="p-4 uppercase text-[10px] font-bold text-slate-600">{r.category}</td>
                    <td className="p-4 uppercase text-[10px] font-bold text-red-600">{r.urgency}</td>
                    <td className="p-4">
                      <StatusBadge status={r.status} type="help" />
                    </td>
                    <td className="p-4 font-semibold text-slate-800">
                      {r.assignedVolunteer?.fullName || '— Unassigned'}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => {
                          setSelectedReq(r);
                          setStatus(r.status);
                          setAssignedVolunteer(r.assignedVolunteer?._id || '');
                          setAdminNotes(r.adminNotes || '');
                        }}
                        className="px-3 py-1.5 bg-slate-900 text-white font-bold text-[10px] rounded-lg"
                      >
                        Manage Ticket
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-fade-in">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Manage Ticket {selectedReq.ticketNo}</h3>
              <button onClick={() => setSelectedReq(null)} className="text-slate-400">✕</button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl text-xs space-y-1">
              <div className="font-bold text-slate-900">{selectedReq.requesterName} ({selectedReq.contactPhone})</div>
              <div className="text-slate-600 leading-relaxed font-sans">{selectedReq.description}</div>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ticket Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="pending">Pending</option>
                  <option value="under_review">Under Review</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Assign Active Volunteer</label>
                <select
                  value={assignedVolunteer}
                  onChange={(e) => setAssignedVolunteer(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                >
                  <option value="">— Unassigned —</option>
                  {volunteers.map((v) => (
                    <option key={v._id} value={v._id}>
                      {v.fullName} ({v.phone} - Ward {v.wardNumber})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Committee Notes</label>
                <textarea
                  rows="2"
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Progress updates..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                ></textarea>
              </div>

              <div className="pt-2 flex gap-3">
                <button type="button" onClick={() => setSelectedReq(null)} className="w-1/2 py-2.5 text-xs font-bold text-slate-600 bg-slate-100 rounded-xl">
                  Cancel
                </button>
                <button type="submit" disabled={submitting} className="w-1/2 py-2.5 text-xs font-bold text-white bg-emerald-700 rounded-xl">
                  {submitting ? 'Updating...' : 'Save Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHelpRequests;
