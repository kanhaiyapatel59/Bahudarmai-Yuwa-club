import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Smartphone, Download, CheckCircle2, X, Share2, MoreVertical } from 'lucide-react';

export const PWAInstallModal = ({ isOpen, onClose }) => {
  const { currentLang } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else {
      alert(
        currentLang === 'ne'
          ? 'तपाईंको ब्राउजर मेनु (⋮) मा गएर "Add to Home Screen" वा "Install App" थिच्नुहोस्।'
          : 'Tap Chrome Menu (⋮) or Safari Share button (⎋) and select "Add to Home Screen" / "Install App".'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white p-0.5 border border-blue-200 shrink-0 shadow-sm">
              <img src="/byc_logo.jpg" alt="BYC Logo" className="w-full h-full object-contain rounded-xl" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {currentLang === 'ne' ? 'बहुदरमाई युवा क्लब मोबाइल एप' : 'Install BYC Mobile App'}
              </h3>
              <span className="text-[10px] font-bold text-[#02529C] uppercase">
                {currentLang === 'ne' ? 'प्ले स्टोर बिना सिधै मोबाइलमा' : 'Direct Mobile Installation'}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {isInstalled ? (
          <div className="text-center py-6 space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
            <h4 className="text-lg font-bold text-slate-900">
              {currentLang === 'ne' ? 'एप मोबाइलमा इन्स्टल भइसकेको छ!' : 'App Installed Successfully!'}
            </h4>
            <p className="text-xs text-slate-600">
              {currentLang === 'ne'
                ? 'तपाईंको फोनको होम स्क्रिनमा बहुदरमाई युवा क्लबको लोगो सहित एप थपिएको छ।'
                : 'The BYC app icon is now active on your mobile phone home screen.'}
            </p>
            <button onClick={onClose} className="w-full py-3 bg-[#02529C] text-white font-bold text-xs rounded-xl">
              {currentLang === 'ne' ? 'बन्द गर्नुहोस्' : 'Close'}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2 text-xs text-slate-700">
              <div className="font-bold text-[#02529C] flex items-center gap-1.5">
                <Smartphone className="w-4 h-4 text-[#02529C]" />
                <span>{currentLang === 'ne' ? 'जिप (ZIP) फाइल अनजिप गर्नु पर्दैन!' : 'No ZIP File Extraction Needed!'}</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-600">
                {currentLang === 'ne'
                  ? 'कुनै फाइल अनजिप गर्नु पर्दैन। तलको बटन थिचेर वा ब्राउजर मेनुबाट १-क्लिकमा सिधै मोबाइलमा इन्स्टल गर्नुहोस्।'
                  : 'Do not extract ZIP files. Tap "Install App" below or use your mobile browser menu to install directly in 1-click!'}
              </p>
            </div>

            {/* Easy 2-Step Instructions */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start space-x-3 text-xs">
                <span className="w-6 h-6 rounded-full bg-[#02529C] text-white font-bold flex items-center justify-center shrink-0 text-xs">1</span>
                <div>
                  <span className="font-bold text-slate-900 block">
                    {currentLang === 'ne' ? 'तुरुन्त इन्स्टल बटन थिच्नुहोस्' : 'Tap 1-Click Install Button'}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {currentLang === 'ne' ? 'क्रोम (Chrome) ब्राउजरमा सिधै इन्स्टल पपअप खुल्नेछ।' : 'Opens Chrome native mobile installation prompt.'}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-xs">
                <span className="w-6 h-6 rounded-full bg-[#02529C] text-white font-bold flex items-center justify-center shrink-0 text-xs">2</span>
                <div>
                  <span className="font-bold text-slate-900 block">
                    {currentLang === 'ne' ? 'वा ब्राउजर मेनु थिच्नुहोस्' : 'Or Use Browser Menu'}
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    {currentLang === 'ne'
                      ? 'क्रोम मेनु (⋮) वा सफारी Share (⎋) थिचेर "Add to Home Screen" छान्नुहोस्।'
                      : 'Chrome Menu (⋮) or Safari Share (⎋) ➔ "Add to Home Screen".'}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={handleInstallClick}
                className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4 text-slate-900" />
                <span>{currentLang === 'ne' ? '१-क्लिक मोबाइल एप इन्स्टल गर्नुहोस्' : '1-Click Install Mobile App'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PWAInstallModal;
