import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MapPin, Phone, Mail, Globe, Share2, MessageSquare, ShieldCheck } from 'lucide-react';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#012A52] text-slate-200 pt-16 pb-12 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-900/60">
          {/* Column 1: Organization Info with Official Logo */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white bg-white p-0.5 shrink-0 shadow-md">
                <img src="/byc_logo.jpg" alt="BYC Official Logo" className="w-full h-full object-contain rounded-full" />
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-tight block leading-tight">
                  Bahudarmai Yuwa Club
                </span>
                <span className="text-base font-bold text-yellow-300 font-ne block leading-tight">
                  बहुदरमाई युवा क्लब
                </span>
                <span className="text-[10px] font-semibold text-blue-200 tracking-wider uppercase block mt-0.5">
                  बहुदरमाई न.पा.-२, पिपरा (पर्सा) • स्था. २०८०
                </span>
              </div>
            </div>

            <p className="text-blue-100 text-sm leading-relaxed pr-4">
              Bahudarmai Yuwa Club (BYC) Pipra, Parsa is a local community organization dedicated to youth development, sports, social service, blood donor networks, environmental drives, and cultural heritage.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-white">
              <a href="https://facebook.com/bahudarmaiyuwa" target="_blank" rel="noreferrer" title="Facebook" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#D32F2F] flex items-center justify-center transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="https://instagram.com/bahudarmaiyuwa" target="_blank" rel="noreferrer" title="Instagram" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#D32F2F] flex items-center justify-center transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
              <a href="#" title="Social Media" className="w-9 h-9 rounded-lg bg-white/10 hover:bg-[#D32F2F] flex items-center justify-center transition-colors">
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
                <Link to="/about" className="hover:text-yellow-300 transition-colors">
                  About BYC
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-yellow-300 transition-colors">
                  Upcoming Events
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-yellow-300 transition-colors">
                  News & Notices
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-yellow-300 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link to="/leadership" className="hover:text-yellow-300 transition-colors">
                  Executive Committee
                </Link>
              </li>
              <li>
                <Link to="/achievements" className="hover:text-yellow-300 transition-colors">
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
                <Link to="/join" className="hover:text-yellow-300 transition-colors font-bold text-yellow-300">
                  Join BYC Membership
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="hover:text-yellow-300 transition-colors">
                  Become a Volunteer
                </Link>
              </li>
              <li>
                <Link to="/blood-donation" className="hover:text-red-300 transition-colors text-red-300 font-bold">
                  Blood Donor Network
                </Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-yellow-300 transition-colors font-medium">
                  Community Help Ticket
                </Link>
              </li>
              <li>
                <Link to="/donate" className="hover:text-yellow-300 transition-colors text-yellow-200">
                  Support & Donations
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-yellow-300 transition-colors">
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
                <MapPin className="w-5 h-5 text-yellow-300 shrink-0 mt-0.5" />
                <span className="text-blue-100">
                  Bahudarmai Municipality-02, Pipra (Parsa), Nepal
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-yellow-300 shrink-0" />
                <span className="text-blue-100">9767721133</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-yellow-300 shrink-0" />
                <span className="text-blue-100">info@byc.org.np</span>
              </li>
              <li className="pt-2">
                <div className="bg-[#011C38] border border-blue-900/80 rounded-xl p-3 text-xs text-blue-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-yellow-300 shrink-0" />
                  <span>Official Youth Club • Estd. 2080 BYC</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-blue-200">
          <p>© {new Date().getFullYear()} Bahudarmai Yuwa Club (BYC), Pipra (Parsa). All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms & Conditions</span>
            <Link to="/login" className="text-yellow-300 hover:underline font-bold">
              Admin & Member Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
