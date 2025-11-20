import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, Users, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import { ChannelProfile, ChannelCategory, AdSlot, Language } from '../types';
import { searchChannels, purchaseSlot } from '../services/mockBackend';
import { t } from '../services/translations';

interface AdvertiserDashboardProps {
  lang: Language;
  onBack: () => void;
}

export const AdvertiserDashboard: React.FC<AdvertiserDashboardProps> = ({ lang, onBack }) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ChannelCategory | 'All'>('All');
  const [channels, setChannels] = useState<ChannelProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<ChannelProfile | null>(null);
  const [purchasing, setPurchasing] = useState<string | null>(null); // slot id

  const categories: (ChannelCategory | 'All')[] = ['All', 'Tech', 'Crypto', 'News', 'Entertainment', 'Education'];

  useEffect(() => {
    const fetchChannels = async () => {
      setLoading(true);
      const results = await searchChannels(query, selectedCategory);
      setChannels(results);
      setLoading(false);
    };

    const debounce = setTimeout(fetchChannels, 300);
    return () => clearTimeout(debounce);
  }, [query, selectedCategory]);

  const handlePurchase = async (slotId: string) => {
    if (!selectedChannel) return;
    setPurchasing(slotId);
    await purchaseSlot(selectedChannel.username, slotId);
    // Optimistic update
    const updatedSlots = selectedChannel.slots.map(s => 
      s.id === slotId ? { ...s, status: 'sold' as const } : s
    );
    setSelectedChannel({ ...selectedChannel, slots: updatedSlots });
    setPurchasing(null);
    alert(t('purchaseSuccess', lang));
  };

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-black border-b border-zinc-900 p-4">
         <div className="flex items-center gap-4 mb-4">
            <button onClick={onBack} className="p-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
                <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold">{t('findChannels', lang)}</h1>
         </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-4 top-3.5 text-zinc-500" size={18} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder', lang)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-white placeholder-zinc-600 focus:border-white outline-none transition-colors text-sm font-medium"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-white text-black' 
                  : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
              }`}
            >
              {cat === 'All' ? t('allCategories', lang) : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="text-center py-10 text-zinc-500 flex flex-col items-center gap-2">
            <Loader2 size={24} className="animate-spin" />
            {t('loading', lang)}
          </div>
        ) : channels.length === 0 ? (
          <div className="text-center py-10 text-zinc-500">
             {t('noChannels', lang)}
          </div>
        ) : (
          channels.map(channel => (
            <div key={channel.username} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 overflow-hidden">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-lg">
                    {channel.title.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white flex items-center gap-1">
                      {channel.title}
                      {channel.isVerified && <CheckCircle2 size={14} className="text-blue-500" />}
                    </h3>
                    <p className="text-xs text-zinc-500">@{channel.username}</p>
                  </div>
                </div>
                <div className="bg-zinc-950 px-3 py-1 rounded-lg border border-zinc-800">
                  <span className="text-xs font-bold text-zinc-300 flex items-center gap-1">
                    <Users size={12} />
                    {(channel.subscribers / 1000).toFixed(1)}k
                  </span>
                </div>
              </div>

              {/* Slots Preview / Expand */}
              {selectedChannel?.username === channel.username ? (
                <div className="space-y-3 animate-in slide-in-from-top-2 duration-300">
                  <div className="h-px bg-zinc-800 my-2" />
                  {channel.slots.map(slot => (
                    <div key={slot.id} className="flex justify-between items-center bg-black p-3 rounded-xl border border-zinc-800">
                      <div>
                         <div className="text-sm font-bold text-white">
                            {slot.date.toLocaleDateString()}
                         </div>
                         <div className="text-[10px] text-zinc-500 uppercase font-bold mt-0.5">
                            ~{slot.estimatedViews} {t('views', lang)}
                         </div>
                      </div>
                      {slot.status === 'sold' ? (
                         <span className="text-xs font-bold text-zinc-600 uppercase">{t('soldTo', lang)} {slot.buyerName}</span>
                      ) : (
                        <button 
                          onClick={() => handlePurchase(slot.id)}
                          disabled={purchasing === slot.id}
                          className="bg-white text-black px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-zinc-200 transition-colors disabled:opacity-50"
                        >
                            {purchasing === slot.id ? '...' : `${slot.price} ${t('priceStars', lang)}`}
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    onClick={() => setSelectedChannel(null)}
                    className="w-full py-2 text-xs font-bold text-zinc-500 uppercase hover:text-white"
                  >
                    {t('close', lang)}
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setSelectedChannel(channel)}
                  className="w-full py-3 bg-zinc-950 border border-zinc-800 rounded-xl text-xs font-bold text-white uppercase hover:bg-zinc-800 transition-colors"
                >
                  {t('viewSlots', lang)} ({channel.slots.filter(s => s.status === 'available').length})
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};