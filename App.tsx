import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { CalendarView } from './components/CalendarView';
import { StatsView } from './components/StatsView';
import { AdMarketplace } from './components/AdMarketplace';
import { Onboarding } from './components/Onboarding';
import { RoleSelection } from './components/RoleSelection';
import { AdvertiserDashboard } from './components/AdvertiserDashboard';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { NavSection, Post, AdSlot, ChannelProfile, Language, UserRole } from './types';

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        expand: () => void;
        ready: () => void;
      };
    };
  }
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [currentSection, setCurrentSection] = useState<NavSection>(NavSection.CALENDAR);
  const [channelProfile, setChannelProfile] = useState<ChannelProfile | null>(null);

  // Owner's Data
  const [posts, setPosts] = useState<Post[]>([
    { id: '1', content: 'Welcome to our new channel!', scheduledDate: new Date(), status: 'posted', topic: 'Intro', type: 'content' },
  ]);

  const [adSlots, setAdSlots] = useState<AdSlot[]>([
    { id: '1', date: new Date(new Date().setDate(new Date().getDate() + 1)), price: 500, currency: 'STARS', estimatedViews: 1200, status: 'available' },
    { id: '2', date: new Date(new Date().setDate(new Date().getDate() + 3)), price: 750, currency: 'STARS', estimatedViews: 1500, status: 'available' },
    { id: '3', date: new Date(new Date().setDate(new Date().getDate() + 4)), price: 450, currency: 'STARS', estimatedViews: 1100, status: 'sold', buyerName: 'CryptoKing' },
  ]);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
       window.Telegram.WebApp.expand();
       window.Telegram.WebApp.ready();
       document.body.style.backgroundColor = '#000000';
    }
  }, []);

  // --- Handlers ---

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
  };

  const handleLogin = (username: string) => {
    setChannelProfile({ 
        username, 
        title: username, 
        isVerified: true, 
        subscribers: 0, 
        category: 'Tech',
        slots: [] 
    });
    setIsAuthenticated(true);
  };

  // --- Render Logic ---

  if (!userRole) {
    return (
      <>
        <LanguageSwitcher currentLang={lang} setLang={setLang} />
        <RoleSelection onSelect={handleRoleSelect} lang={lang} />
      </>
    );
  }

  // 1. Advertiser Flow
  if (userRole === 'advertiser') {
    return (
        <>
            <LanguageSwitcher currentLang={lang} setLang={setLang} />
            <AdvertiserDashboard lang={lang} onBack={() => setUserRole(null)} />
        </>
    );
  }

  // 2. Owner Flow - Onboarding
  if (!isAuthenticated) {
    return (
        <>
             <LanguageSwitcher currentLang={lang} setLang={setLang} />
             <Onboarding onLogin={handleLogin} onBack={() => setUserRole(null)} lang={lang} />
        </>
    );
  }

  // 3. Owner Flow - Main App
  const renderOwnerContent = () => {
    switch (currentSection) {
      case NavSection.CALENDAR:
        return <CalendarView posts={posts} setPosts={setPosts} lang={lang} />;
      case NavSection.STATS:
        return <StatsView lang={lang} />;
      case NavSection.MARKETPLACE:
        return <AdMarketplace slots={adSlots} onBuy={() => {}} lang={lang} />; // Owner views slots
      default:
        return <CalendarView posts={posts} setPosts={setPosts} lang={lang} />;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      <LanguageSwitcher currentLang={lang} setLang={setLang} />
      <main className="max-w-md mx-auto min-h-screen flex flex-col relative border-x border-zinc-900">
        
        {/* Header */}
        <div className="px-6 pt-8 pb-4 border-b border-zinc-900 flex justify-between items-center bg-black sticky top-0 z-40">
          <div>
            <h1 className="text-xl font-bold tracking-tight">Manage Channel</h1>
            <p className="text-xs text-zinc-500 font-medium">@{channelProfile?.username}</p>
          </div>
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 px-4 py-6 pb-24 z-10">
          {renderOwnerContent()}
        </div>

        {/* Bottom Navigation */}
        <Navigation currentSection={currentSection} setSection={setCurrentSection} lang={lang} />
      </main>
    </div>
  );
};

export default App;
