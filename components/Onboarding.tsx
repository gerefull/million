import React, { useState } from 'react';
import { ArrowRight, Loader2, CheckCircle, AlertCircle, ArrowLeft, Database } from 'lucide-react';
import { Language } from '../types';
import { t } from '../services/translations';
import { verifyChannelExists, registerNewChannel } from '../services/mockBackend';

interface OnboardingProps {
  onLogin: (username: string) => void;
  onBack: () => void;
  lang: Language;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onLogin, onBack, lang }) => {
  const [username, setUsername] = useState('');
  const [status, setStatus] = useState<'idle' | 'checking' | 'registering' | 'success' | 'error'>('idle');

  const handleVerify = async () => {
    if (!username) return;
    setStatus('checking');
    
    try {
      // 1. Verify Channel Exists (Simulate API)
      const channel = await verifyChannelExists(username);
      
      if (channel) {
        // 2. Register in Database (Marketplace)
        setStatus('registering');
        await registerNewChannel(channel);
        
        setStatus('success');
        setTimeout(() => {
          onLogin(channel.username);
        }, 800);
      } else {
        setStatus('error');
      }
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 animate-in fade-in duration-500 relative">
      <button onClick={onBack} className="absolute top-6 left-6 p-2 rounded-full bg-zinc-900 text-white hover:bg-zinc-800">
        <ArrowLeft size={20} />
      </button>

      <div className="w-full max-w-xs space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight">{t('connectBot', lang)}</h1>
          <p className="text-zinc-500 font-medium text-sm">
            {t('enterUsername', lang)}
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 ml-1">{t('enterUsername', lang)}</label>
            <div className="relative">
              <span className="absolute left-4 top-3.5 text-zinc-500 font-bold">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                   setUsername(e.target.value.replace('https://t.me/', '').replace('@', ''));
                   setStatus('idle');
                }}
                placeholder="my_channel"
                className={`w-full bg-zinc-900 border rounded-xl py-3 pl-8 pr-4 font-bold text-white placeholder-zinc-600 focus:border-white focus:ring-0 transition-colors outline-none
                    ${status === 'error' ? 'border-red-900' : 'border-zinc-800'}
                `}
              />
            </div>
            {status === 'error' && (
               <div className="flex items-center gap-1 text-red-500 text-xs font-bold ml-1 mt-1">
                  <AlertCircle size={12} /> {t('notFound', lang)}
               </div>
            )}
          </div>

          <button
            onClick={handleVerify}
            disabled={username.length < 3 || status === 'checking' || status === 'registering'}
            className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300
              ${status === 'success' 
                ? 'bg-green-500 text-black' 
                : 'bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed'}
            `}
          >
            {status === 'checking' ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t('verifying', lang)}
              </>
            ) : status === 'registering' ? (
               <>
                <Database size={18} className="animate-pulse" />
                {t('registering', lang)}
               </>
            ) : status === 'success' ? (
              <>
                <CheckCircle size={18} />
                {t('verified', lang)}
              </>
            ) : (
              <>
                {t('verifyBtn', lang)}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
        
        <div className="text-center">
            <p className="text-[10px] text-zinc-700 font-medium uppercase tracking-widest">{t('step1', lang)}</p>
        </div>
      </div>
    </div>
  );
};