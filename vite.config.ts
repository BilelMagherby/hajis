import react from '@vitejs/plugin-react'
import { existsSync } from 'node:fs'
import type { IncomingMessage } from 'node:http'
import { resolve } from 'node:path'
import { defineConfig, loadEnv, type Plugin } from 'vite'

const readRequest = async (req: IncomingMessage, url: URL) => {
  const chunks: Buffer[] = []
  for await (const chunk of req) chunks.push(chunk as Buffer)
  const headers = new Headers()
  for (const [key, value] of Object.entries(req.headers)) {
    if (value !== undefined) headers.set(key, Array.isArray(value) ? value.join(', ') : value)
  }
  const method = req.method ?? 'GET'
  return new Request(url, { method, headers, body: ['GET', 'HEAD'].includes(method) ? undefined : Buffer.concat(chunks) })
}

// Serves the Vercel functions in /api during `vite dev`, so the admin social hub works
// locally exactly as it does once deployed. Server-only env vars come from .env / .env.local.
const vercelApiDev = (): Plugin => ({
  name: 'vercel-api-dev',
  apply: 'serve',
  configureServer(server) {
    Object.assign(process.env, loadEnv(server.config.mode, server.config.root, ''))
    server.middlewares.use(async (req, res, next) => {
      const url = new URL(req.url ?? '/', 'http://localhost')
      const route = /^\/api\/([a-z0-9-]+(?:\/[a-z0-9-]+)*)\/?$/.exec(url.pathname)?.[1]
      const file = route && resolve(server.config.root, 'api', `${route}.ts`)
      if (!file || !existsSync(file)) return next()
      try {
        const handlers = await server.ssrLoadModule(file)
        const handler = handlers[req.method ?? 'GET']
        const response: Response = typeof handler === 'function'
          ? await handler(await readRequest(req, url))
          : new Response(JSON.stringify({ detail: 'Method not allowed' }), { status: 405 })
        if (res.destroyed) return
        res.statusCode = response.status
        response.headers.forEach((value, key) => res.setHeader(key, value))
        res.end(Buffer.from(await response.arrayBuffer()))
      } catch (error) {
        // The browser cancelled the request (e.g. a fetch aborted on unmount): nothing to answer,
        // and passing it to next() would pop Vite's error overlay over the page.
        if (req.destroyed || res.destroyed || (error as NodeJS.ErrnoException)?.code === 'ECONNRESET'
          || (error instanceof Error && error.message === 'aborted')) return
        next(error)
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiDev()],
})
