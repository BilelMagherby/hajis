import React, { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Clock,
  Search,
  X,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Coffee,
  Sparkles,
  MapPin,
  Flame,
  SlidersHorizontal,
  Bookmark,
  Play,
  Film
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import type { NewsItem } from '../data/news';
import { newsCategories } from '../data/news';
import { fetchBlogPosts } from '../utils/blogApi';
import { brandData } from '../data/brand';
import { useLanguage } from '../i18n/language';
import './NewsPage.css';

interface NewsPageProps {
  onNavigate: (sectionId: string) => void;
  onOpenCookieSettings: () => void;
}

export const NewsPage: React.FC<NewsPageProps> = ({ onNavigate, onOpenCookieSettings }) => {
  const { t, dir, isEnglish } = useLanguage();
  // Post text is written by the admin and shown as authored; labels and dates follow the site language.
  const categoryLabel = (item: NewsItem) => {
    const category = newsCategories.find((cat) => cat.id === item.category);
    return category ? t(category.label, category.labelEn) : item.categoryLabel;
  };
  const postDate = (item: NewsItem) => (isEnglish && item.createdAt
    ? new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(item.createdAt))
    : item.date);
  const ForwardChevron = isEnglish ? ChevronRight : ChevronLeft;
  const [itemsList, setItemsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeModalItem, setActiveModalItem] = useState<NewsItem | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Load published posts from the blog API, and refresh when the visitor returns to the tab
  useEffect(() => {
    let controller = new AbortController();
    const load = () => {
      controller.abort();
      controller = new AbortController();
      const { signal } = controller;
      fetchBlogPosts(signal)
        .then((items) => setItemsList(items))
        .catch((error) => {
          if (!signal.aborted) console.error('Error loading news:', error);
        })
        .finally(() => {
          if (!signal.aborted) setIsLoading(false);
        });
    };
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') load();
    };
    load();
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      controller.abort();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeModalItem) {
        setActiveModalItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModalItem]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeModalItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeModalItem]);

  // Filtered news items
  const filteredItems = useMemo(() => {
    return itemsList.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      if (!query) return matchesCategory;

      const matchesText =
        item.title.toLowerCase().includes(query) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(query)) ||
        item.summary.toLowerCase().includes(query) ||
        (item.tags && item.tags.some((tag) => tag.toLowerCase().includes(query)));

      return matchesCategory && matchesText;
    });
  }, [itemsList, selectedCategory, searchQuery]);

  // Featured item (displayed specially if in 'all' view without search)
  const featuredItem = useMemo(() => {
    if (selectedCategory !== 'all' || searchQuery.trim()) return null;
    return itemsList.find((item) => item.featured) ?? null;
  }, [itemsList, selectedCategory, searchQuery]);

  // Regular grid items (exclude featured item if it's displayed separately)
  const gridItems = useMemo(() => {
    if (featuredItem && selectedCategory === 'all' && !searchQuery.trim()) {
      return filteredItems.filter((item) => item.id !== featuredItem.id);
    }
    return filteredItems;
  }, [filteredItems, featuredItem, selectedCategory, searchQuery]);

  const handleShare = async (item: NewsItem) => {
    const shareUrl = window.location.href.split('?')[0];
    const shareText = `${item.title} — ${t('مقهى هاجس، حائل', 'Hajiss Café, Hail')}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: item.title,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch {
        // User cancelled or unsupported, fallback to copy
      }
    }

    try {
      await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2600);
    } catch {
      // ignore
    }
  };

  return (
    <div className="news-page" dir={dir}>
      {/* Luxury Navbar */}
      <Navbar onNavigate={onNavigate} activeSection="news" inFlow />

      <main className="flex-1 pb-20">
        {/* HERO SECTION */}
        <section className="news-hero pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-32 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          {/* Branded background image layer */}
          <div aria-hidden="true" className="news-hero-bg-layer">
            <img
              src="/images/news-hero-bg.png"
              alt={t('مدونة وأخبار هاجس', 'Hajiss blog and news')}
              className="news-hero-bg-img"
            />
            <div className="news-hero-overlay" />
          </div>

          <div className="news-hero-grain" />
          <div className="news-hero-glow" />

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            {/* Breadcrumb / Top Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[rgba(43,24,14,0.8)] backdrop-blur-md border border-[rgba(200,188,167,0.3)] text-xs font-arabic text-[var(--color-brand-sand)] shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-brand-sand)]" />
              <span>{t('مستجدات وإعلانات هاجس • حائل 2026', 'Hajiss news & announcements • Hail 2026')}</span>
            </div>

            {/* Page Title */}
            <h1 className="font-kufi text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--color-brand-linen)] tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              {isEnglish
                ? <><span className="text-[var(--color-brand-sand)]">Hajiss</span> News</>
                : <>مستجدات <span className="text-[var(--color-brand-sand)]">هاجس</span></>}
            </h1>

            {/* Subtitle */}
            <p className="font-arabic text-base sm:text-lg lg:text-xl text-[rgb(var(--color-brand-linen-rgb)_/_0.92)] max-w-2xl mx-auto leading-relaxed font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              {t('نافذتكم الحصرية على كل ما يستجد في هاجس: محاصيل القهوة النادرة، فعاليات حائل، تفاصيل التقطير، وأمسيات الشتاء في داني سكوير.', 'Your exclusive window into everything new at Hajiss: rare coffee beans, events in Hail, brewing details, and winter evenings at Dani Square.')}
            </p>

            {/* Subtle Quick Meta Pills */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-xs font-arabic text-[var(--color-brand-sand)]">
              <span className="flex items-center gap-1.5 bg-[rgba(43,24,14,0.82)] backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[rgba(200,188,167,0.22)] shadow-md">
                <Coffee className="w-3.5 h-3.5" /> {t('محاصيل مختارة عالمياً', 'Beans selected worldwide')}
              </span>
              <span className="flex items-center gap-1.5 bg-[rgba(43,24,14,0.82)] backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[rgba(200,188,167,0.22)] shadow-md">
                <MapPin className="w-3.5 h-3.5" /> {t('داني سكوير، حائل', 'Dani Square, Hail')}
              </span>
              <span className="flex items-center gap-1.5 bg-[rgba(43,24,14,0.82)] backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-[rgba(200,188,167,0.22)] shadow-md">
                <Flame className="w-3.5 h-3.5" /> {t('طقوس قهوة يومية متجددة', 'Fresh coffee rituals every day')}
              </span>
            </div>
          </div>
        </section>

        {/* ANNOUNCEMENT TICKER */}
        <div className="news-ticker-bar py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 font-arabic text-xs sm:text-sm text-[var(--color-brand-linen)]">
            <div className="flex items-center gap-2 flex-shrink-0 text-[var(--color-brand-sand)] font-semibold">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--color-brand-sand)] animate-pulse" />
              <span>{t('إعلان هاجس:', 'Hajiss announcement:')}</span>
            </div>
            <p className="truncate text-start opacity-90">
              {itemsList[0]?.title || t('مرحباً بكم في مقهى هاجس — داني سكوير، حائل • قهوتك، طقسك، ومكانك.', 'Welcome to Hajiss Café — Dani Square, Hail • Your coffee, your ritual, your place.')}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('menu')}
              className="hidden md:inline-flex items-center gap-1 text-[var(--color-brand-sand)] hover:underline flex-shrink-0 font-medium"
            >
              <span>{t('استكشف القائمة', 'Explore the menu')}</span>
              <ForwardChevron className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* MAIN CONTENT AREA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
          
          {/* SEARCH & FILTERS BAR (Rendered only when items exist) */}
          {itemsList.length > 0 && (
            <div className="space-y-6 mb-12">
              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                
                {/* Category Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none" role="tablist">
                  {newsCategories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`category-pill px-4 py-2 rounded-full text-xs sm:text-sm font-arabic font-medium transition-all ${
                          isActive ? 'active' : ''
                        }`}
                      >
                        {t(cat.label, cat.labelEn)}
                      </button>
                    );
                  })}
                </div>

                {/* Keyword Search Input */}
                <div className="relative min-w-[260px] sm:min-w-[300px]">
                  <Search className="w-4 h-4 absolute start-3.5 top-1/2 -translate-y-1/2 text-[var(--color-brand-sand)] pointer-events-none" />
                  <input
                    type="text"
                    placeholder={t('ابحث في المستجدات والمحاصيل...', 'Search news and beans...')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[rgba(64,55,45,0.35)] border border-[rgba(200,188,167,0.22)] focus:border-[var(--color-brand-sand)] focus:bg-[rgba(64,55,45,0.55)] text-sm text-[var(--color-brand-linen)] placeholder-[rgba(200,188,167,0.5)] outline-none font-arabic transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label={t('مسح البحث', 'Clear search')}
                      className="absolute end-3 top-1/2 -translate-y-1/2 text-[var(--color-brand-sand)] hover:text-white p-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Active search or category indicators */}
              {(searchQuery || selectedCategory !== 'all') && (
                <div className="flex items-center justify-between text-xs font-arabic text-[var(--color-brand-sand)] bg-[rgba(64,55,45,0.2)] px-4 py-2 rounded-lg border border-[rgba(200,188,167,0.12)]">
                  <span>
                    {t('النتائج المعروضة:', 'Showing:')} <b>{filteredItems.length}</b> {t('مستجد', filteredItems.length === 1 ? 'post' : 'posts')}
                    {searchQuery && t(` للبحث عن "${searchQuery}"`, ` for "${searchQuery}"`)}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="text-xs text-[var(--color-brand-linen)] hover:underline"
                  >
                    {t('إعادة ضبط الفلاتر', 'Reset filters')}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* FEATURED STORY HERO CARD (if applicable) */}
          {featuredItem && (
            <div className="mb-14">
              <div className="flex items-center gap-2 mb-4">
                <Bookmark className="w-4 h-4 text-[var(--color-brand-sand)]" />
                <h2 className="font-kufi text-lg sm:text-xl font-bold text-[var(--color-brand-sand)]">
                  {t('المستجد الأبرز لهذا الشهر', 'Featured story of the month')}
                </h2>
              </div>

              <div className="news-featured-card grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
                {/* Media Column */}
                <div className="lg:col-span-7 relative min-h-[280px] sm:min-h-[360px] lg:min-h-[440px] overflow-hidden group bg-black">
                  {featuredItem.mediaType === 'video' ? (
                    <div className="w-full h-full relative flex items-center justify-center">
                      <video
                        src={featuredItem.videoUrl || featuredItem.image}
                        controls
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <img
                      src={featuredItem.image}
                      alt={featuredItem.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,22,18,0.85)] via-transparent to-transparent lg:hidden pointer-events-none" />
                  
                  {/* Badge */}
                  {featuredItem.badge && (
                    <div className="absolute top-4 start-4 bg-[var(--color-brand-olive)] text-[var(--color-brand-linen)] text-xs font-arabic font-semibold px-3 py-1 rounded-full shadow-lg border border-[rgba(200,188,167,0.3)]">
                      {featuredItem.badge}
                    </div>
                  )}

                  {featuredItem.mediaType === 'video' && (
                    <div className="absolute top-4 end-4 bg-black/70 text-[var(--color-brand-sand)] text-xs font-arabic px-3 py-1 rounded-full border border-[rgba(200,188,167,0.3)] flex items-center gap-1.5">
                      <Film className="w-3.5 h-3.5" />
                      <span>{t('فيديو', 'Video')}</span>
                    </div>
                  )}
                </div>

                {/* Content Column */}
                <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between text-start space-y-6">
                  <div className="space-y-4">
                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-arabic text-[var(--color-brand-sand)]">
                      <span className="bg-[rgba(64,55,45,0.7)] px-2.5 py-1 rounded border border-[rgba(200,188,167,0.18)]">
                        {categoryLabel(featuredItem)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {postDate(featuredItem)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredItem.readTime}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-kufi text-2xl sm:text-3xl font-bold text-[var(--color-brand-linen)] leading-snug">
                      {featuredItem.title}
                    </h3>

                    {/* Subtitle / Excerpt */}
                    <p className="font-arabic text-sm sm:text-base text-[rgb(var(--color-brand-linen-rgb)_/_0.85)] leading-relaxed">
                      {featuredItem.summary}
                    </p>

                    {/* Highlights pill tags */}
                    {featuredItem.tags && featuredItem.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {featuredItem.tags.map((tag) => (
                          <span
                            key={tag}
                            dir="auto"
                            className="text-[11px] font-arabic px-2.5 py-1 rounded-md bg-[rgba(64,55,45,0.5)] text-[var(--color-brand-sand)] border border-[rgba(200,188,167,0.1)]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-6 border-t border-[rgba(200,188,167,0.15)] flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setActiveModalItem(featuredItem)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-brand-sand)] text-[var(--color-brand-black)] hover:bg-[var(--color-brand-linen)] font-arabic text-sm font-bold transition-all shadow-md group cursor-pointer"
                    >
                      <span>{t('قراءة التفاصيل بالكامل', 'Read the full story')}</span>
                      <ForwardChevron className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleShare(featuredItem)}
                      className="p-2.5 rounded-xl bg-[rgba(64,55,45,0.5)] hover:bg-[rgba(64,55,45,0.8)] text-[var(--color-brand-sand)] border border-[rgba(200,188,167,0.2)] transition-colors cursor-pointer"
                      title={t('مشاركة المستجد', 'Share this story')}
                      aria-label={t('مشاركة المستجد', 'Share this story')}
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* GRID OF NEWS CARDS */}
          {gridItems.length > 0 ? (
            <div className="space-y-6">
              {featuredItem && selectedCategory === 'all' && !searchQuery.trim() && (
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[var(--color-brand-sand)]" />
                  <h3 className="font-kufi text-lg sm:text-xl font-bold text-[var(--color-brand-sand)]">
                    {t('جميع المستجدات والأنشطة', 'All news and activities')}
                  </h3>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {gridItems.map((item) => (
                  <article key={item.id} className="news-card">
                    {/* Media Thumbnail */}
                    <div className="news-card-img-wrap h-52 sm:h-56 bg-black">
                      {item.mediaType === 'video' ? (
                        <div className="w-full h-full relative">
                          <video
                            src={item.videoUrl || item.image}
                            className="w-full h-full object-cover"
                            muted
                            playsInline
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none">
                            <span className="w-10 h-10 rounded-full bg-black/60 border border-[var(--color-brand-sand)] flex items-center justify-center text-[var(--color-brand-sand)] shadow-lg">
                              <Play className="w-5 h-5 fill-current ml-0.5" />
                            </span>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={item.image}
                          alt={item.title}
                          className="news-card-img"
                          loading="lazy"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,22,18,0.7)] via-transparent to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 start-3 flex items-center gap-2">
                        <span className="bg-[rgba(43,24,14,0.85)] backdrop-blur-md text-[var(--color-brand-sand)] border border-[rgba(200,188,167,0.25)] text-[11px] font-arabic font-semibold px-2.5 py-0.5 rounded-md">
                          {categoryLabel(item)}
                        </span>
                        {item.badge && (
                          <span className="bg-[var(--color-brand-olive)] text-[var(--color-brand-linen)] text-[11px] font-arabic font-semibold px-2.5 py-0.5 rounded-md">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {item.mediaType === 'video' && (
                        <div className="absolute bottom-3 end-3 bg-black/75 text-[var(--color-brand-sand)] text-[10px] font-arabic px-2 py-0.5 rounded border border-[rgba(200,188,167,0.3)] flex items-center gap-1">
                          <Film className="w-3 h-3" />
                          <span>{t('فيديو', 'Video')}</span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 text-start">
                      <div className="space-y-3">
                        {/* Date and Read Time */}
                        <div className="flex items-center justify-between text-[11px] font-arabic text-[rgb(var(--color-brand-sand-rgb)_/_0.8)]">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {postDate(item)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="font-kufi text-lg sm:text-xl font-bold text-[var(--color-brand-linen)] leading-snug line-clamp-2 hover:text-[var(--color-brand-sand)] transition-colors">
                          <button
                            type="button"
                            onClick={() => setActiveModalItem(item)}
                            className="text-start cursor-pointer"
                          >
                            {item.title}
                          </button>
                        </h4>

                        {/* Summary */}
                        <p className="font-arabic text-xs sm:text-sm text-[rgb(var(--color-brand-linen-rgb)_/_0.78)] leading-relaxed line-clamp-3">
                          {item.summary}
                        </p>
                      </div>

                      {/* Card Footer / Action */}
                      <div className="pt-4 border-t border-[rgba(200,188,167,0.12)] flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setActiveModalItem(item)}
                          className="inline-flex items-center gap-1.5 text-xs font-arabic font-bold text-[var(--color-brand-sand)] hover:text-[var(--color-brand-linen)] transition-colors group cursor-pointer"
                        >
                          <span>{t('قراءة المزيد', 'Read more')}</span>
                          <ForwardChevron className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleShare(item)}
                          className="p-1.5 rounded-lg text-[rgb(var(--color-brand-sand-rgb)_/_0.7)] hover:text-[var(--color-brand-sand)] hover:bg-[rgba(64,55,45,0.4)] transition-colors cursor-pointer"
                          title={t('مشاركة', 'Share')}
                          aria-label={t(`مشاركة ${item.title}`, `Share ${item.title}`)}
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            /* Clean Empty State (Zero Fake Data) */
            <div className="text-center py-20 px-6 bg-[rgba(64,55,45,0.2)] rounded-3xl border border-[rgba(200,188,167,0.15)] max-w-lg mx-auto space-y-4">
              <Coffee className="w-12 h-12 text-[var(--color-brand-sand)] mx-auto opacity-50" />
              <h3 className="font-kufi text-xl sm:text-2xl font-bold text-[var(--color-brand-linen)]">
                {isLoading ? t('جاري تحميل المستجدات...', 'Loading news...') : t('لا توجد مستجدات منشورة حالياً', 'No news has been published yet')}
              </h3>
              <p className="font-arabic text-sm text-[var(--color-brand-sand)] leading-relaxed">
                {t('ترقبوا قريباً جديد هاجس — يمكنكم متابعة حساباتنا الرسمية لمعرفة آخر الأخبار وأحدث المحاصيل أولاً بأول، أو زيارة المقهى في داني سكوير بحائل.', 'Stay tuned for what\'s new at Hajiss — follow our official accounts for the latest news and newest beans, or visit the café at Dani Square in Hail.')}
              </p>
              <button
                type="button"
                onClick={() => onNavigate('visit')}
                className="mt-3 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[var(--color-brand-sand)] text-[var(--color-brand-black)] font-arabic text-xs font-bold hover:bg-[var(--color-brand-linen)] transition-colors cursor-pointer"
              >
                {t('زيارة فرع هاجس في حائل', 'Visit Hajiss in Hail')}
              </button>
            </div>
          )}

          {/* STAY CONNECTED SECTION (Clean, without fake input holder) */}
          <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#2B180E] to-[#1A1612] border border-[rgba(200,188,167,0.2)] relative overflow-hidden text-start">
            <div className="absolute top-0 start-0 w-80 h-80 bg-[radial-gradient(circle,rgba(200,188,167,0.1)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-3xl mx-auto space-y-5 relative z-10 text-center sm:text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(64,55,45,0.6)] border border-[rgba(200,188,167,0.2)] text-xs font-arabic text-[var(--color-brand-sand)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t('تواصل مع هاجس', 'Connect with Hajiss')}</span>
              </div>

              <h3 className="font-kufi text-2xl sm:text-3xl font-bold text-[var(--color-brand-linen)]">
                {t('تابع يوميات هاجس وأحدث الفعاليات القادمة', 'Follow daily life at Hajiss and our upcoming events')}
              </h3>

              <p className="font-arabic text-sm sm:text-base text-[rgb(var(--color-brand-linen-rgb)_/_0.85)] font-light leading-relaxed">
                {t('يسعدنا انضمامكم لمجتمع هاجس عبر قنوات التواصل الاجتماعي لمتابعة كواليس التحميص، وصول المحاصيل الحصرية، وأمسيات حائل.', 'Join the Hajiss community on social media to go behind the scenes of roasting, catch exclusive bean arrivals, and enjoy Hail evenings with us.')}
              </p>

              {/* Direct Social Channels */}
              <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-arabic text-[var(--color-brand-sand)]">
                <span className="font-bold text-[var(--color-brand-linen)]">{t('قنواتنا الرسمية:', 'Our official channels:')}</span>
                <a
                  href={brandData.contact.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[rgba(64,55,45,0.5)] border border-[rgba(200,188,167,0.2)] hover:border-[var(--color-brand-sand)] hover:text-white transition-colors"
                >
                  {t('إنستغرام', 'Instagram')}
                </a>
                <a
                  href={brandData.contact.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[rgba(64,55,45,0.5)] border border-[rgba(200,188,167,0.2)] hover:border-[var(--color-brand-sand)] hover:text-white transition-colors"
                >
                  {t('تيك توك', 'TikTok')}
                </a>
                <a
                  href={brandData.contact.snapchat}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[rgba(64,55,45,0.5)] border border-[rgba(200,188,167,0.2)] hover:border-[var(--color-brand-sand)] hover:text-white transition-colors"
                >
                  {t('سناب شات', 'Snapchat')}
                </a>
                <a
                  href={brandData.contact.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[rgba(64,55,45,0.5)] border border-[rgba(200,188,167,0.2)] hover:border-[var(--color-brand-sand)] hover:text-white transition-colors"
                >
                  {t('منصة إكس', 'X')}
                </a>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* DETAILED ARTICLE MODAL */}
      {activeModalItem && (() => {
        const isVideo = activeModalItem.mediaType === 'video';
        const badges = (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] sm:text-xs font-arabic font-semibold px-3 py-1 rounded-full bg-[rgba(26,22,18,0.75)] backdrop-blur-md text-[var(--color-brand-sand)] border border-[rgba(200,188,167,0.3)]">
              {categoryLabel(activeModalItem)}
            </span>
            {activeModalItem.badge && (
              <span className="text-[11px] sm:text-xs font-arabic font-semibold px-3 py-1 rounded-full bg-[var(--color-brand-olive)] text-[var(--color-brand-linen)]">
                {activeModalItem.badge}
              </span>
            )}
            {isVideo && (
              <span className="text-[11px] sm:text-xs font-arabic font-semibold px-3 py-1 rounded-full bg-black/70 text-[var(--color-brand-sand)] border border-[rgba(200,188,167,0.25)] flex items-center gap-1">
                <Film className="w-3 h-3" /> {t('مقطع فيديو', 'Video')}
              </span>
            )}
          </div>
        );
        const heading = (
          <div className="space-y-2">
            <h2
              id="modal-article-title"
              dir="auto"
              className="font-kufi text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--color-brand-linen)] leading-snug drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]"
            >
              {activeModalItem.title}
            </h2>
            {activeModalItem.subtitle && (
              <p dir="auto" className="font-arabic text-sm sm:text-base text-[var(--color-brand-sand)]">
                {activeModalItem.subtitle}
              </p>
            )}
          </div>
        );

        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md news-modal-backdrop"
            onClick={() => setActiveModalItem(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-article-title"
          >
            <div
              className="news-modal-dialog relative flex w-full max-w-3xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[min(calc(100dvh-3rem),880px)] flex-col overflow-hidden rounded-3xl border border-[rgba(200,188,167,0.3)] bg-[#231D17] text-start shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating actions: stay visible while the article scrolls */}
              <div className="absolute top-3 end-3 z-30 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleShare(activeModalItem)}
                  className="w-9 h-9 grid place-items-center rounded-full bg-[rgba(26,22,18,0.7)] backdrop-blur-md border border-[rgba(200,188,167,0.3)] text-[var(--color-brand-sand)] hover:bg-[rgba(26,22,18,0.9)] transition-colors cursor-pointer"
                  title={t('مشاركة', 'Share')}
                  aria-label={t('مشاركة المستجد', 'Share this story')}
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="w-9 h-9 grid place-items-center rounded-full bg-[rgba(26,22,18,0.7)] backdrop-blur-md border border-[rgba(200,188,167,0.3)] text-[var(--color-brand-linen)] hover:bg-[rgba(26,22,18,0.9)] transition-colors cursor-pointer"
                  aria-label={t('إغلاق النافذة', 'Close')}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable article */}
              <div className="min-h-0 flex-1 overflow-y-auto custom-news-scrollbar">
                {/* Cover: images carry the category and title; videos keep their controls clear */}
                {isVideo ? (
                  <div className="bg-black aspect-video max-h-[50vh] w-full">
                    <video
                      src={activeModalItem.videoUrl || activeModalItem.image}
                      controls
                      autoPlay
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="relative h-60 sm:h-80 overflow-hidden">
                    <img
                      src={activeModalItem.image}
                      alt={activeModalItem.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#231D17] via-[rgba(35,29,23,0.3)] to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 sm:px-8 sm:pb-6 space-y-3">
                      {badges}
                      {heading}
                    </div>
                  </div>
                )}

                <div className="px-6 pb-8 pt-5 sm:px-8 space-y-6">
                  {isVideo && (
                    <div className="space-y-3 pt-1">
                      {badges}
                      {heading}
                    </div>
                  )}

                  {/* Meta details */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pb-5 border-b border-[rgba(200,188,167,0.12)] text-xs font-arabic text-[var(--color-brand-sand)]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {postDate(activeModalItem)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {activeModalItem.readTime}
                    </span>
                    {activeModalItem.author && (
                      <span>
                        {t('بواسطة:', 'By:')} <b className="text-[var(--color-brand-linen)]">{activeModalItem.author.name}</b>
                        {activeModalItem.author.role && <span className="opacity-80"> · {activeModalItem.author.role}</span>}
                      </span>
                    )}
                  </div>

                  {/* Lead paragraph with a clean accent bar */}
                  <p dir="auto" className="relative ps-5 font-arabic text-base sm:text-lg text-[rgb(var(--color-brand-linen-rgb)_/_0.95)] leading-relaxed font-medium">
                    <span aria-hidden="true" className="absolute start-0 top-1 bottom-1 w-1 rounded-full bg-[var(--color-brand-sand)]" />
                    {activeModalItem.content?.lead || activeModalItem.summary}
                  </p>

                  {/* Content Sections */}
                  {activeModalItem.content?.sections && activeModalItem.content.sections.length > 0 && (
                    <div className="space-y-6 font-arabic text-sm sm:text-base leading-loose text-[rgb(var(--color-brand-linen-rgb)_/_0.85)]">
                      {activeModalItem.content.sections.map((section, idx) => (
                        <div key={idx} className="space-y-3">
                          {section.heading && (
                            <h3 className="font-kufi text-lg sm:text-xl font-bold text-[var(--color-brand-sand)]">
                              {section.heading}
                            </h3>
                          )}
                          {section.paragraphs?.map((p, pIdx) => (
                            <p key={pIdx} dir="auto">{p}</p>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights Box */}
                  {activeModalItem.content?.highlights && activeModalItem.content.highlights.length > 0 && (
                    <div className="p-5 rounded-2xl bg-[rgba(64,55,45,0.4)] border border-[rgba(200,188,167,0.2)] space-y-3">
                      <h4 className="font-kufi text-sm sm:text-base font-bold text-[var(--color-brand-sand)] flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[var(--color-brand-sand)]" />
                        {t('أبرز التفاصيل والمواصفات:', 'Highlights and details:')}
                      </h4>
                      <ul className="space-y-2 font-arabic text-xs sm:text-sm text-[var(--color-brand-linen)]">
                        {activeModalItem.content.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-sand)] flex-shrink-0" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Quote if present */}
                  {activeModalItem.content?.quote && (
                    <blockquote className="relative ps-5 font-kufi text-base sm:text-lg text-[var(--color-brand-sand)] leading-relaxed">
                      <span aria-hidden="true" className="absolute start-0 top-1 bottom-1 w-1 rounded-full bg-[var(--color-brand-sand)]" />
                      “{activeModalItem.content.quote}”
                    </blockquote>
                  )}

                  {/* Tags */}
                  {activeModalItem.tags && activeModalItem.tags.length > 0 && (
                    <div className="pt-2 flex flex-wrap gap-2">
                      {activeModalItem.tags.map((tag) => (
                        <span
                          key={tag}
                          dir="auto"
                          className="text-xs font-arabic px-3 py-1 rounded-full bg-[rgba(64,55,45,0.5)] text-[var(--color-brand-sand)] border border-[rgba(200,188,167,0.15)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer CTA */}
              <div className="shrink-0 px-4 py-3 sm:px-6 sm:py-4 border-t border-[rgba(200,188,167,0.15)] bg-[rgba(43,24,14,0.9)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModalItem(null);
                      onNavigate('visit');
                    }}
                    className="px-5 py-2 rounded-xl bg-[var(--color-brand-sand)] text-[var(--color-brand-black)] hover:bg-[var(--color-brand-linen)] font-arabic text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                  >
                    {t('زيارة فرع هاجس في حائل', 'Visit Hajiss in Hail')}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveModalItem(null);
                      onNavigate('menu');
                    }}
                    className="px-4 py-2 rounded-xl bg-[rgba(64,55,45,0.5)] hover:bg-[rgba(64,55,45,0.8)] text-[var(--color-brand-linen)] border border-[rgba(200,188,167,0.2)] font-arabic text-xs sm:text-sm font-medium transition-colors cursor-pointer"
                  >
                    {t('استعراض القائمة', 'View the menu')}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleShare(activeModalItem)}
                  className="inline-flex items-center gap-1.5 text-xs font-arabic text-[var(--color-brand-sand)] hover:underline cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{t('مشاركة هذا المستجد', 'Share this story')}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Copy link feedback toast */}
      {copiedLink && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--color-brand-sand)] text-[var(--color-brand-black)] px-4 py-2.5 rounded-full shadow-2xl font-arabic text-xs font-bold flex items-center gap-2 animate-bounce">
          <Check className="w-4 h-4" />
          <span>{t('تم نسخ الرابط بنجاح!', 'Link copied!')}</span>
        </div>
      )}

      {/* Luxury Footer */}
      <Footer onNavigate={onNavigate} onOpenCookieSettings={onOpenCookieSettings} />
    </div>
  );
};
