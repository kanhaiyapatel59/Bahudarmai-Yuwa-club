import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { memberService } from '../services/api';
import StatusBadge from '../components/common/StatusBadge';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { User, ShieldCheck, Calendar, HeartHandshake, QrCode, Phone, Mail, MapPin } from 'lucide-react';

export const MemberDashboard = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await memberService.getMyStatus();
        if (res.data.success) {
          setMember(res.data.member);
        }
      } catch (err) {
        console.log('No membership application bound yet');
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, []);

  if (loading) return <LoadingSpinner message="Loading your member portal..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-8 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4 text-center md:text-left">
          <div className="w-16 h-16 rounded-2xl bg-emerald-700/80 border-2 border-emerald-400 flex items-center justify-center font-bold text-2xl shadow-inner shrink-0">
            {user?.name?.charAt(0) || 'M'}
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Member Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold">Welcome, {user?.name}</h1>
            <p className="text-xs text-slate-300 mt-1">{user?.email}</p>
          </div>
        </div>

        <div>
          {member ? (
            <StatusBadge status={member.status} type="member" />
          ) : (
            <span className="px-3 py-1.5 bg-amber-500/20 border border-amber-400 text-amber-300 rounded-full text-xs font-bold">
              Membership Application Pending
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Digital Member ID Badge Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-gradient-to-tr from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 relative overflow-hidden space-y-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-xs">
                  BYC
                </div>
                <span className="text-sm font-bold text-white tracking-wider">
                  BAHUDARMAI YUWA CLUB
                </span>
              </div>
              <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Official ID
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 border-2 border-emerald-500/50 shrink-0">
                <img
                  src={member?.profilePhoto || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"}
                  alt="Member"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-extrabold text-white">
                  {member?.fullName || user?.name}
                </h3>
                <p className="text-xs text-emerald-400 font-mono font-bold">
                  ID: {member?.memberCode || 'BYC-2026-PENDING'}
                </p>
                <span className="text-[10px] text-slate-400 block">
                  {member?.address || 'Bahudarmai, Parsa'} (Ward {member?.wardNumber || 1})
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div>
                <span className="text-[10px] block text-slate-500 uppercase font-bold">Issued Date</span>
                <span className="text-slate-200 font-medium">
                  {member?.approvedAt ? new Date(member.approvedAt).toLocaleDateString() : 'Pending Approval'}
                </span>
              </div>
              <div className="w-10 h-10 bg-white p-1 rounded-lg">
                <QrCode className="w-full h-full text-slate-900" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Member Details & Activities */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" />
              <span>Membership Application Status</span>
            </h3>

            {member ? (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-400 block font-medium">Full Name</span>
                    <span className="font-bold text-slate-800 text-sm">{member.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Phone Number</span>
                    <span className="font-bold text-slate-800 text-sm">{member.phone}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Ward Number</span>
                    <span className="font-bold text-slate-800 text-sm">Ward No. {member.wardNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-medium">Occupation</span>
                    <span className="font-bold text-slate-800 text-sm">{member.occupation || 'N/A'}</span>
                  </div>
                </div>

                {member.status === 'rejected' && (
                  <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-200 text-xs font-semibold">
                    Reason: {member.rejectionReason}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-6 space-y-4">
                <p className="text-xs text-slate-500">
                  You haven't submitted your official BYC membership application form yet.
                </p>
                <a
                  href="/join"
                  className="inline-block px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Fill Membership Application Form
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
