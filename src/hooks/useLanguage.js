import { useContext } from 'react';
import { LanguageContext } from '../i18n/LanguageContext';

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context) {
    console.error('useLanguage must be used within a LanguageProvider');
    return { t: (key) => key, language: 'en', setLanguage: () => {} };
  }

  const { language, setLanguage, translations } = context;

  const t = (key) => {
    try {
      // Handle nested keys like 'splash.academicsTitle'
      const keys = key.split('.');
      let translation = translations[language];
      
      for (const k of keys) {
        if (!translation[k]) {
          console.warn(`Translation missing for key: ${key}`);
          return key;
        }
        translation = translation[k];
      }
      
      return translation;
    } catch (error) {
      console.warn(`Error translating key: ${key}`, error);
      return key;
    }
  };

  return {
    language,
    setLanguage,
    t,
  };
};