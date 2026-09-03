import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import {
  LayoutDashboard,
  Users,
  HeartHandshake,
  Calendar,
  Newspaper,
  Image as ImageIcon,
  Award,
  UserCheck,
  Heart,
  LifeBuoy,
  DollarSign,
  Mail,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
} from 'lucide-react';

export const AdminLayout = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { name: t('admin.overview'), path: '/admin', icon: LayoutDashboard },
    { name: t('admin.members'), path: '/admin/members', icon: Users },
    { name: t('admin.volunteers'), path: '/admin/volunteers', icon: HeartHandshake },
    { name: t('admin.events'), path: '/admin/events', icon: Calendar },
    { name: t('admin.news'), path: '/admin/news', icon: Newspaper },
    { name: t('admin.gallery'), path: '/admin/gallery', icon: ImageIcon },
    { name: t('admin.leadership'), path: '/admin/leadership', icon: UserCheck },
    { name: t('admin.achievements'), path: '/admin/achievements', icon: Award },
    { name: t('admin.donors'), path: '/admin/blood-donors', icon: Heart },
    { name: t('admin.help'), path: '/admin/help-requests', icon: LifeBuoy },
    { name: t('admin.donations'), path: '/admin/donations', icon: DollarSign },
    { name: t('admin.messages'), path: '/admin/messages', icon: Mail },
    { name: t('admin.settings'), path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-slate-950 text-slate-300 border-r border-slate-900 shrink-0">
        <div className="p-6 border-b border-slate-900 flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center font-black text-white text-base shadow-md">
            BYC
          </div>
          <div>
            <span className="text-base font-extrabold text-white tracking-tight block">
              BYC Admin
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold uppercase block">
              Management Portal
            </span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-900 space-y-3">
          <div className="flex items-center justify-between text-xs px-2 text-slate-400">
            <span className="truncate max-w-[120px] font-bold text-white">{user?.name}</span>
            <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
              {user?.role}
            </span>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-2 py-2 text-xs font-bold text-red-400 bg-red-950/40 hover:bg-red-900/60 border border-red-900/50 rounded-xl transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Admin Topbar */}
        <header className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-lg font-bold text-slate-900">
              BYC Executive Management System
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <Link
              to="/"
              className="px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              View Main Website ↗
            </Link>
          </div>
        </header>

        {/* Mobile Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex">
            <div className="w-64 bg-slate-950 text-white p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <span className="font-bold text-sm">BYC Admin Navigation</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-slate-400">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="space-y-1 max-h-[70vh] overflow-y-auto">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className="block px-3 py-2 text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-900 rounded-lg"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        )}

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
