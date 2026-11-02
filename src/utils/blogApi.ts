import { upload } from '@vercel/blob/client';
import type { NewsItem } from '../data/news';
import { adminToken } from './adminAuth';
import { SessionExpiredError } from './socialHub';

/** Client for the blog functions in /api/blog (posts in Postgres, media in Vercel Blob). */
const API = '/api/blog';

export type BlogPostInput = {
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  mediaType: 'image' | 'video';
  mediaUrl: string;
  badge?: string;
  featured: boolean;
  summary: string;
  author: { name: string; role: string };
  tags: string[];
  content: { lead: string; sections: { heading?: string; paragraphs: string[] }[] };
};

const normalize = (item: NewsItem): NewsItem => ({
  ...item,
  videoUrl: item.videoUrl ?? undefined,
  badge: item.badge ?? undefined,
});

const authHeader = (): Record<string, string> => ({ Authorization: `Bearer ${adminToken()}` });

const request = async <T,>(path: string, init: RequestInit = {}, auth = false): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(`${API}${path}`, {
      ...init,
      headers: { ...init.headers, ...(auth ? authHeader() : {}) },
    });
  } catch {
    throw new Error('تعذر الاتصال بخادم المدونة.');
  }
  if (response.status === 204) return undefined as T;
  const data = await response.json().catch(() => ({})) as T & { detail?: string };
  if (auth && response.status === 401) throw new SessionExpiredError(data.detail || 'انتهت الجلسة.');
  if (!response.ok) throw new Error(data.detail || 'تعذر تنفيذ الطلب على خادم المدونة.');
  return data;
};

const jsonBody = (method: string, body: BlogPostInput): RequestInit => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

const byId = (id: string) => `/posts?id=${encodeURIComponent(id)}`;

export const fetchBlogPosts = (signal?: AbortSignal) =>
  request<{ items: NewsItem[]; total: number }>('/posts?limit=100', { signal })
    .then((data) => data.items.map(normalize));

export const createBlogPost = (post: BlogPostInput) =>
  request<NewsItem>('/posts', jsonBody('POST', post), true).then(normalize);

export const updateBlogPost = (id: string, post: BlogPostInput) =>
  request<NewsItem>(byId(id), jsonBody('PUT', post), true).then(normalize);

export const deleteBlogPost = (id: string) =>
  request<void>(byId(id), { method: 'DELETE' }, true);

const UPLOAD_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif',
  'video/mp4': 'mp4', 'video/webm': 'webm',
};

const uploadError = (error: unknown) => {
  const message = error instanceof Error ? error.message : '';
  if (/401|session|انتهت الجلسة/i.test(message)) return new SessionExpiredError('انتهت الجلسة.');
  return new Error(message.replace(/^Vercel Blob:\s*/i, '') || 'تعذر رفع الملف.');
};

/** Uploads straight from the browser to Vercel Blob; /api/blog/uploads only signs the upload. */
export const uploadBlogMedia = async (file: File) => {
  const extension = UPLOAD_EXTENSIONS[file.type.toLowerCase()];
  if (!extension) throw new Error('الصيغ المدعومة: JPG, PNG, WEBP, GIF, MP4, WEBM.');
  const mediaType: 'image' | 'video' = file.type.startsWith('video/') ? 'video' : 'image';
  try {
    const blob = await upload(`blog/${mediaType}.${extension}`, file, {
      access: 'public',
      contentType: file.type,
      handleUploadUrl: `${API}/uploads`,
      headers: authHeader(),
      multipart: file.size > 8 * 1024 * 1024,
    });
    return { url: blob.url, mediaType, size: file.size };
  } catch (error) {
    throw uploadError(error);
  }
};
