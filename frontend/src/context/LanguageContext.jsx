import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from './AuthContext';
import { authService } from '../services/api';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const { user } = useAuth();
  const [currentLang, setCurrentLang] = useState(i18n.language || localStorage.getItem('i18nextLng') || 'en');

  useEffect(() => {
    // If logged in user has a language preference saved, sync it
    if (user && user.languagePreference && user.languagePreference !== currentLang) {
      changeLanguage(user.languagePreference);
    }
  }, [user]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    localStorage.setItem('i18nextLng', lang);

    if (user) {
      authService.updateLanguage(lang).catch(() => {});
    }
  };

  return (
    <LanguageContext.Provider value={{ currentLang, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
