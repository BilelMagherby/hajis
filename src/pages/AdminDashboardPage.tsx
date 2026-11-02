import React, { useEffect, useMemo, useState } from 'react';
import {
  BarChart3, CalendarClock, Check, ChevronLeft, LayoutDashboard, LogOut, MessageCircle, Newspaper, Share2,
  Settings2, ShieldCheck, Star, Users
} from 'lucide-react';
import { menuCategories } from '../data/menu';
import { signOutAdmin } from '../utils/adminAuth';
import { platforms } from '../data/socialPlatforms';
import { AdminSocialHub } from './AdminSocialHub';
import { AdminNewsManager } from './AdminNewsManager';
import { fetchBlogPosts } from '../utils/blogApi';
import './AdminPages.css';

type DashboardSection = 'overview' | 'news' | 'social' | 'reviews';
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

export const AdminDashboardPage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [section, setSection] = useState<DashboardSection>('overview');
  const [newsCount, setNewsCount] = useState<number | null>(null);
  useEffect(() => {
    const controller = new AbortController();
    fetchBlogPosts(controller.signal).then((posts) => setNewsCount(posts.length)).catch(() => {});
    return () => controller.abort();
  }, []);
  const productCount = useMemo(() => menuCategories.reduce((total, category) => total + category.items.length, 0), []);

  const logout = () => {
    signOutAdmin();
    onLogout();
  };

  return (
    <main className="admin-shell" dir="rtl">
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
              {newsCount ?? '…'}
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

        {section === 'news' && <AdminNewsManager onCountChange={setNewsCount} onSessionExpired={logout} />}

        {section === 'social' && <AdminSocialHub onSessionExpired={logout} />}

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
