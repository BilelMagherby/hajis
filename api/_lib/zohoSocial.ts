/**
 * Zoho Social integration: OAuth token refresh, the live list of channels connected to the
 * Zoho Social brand, image upload, and publishing one post to one or many networks in a
 * single Zoho API call.
 *
 * Docs: https://www.zoho.com/social/api/introduction.html
 * OAuth scopes needed: ZohoSocial.Organization.READ, ZohoSocial.Integration.READ,
 * ZohoSocial.Publish.ALL, ZohoSocial.Media.ALL
 */

export type HubPlatform =
  | 'tiktok' | 'snapchat' | 'instagram' | 'linkedin' | 'x' | 'pinterest' | 'youtube' | 'facebook' | 'threads';

export const HUB_PLATFORMS: HubPlatform[] = [
  'tiktok', 'snapchat', 'instagram', 'linkedin', 'x', 'pinterest', 'youtube', 'facebook', 'threads',
];

// Hub platform -> Zoho network identifiers that can carry it (the first one connected wins).
// Zoho Social has no Snapchat integration, so Snapchat can never be published from here.
const PLATFORM_NETWORKS: Record<HubPlatform, string[]> = {
  tiktok: ['tiktok'],
  snapchat: [],
  instagram: ['instagram'],
  linkedin: ['linkedinpage', 'linkedinprofile'],
  x: ['twitter'],
  pinterest: ['pinterest'],
  youtube: ['youtube'],
  facebook: ['facebookpage'],
  threads: ['threadsbyig'],
};

const platformForNetwork = (network: string): HubPlatform | null =>
  HUB_PLATFORMS.find((platform) => PLATFORM_NETWORKS[platform].includes(network)) ?? null;

export const ZOHO_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

type ZohoConfig = {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  accountsUrl: string;
  apiDomain: string;
  portalId: string;
  brandId: string;
  pinterestBoardId: string;
};

const env = (name: string, fallback = '') => (process.env[name] ?? '').trim() || fallback;
const stripSlash = (url: string) => url.replace(/\/+$/, '');

export const zohoConfig = (): ZohoConfig => ({
  clientId: env('ZOHO_CLIENT_ID'),
  clientSecret: env('ZOHO_CLIENT_SECRET'),
  refreshToken: env('ZOHO_REFRESH_TOKEN'),
  accountsUrl: stripSlash(env('ZOHO_ACCOUNTS_URL', 'https://accounts.zoho.com')),
  apiDomain: stripSlash(env('ZOHO_API_DOMAIN', 'https://social.zoho.com')),
  portalId: env('ZOHO_PORTAL_ID'),
  brandId: env('ZOHO_BRAND_ID'),
  pinterestBoardId: env('ZOHO_PINTEREST_BOARD_ID'),
});

export const zohoReady = (config: ZohoConfig) =>
  Boolean(config.clientId && config.clientSecret && config.refreshToken && config.portalId && config.brandId);

export const MISSING_CONFIG_MESSAGE =
  'أضف ZOHO_CLIENT_ID و ZOHO_CLIENT_SECRET و ZOHO_REFRESH_TOKEN و ZOHO_PORTAL_ID و ZOHO_BRAND_ID إلى متغيرات البيئة.';

export type ZohoChannel = {
  id: string;
  name: string;
  network: string;
  platform: HubPlatform | null;
  status: string;
  image_url: string | null;
  profile_url: string | null;
};

