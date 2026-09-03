import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { contactService } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import EmptyState from '../../components/common/EmptyState';
import { Mail, CheckCircle } from 'lucide-react';

export const AdminMessages = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await contactService.getAllAdmin();
      if (res.data.success) setMessages(res.data.messages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await contactService.markRead(id);
      fetchMessages();
    } catch (err) {
      alert('Failed to update message');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">{t('admin.messages')}</h1>
        <p className="text-xs text-slate-500">Visitor contact form messages and inquiries.</p>
      </div>

      {loading ? (
        <LoadingSpinner message="Fetching messages..." />
      ) : messages.length === 0 ? (
        <EmptyState title="Inbox empty" description="No contact messages received yet." />
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`p-6 rounded-3xl border transition-all ${
                msg.isRead ? 'bg-white border-slate-200 shadow-xs' : 'bg-emerald-50/50 border-emerald-300 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{msg.subject}</h3>
                  <p className="text-xs text-slate-500 font-medium">
                    From: <span className="font-bold text-slate-800">{msg.name}</span> ({msg.email} {msg.phone ? `| ${msg.phone}` : ''})
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkRead(msg._id)}
                      className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[10px] rounded-lg"
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">{msg.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
