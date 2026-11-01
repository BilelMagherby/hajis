import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart3, CalendarClock, Check, ChevronLeft, Clapperboard, ExternalLink, Heart,
  ImagePlus, LayoutDashboard, LogOut, MessageCircle, Send, Share2,
  Settings2, ShieldCheck, Star, Upload, Users, Video, X,
  Newspaper, Plus, Trash2, Edit, Eye, Film, Image as ImageIcon,
  RotateCcw, Sparkles, Search, Play, FileText
} from 'lucide-react';
import { menuCategories } from '../data/menu';
import type { NewsItem } from '../data/news';
import { newsCategories } from '../data/news';
import { getStoredNews, saveStoredNews, resetStoredNews } from '../utils/newsStorage';
import { signOutDemoAdmin } from '../utils/demoAdminAuth';
import './AdminPages.css';

type DashboardSection = 'overview' | 'news' | 'social' | 'reviews';
type PlatformId = 'TikTok' | 'Snapchat' | 'Instagram' | 'LinkedIn' | 'X' | 'Pinterest' | 'YouTube';
type LocalPost = { id: number; caption: string; platform: PlatformId; status: string; date: string; mediaUrl?: string };

const platforms: { id: PlatformId; label: string; glyph: string }[] = [
  { id: 'TikTok', label: 'تيك توك', glyph: '♪' },
  { id: 'Snapchat', label: 'سناب شات', glyph: '◉' },
  { id: 'Instagram', label: 'إنستغرام', glyph: '◎' },
  { id: 'LinkedIn', label: 'لينكدإن', glyph: 'ل' },
  { id: 'X', label: 'إكس', glyph: '𝕏' },
  { id: 'Pinterest', label: 'بينترست', glyph: 'ب' },
  { id: 'YouTube', label: 'يوتيوب', glyph: '▶' }
];
const connectedPlatforms: PlatformId[] = ['Instagram', 'X', 'TikTok'];
const ZOHO_SOCIAL_URL = 'https://social.zoho.com/social/natheelco2030/1724487000000023009/Home.do#home';
const initialReviews = [
  { name: 'ضيف هاجس', date: 'نموذج توضيحي', rating: 5, text: 'تجربة القهوة والأجواء مميزة، والمكان يعكس كرم أهل حائل.' },
  { name: 'زائر المقهى', date: 'نموذج توضيحي', rating: 5, text: 'قهوة مختصة بإتقان وجلسة هادئة تعود إليها بكل سرور.' },
  { name: 'محب القهوة', date: 'نموذج توضيحي', rating: 4, text: 'تنوع جميل في الخيارات وجودة واضحة في كل كوب.' }
];
const sampleStats = [
  { label: 'زيارات الموقع هذا الشهر', value: '12,480', change: '+12.8%', icon: Users },
  { label: 'مشاهدات صفحة القائمة', value: '8,246', change: '+8.4%', icon: LayoutDashboard },
  { label: 'نقرات الموقع والاتجاهات', value: '1,392', change: '+6.2%', icon: BarChart3 },
  { label: 'متوسط وقت التصفح', value: '2:48', change: '+0:24', icon: CalendarClock }
];

const presetMediaOptions = [
  { label: 'كيس المحصول', url: '/images/coffee_bag_cup.jpg' },
  { label: 'طقوس V60', url: '/images/v60-ritual.png' },
  { label: 'مشروبات هاجس', url: '/images/about_cafe_drinks.png' },
  { label: 'جلسات التراس', url: '/images/lounge_terrace.jpg' },
  { label: 'تحميص البن', url: '/images/roaster_beans.jpg' },
  { label: 'كاونتر المقهى', url: '/images/hero-cafe-counter.jpeg' },
];

