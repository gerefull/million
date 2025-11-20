import React from 'react';
import { Calendar, BarChart2, ShoppingBag } from 'lucide-react';
import { NavSection, Language } from '../types';
import { t } from '../services/translations';

interface NavigationProps {
  currentSection: NavSection;
  setSection: (section: NavSection) => void;
  lang: Language;
}

export const Navigation: React.FC<NavigationProps> = ({ currentSection, setSection, lang }) => {
  const navItems = [
    { id: NavSection.CALENDAR, label: t('navPosting', lang), icon: <Calendar size={22} strokeWidth={2.5} /> },
    { id: NavSection.MARKETPLACE, label: t('navMarket', lang), icon: <ShoppingBag size={22} strokeWidth={2.5} /> },
    { id: NavSection.STATS, label: t('navStats', lang), icon: <BarChart2 size={22} strokeWidth={2.5} /> },
  ];

  return (
    <div className="fixed bottom-6 left-6 right-6 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl shadow-black z-50">
      <div className="flex justify-around items-center p-1">
        {navItems.map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`flex flex-col items-center justify-center w-full py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-white text-black shadow-lg'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {item.icon}
              {isActive && <span className="text-[10px] font-bold mt-1">{item.label}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
