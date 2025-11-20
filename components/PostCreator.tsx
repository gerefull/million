import React, { useState } from 'react';
import { X, Wand2, Loader2, MessageSquare, Sliders } from 'lucide-react';
import { generatePostContent } from '../services/geminiService';
import { Post, Language, AiConfig } from '../types';
import { t } from '../services/translations';

interface PostCreatorProps {
  selectedDate: Date;
  onClose: () => void;
  onSave: (post: Post) => void;
  lang: Language;
}

export const PostCreator: React.FC<PostCreatorProps> = ({ selectedDate, onClose, onSave, lang }) => {
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [useAI, setUseAI] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // AI Config State
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [context, setContext] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [creativity, setCreativity] = useState<'low' | 'medium' | 'high'>('medium');
  const [postLanguage, setPostLanguage] = useState(lang === 'ru' ? 'Russian' : 'English');

  const handleGenerate = async () => {
    if (!topic) return;
    setIsGenerating(true);
    
    const config: AiConfig = {
      topic,
      tone,
      context,
      targetAudience,
      postLanguage,
      creativity
    };

    try {
      const result = await generatePostContent(config);
      setContent(result);
    } catch (e) {
      console.error(e);
      alert("Failed to generate content.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!content.trim()) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      content,
      scheduledDate: selectedDate,
      status: 'scheduled',
      topic: topic || 'Manual Entry',
      type: 'content'
    };
    
    onSave(newPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[70] flex items-end sm:items-center justify-center sm:p-4 animate-in fade-in duration-200">
      {/* Modal Container */}
      <div className="bg-black w-full max-w-md sm:rounded-3xl rounded-t-3xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col h-[95dvh] sm:h-[90dvh]">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-zinc-900 shrink-0 bg-black z-10">
          <h3 className="text-xl font-bold text-white">
            {t('createPost', lang)}
          </h3>
          <button onClick={onClose} className="text-zinc-500 hover:text-white p-2 bg-zinc-900 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content - Added min-h-0 and overscroll-contain */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 custom-scrollbar min-h-0 overscroll-contain pb-32">
          
          {/* Toggle AI */}
          <div className="flex gap-1 bg-zinc-900 p-1 rounded-xl shrink-0">
            <button 
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${useAI ? 'bg-white text-black shadow' : 'text-zinc-500 hover:text-white'}`}
              onClick={() => setUseAI(true)}
            >
              <span className="flex items-center justify-center gap-2">
                <Wand2 size={14} /> {t('generateAi', lang)}
              </span>
            </button>
            <button 
              className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${!useAI ? 'bg-white text-black shadow' : 'text-zinc-500 hover:text-white'}`}
              onClick={() => setUseAI(false)}
            >
              <span className="flex items-center justify-center gap-2">
                <MessageSquare size={14} /> {t('manual', lang)}
              </span>
            </button>
          </div>

          {useAI && (
            <div className="space-y-4 bg-zinc-950 p-5 rounded-2xl border border-zinc-800 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase text-zinc-400">{t('aiSettings', lang)}</h4>
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className={`p-2 rounded-lg transition-colors ${showAdvanced ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-500'}`}
                >
                  <Sliders size={14} />
                </button>
              </div>

              {/* Basic Fields */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t('topicLabel', lang)}</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder={t('topicPlaceholder', lang)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm font-medium focus:border-white outline-none transition-colors"
                />
              </div>

              {/* Advanced Fields */}
              {showAdvanced && (
                <div className="space-y-4 animate-in slide-in-from-top-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t('contextLabel', lang)}</label>
                    <textarea
                      value={context}
                      onChange={(e) => setContext(e.target.value)}
                      placeholder={t('contextPlaceholder', lang)}
                      rows={2}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm font-medium focus:border-white outline-none transition-colors resize-none"
                    />
                  </div>

                   <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t('toneLabel', lang)}</label>
                      <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-3 text-white text-xs font-medium outline-none appearance-none"
                      >
                        <option value="Professional">{t('toneProfessional', lang)}</option>
                        <option value="Casual">{t('toneCasual', lang)}</option>
                        <option value="Excited">{t('toneExcited', lang)}</option>
                        <option value="Humorous">{t('toneHumorous', lang)}</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t('postLangLabel', lang)}</label>
                      <select
                        value={postLanguage}
                        onChange={(e) => setPostLanguage(e.target.value)}
                        className="w-full bg-black border border-zinc-800 rounded-xl px-3 py-3 text-white text-xs font-medium outline-none appearance-none"
                      >
                        <option value="English">English</option>
                        <option value="Russian">Russian</option>
                        <option value="Spanish">Spanish</option>
                        <option value="German">German</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t('audienceLabel', lang)}</label>
                    <input
                      type="text"
                      value={targetAudience}
                      onChange={(e) => setTargetAudience(e.target.value)}
                      placeholder={t('audiencePlaceholder', lang)}
                      className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm font-medium focus:border-white outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={isGenerating || !topic}
                className="w-full bg-white text-black py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:bg-zinc-200"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Wand2 size={16} />}
                {isGenerating ? t('generating', lang) : t('generateBtn', lang)}
              </button>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-2">{t('contentLabel', lang)}</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={t('contentPlaceholder', lang)}
              className="w-full h-40 bg-zinc-900/50 border border-zinc-800 rounded-xl px-4 py-4 text-white text-sm leading-relaxed focus:border-white outline-none resize-none font-medium"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-zinc-900 bg-black shrink-0 z-10">
          <button
            onClick={handleSave}
            disabled={!content}
            className="w-full bg-white hover:bg-zinc-200 text-black py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors disabled:opacity-50"
          >
            {t('schedule', lang)}
          </button>
        </div>
      </div>
    </div>
  );
};