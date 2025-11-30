import React, { useState } from 'react';
import { Calendar, Star, Check, Plus, X, Loader2 } from 'lucide-react';
import { AdSlot, Language } from '../types';
import { t } from '../services/translations';

interface AdMarketplaceProps {
  slots: AdSlot[];
  onBuy: (slotId: string) => void; // Used for advertisers or testing
  onCreateSlot?: (slot: AdSlot) => void; // Only for owners
  lang: Language;
}

export const AdMarketplace: React.FC<AdMarketplaceProps> = ({ slots, onBuy, onCreateSlot, lang }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [newPrice, setNewPrice] = useState('500');
  const [newDate, setNewDate] = useState('');

  const handleCreate = () => {
    if (!newDate || !newPrice || !onCreateSlot) return;

    const slot: AdSlot = {
      id: Date.now().toString(),
      date: new Date(newDate),
      price: parseInt(newPrice),
      currency: 'STARS',
      estimatedViews: 1000, // Default mock value
      status: 'available'
    };

    onCreateSlot(slot);
    setIsCreating(false);
    setNewPrice('500');
    setNewDate('');
  };

  return (
    <div className="space-y-8 pb-24 animate-in slide-in-from-right-4 duration-500 relative">
      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">{t('adExchange', lang)}</h2>
          <p className="text-zinc-500 text-sm font-medium">{t('buySlots', lang)}</p>
        </div>
        
        {/* Only show create button if the handler is provided (Owner mode) */}
        {onCreateSlot && (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-white/5 transition-transform active:scale-95 uppercase"
          >
            <Plus size={16} />
            {t('createSlot', lang)}
          </button>
        )}
      </div>

      <div className="grid gap-4">
        {slots.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed border-zinc-900 rounded-2xl">
            <p className="text-sm font-medium text-zinc-600">{t('noContent', lang)}</p>
          </div>
        )}

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

      {/* Create Slot Modal */}
      {isCreating && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[70] flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-zinc-900 w-full max-w-sm rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden p-6 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">{t('createSlot', lang)}</h3>
              <button onClick={() => setIsCreating(false)} className="text-zinc-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  {t('slotDate', lang)}
                </label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm font-medium focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">
                  {t('slotPrice', lang)}
                </label>
                <div className="relative">
                   <Star size={16} className="absolute left-4 top-3.5 text-yellow-500" fill="#eab308" />
                   <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-white text-sm font-medium focus:border-white outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleCreate}
                disabled={!newDate || !newPrice}
                className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm uppercase tracking-wide hover:bg-zinc-200 transition-colors disabled:opacity-50"
              >
                {t('create', lang)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};