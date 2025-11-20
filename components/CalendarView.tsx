import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, CheckCircle2 } from 'lucide-react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday, addMonths, subMonths } from 'date-fns';
import { Post, Language } from '../types';
import { PostCreator } from './PostCreator';
import { t } from '../services/translations';

interface CalendarViewProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  lang: Language;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ posts, setPosts, lang }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);
  
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentDate)),
    end: endOfWeek(endOfMonth(currentDate)),
  });

  const selectedDayPosts = posts.filter(post => isSameDay(post.scheduledDate, selectedDate));

  const handleSavePost = (post: Post) => {
    setPosts([...posts, post]);
  };

  return (
    <div className="flex flex-col h-full animate-in slide-in-from-bottom-4 duration-500">
      {/* Calendar Header */}
      <div className="flex justify-between items-end mb-8 px-2">
        <div>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">{format(currentDate, 'MMMM')}</h2>
          <p className="text-zinc-500 font-bold text-lg">{format(currentDate, 'yyyy')}</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentDate(subMonths(currentDate, 1))}
            className="p-3 rounded-full border border-zinc-800 hover:bg-zinc-900 text-white transition"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrentDate(addMonths(currentDate, 1))}
            className="p-3 rounded-full border border-zinc-800 hover:bg-zinc-900 text-white transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-2 mb-4 text-center">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-8">
        {days.map((day) => {
          const dayPosts = posts.filter(p => isSameDay(p.scheduledDate, day));
          const hasPosts = dayPosts.length > 0;
          const hasAd = dayPosts.some(p => p.type === 'ad');
          const isSelected = isSameDay(day, selectedDate);
          const notCurrentMonth = !isSameMonth(day, currentDate);
          
          return (
            <div key={day.toISOString()} className="relative aspect-square">
              <button
                onClick={() => setSelectedDate(day)}
                className={`w-full h-full rounded-xl flex flex-col items-center justify-center text-sm font-bold transition-all border
                  ${notCurrentMonth ? 'text-zinc-800 border-transparent' : 'text-white border-zinc-900'}
                  ${isSelected ? 'bg-white text-black border-white scale-105 shadow-lg shadow-white/10' : 'hover:bg-zinc-900'}
                  ${isToday(day) && !isSelected ? 'border-zinc-700' : ''}
                `}
              >
                <span>{format(day, 'd')}</span>
                {hasPosts && (
                  <div className={`mt-1 w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-black' : (hasAd ? 'bg-yellow-500' : 'bg-white')}`} />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Selected Day Details */}
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-4 px-1">
          <h3 className="text-lg font-bold text-white">
            {isToday(selectedDate) ? t('today', lang) : format(selectedDate, 'EEEE, MMM d')}
          </h3>
          <button
            onClick={() => setIsCreatorOpen(true)}
            className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded-full text-xs font-bold shadow-lg shadow-white/5 transition-transform active:scale-95 uppercase"
          >
            <Plus size={16} />
            {t('newPost', lang)}
          </button>
        </div>

        <div className="space-y-3">
          {selectedDayPosts.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-zinc-900 rounded-2xl">
              <p className="text-sm font-medium text-zinc-600">{t('noContent', lang)}</p>
            </div>
          ) : (
            selectedDayPosts.map(post => (
              <div key={post.id} className={`border rounded-xl p-4 shadow-sm flex gap-4 ${post.type === 'ad' ? 'bg-zinc-900 border-yellow-900/50' : 'bg-zinc-950 border-zinc-800'}`}>
                <div className={`mt-1 flex-shrink-0 ${post.status === 'posted' ? 'text-green-500' : 'text-zinc-500'}`}>
                  {post.status === 'posted' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                </div>
                <div className="flex-1 min-w-0">
                   <div className="flex justify-between mb-1">
                     <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${post.type === 'ad' ? 'bg-yellow-900/30 text-yellow-500' : 'bg-zinc-800 text-zinc-400'}`}>
                        {post.type === 'ad' ? 'SPONSORED' : post.topic}
                     </span>
                   </div>
                  <p className="text-sm font-medium text-zinc-200 line-clamp-2 mb-1">{post.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isCreatorOpen && (
        <PostCreator 
          selectedDate={selectedDate} 
          onClose={() => setIsCreatorOpen(false)}
          onSave={handleSavePost}
          lang={lang}
        />
      )}
    </div>
  );
};