const PlatformPostPreview: React.FC<{
  platform: PlatformId;
  caption: string;
  mediaUrl: string;
  mediaType: string;
}> = ({ platform, caption, mediaUrl, mediaType }) => {
  const selected = platforms.find((entry) => entry.id === platform) ?? platforms[2];
  const media = mediaUrl
    ? mediaType.startsWith('audio/')
      ? <audio className="social-mockup-media social-mockup-media-audio" src={mediaUrl} controls preload="metadata" aria-label="معاينة الملف الصوتي" />
      : mediaType.startsWith('video/')
      ? <video className="social-mockup-media" src={mediaUrl} controls />
      : <img className="social-mockup-media" src={mediaUrl} alt="معاينة الوسائط المرفوعة" />
    : <div className="social-mockup-placeholder"><ImagePlus size={30} /><span>ستظهر الوسائط هنا</span></div>;
  const text = caption || 'قهوتك المختصة، لحظتك الهادئة... شاركنا طقسك في هاجس.';
  const account = (
    <div className="social-mockup-top">
      <img src="/images/logo.png" alt="" />
      <span><b>هاجس</b><small>حساب هاجس • الآن</small></span>
      <span className="social-platform-mark">{selected.glyph}</span>
    </div>
  );

  if (platform === 'YouTube') {
    return (
      <div className="social-mockup social-mockup-youtube">
        <div className="youtube-video-frame">
          {media}
          <span className="youtube-play" aria-hidden="true">▶</span>
          <span className="youtube-duration">0:34</span>
        </div>
        <div className="youtube-details">
          <img src="/images/logo.png" alt="" />
          <div><b>{text}</b><small>هاجس • ١٫٢ ألف مشاهدة • قبل لحظات</small></div>
          <button type="button">اشتراك</button>
        </div>
        <div className="youtube-actions"><span>👍 ١٢٨</span><span>مشاركة</span><span>حفظ</span></div>
      </div>
    );
  }

  if (platform === 'TikTok' || platform === 'Snapchat') {
    return (
      <div className={`social-mockup social-mockup-vertical social-mockup-${platform.toLowerCase()}`}>
        <div className="vertical-video-stage">
          {media}
          {account}
          <div className="vertical-video-caption"><b>هاجس</b><p>{text}</p><small>♬ الصوت الأصلي - هاجس</small></div>
          <div className="vertical-video-actions"><span>♥<small>١٫٢ ألف</small></span><span>●<small>٣٢</small></span><span>↗<small>مشاركة</small></span></div>
        </div>
      </div>
    );
  }

  if (platform === 'Pinterest') {
    return (
      <div className="social-mockup social-mockup-pinterest">
        <div className="pinterest-pin">
          {media}
          <button type="button" className="pinterest-save">حفظ</button>
          <span className="pinterest-brand">هاجس</span>
        </div>
        <div className="pinterest-details"><b>{text}</b><small>هاجس | قهوة مختصة في حائل</small></div>
      </div>
    );
  }

  if (platform === 'LinkedIn') {
    return (
      <div className="social-mockup social-mockup-linkedin">
        {account}
        <p className="linkedin-caption">{text}</p>
        {media}
        <div className="linkedin-reactions">👍 ❤️ 👏 <span>٢٤ تعليقاً</span></div>
        <div className="linkedin-actions"><span>إعجاب</span><span>تعليق</span><span>إعادة نشر</span><span>إرسال</span></div>
      </div>
    );
  }

  if (platform === 'X') {
    return (
      <div className="social-mockup social-mockup-x">
        {account}
        <p className="x-caption">{text}</p>
        {media}
        <div className="x-actions"><span>◯ ١٢</span><span>↻ ٢٨</span><span>♡ ١٤٦</span><span>↗</span></div>
      </div>
    );
  }

  return (
    <div className="social-mockup social-mockup-instagram">
      {account}
      {media}
      <div className="instagram-actions"><Heart size={19} /><MessageCircle size={19} /><Send size={18} /><span>▱</span></div>
      <div className="instagram-caption"><b>١٬٢٨٤ إعجاباً</b><p><strong>هاجس</strong> {text}</p><small>عرض جميع التعليقات (٣٢)</small></div>
    </div>
  );
};

