import React, { useState, useEffect, useRef } from 'react';
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
  Search,
} from 'lucide-react';

export const Navbar = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activitiesDropdownOpen, setActivitiesDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const searchRef = useRef(null);

  const focusAreas = [
    { name: t('nav.sports'), path: '/activities/sports' },
    { name: t('nav.education'), path: '/activities/education' },
    { name: t('nav.social'), path: '/activities/social-service' },
    { name: t('nav.environment'), path: '/activities/environment' },
    { name: t('nav.youth'), path: '/activities/youth-development' },
    { name: t('nav.culture'), path: '/activities/culture' },
  ];

  // Auto-dismiss search form when clicking outside anywhere on screen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm max-w-full overflow-x-clip">
      {/* Top Royal Blue Header Bar with Inline Expanding Search */}
      <div className="bg-[#0055A5] text-white py-2 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3" ref={searchRef}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors focus:outline-none shrink-0"
              title="Toggle Menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>

            {/* Inline Search: Expands right here in the top bar without creating a new line */}
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5 animate-fade-in shrink-0">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search BYC events, notices..."
                    className="w-40 sm:w-64 pl-3 pr-7 py-1 rounded-full bg-white text-slate-900 text-xs font-medium focus:outline-none shadow-inner"
                    autoFocus
                  />
                  <button type="submit" className="absolute right-2 text-slate-500 hover:text-emerald-700">
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-1 text-blue-200 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                  title="Close Search"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors focus:outline-none flex items-center gap-1.5 text-xs font-semibold shrink-0"
                title="Search Events & Activities"
              >
                <Search className="w-5 h-5 text-white" />
                <span className="hidden sm:inline text-blue-100">Search BYC...</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3 text-xs font-semibold text-blue-100 shrink-0">
            <span className="font-ne hidden md:inline">📍 बहुदरमाई न.पा.-२, पिपरा (पर्सा)</span>
            <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-[11px] sm:text-xs text-white">📞 9767721133</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20 sm:h-24 gap-2 xl:gap-3">
          {/* Top Left Corner Logo & Brand Name */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 shrink-0 group py-1">
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#02529C] shadow-sm group-hover:scale-105 transition-transform duration-200 shrink-0 bg-white p-0.5">
              <img src="/byc_logo.jpg" alt="BYC Crest Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs sm:text-base font-black tracking-tight text-[#02529C] leading-tight">
                Bahudarmai Yuwa Club
              </span>
              <span className="text-[11px] sm:text-sm font-extrabold text-[#D32F2F] font-ne leading-tight mt-0.5">
                बहुदरमाई युवा क्लब
              </span>
              <span className="text-[9px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:block mt-0.5">
                बहुदरमाई न.पा.-२, पिपरा (पर्सा)
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden 2xl:flex items-center space-x-3 3xl:space-x-5 text-xs 3xl:text-sm font-bold text-slate-700 shrink-0">
            <Link to="/" className="hover:text-[#02529C] transition-colors py-2 whitespace-nowrap">
              {t('nav.home')}
            </Link>

            <Link to="/about" className="hover:text-[#02529C] transition-colors py-2 whitespace-nowrap">
              {t('nav.about')}
            </Link>

            {/* Focus Areas Dropdown */}
            <div
              className="relative py-2"
              onMouseEnter={() => setActivitiesDropdownOpen(true)}
              onMouseLeave={() => setActivitiesDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 hover:text-[#02529C] transition-colors focus:outline-none whitespace-nowrap">
                <span>{t('nav.activities')}</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {activitiesDropdownOpen && (
                <div className="absolute top-full left-0 w-52 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-fade-in">
                  {focusAreas.map((area, idx) => (
                    <Link
                      key={idx}
                      to={area.path}
                      className="block px-4 py-2 text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-[#02529C] transition-colors"
                      onClick={() => setActivitiesDropdownOpen(false)}
                    >
                      {area.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/events" className="hover:text-[#02529C] transition-colors py-2 whitespace-nowrap">
              {t('nav.events')}
            </Link>

            <Link to="/news" className="hover:text-[#02529C] transition-colors py-2 whitespace-nowrap">
              {t('nav.news')}
            </Link>

            <Link to="/gallery" className="hover:text-[#02529C] transition-colors py-2 whitespace-nowrap">
              {t('nav.gallery')}
            </Link>

            <Link to="/leadership" className="hover:text-[#02529C] transition-colors py-2 whitespace-nowrap">
              {t('nav.leadership')}
            </Link>

            <Link to="/blood-donation" className="hover:text-[#D32F2F] transition-colors py-2 flex items-center gap-1 font-bold text-[#D32F2F] whitespace-nowrap">
              <Heart className="w-3.5 h-3.5 fill-[#D32F2F] text-[#D32F2F]" />
              {t('nav.blood')}
            </Link>

            <Link to="/help" className="hover:text-[#02529C] transition-colors py-2 font-bold text-[#02529C] whitespace-nowrap">
              {t('nav.help')}
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="hidden 2xl:flex items-center space-x-2.5 shrink-0">
            <LanguageSwitcher />

            <Link
              to="/donate"
              className="px-3 py-1.5 text-xs font-bold text-[#D32F2F] bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors whitespace-nowrap shrink-0"
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
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#02529C] hover:bg-[#013F7A] rounded-lg shadow-sm transition-all whitespace-nowrap"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    {t('nav.admin')}
                  </Link>
                ) : (
                  <Link
                    to="/member"
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#02529C] hover:bg-[#013F7A] rounded-lg shadow-sm transition-all whitespace-nowrap"
                  >
                    <User className="w-3.5 h-3.5" />
                    {t('nav.dashboard')}
                  </Link>
                )}

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 shrink-0">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-[#02529C] hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/join"
                  className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#02529C] hover:bg-[#013F7A] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap"
                >
                  {t('nav.join')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile & Tablet Hamburger Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 2xl:hidden shrink-0">
            <Link
              to="/donate"
              className="px-2.5 py-1.5 text-xs font-bold text-[#D32F2F] bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors whitespace-nowrap"
            >
              {t('nav.donate')}
            </Link>
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="p-2 text-slate-700 hover:text-[#02529C] hover:bg-slate-100 rounded-xl focus:outline-none border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="2xl:hidden border-t border-slate-200 bg-white px-4 pt-4 pb-8 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto animate-fade-in">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <Link
              to="/join"
              className="text-center py-2.5 text-xs font-bold text-white bg-[#02529C] rounded-xl shadow-xs"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.join')}
            </Link>
            <Link
              to="/donate"
              className="text-center py-2.5 text-xs font-bold text-[#D32F2F] bg-red-50 border border-red-200 rounded-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.donate')}
            </Link>
          </div>

          <div className="space-y-1">
            <Link
              to="/"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#02529C] rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/about"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#02529C] rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.about')}
            </Link>
            <Link
              to="/leadership"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#02529C] rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.leadership')}
            </Link>
            <Link
              to="/events"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#02529C] rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.events')}
            </Link>
            <Link
              to="/news"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#02529C] rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.news')}
            </Link>
            <Link
              to="/gallery"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#02529C] rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.gallery')}
            </Link>
            <Link
              to="/blood-donation"
              className="block py-2 px-3 text-sm font-bold text-[#D32F2F] hover:bg-red-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              ❤️ {t('nav.blood')}
            </Link>
            <Link
              to="/help"
              className="block py-2 px-3 text-sm font-bold text-[#02529C] hover:bg-blue-50 rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              🆘 {t('nav.help')}
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-3 text-sm font-bold text-slate-800 hover:bg-blue-50 hover:text-[#02529C] rounded-lg"
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
