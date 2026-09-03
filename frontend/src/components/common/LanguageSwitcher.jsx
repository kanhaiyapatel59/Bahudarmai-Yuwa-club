import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = ({ variant = 'default', className = '' }) => {
  const { currentLang, changeLanguage } = useLanguage();

  const isTopbar = variant === 'topbar';

  return (
    <div
      className={`inline-flex items-center space-x-1 p-0.5 sm:p-1 rounded-full border transition-colors shrink-0 ${
        isTopbar
          ? 'bg-white/20 backdrop-blur-sm border-white/30 text-white'
          : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
      } ${className}`}
    >
      <Globe
        className={`w-3.5 h-3.5 ml-1 shrink-0 ${
          isTopbar ? 'text-white' : 'text-emerald-600'
        }`}
      />
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        className={`px-2 py-0.5 text-[11px] sm:text-xs font-bold rounded-full transition-all duration-200 cursor-pointer ${
          currentLang === 'en'
            ? 'bg-emerald-600 text-white shadow-sm'
            : isTopbar
            ? 'text-white/80 hover:text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => changeLanguage('ne')}
        className={`px-2 py-0.5 text-[11px] sm:text-xs font-bold rounded-full font-ne transition-all duration-200 cursor-pointer ${
          currentLang === 'ne'
            ? 'bg-emerald-600 text-white shadow-sm'
            : isTopbar
            ? 'text-white/80 hover:text-white'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        नेपाली
      </button>
    </div>
  );
};

export default LanguageSwitcher;
