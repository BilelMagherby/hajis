export type PlatformId = 'TikTok' | 'Snapchat' | 'Instagram' | 'LinkedIn' | 'X' | 'Pinterest' | 'YouTube' | 'Facebook' | 'Threads';

export const platforms: { id: PlatformId; label: string; glyph: string }[] = [
  { id: 'TikTok', label: 'تيك توك', glyph: '♪' },
  { id: 'Snapchat', label: 'سناب شات', glyph: '◉' },
  { id: 'Instagram', label: 'إنستغرام', glyph: '◎' },
  { id: 'LinkedIn', label: 'لينكدإن', glyph: 'ل' },
  { id: 'X', label: 'إكس', glyph: '𝕏' },
  { id: 'Pinterest', label: 'بينترست', glyph: 'ب' },
  { id: 'YouTube', label: 'يوتيوب', glyph: '▶' },
  { id: 'Facebook', label: 'فيسبوك', glyph: 'f' },
  { id: 'Threads', label: 'ثريدز', glyph: '@' }
];

export const ZOHO_SOCIAL_URL = 'https://social.zoho.com/social/natheelco2030/1724487000000023009/Home.do#home';
