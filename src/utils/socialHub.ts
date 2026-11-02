import { adminToken } from './adminAuth';

/** Client for the Zoho Social hub functions in /api/hub. */

export type HubPlatform =
  | 'tiktok' | 'snapchat' | 'instagram' | 'linkedin' | 'x' | 'pinterest' | 'youtube' | 'facebook' | 'threads';

export type ZohoChannel = {
  id: string;
  name: string;
  network: string;
  platform: HubPlatform | null;
  status: string;
  image_url: string | null;
  profile_url: string | null;
};

export type HubStatus = {
  configured: boolean;
  ok: boolean;
  message: string;
  channels: ZohoChannel[];
  platforms: Record<HubPlatform, boolean>;
};

export type PublishResult = {
  platform: HubPlatform;
  status: 'published' | 'failed' | 'not_connected';
  message: string;
  post_id: string | null;
};

export type ZohoPost = {
  id: string;
  platform: HubPlatform | null;
  network: string;
  caption: string;
  media_url: string | null;
  media_type: 'image' | 'video' | 'text';
  permalink: string | null;
  created_at: string | null;
  from_name: string | null;
  stats: { likes: number | null; comments: number | null; shares: number | null; views: number | null };
};

export class SessionExpiredError extends Error {}

const ZOHO_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;
const MAX_IMAGE_SIDE = 2048;

const request = async <T,>(path: string, init: RequestInit = {}): Promise<T> => {
  let response: Response;
  try {
    response = await fetch(path, {
      ...init,
      headers: { ...init.headers, Authorization: `Bearer ${adminToken()}` }
    });
  } catch {
    throw new Error('تعذر الاتصال بالخادم.');
  }
  const data = await response.json().catch(() => ({})) as T & { detail?: string };
  if (response.status === 401) throw new SessionExpiredError(data.detail || 'انتهت الجلسة.');
  if (!response.ok) throw new Error(data.detail || 'تعذر الاتصال بخدمة النشر.');
  return data;
};

export const fetchHubStatus = () => request<HubStatus>('/api/hub/status');

export const fetchHubPosts = () => request<{ posts: ZohoPost[] }>('/api/hub/posts').then((data) => data.posts);

export const publishHubPost = ({ caption, platforms, image, videoUrl }: {
  caption: string;
  platforms: HubPlatform[];
  image?: Blob | null;
  videoUrl?: string;
}) => {
  const body = new FormData();
  body.append('caption', caption);
  body.append('platforms', platforms.join(','));
  if (image) body.append('image', image, image.type === 'image/png' ? 'image.png' : image.type === 'image/gif' ? 'image.gif' : 'image.jpg');
  if (videoUrl) body.append('video_url', videoUrl);
  return request<{ results: PublishResult[] }>('/api/hub/posts', { method: 'POST', body }).then((data) => data.results);
};

/**
 * Zoho accepts JPG/PNG/GIF only and the server takes at most 4MB, so anything else
 * (WEBP, HEIC that the browser can decode, very large photos) is re-encoded as JPEG.
 */
export const prepareImageForZoho = async (file: File): Promise<Blob> => {
  if (ZOHO_IMAGE_TYPES.includes(file.type) && file.size <= MAX_IMAGE_BYTES) return file;
  if (file.type === 'image/gif') throw new Error('صورة GIF أكبر من 4MB.');
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error('تعذر قراءة الصورة. استخدم صورة JPG أو PNG.');
  });
  for (const side of [MAX_IMAGE_SIDE, 1600, 1200]) {
    const scale = Math.min(1, side / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.88));
    if (blob && blob.size <= MAX_IMAGE_BYTES) {
      bitmap.close();
      return blob;
    }
  }
  bitmap.close();
  throw new Error('حجم الصورة كبير جداً حتى بعد ضغطها.');
};

export const isPublicHttpsUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !['localhost', '127.0.0.1', '0.0.0.0'].includes(url.hostname);
  } catch {
    return false;
  }
};
