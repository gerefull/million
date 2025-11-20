import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, Users, Eye, Share2 } from 'lucide-react';
import { ChannelStats, Language } from '../types';
import { t } from '../services/translations';

interface StatsViewProps {
  lang: Language;
}

// Mock Data
const data: ChannelStats[] = [
  { date: 'Mon', subscribers: 1200, views: 4500, engagementRate: 4.2 },
  { date: 'Tue', subscribers: 1215, views: 5200, engagementRate: 4.5 },
  { date: 'Wed', subscribers: 1240, views: 4800, engagementRate: 4.3 },
  { date: 'Thu', subscribers: 1260, views: 6100, engagementRate: 5.1 },
  { date: 'Fri', subscribers: 1300, views: 7500, engagementRate: 5.8 },
  { date: 'Sat', subscribers: 1310, views: 6900, engagementRate: 5.4 },
  { date: 'Sun', subscribers: 1335, views: 8200, engagementRate: 6.0 },
];

export const StatsView: React.FC<StatsViewProps> = ({ lang }) => {
  return (
    <div className="space-y-8 pb-24 animate-in slide-in-from-right-4 duration-500">
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold text-white tracking-tight">{t('statsTitle', lang)}</h2>
        <p className="text-zinc-500 text-sm font-medium">{t('perfReport', lang)} • Last 7 days</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-white text-black rounded-lg">
              <Users size={20} strokeWidth={2.5} />
            </div>
            <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-[10px] font-bold flex items-center uppercase">
              +12.5% <ArrowUpRight size={12} className="ml-0.5"/>
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white">1,335</div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{t('totalSubs', lang)}</div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
          <div className="flex items-start justify-between mb-4">
            <div className="p-2 bg-white text-black rounded-lg">
              <Eye size={20} strokeWidth={2.5} />
            </div>
            <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded text-[10px] font-bold flex items-center uppercase">
              +8.2% <ArrowUpRight size={12} className="ml-0.5"/>
            </span>
          </div>
          <div className="text-3xl font-extrabold text-white">43.2K</div>
          <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">{t('totalViews', lang)}</div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
        <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6">{t('growthTrend', lang)}</h3>
        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" vertical={false} />
              <XAxis 
                dataKey="date" 
                stroke="#71717a" 
                tick={{fontSize: 10, fontWeight: 600, fill: '#71717a'}} 
                axisLine={false}
                tickLine={false}
                dy={15}
              />
              <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000000', border: '1px solid #333', borderRadius: '12px' }}
                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}
                labelStyle={{ color: '#a1a1aa', marginBottom: '8px', fontSize: '10px', textTransform: 'uppercase', fontWeight: 700 }}
                cursor={{stroke: '#333', strokeWidth: 1}}
              />
              <Line 
                type="basis" 
                dataKey="views" 
                stroke="#ffffff" 
                strokeWidth={3} 
                dot={false} 
                activeDot={{ r: 6, fill: '#000', stroke: '#fff', strokeWidth: 3 }}
              />
              <Line 
                type="basis" 
                dataKey="subscribers" 
                stroke="#52525b" 
                strokeWidth={3} 
                dot={false} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

       {/* Engagement */}
       <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="p-3 bg-zinc-800 rounded-xl text-zinc-300">
              <Share2 size={20} strokeWidth={2.5} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">{t('engagement', lang)}</div>
              <div className="text-[10px] text-zinc-500 font-medium uppercase tracking-wide">Based on views/subs</div>
            </div>
          </div>
          <div className="text-2xl font-extrabold text-white">6.0%</div>
       </div>
    </div>
  );
};
