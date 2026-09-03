import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSwitcher = () => {
  const { currentLang, changeLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
      <Globe className="w-4 h-4 text-emerald-600 ml-1.5" />
      <button
        onClick={() => changeLanguage('en')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full transition-all duration-200 ${
          currentLang === 'en'
            ? 'bg-emerald-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('ne')}
        className={`px-2.5 py-1 text-xs font-semibold rounded-full font-ne transition-all duration-200 ${
          currentLang === 'ne'
            ? 'bg-emerald-600 text-white shadow-xs'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        नेपाली
      </button>
    </div>
  );
};

export default LanguageSwitcher;
