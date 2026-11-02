export interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'all' | 'crops' | 'events' | 'drinks' | 'cafe' | 'blog' | string;
  categoryLabel: string;
  date: string;
  /** ISO timestamp from the blog API; used to show the date in English. */
  createdAt?: string;
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
  { id: 'all', label: 'جميع المستجدات', labelEn: 'All news' },
  { id: 'crops', label: 'محاصيل جديدة', labelEn: 'New beans' },
  { id: 'events', label: 'فعاليات وورش عمل', labelEn: 'Events & workshops' },
  { id: 'drinks', label: 'مشروبات الموسم', labelEn: 'Seasonal drinks' },
  { id: 'cafe', label: 'أخبار هاجس', labelEn: 'Hajiss news' },
  { id: 'blog', label: 'المدونة والمقالات', labelEn: 'Blog & articles' },
] as const;

export const newsItems: NewsItem[] = [];
