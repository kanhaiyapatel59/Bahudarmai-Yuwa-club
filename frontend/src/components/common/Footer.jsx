import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Heart, MapPin, Phone, Mail, Globe, Share2, MessageSquare, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Organization Info with Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-emerald-500 bg-white p-0.5 shrink-0 shadow-md">
                <img src="/byc_logo.jpg" alt="BYC Official Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block leading-tight">
                  Bahudarmai Yuwa Club
                </span>
                <span className="text-base font-bold text-emerald-400 font-ne block leading-tight">
                  बहुदरमाई युवा क्लब
                </span>
                <span className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase block mt-0.5">
                  बहुदरमाई न.पा.-२, पिपरा (पर्सा) • स्था. २०८०
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed pr-4">
              Bahudarmai Yuwa Club (BYC) Pipra, Parsa is a local community organization dedicated to youth development, sports, social service, blood donor networks, environmental drives, and cultural heritage.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-slate-400">
              <a href="https://facebook.com/bahudarmaiyuwa" target="_blank" rel="noreferrer" title="Facebook" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/bahudarmaiyuwa" target="_blank" rel="noreferrer" title="Instagram" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" title="Social Media" className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-emerald-400 transition-colors">
                  About BYC
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-emerald-400 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-emerald-400 transition-colors">
                  News & Notices
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-emerald-400 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/leadership" className="hover:text-emerald-400 transition-colors">
                  Executive Committee
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-emerald-400 transition-colors">
                  Impact & Achievements
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/join" className="hover:text-emerald-400 transition-colors font-medium text-emerald-400">
                  Join BYC Membership
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-emerald-400 transition-colors">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link to="/blood-donation" className="hover:text-red-400 transition-colors text-red-400 font-medium">
                  Blood Donor Network
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-emerald-400 transition-colors font-medium">
                  Community Help Ticket
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-amber-400 transition-colors text-amber-300">
                  Support & Donations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact Office
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Club Office
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Bahudarmai Municipality-02, Pipra (Parsa), Nepal
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-slate-400">9767721133</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-slate-400">info@byc.org.np</span>
              </li>
              <li className="pt-2">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Official Youth Club • Estd. 2080 BYC</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Bahudarmai Yuwa Club (BYC), Pipra (Parsa). All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms & Conditions</span>
            <Link to="/login" className="text-slate-400 hover:text-emerald-400 font-medium">
              Admin & Member Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
