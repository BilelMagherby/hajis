import { neon, type NeonQueryFunction } from '@neondatabase/serverless';
import { del } from '@vercel/blob';
import { randomUUID } from 'node:crypto';

/**
 * Blog posts for "مستجدات هاجس": stored in Postgres (DATABASE_URL, e.g. Neon / Vercel Postgres),
 * with uploaded media in Vercel Blob. Responses match the NewsItem interface in src/data/news.ts.
 */

export class BlogError extends Error {
  readonly status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const CATEGORY_LABELS: Record<string, string> = {
  // Mirrors newsCategories in src/data/news.ts ('all' is a filter, not a category).
  crops: 'محاصيل جديدة',
  events: 'فعاليات وورش عمل',
  drinks: 'مشروبات الموسم',
  cafe: 'أخبار هاجس',
  blog: 'المدونة والمقالات',
};
const CATEGORIES = Object.keys(CATEGORY_LABELS);
const ARABIC_MONTHS = [
  'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];
const DEFAULT_IMAGE = '/images/coffee_bag_cup.jpg';
const DEFAULT_READ_TIME = 'قراءة في 3 دقائق';
const DEFAULT_AUTHOR = { name: 'فريق هاجس', role: 'إدارة المحتوى' };

// ---- Database -------------------------------------------------------------------------------

const databaseUrl = () => (process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? '').trim();

type Sql = NeonQueryFunction<false, false>;
let client: { url: string; sql: Sql; ready: Promise<void> } | null = null;

const rows = <T>(sql: Sql, query: string, params: unknown[] = []) =>
  sql.query(query, params) as Promise<unknown> as Promise<T[]>;

async function createSchema(sql: Sql) {
  // No migrations yet: the table is created on first use. Add real migrations before changing columns.
  await sql.query(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id text PRIMARY KEY,
      title text NOT NULL,
      subtitle text NOT NULL DEFAULT '',
      category text NOT NULL,
      read_time text NOT NULL,
      media_type text NOT NULL DEFAULT 'image',
      media_url text NOT NULL,
      badge text,
      featured boolean NOT NULL DEFAULT false,
      summary text NOT NULL,
      author_name text NOT NULL,
      author_role text NOT NULL,
      tags jsonb NOT NULL DEFAULT '[]',
      lead text NOT NULL,
      sections jsonb NOT NULL DEFAULT '[]',
      highlights jsonb,
      quote text,
      created_at timestamptz NOT NULL DEFAULT now(),
      updated_at timestamptz NOT NULL DEFAULT now()
    )`);
  await sql.query('CREATE INDEX IF NOT EXISTS ix_blog_posts_created ON blog_posts (created_at DESC)');
  await sql.query('CREATE INDEX IF NOT EXISTS ix_blog_posts_category_created ON blog_posts (category, created_at DESC)');
}

async function db(): Promise<Sql> {
  const url = databaseUrl();
  if (!url) throw new BlogError('قاعدة بيانات المدونة غير مهيأة. أضف DATABASE_URL إلى متغيرات البيئة.', 503);
  let current = client;
  if (current?.url !== url) {
    const sql = neon(url);
    const created = { url, sql, ready: createSchema(sql) };
    created.ready.catch(() => { if (client === created) client = null; });
    client = current = created;
  }
  await current.ready;
  return current.sql;
}

// ---- Validation (request bodies come straight from the admin dashboard) ----------------------

type Section = { heading?: string; paragraphs: string[] };
type Columns = {
  title: string; subtitle: string; category: string; read_time: string; media_type: 'image' | 'video';
  media_url: string; badge: string | null; featured: boolean; summary: string; author_name: string;
  author_role: string; tags: string[]; lead: string; sections: Section[]; highlights: string[] | null;
  quote: string | null;
};

const invalid = (field: string, message: string) => new BlogError(`${field}: ${message}`, 422);
const isObject = (value: unknown): value is Record<string, unknown> =>
  Boolean(value) && typeof value === 'object' && !Array.isArray(value);

function text(value: unknown, field: string, max: number, { min = 0, fallback = '' } = {}): string {
  if (value === undefined || value === null) {
    if (min > 0) throw invalid(field, 'هذا الحقل مطلوب.');
    return fallback;
  }
  if (typeof value !== 'string') throw invalid(field, 'يجب أن يكون نصاً.');
  const trimmed = value.trim();
  if (trimmed.length < min) throw invalid(field, 'هذا الحقل مطلوب.');
  if (trimmed.length > max) throw invalid(field, `الحد الأقصى ${max} حرف.`);
  return trimmed;
}

function optionalText(value: unknown, field: string, max: number): string | null {
  return text(value, field, max) || null;
}

function list<T>(value: unknown, field: string, max: number, item: (entry: unknown, path: string) => T): T[] {
  if (value === undefined || value === null) return [];
  if (!Array.isArray(value)) throw invalid(field, 'يجب أن تكون قائمة.');
  if (value.length > max) throw invalid(field, `الحد الأقصى ${max} عنصر.`);
  return value.map((entry, index) => item(entry, `${field}.${index}`));
}

function mediaUrl(value: unknown): string {
  const url = text(value, 'mediaUrl', 1000);
  // Only site-relative paths or http(s) links; blocks javascript:/data: URLs and bloated base64 blobs.
  const siteRelative = url.startsWith('/') && !url.startsWith('//');
  if (url && !siteRelative && !/^https?:\/\//i.test(url)) throw invalid('mediaUrl', 'رابط الوسائط يجب أن يبدأ بـ / أو https://');
  return url;
}

export function parsePost(body: unknown): Columns {
  if (!isObject(body)) throw new BlogError('بيانات غير صالحة.', 422);
  const category = body.category ?? 'blog';
  if (typeof category !== 'string' || !CATEGORIES.includes(category)) throw invalid('category', 'تصنيف غير معروف.');
  const mediaType = body.mediaType ?? 'image';
  if (mediaType !== 'image' && mediaType !== 'video') throw invalid('mediaType', 'يجب أن يكون image أو video.');
  if (body.featured !== undefined && typeof body.featured !== 'boolean') throw invalid('featured', 'يجب أن يكون true أو false.');

  const author = body.author === undefined || body.author === null ? {} : body.author;
  if (!isObject(author)) throw invalid('author', 'بيانات غير صالحة.');
  const content = body.content === undefined || body.content === null ? {} : body.content;
  if (!isObject(content)) throw invalid('content', 'بيانات غير صالحة.');

  const summary = text(body.summary, 'summary', 1000, { min: 1 });
  const tags = [...new Set(
    list(body.tags, 'tags', 15, (tag, path) => text(tag, path, 40, { min: 1 }).replace(/^#+/, '')).filter(Boolean),
  )];
  const sections = list(content.sections, 'content.sections', 20, (entry, path): Section => {
    if (!isObject(entry)) throw invalid(path, 'بيانات غير صالحة.');
    const heading = optionalText(entry.heading, `${path}.heading`, 200);
    const paragraphs = list(entry.paragraphs, `${path}.paragraphs`, 50, (p, pPath) => text(p, pPath, 5000, { min: 1 }));
    return heading ? { heading, paragraphs } : { paragraphs };
  }).filter((section) => section.paragraphs.length > 0);
  const highlights = list(content.highlights, 'content.highlights', 20, (h, path) => text(h, path, 300, { min: 1 }));

  return {
    title: text(body.title, 'title', 200, { min: 1 }),
    subtitle: text(body.subtitle, 'subtitle', 300),
    category,
    read_time: text(body.readTime, 'readTime', 60) || DEFAULT_READ_TIME,
    media_type: mediaType,
    media_url: mediaUrl(body.mediaUrl) || DEFAULT_IMAGE,
    badge: optionalText(body.badge, 'badge', 60),
    featured: body.featured === true,
    summary,
    author_name: text(author.name, 'author.name', 120) || DEFAULT_AUTHOR.name,
    author_role: text(author.role, 'author.role', 120) || DEFAULT_AUTHOR.role,
    tags: tags.length ? tags : ['قهوة_مختصة', 'هاجس'],
    lead: text(content.lead, 'content.lead', 2000) || summary,
    sections: sections.length ? sections : [{ paragraphs: [summary] }],
    highlights: highlights.length ? highlights : null,
    quote: optionalText(content.quote, 'content.quote', 1000),
  };
}

// ---- Rows -> NewsItem -------------------------------------------------------------------------

type Row = Columns & { id: string; created_at: Date | string; updated_at: Date | string };

const toDate = (value: Date | string) => (value instanceof Date ? value : new Date(value));

function toNewsItem(row: Row) {
  const created = toDate(row.created_at);
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle,
    category: row.category,
    categoryLabel: CATEGORY_LABELS[row.category] ?? 'مستجدات',
    date: `${created.getUTCDate()} ${ARABIC_MONTHS[created.getUTCMonth()]} ${created.getUTCFullYear()}`,
    readTime: row.read_time,
    image: row.media_url,
    mediaType: row.media_type,
    videoUrl: row.media_type === 'video' ? row.media_url : null,
    summary: row.summary,
    badge: row.badge,
    featured: row.featured,
    author: { name: row.author_name, role: row.author_role },
    tags: row.tags,
    content: { lead: row.lead, sections: row.sections, highlights: row.highlights, quote: row.quote },
    createdAt: created.toISOString(),
    updatedAt: toDate(row.updated_at).toISOString(),
  };
}

// ---- Queries ----------------------------------------------------------------------------------

export async function listPosts(params: URLSearchParams) {
  const conditions: string[] = [];
  const values: unknown[] = [];
  const add = (condition: (placeholder: string) => string, value: unknown) => {
    values.push(value);
    conditions.push(condition(`$${values.length}`));
  };

  const category = params.get('category');
  if (category) {
    if (!CATEGORIES.includes(category)) throw invalid('category', 'تصنيف غير معروف.');
    add((p) => `category = ${p}`, category);
  }
  const featured = params.get('featured');
  if (featured === 'true' || featured === 'false') add((p) => `featured = ${p}`, featured === 'true');
  const q = (params.get('q') ?? '').trim();
  if (q.length > 100) throw invalid('q', 'الحد الأقصى 100 حرف.');
  if (q) {
    const pattern = `%${q.replace(/[\\%_]/g, (char) => `\\${char}`)}%`;
    add((p) => `(title ILIKE ${p} OR subtitle ILIKE ${p} OR summary ILIKE ${p} OR tags::text ILIKE ${p})`, pattern);
  }

  const limit = Math.min(Math.max(Number.parseInt(params.get('limit') ?? '50', 10) || 50, 1), 100);
  const offset = Math.max(Number.parseInt(params.get('offset') ?? '0', 10) || 0, 0);
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const sql = await db();
  const [posts, counted] = await Promise.all([
    rows<Row>(sql, `SELECT * FROM blog_posts ${where} ORDER BY created_at DESC, id LIMIT ${limit} OFFSET ${offset}`, values),
    rows<{ total: number }>(sql, `SELECT count(*)::int AS total FROM blog_posts ${where}`, values),
  ]);
  return { items: posts.map(toNewsItem), total: counted[0]?.total ?? 0 };
}

async function findRow(sql: Sql, id: string): Promise<Row> {
  const [row] = await rows<Row>(sql, 'SELECT * FROM blog_posts WHERE id = $1', [id]);
  if (!row) throw new BlogError('التدوينة غير موجودة.', 404);
  return row;
}

export async function getPost(id: string) {
  return toNewsItem(await findRow(await db(), id));
}

const COLUMN_NAMES = [
  'title', 'subtitle', 'category', 'read_time', 'media_type', 'media_url', 'badge', 'featured', 'summary',
  'author_name', 'author_role', 'tags', 'lead', 'sections', 'highlights', 'quote',
] as const;
const JSON_COLUMNS = new Set(['tags', 'sections', 'highlights']);
const columnValues = (columns: Columns) => COLUMN_NAMES.map((name) => {
  const value = columns[name];
  return JSON_COLUMNS.has(name) && value !== null ? JSON.stringify(value) : value;
});

export async function createPost(columns: Columns) {
  const sql = await db();
  const placeholders = COLUMN_NAMES.map((_, index) => `$${index + 2}`).join(', ');
  const [row] = await rows<Row>(
    sql,
    `INSERT INTO blog_posts (id, ${COLUMN_NAMES.join(', ')}) VALUES ($1, ${placeholders}) RETURNING *`,
    [randomUUID().replace(/-/g, ''), ...columnValues(columns)],
  );
  return toNewsItem(row);
}

export async function updatePost(id: string, columns: Columns) {
  const sql = await db();
  const previous = await findRow(sql, id);
  const assignments = COLUMN_NAMES.map((name, index) => `${name} = $${index + 2}`).join(', ');
  const [row] = await rows<Row>(
    sql,
    `UPDATE blog_posts SET ${assignments}, updated_at = now() WHERE id = $1 RETURNING *`,
    [id, ...columnValues(columns)],
  );
  if (!row) throw new BlogError('التدوينة غير موجودة.', 404);
  if (previous.media_url !== row.media_url) await deleteIfOrphaned(sql, previous.media_url);
  return toNewsItem(row);
}

export async function deletePost(id: string) {
  const sql = await db();
  const [row] = await rows<{ media_url: string }>(sql, 'DELETE FROM blog_posts WHERE id = $1 RETURNING media_url', [id]);
  if (!row) throw new BlogError('التدوينة غير موجودة.', 404);
  await deleteIfOrphaned(sql, row.media_url);
}

// ---- Media (Vercel Blob) ----------------------------------------------------------------------

export const BLOB_PREFIX = 'blog/';
const isBlobUrl = (url: string) => {
  try {
    const parsed = new URL(url);
    return parsed.hostname.endsWith('.blob.vercel-storage.com') && parsed.pathname.startsWith(`/${BLOB_PREFIX}`);
  } catch {
    return false;
  }
};

/** Removes an uploaded file once no post references it. A failed cleanup never fails the request. */
async function deleteIfOrphaned(sql: Sql, url: string | null) {
  if (!url || !isBlobUrl(url)) return;
  try {
    const [used] = await rows(sql, 'SELECT 1 FROM blog_posts WHERE media_url = $1 LIMIT 1', [url]);
    if (!used) await del(url);
  } catch {
    // leaves an orphaned file behind at worst
  }
}

const megabytes = (name: string, fallback: number) => {
  const value = Number.parseInt(process.env[name] ?? '', 10);
  return (value > 0 ? value : fallback) * 1024 * 1024;
};

// extension -> (kind, content type)
export const UPLOAD_TYPES: Record<string, { kind: 'image' | 'video'; contentType: string }> = {
  jpg: { kind: 'image', contentType: 'image/jpeg' },
  jpeg: { kind: 'image', contentType: 'image/jpeg' },
  png: { kind: 'image', contentType: 'image/png' },
  webp: { kind: 'image', contentType: 'image/webp' },
  gif: { kind: 'image', contentType: 'image/gif' },
  mp4: { kind: 'video', contentType: 'video/mp4' },
  webm: { kind: 'video', contentType: 'video/webm' },
};

/** Upload rules for a client-side Vercel Blob upload, decided from the requested pathname. */
export function uploadRules(pathname: string) {
  const extension = pathname.split('.').pop()?.toLowerCase() ?? '';
  const type = pathname.startsWith(BLOB_PREFIX) ? UPLOAD_TYPES[extension] : undefined;
  if (!type) throw new BlogError('الصيغ المدعومة: JPG, PNG, WEBP, GIF, MP4, WEBM.', 415);
  return {
    allowedContentTypes: [type.contentType],
    maximumSizeInBytes: type.kind === 'image' ? megabytes('BLOG_MAX_IMAGE_MB', 10) : megabytes('BLOG_MAX_VIDEO_MB', 80),
    addRandomSuffix: true,
    cacheControlMaxAge: 60 * 60 * 24 * 365,
  };
}
