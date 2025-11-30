import { ChannelProfile, ChannelCategory, AdSlot } from '../types';

// --- Mock Database (Mutable for runtime simulation) ---

const generateSlots = (): AdSlot[] => {
  const slots: AdSlot[] = [];
  const today = new Date();
  for (let i = 1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    slots.push({
      id: `slot-${Math.random().toString(36).substr(2, 9)}`,
      date: date,
      price: Math.floor(Math.random() * 500) + 100,
      currency: 'STARS',
      estimatedViews: Math.floor(Math.random() * 5000) + 1000,
      status: Math.random() > 0.7 ? 'sold' : 'available',
      buyerName: Math.random() > 0.7 ? 'CryptoWhale' : undefined
    });
  }
  return slots;
};

// We use 'let' so we can push new channels to it at runtime
let MOCK_CHANNELS: ChannelProfile[] = [
  {
    username: 'tech_insider',
    title: 'Tech Insider Daily',
    isVerified: true,
    subscribers: 154000,
    category: 'Tech',
    slots: generateSlots()
  },
  {
    username: 'crypto_signals',
    title: 'Alpha Crypto Signals',
    isVerified: true,
    subscribers: 89000,
    category: 'Crypto',
    slots: generateSlots()
  },
  {
    username: 'meme_central',
    title: 'Daily Memes',
    isVerified: false,
    subscribers: 450000,
    category: 'Entertainment',
    slots: generateSlots()
  },
  {
    username: 'learn_python',
    title: 'Python Pro',
    isVerified: true,
    subscribers: 22000,
    category: 'Education',
    slots: generateSlots()
  },
  {
    username: 'world_news',
    title: 'Global News 24/7',
    isVerified: true,
    subscribers: 210000,
    category: 'News',
    slots: generateSlots()
  }
];

// --- Backend Methods ---

/**
 * Simulates registering a new channel into the global database.
 * In a real app, this would be an INSERT SQL query.
 */
export const registerNewChannel = async (profile: ChannelProfile): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate DB Latency
  
  // Check if exists
  const exists = MOCK_CHANNELS.find(c => c.username === profile.username);
  if (!exists) {
    // Add default slots for the new user so they have something to sell
    const newProfile = { ...profile };
    // We don't generate slots automatically here anymore, the user should create them manually
    // but for demo purposes, we can leave it empty or add some. 
    // Let's leave slots empty so the user can use the "Create Slot" feature.
    MOCK_CHANNELS.unshift(newProfile); // Add to top
  }
};

export const searchChannels = async (query: string, category?: ChannelCategory | 'All'): Promise<ChannelProfile[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));

  let results = MOCK_CHANNELS;

  if (category && category !== 'All') {
    results = results.filter(c => c.category === category);
  }

  if (query) {
    const q = query.toLowerCase().replace('@', '');
    results = results.filter(c => 
      c.username.toLowerCase().includes(q) || 
      c.title.toLowerCase().includes(q)
    );
  }

  // Sort by subscribers desc
  return results.sort((a, b) => b.subscribers - a.subscribers);
};

export const verifyChannelExists = async (username: string): Promise<ChannelProfile | null> => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Realistic API delay

  const cleanUsername = username.replace('@', '').replace('https://t.me/', '');
  
  // 1. Check mock DB first (simulating internal cache)
  const existing = MOCK_CHANNELS.find(c => c.username.toLowerCase() === cleanUsername.toLowerCase());
  if (existing) return existing;

  // 2. "Real" Telegram simulation
  // Strict rules to simulate a real check: 
  // - Must be at least 4 chars
  // - Must not be "invalid" or "test"
  if (cleanUsername.length >= 4 && /^[a-zA-Z0-9_]+$/.test(cleanUsername) && cleanUsername !== 'invalid') {
    return {
      username: cleanUsername,
      title: `${cleanUsername} Channel`,
      isVerified: false,
      subscribers: 0, // New channel starts at 0
      category: 'Tech', // Default
      slots: []
    };
  }

  return null;
};

export const purchaseSlot = async (channelUsername: string, slotId: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Update the local database state
  const channel = MOCK_CHANNELS.find(c => c.username === channelUsername);
  if (channel) {
    const slot = channel.slots.find(s => s.id === slotId);
    if (slot) {
      slot.status = 'sold';
      slot.buyerName = 'You'; // In real app, current user's name
    }
  }
  
  return true; 
};

export const addSlotToChannel = async (username: string, slot: AdSlot): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 500)); // Network delay

  const channel = MOCK_CHANNELS.find(c => c.username === username);
  if (channel) {
    // Add slot to the 'global' backend store so advertisers see it
    channel.slots.push(slot);
    // Sort slots by date
    channel.slots.sort((a, b) => a.date.getTime() - b.date.getTime());
  }
};