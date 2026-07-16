<div align="center">

# lizzyman04.com — Portfolio

**The personal portfolio of Arlindo Abdul ([@lizzyman04](https://github.com/lizzyman04))** — a versatile freelancer working across writing, art and technology.

[![Live site](https://img.shields.io/badge/live-lizzyman04.com-04a777?style=flat-square)](https://lizzyman04.com)
[![Deploy](https://img.shields.io/github/actions/workflow/status/lizzyman04/lizzyman04.github.io/deploy.yml?style=flat-square&label=pages%20deploy)](https://github.com/lizzyman04/lizzyman04.github.io/actions/workflows/deploy.yml)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-ff3e00?style=flat-square&logo=svelte&logoColor=white)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-static-ff3e00?style=flat-square&logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Vite](https://img.shields.io/badge/Vite-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## Overview

A single-page portfolio built with **SvelteKit** and shipped as a static SPA on **GitHub Pages**. All content — hero, résumé, abilities, portfolio, introspections — is fetched at runtime from a **Laravel API** ([`lizzyman04-api`](https://github.com/lizzyman04)), so the site updates without a redeploy.

## Features

- 🌍 **Bilingual (PT / EN)** — full interface and content translation with a client-side language switch, persisted across visits.
- 🧩 **API-driven content** — sections render from `GET /api/content`; nothing is hard-coded.
- 📬 **Newsletter** — double opt-in subscription wired to the API.
- 🎮 **Simon Says easter-egg** — the first thing I ever built in HTML/CSS/JS, preserved as a floating button that opens a playable toast without leaving the page. Its original source lives on in this repo's commit history.
- ⚡ **Static & fast** — no server at the edge; hydrated in the browser and served from GitHub's CDN.

## Tech stack

| Layer | Choice |
|-------|--------|
| Framework | SvelteKit 5 (runes) |
| Build | Vite |
| Adapter | `@sveltejs/adapter-static` (SPA fallback) |
| Hosting | GitHub Pages + custom domain (`lizzyman04.com`) |
| Content | Laravel REST API (`dash.lizzyman04.com`) |
| i18n | Lightweight custom store (PT / EN) |

## The wider platform

This repo is the public face of a three-part system:

| Domain | Stack | Role |
|--------|-------|------|
| `lizzyman04.com` | SvelteKit (this repo) | Portfolio landing |
| `dash.lizzyman04.com` | Laravel | Dashboard + REST API + newsletter |
| `tudocomlizzyman.com` | Jekyll | Static blog (posts published via the API) |

## Local development

```bash
npm install
npm run dev        # http://localhost:5173
```

Point the site at an API by setting `PUBLIC_API_URL` (defaults to the production API):

```bash
echo 'PUBLIC_API_URL=http://localhost:8000' > .env
```

## Build & deploy

Every push to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the static SPA (`npm run build`, baking in `PUBLIC_API_URL`) and publishes `build/` to GitHub Pages.

```bash
npm run build      # outputs to build/
```

## License

Released under the [MIT License](LICENSE).

---

<div align="center">
<sub>Find me at <a href="https://tudocomlizzyman.com">tudocomlizzyman.com</a> · <a href="https://www.linkedin.com/in/arlindoabdul">LinkedIn</a></sub>
</div>
