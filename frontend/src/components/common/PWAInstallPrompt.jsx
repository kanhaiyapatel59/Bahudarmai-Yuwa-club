import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Smartphone, Download, X } from 'lucide-react';

export const PWAInstallPrompt = () => {
  const { currentLang } = useLanguage();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA Installation outcome: ${outcome}`);
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-50 max-w-md bg-[#0055A5] text-white p-4 rounded-2xl shadow-2xl border border-blue-400/40 flex items-center justify-between gap-3 animate-fade-in">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-xl bg-white p-0.5 shrink-0 shadow-md">
          <img src="/byc_logo.jpg" alt="BYC Logo" className="w-full h-full object-contain rounded-xl" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white">
            {currentLang === 'ne' ? 'बहुदरमाई युवा क्लब मोबाइल एप' : 'Install BYC Mobile App'}
          </h4>
          <p className="text-[10px] text-blue-100">
            {currentLang === 'ne' ? 'प्ले स्टोर बिना मोबाइलमा सिधै इन्स्टल गर्नुहोस्' : 'Install directly to home screen without Play Store'}
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2 shrink-0">
        <button
          onClick={handleInstallClick}
          className="px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-900 text-xs font-black rounded-lg shadow-sm flex items-center gap-1 transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
          <span>{currentLang === 'ne' ? 'इन्स्टल' : 'Install'}</span>
        </button>
        <button
          onClick={() => setShowPrompt(false)}
          className="p-1 text-blue-200 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
