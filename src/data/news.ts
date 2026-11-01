export interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'all' | 'crops' | 'events' | 'drinks' | 'cafe' | 'blog' | string;
  categoryLabel: string;
  date: string;
  readTime: string;
  image: string;
  mediaType?: 'image' | 'video';
  videoUrl?: string;
  summary: string;
  badge?: string;
  featured?: boolean;
  author?: {
    name: string;
    role: string;
  };
  tags: string[];
  content: {
    lead: string;
    sections: {
      heading?: string;
      paragraphs: string[];
    }[];
    highlights?: string[];
    quote?: string;
  };
}

export const newsCategories = [
  { id: 'all', label: 'جميع المستجدات' },
  { id: 'crops', label: 'محاصيل جديدة' },
  { id: 'events', label: 'فعاليات وورش عمل' },
  { id: 'drinks', label: 'مشروبات الموسم' },
  { id: 'cafe', label: 'أخبار هاجس' },
  { id: 'blog', label: 'المدونة والمقالات' },
] as const;

export const newsItems: NewsItem[] = [];
