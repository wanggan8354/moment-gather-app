export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  coverImage: string;
  rating: number;
  usageCount: number;
}

export interface Work {
  id: string;
  title: string;
  coverImage: string;
  duration: string;
  createdAt: string;
  dateRange?: string;
  photoCount?: number;
  selectedMoments?: number;
}

export interface User {
  name: string;
  avatarColor: string;
  initial: string;
  worksCount: number;
  totalMinutes: number;
}

export type GeneratingStatus = 'idle' | 'analyzing' | 'matching' | 'generating' | 'done';

export type TabType = 'home' | 'templates' | 'create' | 'profile';
