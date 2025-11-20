import React from 'react';
import { Briefcase, ShoppingBag } from 'lucide-react';
import { UserRole, Language } from '../types';
import { t } from '../services/translations';

interface RoleSelectionProps {
  onSelect: (role: UserRole) => void;
  lang: Language;
}

export const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelect, lang }) => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 animate-in zoom-in-95 duration-500">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center space-y-2 mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight">{t('appName', lang)}</h1>
          <p className="text-zinc-500 font-medium text-sm uppercase tracking-widest">
            {t('selectRole', lang)}
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => onSelect('advertiser')}
            className="w-full bg-white text-black p-6 rounded-2xl flex items-center gap-6 hover:bg-zinc-200 transition-all group shadow-lg shadow-white/5"
          >
            <div className="bg-black text-white p-4 rounded-xl group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">{t('roleAdvertiser', lang)}</div>
              <div className="text-xs text-zinc-600 font-medium mt-1">{t('roleAdvertiserDesc', lang)}</div>
            </div>
          </button>

          <button
            onClick={() => onSelect('owner')}
            className="w-full bg-zinc-900 text-white border border-zinc-800 p-6 rounded-2xl flex items-center gap-6 hover:bg-zinc-800 transition-all group"
          >
            <div className="bg-black border border-zinc-700 p-4 rounded-xl group-hover:scale-110 transition-transform">
              <Briefcase size={24} strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <div className="font-bold text-lg">{t('roleOwner', lang)}</div>
              <div className="text-xs text-zinc-500 font-medium mt-1">{t('roleOwnerDesc', lang)}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};