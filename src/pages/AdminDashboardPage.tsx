import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart3, CalendarClock, Check, ChevronLeft, Clapperboard, Heart,
  ImagePlus, LayoutDashboard, LogOut, MessageCircle, Send, Share2,
  Settings2, ShieldCheck, Star, Upload, Users, Video, X
} from 'lucide-react';
import { menuCategories } from '../data/menu';
import { signOutDemoAdmin } from '../utils/demoAdminAuth';
import './AdminPages.css';

type DashboardSection = 'overview' | 'social' | 'reviews';
type PlatformId = 'TikTok' | 'Snapchat' | 'Instagram' | 'LinkedIn' | 'X' | 'Pinterest' | 'YouTube';
type LocalPost = { id: number; caption: string; platform: PlatformId; status: string; date: string; mediaUrl?: string };

const platforms: { id: PlatformId; label: string; glyph: string }[] = [
  { id: 'TikTok', label: 'تيك توك', glyph: '♪' },
  { id: 'Snapchat', label: 'سناب شات', glyph: '◉' },
  { id: 'Instagram', label: 'إنستغرام', glyph: '◎' },
  { id: 'LinkedIn', label: 'لينكدإن', glyph: 'in' },
  { id: 'X', label: 'إكس', glyph: '𝕏' },
  { id: 'Pinterest', label: 'بينترست', glyph: 'P' },
  { id: 'YouTube', label: 'يوتيوب', glyph: '▶' }
];
const connectedPlatforms: PlatformId[] = ['Instagram', 'X', 'TikTok'];
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

const DashboardBeanRain: React.FC = () => (
  <div className="admin-coffee-rain" aria-hidden="true">
    {Array.from({ length: 18 }, (_, index) => (
      <span
        className="admin-coffee-bean"
        key={index}
        style={{
          left: `${(index * 47 + 9) % 100}%`,
          width: `${10 + (index * 7) % 9}px`,
          height: `${16 + (index * 7) % 13}px`,
          animationDuration: `${12 + (index * 5) % 11}s`,
          animationDelay: `${-((index * 3) % 19)}s`,
          '--bean-drift': `${(index * 17) % 70 - 35}px`
        } as React.CSSProperties}
      />
    ))}
  </div>
);

const PlatformPostPreview: React.FC<{
  platform: PlatformId;
  caption: string;
  mediaUrl: string;
  mediaType: string;
}> = ({ platform, caption, mediaUrl, mediaType }) => {
  const selected = platforms.find((entry) => entry.id === platform) ?? platforms[2];
  const media = mediaUrl
    ? mediaType.startsWith('video/')
      ? <video className="social-mockup-media" src={mediaUrl} controls />
      : <img className="social-mockup-media" src={mediaUrl} alt="معاينة الوسائط المرفوعة" />
    : <div className="social-mockup-placeholder"><ImagePlus size={30} /><span>ستظهر الوسائط هنا</span></div>;
  const text = caption || 'قهوتك المختصة، لحظتك الهادئة... شاركنا طقسك في هاجس.';
  const account = (
    <div className="social-mockup-top">
      <img src="/images/logo.png" alt="" />
      <span><b>Hajiss | هاجس</b><small>hajiss.coffee • الآن</small></span>
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
          <div><b>{text}</b><small>هاجس Hajiss • ١٫٢ ألف مشاهدة • قبل لحظات</small></div>
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
          <div className="vertical-video-caption"><b>هاجس Hajiss</b><p>{text}</p><small>♬ الصوت الأصلي - هاجس</small></div>
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
          <span className="pinterest-brand">HAJISS</span>
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
      <div className="instagram-caption"><b>١٬٢٨٤ إعجاباً</b><p><strong>Hajiss</strong> {text}</p><small>عرض جميع التعليقات (٣٢)</small></div>
    </div>
  );
};

