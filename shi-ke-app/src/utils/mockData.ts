import type { Template, Work, User } from '@/types';

export const mockUser: User = {
  name: '小明',
  avatarColor: 'linear-gradient(135deg, #D4845A 0%, #B86A42 100%)',
  initial: '明',
  worksCount: 12,
  totalMinutes: 48,
};

export const mockTemplates: Template[] = [
  {
    id: 'travel',
    name: '旅行回忆',
    category: '旅行',
    description: '山川湖海，皆是故事',
    coverImage: '/assets/template-travel.jpg',
    rating: 4.9,
    usageCount: 23000,
  },
  {
    id: 'baby',
    name: '宝宝成长',
    category: '成长',
    description: '记录每一个第一次',
    coverImage: '/assets/template-baby.jpg',
    rating: 4.8,
    usageCount: 18000,
  },
  {
    id: 'anniversary',
    name: '纪念日',
    category: '纪念',
    description: '爱在日常，才不寻常',
    coverImage: '/assets/template-anniversary.jpg',
    rating: 4.7,
    usageCount: 12000,
  },
  {
    id: 'graduation',
    name: '毕业季',
    category: '毕业',
    description: '青春不散场',
    coverImage: '/assets/template-graduation.jpg',
    rating: 4.9,
    usageCount: 15000,
  },
  {
    id: 'annual',
    name: '年度回忆',
    category: '年度',
    description: '这一年，你很棒',
    coverImage: '/assets/template-annual.jpg',
    rating: 4.8,
    usageCount: 31000,
  },
  {
    id: 'party',
    name: '朋友聚会',
    category: '聚会',
    description: '有你们真好',
    coverImage: '/assets/template-party.jpg',
    rating: 4.6,
    usageCount: 8000,
  },
];

export const mockWorks: Work[] = [
  {
    id: '1',
    title: '三亚之旅',
    coverImage: '/assets/home-recent-1.jpg',
    duration: '2:34',
    createdAt: '3天前',
    dateRange: '2024年3月15日 — 3月22日',
    photoCount: 847,
    selectedMoments: 42,
  },
  {
    id: '2',
    title: '小宝的第一个夏天',
    coverImage: '/assets/home-recent-2.jpg',
    duration: '1:48',
    createdAt: '1周前',
    dateRange: '2024年6月1日 — 8月31日',
    photoCount: 1247,
    selectedMoments: 38,
  },
  {
    id: '3',
    title: '毕业快乐',
    coverImage: '/assets/home-recent-3.jpg',
    duration: '3:12',
    createdAt: '2周前',
    dateRange: '2024年6月20日 — 6月28日',
    photoCount: 563,
    selectedMoments: 52,
  },
];

export const categories = ['全部', '旅行', '成长', '纪念', '毕业', '年度', '聚会'];

export const funFacts = [
  '已从 1,247 张照片中精选 38 个关键时刻',
  '正在为你匹配最适合的背景音乐',
  'AI 正在分析照片中的情感色彩',
  '正在生成电影级转场效果',
  '自动调色中，为回忆增添胶片质感',
];
