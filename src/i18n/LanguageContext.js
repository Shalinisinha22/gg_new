import React, { createContext, useContext, useState } from 'react';
import en from './translations/en';
import hi from './translations/hi';

export const LanguageContext = createContext();

const translations = {
  en,
  hi,
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en'); // default language

  const value = {
    language,
    setLanguage,
    translations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};