export const AdminDashboardPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [section, setSection] = useState<DashboardSection>('overview');
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

  useEffect(() => () => {
    if (mediaUrl.startsWith('blob:')) URL.revokeObjectURL(mediaUrl);
  }, [mediaUrl]);

  const handleMediaUpload: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.currentTarget.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
      setFeedback('يرجى اختيار صورة أو مقطع فيديو.');
      return;
    }
    setMediaUrl(URL.createObjectURL(file));
    setMediaType(file.type);
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

  const logout = () => {
    signOutDemoAdmin();
    onLogout();
  };

  return (
    <main className="admin-shell" dir="rtl">
      <DashboardBeanRain />
      <aside className="admin-sidebar">
        <a className="admin-sidebar-brand" href="/" aria-label="هاجس">
          <img src="/images/logo.png" alt="" />
          <span><b>HAJISS</b><small>لوحة الإدارة</small></span>
        </a>
        <div className="admin-sidebar-caption">القائمة الرئيسية</div>
        <nav className="admin-side-nav" aria-label="أقسام لوحة الإدارة">
          <button className={section === 'overview' ? 'is-active' : ''} onClick={() => setSection('overview')}>
            <LayoutDashboard size={19} /> الإحصاءات العامة
          </button>
          <button className={section === 'social' ? 'is-active' : ''} onClick={() => setSection('social')}>
            <Share2 size={19} /> مركز التواصل الاجتماعي
          </button>
          <button className={section === 'reviews' ? 'is-active' : ''} onClick={() => setSection('reviews')}>
            <MessageCircle size={19} /> آراء العملاء
          </button>
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-demo-badge"><ShieldCheck size={16} /> لوحة تجريبية محلية</div>
          <button className="admin-logout" onClick={logout}><LogOut size={18} /> تسجيل الخروج</button>
        </div>
      </aside>

      <section className="admin-workspace">
        <header className="admin-topbar">
          <div className="admin-breadcrumb">هاجس <ChevronLeft size={15} /> لوحة الإدارة</div>
          <div className="admin-topbar-actions">
            <div className="admin-user-chip"><span className="admin-avatar">هـ</span><span>مدير هاجس<small>حساب تجريبي</small></span></div>
            <button className="admin-topbar-logout" onClick={logout} aria-label="تسجيل الخروج"><LogOut size={18} /></button>
          </div>
        </header>

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
                <div className="admin-content-row"><span>صفحات الموقع</span><b>7</b></div>
                <div className="admin-content-row"><span>حسابات اجتماعية في لوحة الإدارة</span><b>{platforms.length}</b></div>
              </article>
            </div>
          </div>
        )}

        {section === 'social' && (
          <div className="admin-content">
            <div className="admin-page-heading">
              <div><span className="admin-eyebrow">إدارة المحتوى الاجتماعي</span><h1>مركز التواصل الاجتماعي</h1><p>اكتب منشورات هاجس وجهّزها للمنصات المختلفة.</p></div>
              <span className="admin-date-pill"><Clapperboard size={16} /> مساحة تجريبية</span>
            </div>
            <div className="admin-notice"><ShieldCheck size={17} /> النشر والجدولة هنا محليان للتجربة فقط؛ لا توجد اتصالات فعلية بحسابات المنصات.</div>
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
                  <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} />
                  <Upload size={19} /><span>أضف صورة أو فيديو</span><small>PNG, JPG, MP4</small>
                </label>
                {mediaUrl && <div className="admin-upload-status"><Check size={15} /> تمت إضافة الوسائط للمعاينة <button type="button" onClick={() => { setMediaUrl(''); setMediaType(''); }} aria-label="إزالة الوسائط"><X size={15} /></button></div>}
                <label className="admin-field-label" htmlFor="schedule-time">موعد النشر (اختياري للجدولة)</label>
                <input className="admin-date-input" id="schedule-time" type="datetime-local" value={scheduleAt} onChange={(event) => setScheduleAt(event.target.value)} />
                {feedback && <p className="admin-feedback" role="status">{feedback}</p>}
                <div className="admin-form-actions"><button type="button" className="admin-primary-button" onClick={() => submitPost(false)}><Send size={16} /> انشر الآن</button><button type="button" className="admin-secondary-button" onClick={() => submitPost(true)}><CalendarClock size={16} /> جدولة المنشور</button></div>
              </article>
              <aside className="admin-preview-column">
                <article className={`admin-panel admin-live-preview preview-${selectedPlatform.toLowerCase()}`}>
                  <div className="admin-panel-heading"><div><h2>معاينة مباشرة</h2><p>تتغير حسب المنصة المختارة</p></div><span className="admin-live-dot">مباشر</span></div>
                  <PlatformPostPreview platform={selectedPlatform} caption={caption} mediaUrl={mediaUrl} mediaType={mediaType} />
                </article>
                <article className="admin-panel admin-recent-posts">
                  <div className="admin-panel-heading"><div><h2>المنشورات الأخيرة</h2><p>سجل محلي تجريبي</p></div><Video size={19} /></div>
                  {posts.slice(0, 4).map((post) => <div className="admin-post-row" key={post.id}><span className="admin-post-platform">{platforms.find((platform) => platform.id === post.platform)?.glyph}</span><div><b>{post.caption}</b><small>{post.date} • {post.platform}</small></div><span className={`admin-post-status ${post.status === 'بانتظار الموافقة' ? 'is-pending' : ''}`}>{post.status}</span></div>)}
                </article>
              </aside>
            </div>
          </div>
        )}

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