export type PlatformResult = {
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

type Json = Record<string, unknown>;

// Access tokens last 1h. Zoho allows at most 10 refreshes per 10 minutes per refresh token,
// and answers "Access Denied" once that cap is hit. The cache lives on globalThis so a Vite
// reload of this module does not forget the token and mint another one.
type TokenCache = Map<string, { token: string; expires: number }>;
type ZohoRuntime = { tokens: TokenCache; pending: Map<string, Promise<string>> };
const zohoRuntime: ZohoRuntime = ((globalThis as typeof globalThis & { __hajissZoho?: ZohoRuntime }).__hajissZoho ??= {
  tokens: new Map(),
  pending: new Map(),
});
const channelCache = new Map<string, { channels: ZohoChannel[]; expires: number }>();
const boardCache = new Map<string, string>();
// Zoho's Channels API has no profile link; derive one per network from its latest post.
const profileLinkCache = new Map<string, { link: string | null; expires: number }>();

const REQUEST_TIMEOUT_MS = 30_000;

const asObject = (value: unknown): Json => (value && typeof value === 'object' ? value as Json : {});
const asList = (value: unknown): Json[] => (Array.isArray(value) ? value.map(asObject) : []);
const asText = (value: unknown) => (value === null || value === undefined ? '' : String(value));
const asNumber = (value: unknown) => (typeof value === 'number' ? value : null);

async function errorText(response: Response): Promise<string> {
  const text = await response.text().catch(() => '');
  try {
    const data = asObject(JSON.parse(text));
    const error = data.error;
    if (error && typeof error === 'object') {
      const detail = asObject(error);
      return asText(detail.message || detail.code || JSON.stringify(detail)).slice(0, 300);
    }
    if (error) return asText(error).slice(0, 300);
    if (data.message) return asText(data.message).slice(0, 300);
  } catch {
    // not JSON; fall through to the raw body
  }
  return (text || `HTTP ${response.status}`).slice(0, 300);
}

function zohoOAuthFailure(data: Json, status: number) {
  const error = asText(data.error);
  const description = asText(data.error_description);
  if (error === 'Access Denied') {
    return 'Zoho OAuth: too many token refreshes (max 10 every 10 minutes). Wait a few minutes and try again.';
  }
  if (error === 'invalid_code') {
    return 'Zoho OAuth: refresh token was rejected. Create a new refresh token on the same Zoho data center as the account, put it in ZOHO_REFRESH_TOKEN, and restart the dev server.';
  }
  if (error === 'invalid_client' || error === 'invalid_client_secret') {
    return `Zoho OAuth: ${error}. Check the client id, client secret, and that ZOHO_ACCOUNTS_URL matches the account data center.`;
  }
  return `Zoho OAuth: ${[error, description].filter(Boolean).join(' — ') || `HTTP ${status}`}`;
}

async function mintAccessToken(config: ZohoConfig): Promise<string> {
  const url = new URL(`${config.accountsUrl}/oauth/v2/token`);
  url.searchParams.set('client_id', config.clientId);
  url.searchParams.set('client_secret', config.clientSecret);
  url.searchParams.set('refresh_token', config.refreshToken);
  url.searchParams.set('grant_type', 'refresh_token');
  const response = await fetch(url, { method: 'POST', signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS) });
  const data = asObject(await response.json().catch(() => ({})));
  const token = asText(data.access_token);
  if (!response.ok || !token) throw new Error(zohoOAuthFailure(data, response.status));
  // Refresh 10 minutes before the 3600s expiry.
  zohoRuntime.tokens.set(config.refreshToken, { token, expires: Date.now() + 50 * 60 * 1000 });
  return token;
}

async function accessToken(config: ZohoConfig): Promise<string> {
  const cached = zohoRuntime.tokens.get(config.refreshToken);
  if (cached && cached.expires > Date.now()) return cached.token;
  // Status and posts load together, and React Strict Mode runs that twice. Share one refresh.
  const inflight = zohoRuntime.pending.get(config.refreshToken);
  if (inflight) return inflight;
  const request = mintAccessToken(config).finally(() => {
    if (zohoRuntime.pending.get(config.refreshToken) === request) zohoRuntime.pending.delete(config.refreshToken);
  });
  zohoRuntime.pending.set(config.refreshToken, request);
  return request;
}

