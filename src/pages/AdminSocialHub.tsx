import React, { useCallback, useEffect, useState } from 'react';
import {
  Check, CheckCircle2, ExternalLink, Heart, ImagePlus, Link2, Loader2, MessageCircle,
  RefreshCw, Send, ShieldCheck, Upload, Video, X, XCircle
} from 'lucide-react';
import {
  SessionExpiredError, fetchHubPosts, fetchHubStatus, isPublicHttpsUrl, prepareImageForZoho, publishHubPost,
  type HubPlatform, type HubStatus, type PublishResult, type ZohoPost
} from '../utils/socialHub';
import { ZOHO_SOCIAL_URL, platforms, type PlatformId } from '../data/socialPlatforms';

const hubId = (platform: PlatformId) => platform.toLowerCase() as HubPlatform;
const platformFor = (id: HubPlatform | null) => platforms.find((platform) => hubId(platform.id) === id);

// Networks that reject text-only posts, and those that only take video.
const needsMedia: PlatformId[] = ['Instagram', 'Pinterest', 'TikTok', 'YouTube'];
const needsVideo: PlatformId[] = ['YouTube'];

const RESULT_LABELS: Record<PublishResult['status'], string> = {
  published: 'تم النشر',
  failed: 'تعذر النشر',
  not_connected: 'غير متصل'
};

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

  if (platform === 'LinkedIn' || platform === 'Facebook') {
    return (
      <div className="social-mockup social-mockup-linkedin">
        {account}
        <p className="linkedin-caption">{text}</p>
        {media}
        <div className="linkedin-reactions">👍 ❤️ 👏 <span>٢٤ تعليقاً</span></div>
        <div className="linkedin-actions">
          <span>إعجاب</span><span>تعليق</span>
          {platform === 'LinkedIn' ? <><span>إعادة نشر</span><span>إرسال</span></> : <span>مشاركة</span>}
        </div>
      </div>
    );
  }

  if (platform === 'X' || platform === 'Threads') {
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

const formatDate = (value: string | null) => (value ? new Date(value).toLocaleString('ar-SA', { dateStyle: 'medium', timeStyle: 'short' }) : '');

export const AdminSocialHub: React.FC<{ onSessionExpired: () => void }> = ({ onSessionExpired }) => {
  const [status, setStatus] = useState<HubStatus | null>(null);
  const [posts, setPosts] = useState<ZohoPost[]>([]);
  const [postsState, setPostsState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [postsError, setPostsError] = useState('');
  const [selected, setSelected] = useState<PlatformId[]>([]);
  const [previewPlatform, setPreviewPlatform] = useState<PlatformId>('Instagram');
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState<{ blob: Blob; url: string } | null>(null);
  const [videoUrl, setVideoUrl] = useState('');
  const [isPreparingImage, setIsPreparingImage] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [results, setResults] = useState<PublishResult[] | null>(null);

  const handleError = useCallback((error: unknown, fallback: string) => {
    if (error instanceof SessionExpiredError) {
      onSessionExpired();
      return '';
    }
    return error instanceof Error && error.message ? error.message : fallback;
  }, [onSessionExpired]);

  const getStatus = useCallback(async (): Promise<HubStatus | null> => {
    try {
      return await fetchHubStatus();
    } catch (error) {
      const message = handleError(error, 'تعذر الاتصال بـ Zoho Social');
      return message ? { configured: false, ok: false, message, channels: [], platforms: {} as HubStatus['platforms'] } : null;
    }
  }, [handleError]);

  const getPosts = useCallback(async () => {
    try {
      return { posts: await fetchHubPosts(), error: '' };
    } catch (error) {
      return { posts: [], error: handleError(error, 'تعذر تحميل المنشورات من Zoho Social') || 'تعذر تحميل المنشورات' };
    }
  }, [handleError]);

  const applyPosts = ({ posts: list, error }: { posts: ZohoPost[]; error: string }) => {
    setPosts(list);
    setPostsError(error);
    setPostsState(error ? 'error' : 'ready');
  };

  useEffect(() => {
    let active = true;
    void getStatus().then((next) => { if (active && next) setStatus(next); });
    void getPosts().then((next) => { if (active) applyPosts(next); });
    return () => { active = false; };
  }, [getStatus, getPosts]);

  const refreshStatus = () => {
    setStatus(null);
    void getStatus().then((next) => { if (next) setStatus(next); });
  };

  const refreshPosts = () => {
    setPostsState('loading');
    void getPosts().then(applyPosts);
  };

  useEffect(() => () => {
    if (image) URL.revokeObjectURL(image.url);
  }, [image]);

  const isConnected = (platform: PlatformId) => Boolean(status?.platforms?.[hubId(platform)]);
  const connectedPlatforms = platforms.filter((platform) => isConnected(platform.id)).map((platform) => platform.id);
  const allSelected = connectedPlatforms.length > 0 && connectedPlatforms.every((id) => selected.includes(id));

  const togglePlatform = (platform: PlatformId) => {
    setPreviewPlatform(platform);
    setConfirming(false);
    setSelected((current) => (current.includes(platform) ? current.filter((id) => id !== platform) : [...current, platform]));
  };

  const toggleAll = () => {
    setConfirming(false);
    setSelected(allSelected ? [] : connectedPlatforms);
  };

  const handleMediaUpload: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file) return;
    setConfirming(false);
    if (file.type.startsWith('video/')) {
      setFeedback({ type: 'error', text: 'لا يدعم Zoho Social رفع ملف فيديو مباشرة. ارفع الفيديو إلى رابط HTTPS عام والصقه في حقل رابط الفيديو.' });
      return;
    }
    if (!file.type.startsWith('image/')) {
      setFeedback({ type: 'error', text: 'يرجى اختيار صورة.' });
      return;
    }
    setIsPreparingImage(true);
    try {
      const blob = await prepareImageForZoho(file);
      setImage({ blob, url: URL.createObjectURL(blob) });
      setVideoUrl('');
      setFeedback(null);
    } catch (error) {
      setFeedback({ type: 'error', text: error instanceof Error ? error.message : 'تعذر تجهيز الصورة.' });
    } finally {
      setIsPreparingImage(false);
    }
  };

  const validate = () => {
    const text = caption.trim();
    const video = videoUrl.trim();
    if (selected.length === 0) return 'اختر منصة واحدة على الأقل.';
    if (!text && !image && !video) return 'اكتب نص المنشور أو أرفق صورة أو رابط فيديو.';
    if (video && !isPublicHttpsUrl(video)) return 'رابط الفيديو يجب أن يكون رابط HTTPS عاماً.';
    const label = (ids: PlatformId[]) => ids.map((id) => platforms.find((platform) => platform.id === id)?.label).join('، ');
    const missingMedia = selected.filter((id) => needsMedia.includes(id));
    if (!image && !video && missingMedia.length) return `${label(missingMedia)} تتطلب صورة أو فيديو.`;
    const missingVideo = selected.filter((id) => needsVideo.includes(id));
    if (!video && missingVideo.length) return `${label(missingVideo)} يتطلب رابط فيديو.`;
    return '';
  };

  const requestPublish = () => {
    const problem = validate();
    setResults(null);
    if (problem) {
      setFeedback({ type: 'error', text: problem });
      return;
    }
    setFeedback(null);
    setConfirming(true);
  };

  const publish = async () => {
    setIsPublishing(true);
    setFeedback(null);
    try {
      const outcome = await publishHubPost({
        caption: caption.trim(),
        platforms: selected.map(hubId),
        image: image?.blob,
        videoUrl: videoUrl.trim() || undefined
      });
      setResults(outcome);
      const published = outcome.filter((result) => result.status === 'published').length;
      if (published === outcome.length) {
        setFeedback({ type: 'success', text: `تم النشر بنجاح على ${published} ${published === 1 ? 'منصة' : 'منصات'} عبر Zoho Social.` });
        setCaption('');
        setImage(null);
        setVideoUrl('');
      } else if (published > 0) {
        setFeedback({ type: 'error', text: `تم النشر على ${published} من ${outcome.length} منصات، وتعذر الباقي.` });
      } else {
        setFeedback({ type: 'error', text: 'تعذر النشر على المنصات المحددة.' });
      }
      if (published > 0) refreshPosts();
    } catch (error) {
      const message = handleError(error, 'تعذر الاتصال بخدمة النشر.');
      if (message) setFeedback({ type: 'error', text: message });
    } finally {
      setIsPublishing(false);
      setConfirming(false);
    }
  };

  const previewMedia = image
    ? { url: image.url, type: image.blob.type }
    : isPublicHttpsUrl(videoUrl.trim()) ? { url: videoUrl.trim(), type: 'video/mp4' } : { url: '', type: '' };
  const selectedLabels = selected.map((id) => platforms.find((platform) => platform.id === id)?.label).join('، ');

  return (
    <div className="admin-content">
      <div className="admin-page-heading">
        <div><span className="admin-eyebrow">إدارة المحتوى الاجتماعي</span><h1>مركز التواصل الاجتماعي</h1><p>اكتب منشور هاجس وانشره على منصة واحدة أو عدة منصات دفعة واحدة عبر Zoho Social.</p></div>
        <div className="admin-heading-actions">
          <a href={ZOHO_SOCIAL_URL} target="_blank" rel="noopener noreferrer" className="admin-zoho-button" title="فتح لوحة Zoho Social">
            <ExternalLink size={16} /> لوحة Zoho Social
          </a>
        </div>
      </div>

      <div className={`admin-notice admin-zoho-status ${status ? (status.ok ? 'is-ok' : 'is-error') : ''}`} role="status">
        {status ? (status.ok ? <CheckCircle2 size={17} /> : <XCircle size={17} />) : <Loader2 size={17} className="admin-spin" />}
        <span>{status ? status.message : 'جارٍ التحقق من الاتصال بـ Zoho Social...'}</span>
        <button type="button" className="admin-notice-refresh" onClick={refreshStatus} aria-label="تحديث حالة الاتصال">
          <RefreshCw size={14} />
        </button>
      </div>

      {status?.channels && status.channels.length > 0 && (
        <div className="admin-zoho-channels" aria-label="الحسابات المتصلة عبر Zoho Social">
          {status.channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.profile_url || ZOHO_SOCIAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              title={channel.status === 'token_active' ? 'الحساب متصل' : `حالة الحساب: ${channel.status}`}
            >
              {channel.image_url ? <img src={channel.image_url} alt="" /> : <i>{platformFor(channel.platform)?.glyph ?? '•'}</i>}
              <b>{channel.name}</b>
              <small>{platformFor(channel.platform)?.label ?? channel.network}</small>
              <span className={channel.status === 'token_active' ? 'is-active' : ''} />
            </a>
          ))}
        </div>
      )}

      <div className="admin-social-kpis">
        <article><span>المنصات</span><b>{platforms.length}</b><small>منصات مدعومة</small></article>
        <article><span>الحسابات المتصلة</span><b>{status ? status.channels.length : '—'}</b><small>عبر Zoho Social</small></article>
        <article><span>المنصات المحددة</span><b>{selected.length}</b><small>للمنشور الحالي</small></article>
        <article><span>منشورات حديثة</span><b>{postsState === 'ready' ? posts.length : '—'}</b><small>من Zoho Social</small></article>
      </div>

      <div className="admin-platform-list">
        {platforms.map((platform) => {
          const connected = isConnected(platform.id);
          return (
            <span key={platform.id} className={`platform-${platform.id.toLowerCase()} ${connected ? 'is-connected' : ''}`}>
              <i>{platform.glyph}</i>{platform.label}
              <small>{!status ? 'جارٍ التحقق' : connected ? 'متصل عبر Zoho' : platform.id === 'Snapchat' ? 'غير مدعوم في Zoho' : 'غير متصل'}</small>
            </span>
          );
        })}
      </div>

      <div className="admin-social-grid">
        <article className="admin-panel admin-composer">
          <div className="admin-panel-heading"><div><h2>إنشاء منشور</h2><p>اختر منصة أو أكثر ثم انشر مباشرة.</p></div><Send size={20} /></div>

          <div className="admin-field-row">
            <label className="admin-field-label">اختر المنصات</label>
            <button type="button" className="admin-link-button" onClick={toggleAll} disabled={connectedPlatforms.length === 0}>
              {allSelected ? 'إلغاء تحديد الكل' : 'تحديد كل المنصات المتصلة'}
            </button>
          </div>
          <div className="admin-platform-select">
            {platforms.map((platform) => {
              const isSelected = selected.includes(platform.id);
              const disabled = Boolean(status) && !isConnected(platform.id);
              return (
                <button
                  type="button"
                  className={`${isSelected ? 'is-selected' : ''} ${disabled ? 'is-unavailable' : ''}`}
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  aria-pressed={isSelected}
                  disabled={disabled || !status}
                  title={disabled ? 'هذه المنصة غير مرتبطة في Zoho Social' : undefined}
                >
                  <i>{isSelected ? <Check size={14} /> : platform.glyph}</i><span>{platform.label}</span>
                </button>
              );
            })}
          </div>

          <label className="admin-field-label" htmlFor="post-caption">نص المنشور</label>
          <textarea id="post-caption" value={caption} onChange={(event) => { setCaption(event.target.value); setConfirming(false); }} maxLength={2200} placeholder="شارك حكاية فنجانك القادم..." rows={5} />
          <div className="admin-caption-meta"><span>اقتراحات الوسوم</span><small>{caption.length} / 2200</small></div>
          <div className="admin-hashtags">{['#هاجس', '#قهوة_مختصة', '#حائل', '#قهوتك_طقسك_مكانك'].map((tag) => <button type="button" key={tag} onClick={() => setCaption((value) => (value.includes(tag) ? value : `${value}${value ? ' ' : ''}${tag}`))}>{tag}</button>)}</div>

          <label className="admin-upload-box">
            <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} disabled={isPreparingImage} />
            {isPreparingImage ? <Loader2 size={19} className="admin-spin" /> : <Upload size={19} />}
            <span>{isPreparingImage ? 'جارٍ تجهيز الصورة...' : 'أضف صورة'}</span>
            <small>JPG أو PNG أو GIF، تُضغط تلقائياً عند الحاجة</small>
          </label>
          {image && <div className="admin-upload-status"><Check size={15} /> تمت إضافة الصورة <button type="button" onClick={() => { setImage(null); setConfirming(false); }} aria-label="إزالة الصورة"><X size={15} /></button></div>}

          <label className="admin-field-label" htmlFor="video-url">رابط فيديو (اختياري)</label>
          <div className="admin-url-field">
            <Video size={16} />
            <input
              className="admin-url-input"
              id="video-url"
              type="url"
              dir="ltr"
              value={videoUrl}
              disabled={Boolean(image)}
              onChange={(event) => { setVideoUrl(event.target.value); setConfirming(false); }}
              placeholder="https://example.com/video.mp4"
            />
          </div>
          <small className="admin-field-hint">
            <Link2 size={13} /> {image ? 'أزل الصورة لإرفاق فيديو بدلاً منها.' : 'يجب أن يكون رابط HTTPS عاماً لملف الفيديو (مطلوب ليوتيوب، ومفضّل لتيك توك).'}
          </small>

          {feedback && <p className={`admin-feedback ${feedback.type === 'success' ? 'is-success' : ''}`} role="status">{feedback.text}</p>}

          {results && (
            <ul className="admin-publish-results">
              {results.map((result) => (
                <li key={result.platform} className={`is-${result.status}`}>
                  {result.status === 'published' ? <CheckCircle2 size={15} /> : <XCircle size={15} />}
                  <b>{platformFor(result.platform)?.label ?? result.platform}</b>
                  <span>{RESULT_LABELS[result.status]}{result.status !== 'published' && result.message ? ` — ${result.message}` : ''}</span>
                </li>
              ))}
            </ul>
          )}

          {confirming ? (
            <div className="admin-publish-confirm" role="alertdialog" aria-label="تأكيد النشر">
              <p><ShieldCheck size={16} /> سيُنشر المنشور فوراً على: <b>{selectedLabels}</b></p>
              <div className="admin-form-actions">
                <button type="button" className="admin-primary-button" onClick={publish} disabled={isPublishing}>
                  {isPublishing ? <><Loader2 size={16} className="admin-spin" /> جارٍ النشر عبر Zoho...</> : <><Send size={16} /> تأكيد النشر</>}
                </button>
                <button type="button" className="admin-secondary-button" onClick={() => setConfirming(false)} disabled={isPublishing}>إلغاء</button>
              </div>
            </div>
          ) : (
            <div className="admin-form-actions">
              <button type="button" className="admin-primary-button" onClick={requestPublish} disabled={!status?.ok || isPreparingImage}>
                <Send size={16} /> انشر الآن {selected.length > 0 && `(${selected.length} ${selected.length === 1 ? 'منصة' : 'منصات'})`}
              </button>
            </div>
          )}
        </article>

        <aside className="admin-preview-column">
          <article className={`admin-panel admin-live-preview preview-${previewPlatform.toLowerCase()}`}>
            <div className="admin-panel-heading"><div><h2>معاينة مباشرة</h2><p>تتغير حسب آخر منصة اخترتها</p></div><span className="admin-live-dot">مباشر</span></div>
            {selected.length > 1 && (
              <div className="admin-preview-tabs">
                {selected.map((id) => (
                  <button type="button" key={id} className={id === previewPlatform ? 'is-active' : ''} onClick={() => setPreviewPlatform(id)}>
                    {platforms.find((platform) => platform.id === id)?.label}
                  </button>
                ))}
              </div>
            )}
            <PlatformPostPreview platform={previewPlatform} caption={caption} mediaUrl={previewMedia.url} mediaType={previewMedia.type} />
          </article>
          <article className="admin-panel admin-recent-posts">
            <div className="admin-panel-heading">
              <div><h2>المنشورات الأخيرة</h2><p>مباشرة من Zoho Social</p></div>
              <button type="button" className="admin-icon-button" onClick={refreshPosts} aria-label="تحديث المنشورات" disabled={postsState === 'loading'}>
                <RefreshCw size={16} className={postsState === 'loading' ? 'admin-spin' : ''} />
              </button>
            </div>
            {postsState === 'error' && <p className="admin-feedback">{postsError}</p>}
            {postsState === 'ready' && posts.length === 0 && <p className="admin-empty-note">لا توجد منشورات منشورة بعد.</p>}
            {posts.slice(0, 6).map((post) => {
              const platform = platformFor(post.platform);
              const stats = [
                post.stats.likes != null && `♥ ${post.stats.likes}`,
                post.stats.comments != null && `💬 ${post.stats.comments}`,
                post.stats.views != null && `👁 ${post.stats.views}`
              ].filter(Boolean).join(' • ');
              return (
                <div className="admin-post-row" key={post.id}>
                  <span className="admin-post-platform">{platform?.glyph ?? '•'}</span>
                  <div>
                    <b>{post.caption || (post.media_type === 'video' ? 'فيديو' : post.media_type === 'image' ? 'صورة' : 'منشور')}</b>
                    <small>{formatDate(post.created_at)} • {platform?.label ?? post.network}{stats && ` • ${stats}`}</small>
                  </div>
                  {post.permalink
                    ? <a className="admin-post-status" href={post.permalink} target="_blank" rel="noopener noreferrer">عرض <ExternalLink size={11} /></a>
                    : <span className="admin-post-status">منشور</span>}
                </div>
              );
            })}
          </article>
        </aside>
      </div>
    </div>
  );
};
