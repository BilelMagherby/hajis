import { BlogError, createPost, deletePost, getPost, listPosts, parsePost, updatePost } from '../_lib/blog.js';
import { fail, json, requireAdmin } from '../_lib/http.js';

/**
 * GET    /api/blog/posts?category=&q=&featured=&limit=&offset=   public, newest first
 * GET    /api/blog/posts?id=...                                   public, one post
 * POST   /api/blog/posts                                          admin, create
 * PUT    /api/blog/posts?id=...                                   admin, replace
 * DELETE /api/blog/posts?id=...                                   admin, delete (and its uploaded file)
 */

const handle = async (run: () => Promise<Response>) => {
  try {
    return await run();
  } catch (error) {
    if (error instanceof BlogError) return fail(error.message, error.status);
    console.error('blog posts', error);
    return fail('تعذر الاتصال بقاعدة بيانات المدونة.', 502);
  }
};

const postId = (request: Request) => (new URL(request.url).searchParams.get('id') ?? '').trim();

const readBody = (request: Request) => request.json().catch(() => {
  throw new BlogError('بيانات غير صالحة.', 422);
});

export async function GET(request: Request) {
  return handle(async () => {
    const id = postId(request);
    if (id) return json(await getPost(id));
    return json(await listPosts(new URL(request.url).searchParams));
  });
}

export async function POST(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  return handle(async () => json(await createPost(parsePost(await readBody(request))), 201));
}

export async function PUT(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  return handle(async () => {
    const id = postId(request);
    if (!id) return fail('معرّف التدوينة مطلوب.', 400);
    return json(await updatePost(id, parsePost(await readBody(request))));
  });
}

export async function DELETE(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  return handle(async () => {
    const id = postId(request);
    if (!id) return fail('معرّف التدوينة مطلوب.', 400);
    await deletePost(id);
    return new Response(null, { status: 204 });
  });
}
