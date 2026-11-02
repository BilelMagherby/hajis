import { fail, json, requireAdmin } from '../_lib/http.js';
import {
  HUB_PLATFORMS, MISSING_CONFIG_MESSAGE, ZOHO_IMAGE_TYPES, isPublicHttpsUrl, publish, recentPosts, zohoConfig, zohoReady,
  type HubImage, type HubPlatform,
} from '../_lib/zohoSocial.js';

const MAX_CAPTION = 2200;
// Vercel rejects function request bodies over 4.5MB; the dashboard resizes images to fit.
const MAX_IMAGE_BYTES = 4 * 1024 * 1024;

/** Recent published posts, read live from Zoho Social (nothing is stored on this server). */
export async function GET(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const config = zohoConfig();
  if (!zohoReady(config)) return json({ posts: [] });
  try {
    return json({ posts: await recentPosts(config) });
  } catch (error) {
    return fail(error instanceof Error && error.message ? error.message : MISSING_CONFIG_MESSAGE, 502);
  }
}

/** Publish one post to one or several platforms through Zoho Social. */
export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  const config = zohoConfig();
  if (!zohoReady(config)) return fail(MISSING_CONFIG_MESSAGE, 503);

  const form = await request.formData().catch(() => null);
  if (!form) return fail('تعذر قراءة بيانات المنشور.', 400);

  const caption = String(form.get('caption') ?? '').trim();
  const selected = [...new Set(String(form.get('platforms') ?? '').split(',').map((item) => item.trim().toLowerCase()).filter(Boolean))];
  const unknown = selected.filter((item) => !HUB_PLATFORMS.includes(item as HubPlatform));
  const videoUrl = String(form.get('video_url') ?? '').trim();
  const imageField = form.get('image');
  const imageFile = imageField instanceof Blob && imageField.size > 0 ? imageField : null;

  if (selected.length === 0) return fail('حدد منصة واحدة على الأقل.', 400);
  if (unknown.length) return fail(`منصات غير معروفة: ${unknown.join(', ')}`, 400);
  if (caption.length > MAX_CAPTION) return fail(`نص المنشور أطول من ${MAX_CAPTION} حرف.`, 400);
  if (imageFile && videoUrl) return fail('أرفق صورة أو رابط فيديو، وليس الاثنين معاً.', 400);
  if (videoUrl && !isPublicHttpsUrl(videoUrl)) return fail('رابط الفيديو يجب أن يكون رابط HTTPS عاماً.', 400);
  if (!caption && !imageFile && !videoUrl) return fail('أضف نصاً أو صورة أو رابط فيديو.', 400);

  let image: HubImage | undefined;
  if (imageFile) {
    const mime = imageFile.type.toLowerCase();
    if (!ZOHO_IMAGE_TYPES.includes(mime)) return fail('Zoho Social يقبل صور JPG أو PNG أو GIF فقط.', 400);
    if (imageFile.size > MAX_IMAGE_BYTES) return fail('حجم الصورة أكبر من 4MB.', 413);
    image = { bytes: new Uint8Array(await imageFile.arrayBuffer()), mime };
  }

  try {
    const results = await publish(config, {
      caption,
      platforms: selected as HubPlatform[],
      image,
      videoUrl: videoUrl || undefined,
    });
    return json({ results });
  } catch (error) {
    return fail(error instanceof Error && error.message ? error.message : 'تعذر الاتصال بـ Zoho Social', 502);
  }
}
