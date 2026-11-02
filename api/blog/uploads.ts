import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { BlogError, uploadRules } from '../_lib/blog.js';
import { fail, json, requireAdmin } from '../_lib/http.js';

/**
 * Issues a short-lived Vercel Blob token so the dashboard uploads images/videos straight to Blob.
 * Files never pass through this function, so videos are not limited by Vercel's 4.5MB request body cap.
 */
export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return fail('تخزين الوسائط غير مهيأ. أضف BLOB_READ_WRITE_TOKEN إلى متغيرات البيئة.', 503);
  }
  const body = await request.json().catch(() => null) as HandleUploadBody | null;
  if (!body) return fail('بيانات غير صالحة.', 400);
  try {
    return json(await handleUpload({
      request,
      body,
      onBeforeGenerateToken: async (pathname) => uploadRules(pathname),
    }));
  } catch (error) {
    if (error instanceof BlogError) return fail(error.message, error.status);
    return fail(error instanceof Error && error.message ? error.message : 'تعذر تجهيز رفع الملف.', 400);
  }
}
