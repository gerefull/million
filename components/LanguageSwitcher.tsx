import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  currentLang: Language;
  setLang: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, setLang }) => {
  return (
    <button
      onClick={() => setLang(currentLang === 'en' ? 'ru' : 'en')}
      className="fixed top-6 right-6 z-[60] bg-zinc-900 border border-zinc-800 text-white px-3 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-zinc-800 transition-colors"
    >
      <Globe size={14} />
      {currentLang === 'en' ? 'EN' : 'RU'}
    </button>
  );
};