export const AdminDashboardPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [section, setSection] = useState<DashboardSection>('overview');
  
  // Social Posts State
  const [caption, setCaption] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>('Instagram');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState('');
  const [scheduleAt, setScheduleAt] = useState('');
  const [feedback, setFeedback] = useState('');
  const [posts, setPosts] = useState<LocalPost[]>([
    { id: 1, caption: 'قهوتك المختصة بانتظارك في هاجس ☕', platform: 'Instagram', status: 'منشور', date: 'اليوم • 10:30 ص' },
    { id: 2, caption: 'لحظات هادئة تبدأ بفنجان قهوة.', platform: 'TikTok', status: 'بانتظار الموافقة', date: 'اليوم • 2:00 م' }
  ]);
  const activePosts = posts.filter((post) => post.status === 'منشور' || post.status === 'مجدول').length;
  const productCount = useMemo(() => menuCategories.reduce((total, category) => total + category.items.length, 0), []);

  // News & Blog CRUD State
  const [newsList, setNewsList] = useState<NewsItem[]>(() => getStoredNews());
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

  useEffect(() => () => {
    if (mediaUrl.startsWith('blob:')) URL.revokeObjectURL(mediaUrl);
  }, [mediaUrl]);

  // Handle Social Media file upload
  const handleMediaUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    const isMp3 = file.type === 'audio/mpeg' || file.name.toLowerCase().endsWith('.mp3');
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/') && !isMp3) {
      setFeedback('يرجى اختيار صورة أو مقطع فيديو أو ملف MP3.');
      return;
    }
    setMediaUrl(URL.createObjectURL(file));
    setMediaType(isMp3 ? 'audio/mpeg' : file.type);
    event.currentTarget.value = '';
    setFeedback('');
  };

  const submitPost = (scheduled: boolean) => {
    if (!caption.trim()) {
      setFeedback('اكتب نص المنشور أولاً.');
      return;
    }
    if (scheduled && !scheduleAt) {
      setFeedback('اختر موعد النشر المجدول.');
      return;
    }
    setPosts((current) => [{
      id: Date.now(),
      caption: caption.trim(),
      platform: selectedPlatform,
      status: scheduled ? 'مجدول' : 'منشور',
      date: scheduled ? new Date(scheduleAt).toLocaleString('ar-SA') : 'الآن',
      mediaUrl: mediaUrl || undefined
    }, ...current]);
    setCaption('');
    setFeedback(scheduled ? 'تمت إضافة المنشور إلى الجدولة التجريبية.' : 'تمت إضافة المنشور إلى سجل النشر التجريبي.');
  };

  // Handle Blog Media (Image/Video) file upload
  const handleBlogMediaUpload: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');

    if (!isImage && !isVideo) {
      setBlogFeedback('يرجى اختيار ملف صورة أو مقطع فيديو صالح.');
      return;
    }

    setBlogMediaType(isVideo ? 'video' : 'image');

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setBlogMediaUrl(reader.result);
        setBlogFeedback(`تم رفع ${isVideo ? 'الفيديو' : 'الصورة'} بنجاح للمعاينة.`);
      }
    };
    reader.readAsDataURL(file);
    e.currentTarget.value = '';
  };

  // Blog CRUD - Save (Create / Update)
  const handleSaveBlogItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim()) {
      setBlogFeedback('يرجى كتابة عنوان التدوينة أو الخبر.');
      return;
    }
    if (!blogSummary.trim()) {
      setBlogFeedback('يرجى كتابة ملخص أو نبذة سريعة عن الموضوع.');
      return;
    }

    const categoryObj = newsCategories.find((c) => c.id === blogCategory);
    const categoryLabel = categoryObj ? categoryObj.label : 'مستجدات';
    const cleanTags = blogTagsInput
      .replace(/#/g, '')
      .split(/[,\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    const mediaLink = blogMediaUrl.trim() || (blogMediaType === 'video' ? '/images/espresso_pour.jpg' : '/images/coffee_bag_cup.jpg');

    const paragraphs = blogContentBody
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    if (editingId) {
      // UPDATE
      const updated = newsList.map((item) => {
        if (item.id === editingId) {
          return {
            ...item,
            title: blogTitle.trim(),
            subtitle: blogSubtitle.trim(),
            category: blogCategory as any,
            categoryLabel,
            readTime: blogReadTime.trim() || 'قراءة في 3 دقائق',
            image: mediaLink,
            mediaType: blogMediaType,
            videoUrl: blogMediaType === 'video' ? mediaLink : undefined,
            badge: blogBadge.trim() || undefined,
            featured: blogFeatured,
            summary: blogSummary.trim(),
            author: {
              name: blogAuthorName.trim() || 'فريق هاجس',
              role: blogAuthorRole.trim() || 'إدارة المحتوى',
            },
            tags: cleanTags.length > 0 ? cleanTags : ['قهوة_مختصة', 'هاجس'],
            content: {
              lead: blogContentLead.trim() || blogSummary.trim(),
              sections: [
                {
                  paragraphs: paragraphs.length > 0 ? paragraphs : [blogSummary.trim()],
                },
              ],
            },
          };
        }
        return item;
      });

      setNewsList(updated);
      saveStoredNews(updated);
      setBlogFeedback('✓ تم حفظ التعديلات وتحديث التدوينة على الموقع بنجاح.');
      handleCancelEdit();
    } else {
      // CREATE
      const now = new Date();
      const arabicDate = `${now.getDate()} ${
        ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'][now.getMonth()]
      } ${now.getFullYear()}`;

      const newItem: NewsItem = {
        id: `blog-${Date.now()}`,
        title: blogTitle.trim(),
        subtitle: blogSubtitle.trim(),
        category: blogCategory as any,
        categoryLabel,
        date: arabicDate,
        readTime: blogReadTime.trim() || 'قراءة في 3 دقائق',
        image: mediaLink,
        mediaType: blogMediaType,
        videoUrl: blogMediaType === 'video' ? mediaLink : undefined,
        badge: blogBadge.trim() || undefined,
        featured: blogFeatured,
        summary: blogSummary.trim(),
        author: {
          name: blogAuthorName.trim() || 'فريق هاجس',
          role: blogAuthorRole.trim() || 'إدارة المحتوى',
        },
        tags: cleanTags.length > 0 ? cleanTags : ['قهوة_مختصة', 'هاجس'],
        content: {
          lead: blogContentLead.trim() || blogSummary.trim(),
          sections: [
            {
              paragraphs: paragraphs.length > 0 ? paragraphs : [blogSummary.trim()],
            },
          ],
        },
      };

      const updated = [newItem, ...newsList];
      setNewsList(updated);
      saveStoredNews(updated);
      setBlogFeedback('✓ تم نشر التدوينة بنجاح وظهرت في صفحة مستجدات هاجس.');
      handleCancelEdit();
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
  const handleDeleteBlogItem = (id: string, title: string) => {
    if (window.confirm(`هل أنت متأكد من حذف خبر / تدوينة: "${title}"؟`)) {
      const updated = newsList.filter((item) => item.id !== id);
      setNewsList(updated);
      saveStoredNews(updated);
      if (editingId === id) handleCancelEdit();
      setBlogFeedback('تم حذف التدوينة بنجاح.');
    }
  };

  // Blog CRUD - Reset to Default
  const handleResetNewsDefaults = () => {
    if (window.confirm('هل تريد استعادة المقالات والمستجدات الافتراضية؟ سيتم استرجاع المحتوى التأسيسي.')) {
      const fresh = resetStoredNews();
      setNewsList(fresh);
      handleCancelEdit();
      setBlogFeedback('تمت استعادة البيانات الافتراضية بنجاح.');
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

  const logout = () => {
    signOutDemoAdmin();
    onLogout();
  };

  return (
    <main className="admin-shell" dir="rtl">
      {/* SIDEBAR NAVIGATION */}
      <aside className="admin-sidebar">
        <a className="admin-sidebar-brand" href="/" aria-label="هاجس">
          <img src="/images/logo.png" alt="" />
          <span><b>هاجس</b><small>لوحة الإدارة</small></span>
        </a>
        <div className="admin-sidebar-caption">القائمة الرئيسية</div>
        <nav className="admin-side-nav" aria-label="أقسام لوحة الإدارة">
          <button className={section === 'overview' ? 'is-active' : ''} onClick={() => setSection('overview')}>
            <LayoutDashboard size={19} /> الإحصاءات العامة
          </button>
          <button className={section === 'news' ? 'is-active' : ''} onClick={() => setSection('news')}>
            <Newspaper size={19} /> مستجدات هاجس والمدونة
            <span className="text-[11px] mr-auto bg-[rgba(200,188,167,0.2)] text-[var(--color-brand-sand)] px-2 py-0.5 rounded-full">
              {newsList.length}
            </span>
          </button>
          <button className={section === 'social' ? 'is-active' : ''} onClick={() => setSection('social')}>
            <Share2 size={19} /> مركز التواصل الاجتماعي
          </button>
          <button className={section === 'reviews' ? 'is-active' : ''} onClick={() => setSection('reviews')}>
            <MessageCircle size={19} /> آراء العملاء
          </button>
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-demo-badge"><ShieldCheck size={16} /> إدارة متصلة بالموقع</div>
          <button className="admin-logout" onClick={logout}><LogOut size={18} /> تسجيل الخروج</button>
        </div>
      </aside>

      {/* MAIN WORKSPACE */}
      <section className="admin-workspace">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">هاجس <ChevronLeft size={15} /> لوحة الإدارة</div>
          <div className="admin-topbar-actions">
            <div className="admin-user-chip"><span className="admin-avatar">هـ</span><span>مدير هاجس<small>حساب مسؤول</small></span></div>
            <button className="admin-topbar-logout" onClick={logout} aria-label="تسجيل الخروج"><LogOut size={18} /></button>
          </div>
        </header>

        {/* 1. OVERVIEW SECTION */}
        {section === 'overview' && (
          <div className="admin-content">
            <div className="admin-page-heading">
              <div><span className="admin-eyebrow">نظرة شاملة</span><h1>الإحصاءات العامة</h1><p>ملخص أداء الموقع ومحتوى هاجس.</p></div>
              <span className="admin-date-pill"><CalendarClock size={16} /> بيانات توضيحية</span>
            </div>
            <div className="admin-notice"><Settings2 size={17} /> الأرقام المعروضة تجريبية حالياً؛ يلزم ربط أدوات التحليلات لعرض بيانات فعلية.</div>
            <div className="admin-stat-grid">
              {sampleStats.map(({ label, value, change, icon: Icon }) => (
                <article className="admin-stat-card" key={label}><span className="admin-stat-icon"><Icon size={20} /></span><span className="admin-stat-label">{label}</span><strong>{value}</strong><small className="admin-stat-change">{change} <span>مقارنة بالفترة السابقة</span></small></article>
              ))}
            </div>
            <div className="admin-overview-grid">
              <article className="admin-panel">
                <div className="admin-panel-heading"><div><h2>حركة الزيارات</h2><p>مؤشر توضيحي لآخر سبعة أيام</p></div><BarChart3 size={20} /></div>
                <div className="admin-chart" aria-label="رسم توضيحي للزيارات خلال سبعة أيام">
                  {[42, 66, 53, 78, 58, 91, 72].map((height, index) => <div className="admin-chart-column" key={index}><i style={{ height: `${height}%` }} /><span>{['س', 'ح', 'ن', 'ث', 'ر', 'خ', 'ج'][index]}</span></div>)}
                </div>
              </article>
              <article className="admin-panel admin-site-content">
                <div className="admin-panel-heading"><div><h2>محتوى الموقع</h2><p>ملخص المحتوى المنشور ضمن المشروع</p></div><LayoutDashboard size={20} /></div>
                <div className="admin-content-row"><span>أصناف المنتجات</span><b>{productCount}</b></div>
                <div className="admin-content-row"><span>أقسام القائمة</span><b>{menuCategories.length}</b></div>
                <div className="admin-content-row"><span>مقالات ومستجدات هاجس</span><b>{newsList.length}</b></div>
                <div className="admin-content-row"><span>حسابات اجتماعية في لوحة الإدارة</span><b>{platforms.length}</b></div>
              </article>
            </div>
          </div>
        )}

        {/* 2. BLOG & NEWS CRUD SECTION (NEW) */}
        {section === 'news' && (
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
                  onClick={handleResetNewsDefaults}
                  className="admin-secondary-button"
                  title="استعادة المقالات الافتراضية"
                >
                  <RotateCcw size={16} /> استعادة الافتراضي
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
                        accept={blogMediaType === 'video' ? 'video/*' : 'image/*,video/*'}
                        onChange={handleBlogMediaUpload}
                      />
                      <Upload size={19} />
                      <span>{blogMediaType === 'video' ? 'ارفع مقطع فيديو من جهازك' : 'ارفع صورة أو فيديو من جهازك'}</span>
                      <small>يدعم ملفات MP4, WebM, PNG, JPG (حفظ فوري في المتصفح)</small>
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
                    <button type="submit" className="admin-primary-button">
                      {editingId ? <Check size={16} /> : <Send size={16} />}
                      <span>{editingId ? 'حفظ التعديلات وتحديث المقال' : 'نشر التدوينة على الموقع'}</span>
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
                          لم يتم العثور على تدوينات مطابقة لبحثك.
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
        )}

        {/* 3. SOCIAL MEDIA SECTION */}
        {section === 'social' && (
          <div className="admin-content">
            <div className="admin-page-heading">
              <div><span className="admin-eyebrow">إدارة المحتوى الاجتماعي</span><h1>مركز التواصل الاجتماعي</h1><p>اكتب منشورات هاجس وجهّزها للمنصات المختلفة.</p></div>
              <div className="admin-heading-actions">
                <a
                  href={ZOHO_SOCIAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-zoho-button"
                  title="الانتقال إلى منصة Zoho Social للنشر"
                >
                  <ExternalLink size={16} /> نشر عبر zoho
                </a>
                <span className="admin-date-pill"><Clapperboard size={16} /> مساحة تجريبية</span>
              </div>
            </div>
            <div className="admin-notice">
              <ShieldCheck size={17} />
              <span>النشر والجدولة هنا محليان للتجربة فقط؛ لا توجد اتصالات فعلية بحسابات المنصات.</span>
              <a
                href={ZOHO_SOCIAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="admin-notice-zoho-link"
                title="الانتقال إلى منصة Zoho Social"
              >
                <span>نشر عبر zoho</span>
                <ExternalLink size={14} />
              </a>
            </div>
            <div className="admin-social-kpis">
              <article><span>المنصات</span><b>7</b><small>منصات مدعومة</small></article>
              <article><span>الحسابات المتصلة</span><b>{connectedPlatforms.length}</b><small>حالة توضيحية</small></article>
              <article><span>منشورات نشطة</span><b>{activePosts}</b><small>منشور ومجدول</small></article>
              <article><span>بانتظار الموافقة</span><b>{posts.filter((post) => post.status === 'بانتظار الموافقة').length}</b><small>مراجعة المحتوى</small></article>
            </div>
            <div className="admin-platform-list">
              {platforms.map((platform) => <span key={platform.id} className={`platform-${platform.id.toLowerCase()} ${connectedPlatforms.includes(platform.id) ? 'is-connected' : ''}`}><i>{platform.glyph}</i>{platform.label}<small>{connectedPlatforms.includes(platform.id) ? 'متصل تجريبياً' : 'غير متصل'}</small></span>)}
            </div>
            <div className="admin-social-grid">
              <article className="admin-panel admin-composer">
                <div className="admin-panel-heading"><div><h2>إنشاء منشور</h2><p>حضّر المحتوى واختر المنصات.</p></div><Send size={20} /></div>
                <label className="admin-field-label">اختر المنصة</label>
                <div className="admin-platform-select">
                  {platforms.map((platform) => <button type="button" className={selectedPlatform === platform.id ? 'is-selected' : ''} key={platform.id} onClick={() => setSelectedPlatform(platform.id)} aria-pressed={selectedPlatform === platform.id}><i>{platform.glyph}</i><span>{platform.label}</span></button>)}
                </div>
                <label className="admin-field-label" htmlFor="post-caption">نص المنشور</label>
                <textarea id="post-caption" value={caption} onChange={(event) => setCaption(event.target.value)} maxLength={1000} placeholder="شارك حكاية فنجانك القادم..." rows={5} />
                <div className="admin-caption-meta"><span>اقتراحات الوسوم</span><small>{caption.length} / 1000</small></div>
                <div className="admin-hashtags">{['#هاجس', '#قهوة_مختصة', '#حائل', '#قهوتك_طقسك_مكانك'].map((tag) => <button type="button" key={tag} onClick={() => setCaption((value) => `${value}${value ? ' ' : ''}${tag}`)}>{tag}</button>)}</div>
                <label className="admin-upload-box">
                  <input type="file" accept="image/*,video/*,audio/mpeg,.mp3" onChange={handleMediaUpload} />
                  <Upload size={19} /><span>أضف صورة أو فيديو أو MP3</span><small>صورة أو مقطع مرئي أو ملف صوتي</small>
                </label>
                {mediaUrl && <div className="admin-upload-status"><Check size={15} /> تمت إضافة الوسائط للمعاينة <button type="button" onClick={() => { setMediaUrl(''); setMediaType(''); }} aria-label="إزالة الوسائط"><X size={15} /></button></div>}
                <label className="admin-field-label" htmlFor="schedule-time">موعد النشر (اختياري للجدولة)</label>
                <input className="admin-date-input" id="schedule-time" type="datetime-local" value={scheduleAt} onChange={(event) => setScheduleAt(event.target.value)} />
                {feedback && <p className="admin-feedback" role="status">{feedback}</p>}
                <div className="admin-form-actions">
                  <button type="button" className="admin-primary-button" onClick={() => submitPost(false)}><Send size={16} /> انشر الآن</button>
                  <button type="button" className="admin-secondary-button" onClick={() => submitPost(true)}><CalendarClock size={16} /> جدولة المنشور</button>
                  <a
                    href={ZOHO_SOCIAL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="admin-zoho-button"
                    title="الانتقال إلى منصة Zoho Social للنشر"
                  >
                    <ExternalLink size={16} /> نشر عبر zoho
                  </a>
                </div>
              </article>
              <aside className="admin-preview-column">
                <article className={`admin-panel admin-live-preview preview-${selectedPlatform.toLowerCase()}`}>
                  <div className="admin-panel-heading"><div><h2>معاينة مباشرة</h2><p>تتغير حسب المنصة المختارة</p></div><span className="admin-live-dot">مباشر</span></div>
                  <PlatformPostPreview platform={selectedPlatform} caption={caption} mediaUrl={mediaUrl} mediaType={mediaType} />
                </article>
                <article className="admin-panel admin-recent-posts">
                  <div className="admin-panel-heading"><div><h2>المنشورات الأخيرة</h2><p>سجل محلي تجريبي</p></div><Video size={19} /></div>
                  {posts.slice(0, 4).map((post) => <div className="admin-post-row" key={post.id}><span className="admin-post-platform">{platforms.find((platform) => platform.id === post.platform)?.glyph}</span><div><b>{post.caption}</b><small>{post.date} • {platforms.find((platform) => platform.id === post.platform)?.label}</small></div><span className={`admin-post-status ${post.status === 'بانتظار الموافقة' ? 'is-pending' : ''}`}>{post.status}</span></div>)}
                </article>
              </aside>
            </div>
          </div>
        )}

        {/* 4. REVIEWS SECTION */}
        {section === 'reviews' && (
          <div className="admin-content">
            <div className="admin-page-heading">
              <div><span className="admin-eyebrow">صوت ضيوفنا</span><h1>آراء العملاء</h1><p>مساحة لمتابعة التقييمات والانطباعات عن تجربة هاجس.</p></div>
              <span className="admin-date-pill"><MessageCircle size={16} /> إدارة الآراء</span>
            </div>
            <div className="admin-notice"><ShieldCheck size={17} /> الآراء أدناه أمثلة للعرض وليست مراجعات حقيقية؛ لا توجد حالياً خدمة تقييمات مرتبطة بالموقع.</div>
            <div className="admin-review-summary">
              <article className="admin-panel admin-review-rating"><Star size={24} /><span>التقييم العام</span><strong>—</strong><small>لا توجد بيانات تقييم فعلية</small></article>
              <article className="admin-panel admin-review-rating"><MessageCircle size={24} /><span>آراء العملاء المرتبطة</span><strong>0</strong><small>بانتظار ربط مصدر التقييمات</small></article>
              <article className="admin-panel admin-review-rating"><ShieldCheck size={24} /><span>حالة المراجعات</span><strong>جاهز</strong><small>أضف مصدر تقييمات حقيقياً</small></article>
            </div>
            <div className="admin-review-heading"><h2>أمثلة على شكل الآراء</h2><span>محتوى تجريبي</span></div>
            <div className="admin-review-grid">
              {initialReviews.map((review) => <article className="admin-panel admin-review-card" key={review.name}><div className="admin-review-person"><span className="admin-avatar">{review.name.slice(0, 1)}</span><div><b>{review.name}</b><small>{review.date}</small></div><span className="admin-review-demo">تجريبي</span></div><div className="admin-review-stars" aria-label={`${review.rating} من 5 نجوم`}>{Array.from({ length: 5 }, (_, index) => <Star size={15} key={index} fill={index < review.rating ? 'currentColor' : 'none'} />)}</div><p>{review.text}</p><button type="button" className="admin-review-action"><Check size={15} /> جاهز للربط بمراجعة فعلية</button></article>)}
            </div>
          </div>
        )}
      </section>
    </main>
  );
};
