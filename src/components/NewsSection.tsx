import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Clock, ChevronLeft, ArrowLeft, Play } from 'lucide-react';
import { getStoredNews } from '../utils/newsStorage';
import type { NewsItem } from '../data/news';

interface NewsSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate }) => {
  const [items, setItems] = useState<NewsItem[]>(() => getStoredNews());

  useEffect(() => {
    const handleUpdate = () => setItems(getStoredNews());
    window.addEventListener('hajiss_news_updated', handleUpdate);
    return () => window.removeEventListener('hajiss_news_updated', handleUpdate);
  }, []);

  // If there are no published items yet, hide section from landing page
  if (items.length === 0) {
    return null;
  }

  // Take top 3 latest updates
  const topUpdates = items.slice(0, 3);

  return (
    <section
      id="news-section"
      className="relative w-full py-20 sm:py-24 bg-[#1f1a15] text-[var(--color-brand-linen)] border-t border-[rgba(200,188,167,0.15)] overflow-hidden"
      dir="rtl"
    >
      {/* Ambient background decoration */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(200,188,167,0.06)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle,rgba(120,91,64,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 text-right max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(64,55,45,0.6)] border border-[rgba(200,188,167,0.25)] text-xs font-arabic text-[var(--color-brand-sand)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>مستجدات هاجس • حائل</span>
            </div>
            <h2 className="visual-section-title font-kufi text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--color-brand-linen)]">
              مستجدات <span className="text-[var(--color-brand-sand)]">هاجس</span>
            </h2>
            <p className="font-arabic text-sm sm:text-base text-[rgb(var(--color-brand-linen-rgb)_/_0.8)] font-light leading-relaxed">
              ابقَ على اطلاع دائم بأحدث محاصيل القهوة المختصة، فعاليات ليالي الشتاء في داني سكوير، وأخبار مجتمع هاجس في حائل.
            </p>
          </div>

          <div className="flex-shrink-0">
            <button
              type="button"
              onClick={() => onNavigate('news')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--color-brand-sand)] text-[var(--color-brand-black)] hover:bg-[var(--color-brand-linen)] font-arabic text-sm font-bold transition-all shadow-md group cursor-pointer"
            >
              <span>استكشف كافة المستجدات</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </button>
          </div>
        </div>

        {/* 3 Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {topUpdates.map((item) => (
            <article
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-[rgba(200,188,167,0.18)] bg-[rgba(43,24,14,0.45)] hover:bg-[rgba(43,24,14,0.7)] hover:border-[rgba(200,188,167,0.4)] transition-all duration-300 overflow-hidden shadow-lg hover:-translate-y-1.5"
            >
              {/* Media Wrap */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-black">
                {item.mediaType === 'video' ? (
                  <div className="w-full h-full relative">
                    <video
                      src={item.videoUrl || item.image}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <span className="w-9 h-9 rounded-full bg-black/60 border border-[var(--color-brand-sand)] flex items-center justify-center text-[var(--color-brand-sand)]">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </span>
                    </div>
                  </div>
                ) : (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,22,18,0.75)] via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 right-3 flex items-center gap-2">
                  <span className="bg-[rgba(43,24,14,0.85)] backdrop-blur-md text-[var(--color-brand-sand)] border border-[rgba(200,188,167,0.25)] text-[11px] font-arabic font-semibold px-2.5 py-0.5 rounded-md">
                    {item.categoryLabel}
                  </span>
                  {item.badge && (
                    <span className="bg-[var(--color-brand-olive)] text-[var(--color-brand-linen)] text-[11px] font-arabic font-semibold px-2.5 py-0.5 rounded-md">
                      {item.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4 text-right">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-[11px] font-arabic text-[rgb(var(--color-brand-sand-rgb)_/_0.8)]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="font-kufi text-lg font-bold text-[var(--color-brand-linen)] group-hover:text-[var(--color-brand-sand)] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="font-arabic text-xs sm:text-sm text-[rgb(var(--color-brand-linen-rgb)_/_0.75)] leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-[rgba(200,188,167,0.12)] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => onNavigate('news')}
                    className="inline-flex items-center gap-1 text-xs font-arabic font-bold text-[var(--color-brand-sand)] hover:text-[var(--color-brand-linen)] transition-colors cursor-pointer"
                  >
                    <span>قراءة الخبر</span>
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  {item.tags?.[0] && (
                    <span className="text-[11px] font-arabic text-[rgb(var(--color-brand-sand-rgb)_/_0.6)]">
                      #{item.tags[0]}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
