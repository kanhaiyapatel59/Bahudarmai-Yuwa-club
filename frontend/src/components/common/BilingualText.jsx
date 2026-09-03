import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export const BilingualText = ({ content, fallback = '' }) => {
  const { currentLang } = useLanguage();

  if (!content) return <span>{fallback}</span>;

  // If content is a simple string
  if (typeof content === 'string') {
    return <span>{content}</span>;
  }

  // If content is an object with { en, ne }
  const text = currentLang === 'ne' 
    ? (content.ne || content.en || fallback) 
    : (content.en || content.ne || fallback);

  return <span className={currentLang === 'ne' ? 'font-ne' : ''}>{text}</span>;
};

export default BilingualText;