async function zohoFetch(
  config: ZohoConfig,
  path: string,
  { query, json, form }: { query?: Record<string, string | number>; json?: unknown; form?: FormData } = {},
): Promise<Response> {
  const token = await accessToken(config);
  const url = new URL(`${config.apiDomain}/social/v2${path}`);
  for (const [key, value] of Object.entries(query ?? {})) url.searchParams.set(key, String(value));
  const headers: Record<string, string> = {
    Authorization: `Zoho-oauthtoken ${token}`,
    portal_id: config.portalId,
    brand_id: config.brandId,
  };
  if (json !== undefined) headers['content-type'] = 'application/json';
  const body = json !== undefined ? JSON.stringify(json) : form;
  return fetch(url, {
    method: body ? 'POST' : 'GET',
    headers,
    body,
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

async function profileLink(config: ZohoConfig, network: string): Promise<string | null> {
  const cached = profileLinkCache.get(network);
  if (cached && cached.expires > Date.now()) return cached.link;
  let link: string | null = null;
  try {
    const response = await zohoFetch(config, '/posts/published', { query: { network, limit: 1, fields: 'from' } });
    if (response.ok) {
      const [entry] = asList(asObject(await response.json()).data);
      link = asText(asObject(entry?.from).link) || null;
    }
  } catch {
    link = null;
  }
  profileLinkCache.set(network, { link, expires: Date.now() + 30 * 60 * 1000 });
  return link;
}

export async function getChannels(config: ZohoConfig): Promise<ZohoChannel[]> {
  const cacheKey = `${config.portalId}:${config.brandId}`;
  const cached = channelCache.get(cacheKey);
  if (cached && cached.expires > Date.now()) return cached.channels;
  const response = await zohoFetch(config, '/channels', {
    query: { fields: 'id,name,network,status,image_url,profile_id' },
  });
  if (!response.ok) throw new Error(await errorText(response));
  const raw = asList(asObject(await response.json()).data);
  const networks = [...new Set(raw.map((channel) => asText(channel.network)).filter(Boolean))];
  const links = new Map(await Promise.all(networks.map(async (network) => [network, await profileLink(config, network)] as const)));
  const channels = raw.map((channel): ZohoChannel => {
    const network = asText(channel.network);
    return {
      id: asText(channel.id),
      name: asText(channel.name),
      network,
      platform: platformForNetwork(network),
      status: asText(channel.status),
      image_url: asText(channel.image_url) || null,
      profile_url: links.get(network) ?? null,
    };
  });
  channelCache.set(cacheKey, { channels, expires: Date.now() + 2 * 60 * 1000 });
  return channels;
}

const connectedNetwork = (platform: HubPlatform, channels: ZohoChannel[]) =>
  PLATFORM_NETWORKS[platform].find((network) => channels.some((channel) => channel.network === network)) ?? null;

export async function channelStatus(config: ZohoConfig) {
  const platforms = Object.fromEntries(HUB_PLATFORMS.map((platform) => [platform, false])) as Record<HubPlatform, boolean>;
  if (!zohoReady(config)) {
    return { configured: false, ok: false, message: MISSING_CONFIG_MESSAGE, channels: [] as ZohoChannel[], platforms };
  }
  try {
    const channels = await getChannels(config);
    for (const platform of HUB_PLATFORMS) platforms[platform] = connectedNetwork(platform, channels) !== null;
    return { configured: true, ok: true, message: `${channels.length} حساب متصل عبر Zoho Social`, channels, platforms };
  } catch (error) {
    const message = error instanceof Error && error.message ? error.message : 'تعذر الاتصال بـ Zoho Social';
    return { configured: true, ok: false, message, channels: [] as ZohoChannel[], platforms };
  }
}

async function pinterestBoardId(config: ZohoConfig): Promise<string> {
  // Zoho requires a board on every Pinterest post: use the override, else the brand's first board.
  if (config.pinterestBoardId) return config.pinterestBoardId;
  const cacheKey = `${config.portalId}:${config.brandId}`;
  const cached = boardCache.get(cacheKey);
  if (cached) return cached;
  const response = await zohoFetch(config, '/pinterest/boards', { query: { limit: 1, fields: 'id,name' } });
  if (!response.ok) throw new Error(await errorText(response));
  const [board] = asList(asObject(await response.json()).data);
  if (!board?.id) throw new Error('لا توجد لوحة بنترست متاحة. أنشئ لوحة أو اضبط ZOHO_PINTEREST_BOARD_ID.');
  boardCache.set(cacheKey, asText(board.id));
  return asText(board.id);
}

export type HubImage = { bytes: Uint8Array; mime: string };

async function uploadImage(config: ZohoConfig, image: HubImage): Promise<Json> {
  // https://www.zoho.com/social/api/image-upload-direct.html (JPEG/JPG/PNG/GIF only)
  const ext = image.mime === 'image/png' ? 'png' : image.mime === 'image/gif' ? 'gif' : 'jpg';
  const filename = `hajiss.${ext}`;
  const form = new FormData();
  form.append('file', new Blob([image.bytes], { type: image.mime }), filename);
  const response = await zohoFetch(config, '/medias/upload', { form });
  if (!response.ok) throw new Error(await errorText(response));
  const data = asObject(asObject(await response.json()).data);
  if (!data.file_path) throw new Error('تعذر رفع الصورة إلى Zoho Social (لم يُرجع مساراً للملف).');
  return {
    file_path: data.file_path,
    name: data.file_name || filename,
    size: data.file_size || image.bytes.byteLength,
    type: 'image',
    format: data.type || ext,
    width: 0,
    height: 0,
  };
}

function videoMedia(videoUrl: string): Json {
  // Zoho has no direct video upload endpoint, so videos are referenced by public HTTPS URL.
  const name = new URL(videoUrl).pathname.split('/').pop() || 'hajiss.mp4';
  const ext = name.includes('.') ? name.split('.').pop()!.toLowerCase() : 'mp4';
  return { file_path: videoUrl, name, size: 0, type: 'video', format: ext, width: 0, height: 0 };
}

export function isPublicHttpsUrl(value: string) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    return url.protocol === 'https:'
      && !['localhost', '127.0.0.1', '0.0.0.0'].includes(host)
      && !host.endsWith('.local');
  } catch {
    return false;
  }
}

/** Publish one post to the selected platforms through a single Zoho Social call. */
export async function publish(
  config: ZohoConfig,
  { caption, platforms, image, videoUrl }: { caption: string; platforms: HubPlatform[]; image?: HubImage; videoUrl?: string },
): Promise<PlatformResult[]> {
  const results = new Map<HubPlatform, PlatformResult>();
  const fail = (platform: HubPlatform, message: string, status: PlatformResult['status'] = 'failed') =>
    results.set(platform, { platform, status, message: message.slice(0, 400), post_id: null });

  const channels = await getChannels(config);
  const targets: { platform: HubPlatform; network: string }[] = [];
  for (const platform of platforms) {
    const network = connectedNetwork(platform, channels);
    if (network) targets.push({ platform, network });
    else if (platform === 'snapchat') fail(platform, 'Zoho Social لا يدعم النشر على سناب شات.', 'not_connected');
    else fail(platform, 'هذه المنصة غير مرتبطة بحساب في Zoho Social.', 'not_connected');
  }

  // A Pinterest-only problem (no board) must not block the other networks.
  const zohoChannels: Json[] = [];
  const sent: typeof targets = [];
  for (const target of targets) {
    const channel: Json = { network: target.network, brand_id: config.brandId };
    if (target.network === 'pinterest') {
      try {
        channel.board_id = await pinterestBoardId(config);
      } catch (error) {
        fail(target.platform, error instanceof Error ? error.message : 'تعذر تحديد لوحة بنترست');
        continue;
      }
    }
    zohoChannels.push(channel);
    sent.push(target);
  }

  if (sent.length > 0) {
    const failAll = (message: string) => sent.forEach(({ platform }) => fail(platform, message));
    const messageObj: Json = { channels: zohoChannels, message: caption, has_media: 'none' };
    let ready = true;
    if (image) {
      try {
        messageObj.medias = [await uploadImage(config, image)];
        messageObj.has_media = 'image';
      } catch (error) {
        failAll(error instanceof Error && error.message ? error.message : 'تعذر رفع الصورة إلى Zoho Social');
        ready = false;
      }
    } else if (videoUrl) {
      messageObj.medias = [videoMedia(videoUrl)];
      messageObj.has_media = 'video';
    }

    if (ready) {
      const response = await zohoFetch(config, '/posts/publish', { json: { post: { messages: [messageObj] } } });
      if (!response.ok) {
        failAll(await errorText(response));
      } else {
        const [entry] = asList(asObject(await response.json().catch(() => ({}))).data);
        const ok = Boolean(entry?.success);
        const message = asText(entry?.message) || (ok ? 'تم النشر عبر Zoho Social' : 'تعذر النشر عبر Zoho Social');
        const postId = asText(entry?.post_id) || null;
        for (const { platform } of sent) {
          results.set(platform, { platform, status: ok ? 'published' : 'failed', message, post_id: postId });
        }
        if (ok && postId) await refineWithPublishStatus(config, postId, results);
      }
    }
  }

  return platforms.map((platform) => results.get(platform) ?? {
    platform, status: 'failed', message: 'لم يُرجع Zoho Social نتيجة لهذه المنصة.', post_id: null,
  });
}

async function refineWithPublishStatus(config: ZohoConfig, postId: string, results: Map<HubPlatform, PlatformResult>) {
  // Best effort: Zoho reports one success flag per brand; Get Publish Status splits it per network.
  try {
    const response = await zohoFetch(config, `/posts/publish/${encodeURIComponent(postId)}`);
    if (!response.ok) return;
    for (const entry of asList(asObject(await response.json()).data)) {
      const platform = platformForNetwork(asText(entry.network));
      const current = platform && results.get(platform);
      if (!platform || !current) continue;
      const status = asText(entry.status);
      const error = asObject(entry.error);
      const hasError = Object.keys(error).length > 0;
      results.set(platform, {
        platform,
        status: ['published', 'scheduled'].includes(status) && !hasError ? 'published' : 'failed',
        message: hasError ? asText(error.message) || 'تعذر النشر' : `Zoho Social: ${status || 'تم النشر'}`,
        post_id: asText(entry.post_id) || current.post_id,
      });
    }
  } catch {
    // the publish already succeeded; a status-check hiccup is not fatal
  }
}

function normalizePost(network: string, entry: Json): ZohoPost {
  let mediaUrl: string | null = null;
  let mediaType: ZohoPost['media_type'] = 'text';
  outer: for (const attachment of asList(asObject(entry.attachments).data)) {
    for (const item of asList(asObject(attachment.media).data)) {
      const image = asText(asObject(item.image).src);
      const thumbnail = asText(asObject(asObject(item.video).thumbnail).src);
      if (image) { mediaUrl = image; mediaType = 'image'; break outer; }
      if (thumbnail) { mediaUrl = thumbnail; mediaType = 'video'; break outer; }
    }
  }
  const created = asNumber(entry.created_time);
  const from = asObject(entry.from);
  return {
    id: `${network}:${asText(entry.id)}`,
    platform: platformForNetwork(network),
    network,
    caption: asText(entry.message || entry.description),
    media_url: mediaUrl,
    media_type: mediaType,
    permalink: asText(entry.perma_link || from.link) || null,
    created_at: created ? new Date(created).toISOString() : null,
    from_name: asText(from.name) || null,
    stats: {
      likes: asNumber(entry.like_count),
      comments: asNumber(entry.comment_count),
      shares: asNumber(entry.share_count) ?? asNumber(entry.retweet_count),
      views: asNumber(entry.view_count),
    },
  };
}

/** Live published posts from Zoho Social across every connected network, newest first. */
export async function recentPosts(config: ZohoConfig, { perNetwork = 8, total = 20 } = {}): Promise<ZohoPost[]> {
  const channels = await getChannels(config);
  const networks = [...new Set(channels.map((channel) => channel.network).filter(Boolean))];
  const groups = await Promise.all(networks.map(async (network) => {
    try {
      const response = await zohoFetch(config, '/posts/published', {
        query: {
          network,
          limit: perNetwork,
          fields: 'id,message,description,attachments,perma_link,created_time,'
            + 'like_count,comment_count,share_count,retweet_count,view_count,from',
        },
      });
      if (!response.ok) return [];
      return asList(asObject(await response.json()).data).map((entry) => normalizePost(network, entry));
    } catch {
      return [];
    }
  }));
  return groups.flat()
    .sort((a, b) => (b.created_at ?? '').localeCompare(a.created_at ?? ''))
    .slice(0, total);
}
