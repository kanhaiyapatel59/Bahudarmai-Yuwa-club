import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';
import {
  Menu,
  X,
  Heart,
  ChevronDown,
  User,
  Shield,
  LogOut,
} from 'lucide-react';

export const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);

  const focusAreas = [
    { name: t('nav.sports'), path: '/activities/sports' },
    { name: t('nav.education'), path: '/activities/education' },
    { name: t('nav.social'), path: '/activities/social-service' },
    { name: t('nav.environment'), path: '/activities/environment' },
    { name: t('nav.youth'), path: '/activities/youth-development' },
    { name: t('nav.culture'), path: '/activities/culture' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs max-w-full overflow-x-clip">
      {/* Top Banner Notice Line */}
      <div className="bg-emerald-950 text-emerald-200 text-xs py-1.5 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1.5 text-center sm:text-left font-medium">
          <div className="flex items-center gap-2 justify-center sm:justify-start flex-wrap">
            <span className="bg-emerald-700 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded-full shrink-0">
              सूचना / Notice
            </span>
            <span className="text-[11px] sm:text-xs">बहुदरमाई युवा क्लब साधारण सदस्यता आवेदन खुला! | Helpline: 9767721133</span>
          </div>
          <div className="flex items-center gap-3 text-emerald-300 text-[10px] sm:text-[11px] justify-center sm:justify-end flex-wrap font-ne">
            <span>📍 बहुदरमाई न.पा.-२, पिपरा (पर्सा)</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-4">
          {/* Top Left Corner Logo & Brand Name */}
          <Link to="/" className="flex items-center space-x-3 shrink-0 group py-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-emerald-600 shadow-md group-hover:scale-105 transition-transform duration-200 shrink-0 bg-white p-0.5">
              <img src="/byc_logo.jpg" alt="BYC Crest Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-sm sm:text-base font-black tracking-tight text-slate-900 leading-tight">
                Bahudarmai Yuwa Club
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-800 font-ne leading-tight mt-0.5">
                बहुदरमाई युवा क्लब
              </span>
              <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:block mt-0.5">
                बहुदरमाई न.पा.-२, पिपरा (पर्सा)
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-4 lg:space-x-5 text-sm font-medium text-slate-700 shrink-0">
            <Link to="/" className="hover:text-emerald-700 transition-colors py-2 whitespace-nowrap">
              {t('nav.home')}
            </Link>

            <Link to="/about" className="hover:text-emerald-700 transition-colors py-2 whitespace-nowrap">
              {t('nav.about')}
            </Link>

            {/* Focus Areas Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActivitiesDropdownOpen(true)}
              onMouseLeave={() => setActivitiesDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 hover:text-emerald-700 transition-colors focus:outline-none whitespace-nowrap">
                <span>{t('nav.activities')}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {activitiesDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                  {focusAreas.map((area, idx) => (
                    <Link
                      key={idx}
                      to={area.path}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      onClick={() => setActivitiesDropdownOpen(false)}
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/events" className="hover:text-emerald-700 transition-colors py-2 whitespace-nowrap">
              {t('nav.events')}
            </Link>

            <Link to="/news" className="hover:text-emerald-700 transition-colors py-2 whitespace-nowrap">
              {t('nav.news')}
            </Link>

            <Link to="/gallery" className="hover:text-emerald-700 transition-colors py-2 whitespace-nowrap">
              {t('nav.gallery')}
            </Link>

            <Link to="/leadership" className="hover:text-emerald-700 transition-colors py-2 whitespace-nowrap">
              {t('nav.leadership')}
            </Link>

            <Link to="/blood-donation" className="hover:text-red-600 transition-colors py-2 flex items-center gap-1 font-semibold text-red-700 whitespace-nowrap">
              <Heart className="w-4 h-4 fill-red-600 text-red-600" />
              {t('nav.blood')}
            </Link>

            <Link to="/help" className="hover:text-emerald-700 transition-colors py-2 font-semibold text-emerald-800 whitespace-nowrap">
              {t('nav.help')}
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden xl:flex items-center space-x-3 shrink-0">
            <LanguageSwitcher />

            <Link
              to="/donate"
              className="px-3 py-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors whitespace-nowrap"
            >
              {t('nav.donate')}
            </Link>

            {user ? (
              <div className="flex items-center space-x-2">
                {['admin', 'super_admin', 'event_manager', 'volunteer_coordinator', 'content_manager'].includes(
                  user.role
                ) ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-all whitespace-nowrap"
                  >
                    <Shield className="w-4 h-4 text-emerald-400" />
                    {t('nav.admin')}
                  </Link>
                ) : (
                  <Link
                    to="/member"
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-all whitespace-nowrap"
                  >
                    <User className="w-4 h-4" />
                    {t('nav.dashboard')}
                  </Link>
                )}

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-2 text-xs font-bold text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/join"
                  className="px-3.5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
                >
                  {t('nav.join')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 xl:hidden shrink-0">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-xl focus:outline-none border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-8 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto animate-fade-in">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <Link
              to="/join"
              className="text-center py-2.5 text-xs font-bold text-white bg-emerald-700 rounded-xl shadow-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.join')}
            </Link>
            <Link
              to="/donate"
              className="text-center py-2.5 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 rounded-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.donate')}
            </Link>
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-emerald-700 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-emerald-700 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/leadership"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-emerald-700 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.leadership')}
            </Link>
            <Link
              to="/events"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-emerald-700 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.events')}
            </Link>
            <Link
              to="/news"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-emerald-700 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.news')}
            </Link>
            <Link
              to="/gallery"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-emerald-700 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.gallery')}
            </Link>
            <Link
              to="/blood-donation"
              className="block py-2 px-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              ❤️ {t('nav.blood')}
            </Link>
            <Link
              to="/help"
              className="block py-2 px-3 text-sm font-bold text-emerald-800 hover:bg-emerald-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              🆘 {t('nav.help')}
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-slate-50 hover:text-emerald-700 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.contact')}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
