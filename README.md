# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## Admin login & Zoho Social publishing

The admin dashboard (`/admin`) publishes posts to one or several social networks at once through Zoho Social. The secrets stay on the server: the Vercel functions in `api/` check the admin login and call the Zoho Social API, and the website bundle never contains them.

- `api/admin/login.ts`: checks `ADMIN_EMAIL` / `ADMIN_PASSWORD` and returns a signed 12-hour session token.
- `api/hub/status.ts`: returns the live Zoho connection state and the channels connected to the brand.
- `api/hub/posts.ts`: `GET` returns recent published posts from Zoho, and `POST` publishes a caption plus an optional image or public HTTPS video URL.

Zoho Social has no direct video upload, so a video must be a public HTTPS URL. Images are uploaded directly as JPG, PNG, or GIF (up to 4MB). The dashboard converts and compresses other images automatically.

For local development, copy `.env.example` to `.env.local` and fill it in. `npm run dev` serves the `api/` functions too.

For Vercel, add the same variables under **Project Settings → Environment Variables** and redeploy. Existing `VITE_DEMO_ADMIN_EMAIL` / `VITE_DEMO_ADMIN_PASSWORD` values still work as the admin login until `ADMIN_EMAIL` / `ADMIN_PASSWORD` are set.

## Google Analytics (public website only)

GA4 property stream `hajiss` (`https://www.hajiss.com`), measurement ID `G-D87MJ39WRX`. The code is in `src/utils/analytics.ts`.

- **Consent first.** `gtag.js` loads only after the visitor allows analytics cookies in the cookie banner. Google Consent Mode is set from the same choice: analytics follows the "analytics" switch, and ad storage follows the "marketing" switch. Withdrawing consent stops tracking and deletes the `_ga` cookies.
- **The admin area is never tracked.** That covers `/admin` and `/admin/login`. A visit that starts there never loads GA, and GA's opt-out flag (`ga-disable-G-D87MJ39WRX`) blocks every hit while an admin page is open, including when the visitor navigates there from the site.
- **Production only.** GA runs only on `hajiss.com` / `www.hajiss.com`, so local development and Vercel preview links send nothing. Set `VITE_GA_FORCE=true` at build time to test elsewhere, and `VITE_GA_DEBUG=true` to see hits in GA DebugView.
- **What is measured.** Page views (including page changes inside the site), scrolls, outbound clicks (store, maps, social links), site search and video engagement come from GA4 Enhanced measurement. The visitor's site language (`ar` / `en`) is sent as the user property `site_language`.

The `VITE_GA_*` values are read at build time; see `.env.example`.

**Read the numbers as a sample, not a full count.** Google Analytics only sees visitors who accept analytics cookies. Visitors who decline, and visitors whose browser or tools block tracking (ad blockers, Brave, Safari and Firefox tracking protection, privacy extensions, some company or school networks), are not counted at all. Real traffic is therefore higher than GA shows. Use GA for trends and comparisons (which pages, which language, week over week) rather than as an exact visitor total.

## Blog (مستجدات هاجس)

Posts created in the admin dashboard are stored in Postgres and shown on `/news`. Uploaded images and videos go to Vercel Blob. Both are serverless functions in `api/blog/`, and there is no separate backend to run.

- `api/blog/posts.ts`: `GET` lists posts (`?category=&q=&featured=&limit=&offset=`) or returns one (`?id=`). `POST` creates, `PUT ?id=` replaces, and `DELETE ?id=` removes a post and its uploaded file. Writes need the admin session.
- `api/blog/uploads.ts`: signs a direct browser upload to Vercel Blob (JPG, PNG, WEBP, GIF, MP4, WEBM). Files skip the function, so videos are not capped by Vercel's 4.5MB request limit.

Setup: in Vercel, open **Storage**, create a Postgres database (Neon) and a Blob store, and connect both to the project. That adds `DATABASE_URL` (or `POSTGRES_URL`) and `BLOB_READ_WRITE_TOKEN`. Copy the same values into `.env.local` for `npm run dev`. The `blog_posts` table is created on first use.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
