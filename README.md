# Pivot Level — landing site

Single responsive landing page. Built with **Vite + React**.

## Develop

```bash
npm install
npm run dev
```

Opens a local dev server with hot reload.

## Build for production

```bash
npm run build
```

Outputs a fully static site to `dist/` — minified HTML, CSS and JS. Preview the
production build locally with:

```bash
npm run preview
```

## Deploy

The `dist/` folder is a plain static site. Upload its contents to any static
host or web server:

- **Netlify / Vercel / Cloudflare Pages** — point the project at this repo;
  build command `npm run build`, publish directory `dist`.
- **Plain server (nginx / Apache / S3)** — run `npm run build` and copy
  everything inside `dist/` to the web root.

Asset paths are relative (`base: './'` in `vite.config.js`), so the site works
whether it is served from a domain root or a sub-folder.

## Project structure

```
index.html         entry HTML (fonts, meta tags)
vite.config.js     build config
public/assets/     logo + sticker images (copied verbatim into dist/)
src/
  main.jsx         React entry point
  App.jsx          renders the landing page
  Landing.jsx      all page sections
  shared.jsx       reusable components (logo, stickers, panels, useIsMobile)
  styles.css       design tokens, type scale, animations, responsive rules
```

Responsive behaviour: `useIsMobile()` (in `shared.jsx`) switches layout below
768px; type and spacing also scale fluidly via CSS `clamp()`.
