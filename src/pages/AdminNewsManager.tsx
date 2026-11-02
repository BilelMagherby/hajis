import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Check, Edit, ExternalLink, Eye, FileText, Film, Image as ImageIcon, Loader2, Play, Plus,
  RotateCcw, Search, Send, Sparkles, Trash2, Upload, X
} from 'lucide-react';
import type { NewsItem } from '../data/news';
import { newsCategories } from '../data/news';
import {
  createBlogPost, deleteBlogPost, fetchBlogPosts, updateBlogPost, uploadBlogMedia, type BlogPostInput
} from '../utils/blogApi';
import { SessionExpiredError } from '../utils/socialHub';

const presetMediaOptions = [
  { label: 'كيس المحصول', url: '/images/coffee_bag_cup.jpg' },
  { label: 'طقوس V60', url: '/images/v60-ritual.png' },
  { label: 'مشروبات هاجس', url: '/images/about_cafe_drinks.png' },
  { label: 'جلسات التراس', url: '/images/lounge_terrace.jpg' },
  { label: 'تحميص البن', url: '/images/roaster_beans.jpg' },
  { label: 'كاونتر المقهى', url: '/images/hero-cafe-counter.jpeg' },
];

export const AdminNewsManager: React.FC<{
  onCountChange?: (count: number) => void;
  onSessionExpired: () => void;
}> = ({ onCountChange, onSessionExpired }) => {
  // News & Blog CRUD State
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogSubtitle, setBlogSubtitle] = useState('');
  const [blogCategory, setBlogCategory] = useState<string>('crops');
  const [blogMediaType, setBlogMediaType] = useState<'image' | 'video'>('image');
  const [blogMediaUrl, setBlogMediaUrl] = useState('');
  const [blogSummary, setBlogSummary] = useState('');
  const [blogContentLead, setBlogContentLead] = useState('');
  const [blogContentBody, setBlogContentBody] = useState('');
  const [blogBadge, setBlogBadge] = useState('');
  const [blogFeatured, setBlogFeatured] = useState(false);
  const [blogReadTime, setBlogReadTime] = useState('قراءة في 3 دقائق');
  const [blogTagsInput, setBlogTagsInput] = useState('قهوة_مختصة هاجس حائل');
  const [blogAuthorName, setBlogAuthorName] = useState('فريق باريستا هاجس');
  const [blogAuthorRole, setBlogAuthorRole] = useState('خبراء الجودة');
  const [blogFeedback, setBlogFeedback] = useState('');
  const [newsSearch, setNewsSearch] = useState('');
  const [newsFilterCat, setNewsFilterCat] = useState('all');
  const [previewArticle, setPreviewArticle] = useState<NewsItem | null>(null);

  useEffect(() => {
    onCountChange?.(newsList.length);
  }, [newsList.length, onCountChange]);

  const errorMessage = useCallback((error: unknown, fallback: string) => {
    if (error instanceof SessionExpiredError) {
      onSessionExpired();
      return '';
    }
    return error instanceof Error && error.message ? error.message : fallback;
  }, [onSessionExpired]);

  const loadPosts = useCallback((signal?: AbortSignal) => fetchBlogPosts(signal)
    .then((items) => setNewsList(items))
    .catch((error) => {
      if (!signal?.aborted) setBlogFeedback(errorMessage(error, 'تعذر تحميل التدوينات من الخادم.'));
    })
    .finally(() => {
      if (!signal?.aborted) setIsLoading(false);
    }), [errorMessage]);

  useEffect(() => {
    const controller = new AbortController();
    void loadPosts(controller.signal);
    return () => controller.abort();
  }, [loadPosts]);

  // Handle Blog Media (Image/Video) file upload — stored on the blog server, not in the browser
  const handleBlogMediaUpload: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const input = e.currentTarget;
    const file = input.files?.[0];
    input.value = '';
    if (!file) return;

    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setBlogFeedback('يرجى اختيار ملف صورة أو مقطع فيديو صالح.');
      return;
    }

    setIsUploading(true);
    setBlogFeedback('جاري رفع الملف إلى الخادم...');
    try {
      const uploaded = await uploadBlogMedia(file);
      setBlogMediaType(uploaded.mediaType);
      setBlogMediaUrl(uploaded.url);
      setBlogFeedback(`تم رفع ${uploaded.mediaType === 'video' ? 'الفيديو' : 'الصورة'} بنجاح.`);
    } catch (error) {
      setBlogFeedback(errorMessage(error, 'تعذر رفع الملف.'));
    } finally {
      setIsUploading(false);
    }
  };

  const buildPayload = (): BlogPostInput => {
    const paragraphs = blogContentBody
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    return {
      title: blogTitle.trim(),
      subtitle: blogSubtitle.trim(),
      category: blogCategory,
      readTime: blogReadTime.trim(),
      mediaType: blogMediaType,
      mediaUrl: blogMediaUrl.trim(),
      badge: blogBadge.trim() || undefined,
      featured: blogFeatured,
      summary: blogSummary.trim(),
      author: { name: blogAuthorName.trim(), role: blogAuthorRole.trim() },
      tags: blogTagsInput.replace(/#/g, '').split(/[,\s]+/).map((t) => t.trim()).filter(Boolean),
      content: {
        lead: blogContentLead.trim(),
        sections: paragraphs.length > 0 ? [{ paragraphs }] : [],
      },
    };
  };

  // Blog CRUD - Save (Create / Update)
  const handleSaveBlogItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim()) {
      setBlogFeedback('يرجى كتابة عنوان التدوينة أو الخبر.');
      return;
    }
    if (!blogSummary.trim()) {
      setBlogFeedback('يرجى كتابة ملخص أو نبذة سريعة عن الموضوع.');
      return;
    }
    if (blogMediaType === 'video' && !blogMediaUrl.trim()) {
      setBlogFeedback('يرجى رفع مقطع فيديو أو إدخال رابطه.');
      return;
    }

    setIsSaving(true);
    try {
      if (editingId) {
        const saved = await updateBlogPost(editingId, buildPayload());
        setNewsList((list) => list.map((item) => (item.id === saved.id ? saved : item)));
        handleCancelEdit();
        setBlogFeedback('✓ تم حفظ التعديلات وتحديث التدوينة على الموقع بنجاح.');
      } else {
        const saved = await createBlogPost(buildPayload());
        setNewsList((list) => [saved, ...list]);
        handleCancelEdit();
        setBlogFeedback('✓ تم نشر التدوينة بنجاح وظهرت في صفحة مستجدات هاجس.');
      }
    } catch (error) {
      setBlogFeedback(errorMessage(error, 'تعذر حفظ التدوينة.'));
    } finally {
      setIsSaving(false);
    }
  };

  // Blog CRUD - Start Edit
  const handleStartEdit = (item: NewsItem) => {
    setEditingId(item.id);
    setBlogTitle(item.title);
    setBlogSubtitle(item.subtitle || '');
    setBlogCategory(item.category || 'crops');
    setBlogMediaType(item.mediaType || 'image');
    setBlogMediaUrl(item.mediaType === 'video' ? (item.videoUrl || item.image) : item.image);
    setBlogSummary(item.summary || '');
    setBlogContentLead(item.content?.lead || item.summary || '');
    setBlogContentBody(item.content?.sections?.flatMap((s) => s.paragraphs).join('\n\n') || '');
    setBlogBadge(item.badge || '');
    setBlogFeatured(!!item.featured);
    setBlogReadTime(item.readTime || 'قراءة في 3 دقائق');
    setBlogTagsInput(item.tags?.join(' ') || '');
    setBlogAuthorName(item.author?.name || 'فريق باريستا هاجس');
    setBlogAuthorRole(item.author?.role || 'خبراء الجودة');
    setBlogFeedback(`جاري تعديل: "${item.title}" — حدّث البيانات ثم اضغط حفظ.`);
    document.getElementById('blog-composer-heading')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Blog CRUD - Cancel Edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setBlogTitle('');
    setBlogSubtitle('');
    setBlogCategory('crops');
    setBlogMediaType('image');
    setBlogMediaUrl('');
    setBlogSummary('');
    setBlogContentLead('');
    setBlogContentBody('');
    setBlogBadge('');
    setBlogFeatured(false);
    setBlogReadTime('قراءة في 3 دقائق');
    setBlogTagsInput('قهوة_مختصة هاجس حائل');
  };

  // Blog CRUD - Delete
  const handleDeleteBlogItem = async (id: string, title: string) => {
    if (!window.confirm(`هل أنت متأكد من حذف خبر / تدوينة: "${title}"؟`)) return;
    try {
      await deleteBlogPost(id);
      setNewsList((list) => list.filter((item) => item.id !== id));
      if (editingId === id) handleCancelEdit();
      setBlogFeedback('تم حذف التدوينة بنجاح.');
    } catch (error) {
      setBlogFeedback(errorMessage(error, 'تعذر حذف التدوينة.'));
    }
  };

  // Filtered news for admin table
  const filteredAdminNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchCat = newsFilterCat === 'all' || item.category === newsFilterCat;
      const q = newsSearch.trim().toLowerCase();
      if (!q) return matchCat;
      const matchText =
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.summary.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchCat && matchText;
    });
  }, [newsList, newsFilterCat, newsSearch]);


  return (
          <div className="admin-content">
            <div className="admin-page-heading">
              <div>
                <span className="admin-eyebrow">إدارة المقالات والأخبار</span>
                <h1 id="blog-composer-heading">مستجدات هاجس والمدونة</h1>
                <p>أنشئ وحرّر وانشر واحذف التدوينات والأخبار والصور ومقاطع الفيديو مباشرة على الموقع.</p>
              </div>
              <div className="admin-heading-actions">
                <a
                  href="/news"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-zoho-button"
                  title="عرض صفحة مستجدات هاجس كما يراها الزوار"
                >
                  <ExternalLink size={16} /> استعراض الصفحة العامة
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    void loadPosts();
                  }}
                  className="admin-secondary-button"
                  title="إعادة تحميل التدوينات من الخادم"
                  disabled={isLoading}
                >
                  <RotateCcw size={16} /> تحديث القائمة
                </button>
              </div>
            </div>

            {/* KPI STATS ROW */}
            <div className="admin-blog-kpis">
              <article>
                <span>إجمالي المقالات والأخبار</span>
                <b>{newsList.length}</b>
                <small>منشور على الموقع</small>
              </article>
              <article>
                <span>المستجدات المميزة</span>
                <b>{newsList.filter((n) => n.featured).length}</b>
                <small>تتصدر الصفحة الرئيسية</small>
              </article>
              <article>
                <span>المحتوى المرئي (فيديو)</span>
                <b>{newsList.filter((n) => n.mediaType === 'video').length}</b>
                <small>مقاطع مرئية</small>
              </article>
              <article>
                <span>المحتوى الصوري</span>
                <b>{newsList.filter((n) => n.mediaType !== 'video').length}</b>
                <small>ألبومات وصور</small>
              </article>
            </div>

            {blogFeedback && (
              <div className="admin-notice" style={{ borderColor: 'rgba(200,188,167,0.4)', background: 'rgba(64,55,45,0.4)' }}>
                <Sparkles size={17} />
                <span>{blogFeedback}</span>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="mr-auto text-xs text-[var(--color-brand-sand)] hover:underline"
                  >
                    إلغاء التعديل
                  </button>
                )}
              </div>
            )}

            {/* COMPOSER & PREVIEW 2-COLUMN LAYOUT */}
            <div className="admin-blog-layout">
              {/* COMPOSER FORM (CREATE / EDIT) */}
              <article className="admin-panel admin-composer">
                <div className="admin-panel-heading">
                  <div>
                    <h2>{editingId ? 'تعديل التدوينة / الخبر' : 'إنشاء تدوينة أو خبر جديد'}</h2>
                    <p>{editingId ? 'قم بتحديث الحقول واضغط حفظ التعديلات.' : 'املأ الحقول التالية لنشر التدوينة فوراً.'}</p>
                  </div>
                  {editingId ? <Edit size={20} /> : <Plus size={20} />}
                </div>

                <form onSubmit={handleSaveBlogItem} className="space-y-4">
                  {/* Title & Subtitle */}
                  <div>
                    <label className="admin-field-label">عنوان التدوينة / الخبر *</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      placeholder="مثال: تدشين محصول كولومبيا غيشا الحصري..."
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <label className="admin-field-label">العنوان الفرعي (اختياري)</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      placeholder="مثال: تجربة تقطير استثنائية ونوتات عطرية فاخرة..."
                      value={blogSubtitle}
                      onChange={(e) => setBlogSubtitle(e.target.value)}
                    />
                  </div>

                  {/* Category & Badge */}
                  <div className="admin-blog-form-row">
                    <div>
                      <label className="admin-field-label">التصنيف</label>
                      <select
                        className="admin-select-input"
                        value={blogCategory}
                        onChange={(e) => setBlogCategory(e.target.value)}
                      >
                        {newsCategories.filter((c) => c.id !== 'all').map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="admin-field-label">شارة ترويجية (Badge)</label>
                      <input
                        type="text"
                        className="admin-input-text"
                        placeholder="مثال: محصول الموسم، حصري، جديد"
                        value={blogBadge}
                        onChange={(e) => setBlogBadge(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Media Type Selection (Image or Video) */}
                  <div>
                    <label className="admin-field-label">نوع الوسائط المرفقة</label>
                    <div className="admin-media-type-select">
                      <button
                        type="button"
                        className={`admin-media-type-btn ${blogMediaType === 'image' ? 'is-selected' : ''}`}
                        onClick={() => setBlogMediaType('image')}
                      >
                        <ImageIcon size={16} /> صورة فوتوغرافية
                      </button>
                      <button
                        type="button"
                        className={`admin-media-type-btn ${blogMediaType === 'video' ? 'is-selected' : ''}`}
                        onClick={() => setBlogMediaType('video')}
                      >
                        <Film size={16} /> مقطع فيديو
                      </button>
                    </div>

                    {/* File Upload / Drag & Drop Box */}
                    <label className="admin-upload-box">
                      <input
                        type="file"
                        accept={blogMediaType === 'video' ? 'video/mp4,video/webm' : 'image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm'}
                        onChange={handleBlogMediaUpload}
                        disabled={isUploading}
                      />
                      {isUploading ? <Loader2 size={19} className="animate-spin" /> : <Upload size={19} />}
                      <span>{isUploading ? 'جاري الرفع...' : blogMediaType === 'video' ? 'ارفع مقطع فيديو من جهازك' : 'ارفع صورة أو فيديو من جهازك'}</span>
                      <small>يدعم ملفات MP4, WebM, PNG, JPG, WEBP (تُحفظ على خادم الموقع)</small>
                    </label>

                    {/* Or URL input */}
                    <div className="pt-2">
                      <input
                        type="text"
                        className="admin-input-text"
                        placeholder={blogMediaType === 'video' ? 'أو أدخل رابط الفيديو المباشر (URL)...' : 'أو أدخل رابط الصورة المباشر (URL)...'}
                        value={blogMediaUrl}
                        onChange={(e) => setBlogMediaUrl(e.target.value)}
                      />
                    </div>

                    {/* Quick Preset Images */}
                    <div className="pt-2">
                      <span className="text-xs text-[#b9ad9a]">أو اختر بسرعة من وسائط هاجس المتوفرة:</span>
                      <div className="admin-preset-images">
                        {presetMediaOptions.map((opt) => (
                          <button
                            key={opt.url}
                            type="button"
                            onClick={() => {
                              setBlogMediaUrl(opt.url);
                              setBlogMediaType('image');
                            }}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Summary / Excerpt */}
                  <div>
                    <label className="admin-field-label">ملخص التدوينة (يظهر في البطاقات الرئيسية) *</label>
                    <textarea
                      className="admin-input-text"
                      rows={3}
                      placeholder="ملخص شيق يشجع الزائر على القراءة..."
                      value={blogSummary}
                      onChange={(e) => setBlogSummary(e.target.value)}
                      required
                    />
                  </div>

                  {/* Lead & Full Body */}
                  <div>
                    <label className="admin-field-label">المقدمة الإرشادية (Lead)</label>
                    <input
                      type="text"
                      className="admin-input-text"
                      placeholder="السطر الافتتاحي البارز للمقالة..."
                      value={blogContentLead}
                      onChange={(e) => setBlogContentLead(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="admin-field-label">نص المقالة الكامل (فقرات المحتوى)</label>
                    <textarea
                      className="admin-input-text"
                      rows={5}
                      placeholder="اكتب تفاصيل التدوينة الكاملة هنا... (افصل بين الفقرات بسطر فارغ)"
                      value={blogContentBody}
                      onChange={(e) => setBlogContentBody(e.target.value)}
                    />
                  </div>

                  {/* Read Time & Tags */}
                  <div className="admin-blog-form-row">
                    <div>
                      <label className="admin-field-label">وقت القراءة التقديري</label>
                      <input
                        type="text"
                        className="admin-input-text"
                        placeholder="مثال: قراءة في دقيقتين"
                        value={blogReadTime}
                        onChange={(e) => setBlogReadTime(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="admin-field-label">الوسوم (مفصولة بمسافات)</label>
                      <input
                        type="text"
                        className="admin-input-text"
                        placeholder="قهوة_مختصة V60 حائل"
                        value={blogTagsInput}
                        onChange={(e) => setBlogTagsInput(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Author details */}
                  <div className="admin-blog-form-row">
                    <div>
                      <label className="admin-field-label">اسم الكاتب / الفريق</label>
                      <input
                        type="text"
                        className="admin-input-text"
                        value={blogAuthorName}
                        onChange={(e) => setBlogAuthorName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="admin-field-label">الصفة / الدور</label>
                      <input
                        type="text"
                        className="admin-input-text"
                        value={blogAuthorRole}
                        onChange={(e) => setBlogAuthorRole(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Featured Toggle */}
                  <label className="admin-checkbox-label">
                    <input
                      type="checkbox"
                      checked={blogFeatured}
                      onChange={(e) => setBlogFeatured(e.target.checked)}
                    />
                    <span>تمييز هذا المستجد ليكون في الصدارة (Featured Story)</span>
                  </label>

                  {/* Form Action Buttons */}
                  <div className="admin-form-actions pt-2">
                    <button type="submit" className="admin-primary-button" disabled={isSaving || isUploading}>
                      {isSaving ? <Loader2 size={16} className="animate-spin" /> : editingId ? <Check size={16} /> : <Send size={16} />}
                      <span>{isSaving ? 'جاري الحفظ...' : editingId ? 'حفظ التعديلات وتحديث المقال' : 'نشر التدوينة على الموقع'}</span>
                    </button>

                    {editingId && (
                      <button type="button" className="admin-secondary-button" onClick={handleCancelEdit}>
                        <X size={16} /> إلغاء التعديل
                      </button>
                    )}
                  </div>
                </form>
              </article>

              {/* LIVE PREVIEW COLUMN */}
              <aside className="admin-preview-column">
                <article className="admin-panel">
                  <div className="admin-panel-heading">
                    <div>
                      <h2>معاينة حية للبطاقة</h2>
                      <p>هكذا ستظهر للزوار في صفحة مستجدات هاجس</p>
                    </div>
                    <span className="admin-live-dot">معاينة</span>
                  </div>

                  <div className="admin-preview-stage-box">
                    {blogMediaType === 'video' ? (
                      <div className="relative w-full h-48 bg-black flex items-center justify-center">
                        <video
                          src={blogMediaUrl || '/images/espresso_pour.jpg'}
                          controls
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black/70 text-[var(--color-brand-sand)] text-[10px] px-2 py-0.5 rounded border border-[rgba(200,188,167,0.3)] flex items-center gap-1">
                          <Film size={12} /> مقطع فيديو
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-48 bg-[#231d17]">
                        <img
                          src={blogMediaUrl || '/images/coffee_bag_cup.jpg'}
                          alt="معاينة"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="p-4 text-right space-y-2 bg-[rgba(35,29,23,0.9)]">
                      <div className="flex items-center justify-between text-xs text-[#c8bca7]">
                        <span>{newsCategories.find((c) => c.id === blogCategory)?.label || 'مستجدات'}</span>
                        <span>{blogReadTime || 'قراءة في 3 دقائق'}</span>
                      </div>
                      <h3 className="font-kufi text-base font-bold text-[#f5f1e7] leading-snug">
                        {blogTitle || 'عنوان التدوينة أو المستجد سيظهر هنا'}
                      </h3>
                      <p className="font-arabic text-xs text-[#d1c7b8] line-clamp-3">
                        {blogSummary || 'الملخص والنص الترويجي للتدوينة سيظهر هنا بشكل جذاب للزائر...'}
                      </p>
                      {blogBadge && (
                        <div className="pt-1">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--color-brand-olive)] text-[#f5f1e7]">
                            {blogBadge}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-xs text-[#b9ad9a] flex items-center justify-between pt-2">
                    <span>الكاتب: <b>{blogAuthorName}</b></span>
                    {blogFeatured && <span className="text-[var(--color-brand-sand)]">★ مميز في الصدارة</span>}
                  </div>
                </article>
              </aside>
            </div>

            {/* FULL BLOG CRUD TABLE / LIST */}
            <article className="admin-panel admin-blog-list-panel">
              <div className="admin-panel-heading">
                <div>
                  <h2>سجل المقالات والتدوينات ({newsList.length})</h2>
                  <p>استعرض أو عدّل أو احذف أي خبر أو مقال من الموقع.</p>
                </div>
                <FileText size={20} />
              </div>

              {/* Table search & filter */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-4">
                <div className="relative flex-1 max-w-md">
                  <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#c8bca7]" />
                  <input
                    type="text"
                    placeholder="ابحث في العناوين أو الوسوم..."
                    value={newsSearch}
                    onChange={(e) => setNewsSearch(e.target.value)}
                    className="admin-input-text pr-9"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    className="admin-select-input text-xs"
                    value={newsFilterCat}
                    onChange={(e) => setNewsFilterCat(e.target.value)}
                  >
                    <option value="all">كافة التصنيفات</option>
                    {newsCategories.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="admin-blog-table-wrap">
                <table className="admin-blog-table">
                  <thead>
                    <tr>
                      <th>الوسائط</th>
                      <th>العنوان والتصنيف</th>
                      <th>التاريخ</th>
                      <th>الكاتب</th>
                      <th>الحالة</th>
                      <th>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdminNews.length > 0 ? (
                      filteredAdminNews.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <div className="admin-table-media-thumb">
                              {item.mediaType === 'video' ? (
                                <>
                                  <video src={item.videoUrl || item.image} className="w-full h-full object-cover" />
                                  <span className="thumb-video-icon"><Play size={10} fill="currentColor" /></span>
                                </>
                              ) : (
                                <img src={item.image} alt="" />
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="space-y-1">
                              <b className="font-kufi text-sm block hover:text-[var(--color-brand-sand)]">
                                {item.title}
                              </b>
                              <div className="flex items-center gap-2 text-xs text-[#a89d8c]">
                                <span className="admin-tag-pill">{item.categoryLabel}</span>
                                {item.badge && <span className="text-[var(--color-brand-sand)]">[{item.badge}]</span>}
                                {item.mediaType === 'video' && <span className="text-[var(--color-brand-sand)]">🎬 فيديو</span>}
                              </div>
                            </div>
                          </td>
                          <td className="text-xs text-[#b9ad9a] whitespace-nowrap">
                            {item.date}
                          </td>
                          <td className="text-xs text-[#b9ad9a]">
                            {item.author?.name || 'فريق هاجس'}
                          </td>
                          <td>
                            {item.featured ? (
                              <span className="text-xs text-[var(--color-brand-sand)] font-bold">★ في الصدارة</span>
                            ) : (
                              <span className="text-xs text-[#8a8174]">عادي</span>
                            )}
                          </td>
                          <td>
                            <div className="admin-actions-cell">
                              <button
                                type="button"
                                onClick={() => setPreviewArticle(item)}
                                className="admin-action-icon-btn"
                                title="معاينة المقال كاملاً"
                                aria-label="معاينة"
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleStartEdit(item)}
                                className="admin-action-icon-btn"
                                title="تعديل التدوينة"
                                aria-label="تعديل"
                              >
                                <Edit size={15} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteBlogItem(item.id, item.title)}
                                className="admin-action-icon-btn is-danger"
                                title="حذف التدوينة"
                                aria-label="حذف"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-[#a89d8c]">
                          {isLoading ? 'جاري تحميل التدوينات...' : 'لم يتم العثور على تدوينات مطابقة لبحثك.'}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </article>

            {/* PREVIEW MODAL */}
            {previewArticle && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={() => setPreviewArticle(null)}
              >
                <div
                  className="w-full max-w-2xl max-h-[85vh] bg-[#231D17] border border-[rgba(200,188,167,0.3)] rounded-2xl overflow-hidden shadow-2xl flex flex-col text-right relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-4 border-b border-[rgba(200,188,167,0.15)] flex items-center justify-between bg-[rgba(43,24,14,0.8)]">
                    <span className="text-xs text-[var(--color-brand-sand)] font-bold">معاينة سريعة للتدوينة</span>
                    <button
                      type="button"
                      onClick={() => setPreviewArticle(null)}
                      className="p-1.5 rounded-full hover:bg-[rgba(200,188,167,0.15)] text-[#f5f1e7]"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div className="overflow-y-auto p-6 space-y-4">
                    <div className="h-56 rounded-xl overflow-hidden bg-black flex items-center justify-center">
                      {previewArticle.mediaType === 'video' ? (
                        <video src={previewArticle.videoUrl || previewArticle.image} controls className="w-full h-full object-contain" />
                      ) : (
                        <img src={previewArticle.image} alt="" className="w-full h-full object-cover" />
                      )}
                    </div>

                    <div className="text-xs text-[var(--color-brand-sand)] flex items-center gap-3">
                      <span>{previewArticle.categoryLabel}</span>
                      <span>•</span>
                      <span>{previewArticle.date}</span>
                      <span>•</span>
                      <span>{previewArticle.readTime}</span>
                    </div>

                    <h2 className="font-kufi text-xl font-bold text-[#f5f1e7]">{previewArticle.title}</h2>
                    {previewArticle.subtitle && <p className="text-sm text-[var(--color-brand-sand)]">{previewArticle.subtitle}</p>}
                    
                    <p className="text-sm text-[#e5ded3] leading-relaxed bg-[rgba(64,55,45,0.3)] p-3 rounded-lg border-r-2 border-[var(--color-brand-sand)]">
                      {previewArticle.content?.lead || previewArticle.summary}
                    </p>

                    <div className="space-y-2 text-sm text-[#d5c7b8] leading-relaxed">
                      {previewArticle.content?.sections?.map((sec, i) => (
                        <div key={i} className="space-y-2">
                          {sec.heading && <h4 className="font-bold text-[var(--color-brand-sand)]">{sec.heading}</h4>}
                          {sec.paragraphs?.map((p, pIdx) => <p key={pIdx}>{p}</p>)}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border-t border-[rgba(200,188,167,0.15)] flex justify-end gap-2 bg-[rgba(43,24,14,0.8)]">
                    <button
                      type="button"
                      onClick={() => {
                        handleStartEdit(previewArticle);
                        setPreviewArticle(null);
                      }}
                      className="admin-primary-button text-xs py-2 px-4"
                    >
                      <Edit size={14} /> تعديل الآن
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewArticle(null)}
                      className="admin-secondary-button text-xs py-2 px-4"
                    >
                      إغلاق
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
  );
};
