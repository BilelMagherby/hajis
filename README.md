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
