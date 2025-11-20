import React from 'react';
import { Calendar, Star, Check, BadgeDollarSign } from 'lucide-react';
import { AdSlot, Language } from '../types';
import { t } from '../services/translations';

interface AdMarketplaceProps {
  slots: AdSlot[];
  onBuy: (slotId: string) => void;
  lang: Language;
}

export const AdMarketplace: React.FC<AdMarketplaceProps> = ({ slots, onBuy, lang }) => {
  
  return (
    <div className="space-y-8 pb-24 animate-in slide-in-from-right-4 duration-500">
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">{t('adExchange', lang)}</h2>
        <p className="text-zinc-500 text-sm font-medium">{t('buySlots', lang)}</p>
      </div>

      <div className="grid gap-4">
        {slots.map((slot) => (
          <div key={slot.id} className={`rounded-2xl p-5 border relative overflow-hidden transition-all ${slot.status === 'sold' ? 'bg-zinc-950 border-zinc-900 opacity-75' : 'bg-zinc-900 border-zinc-800'}`}>
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-white text-black p-3 rounded-xl">
                  <Calendar size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">
                    {slot.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                  </div>
                  <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide mt-0.5">
                    ~{slot.estimatedViews} Views
                  </div>
                </div>
              </div>
              <div className="text-right">
                 <div className="flex items-center justify-end gap-1 text-white font-extrabold text-xl">
                    <Star size={18} fill="white" />
                    {slot.price}
                 </div>
                 <div className="text-[10px] text-zinc-500 uppercase font-bold mt-1">TG Stars</div>
              </div>
            </div>

            {slot.status === 'sold' ? (
              <div className="w-full py-3 rounded-xl bg-zinc-800 text-zinc-500 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-zinc-700">
                 <Check size={14} /> {t('soldTo', lang)} {slot.buyerName}
              </div>
            ) : (
              <div className="w-full py-3 rounded-xl bg-zinc-950 text-white text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border border-zinc-800">
                 {t('available', lang)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
