import { json, requireAdmin } from '../_lib/http.js';
import { channelStatus, zohoConfig } from '../_lib/zohoSocial.js';

/** Live Zoho Social connection state and the channels connected to the brand. */
export async function GET(request: Request) {
  const denied = requireAdmin(request);
  if (denied) return denied;
  return json(await channelStatus(zohoConfig()));
}
