export enum NavSection {
  CALENDAR = 'CALENDAR',
  STATS = 'STATS',
  MARKETPLACE = 'MARKETPLACE'
}

export type Language = 'en' | 'ru';

export type UserRole = 'owner' | 'advertiser' | null;

export type ChannelCategory = 'Tech' | 'Crypto' | 'News' | 'Lifestyle' | 'Education' | 'Entertainment';

export interface Post {
  id: string;
  content: string;
  scheduledDate: Date;
  status: 'scheduled' | 'posted' | 'draft';
  topic?: string;
  type: 'content' | 'ad'; 
}

export interface AdSlot {
  id: string;
  date: Date;
  price: number;
  currency: 'STARS' | 'USD';
  estimatedViews: number;
  status: 'available' | 'sold';
  buyerName?: string;
}

export interface ChannelStats {
  date: string;
  subscribers: number;
  views: number;
  engagementRate: number;
}

export interface ChannelProfile {
  username: string;
  title: string;
  isVerified: boolean;
  subscribers: number;
  category: ChannelCategory;
  avatarUrl?: string;
  slots: AdSlot[];
}

export interface AiConfig {
  topic: string;
  tone: string;
  context: string; // Extra details for the AI
  targetAudience: string;
  postLanguage: string; // Language of the generated post
  creativity: 'low' | 'medium' | 'high';
}