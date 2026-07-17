<div align="center">

# lizzyman04.com

**My first project as a programmer was a lightweight version of Simon, one of the most iconic games of the 80s.**
**I learned HTML, CSS and JavaScript by building it — so it still ships here, in the corner of the page.**

[![Live site](https://img.shields.io/badge/live-lizzyman04.com-04a777?style=flat-square)](https://lizzyman04.com)
[![Deploy](https://img.shields.io/github/actions/workflow/status/lizzyman04/lizzyman04.github.io/deploy.yml?style=flat-square&label=pages%20deploy)](https://github.com/lizzyman04/lizzyman04.github.io/actions/workflows/deploy.yml)
[![Svelte 5](https://img.shields.io/badge/Svelte-5-ff3e00?style=flat-square&logo=svelte&logoColor=white)](https://svelte.dev)
[![SvelteKit](https://img.shields.io/badge/SvelteKit-static-ff3e00?style=flat-square&logo=svelte&logoColor=white)](https://kit.svelte.dev)
[![Vite](https://img.shields.io/badge/Vite-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## The game came first

I wasn't trying to learn web development. I was trying to make four coloured squares light up in the right order, and everything I know about the browser arrived as a side effect of that: the DOM, because the squares had to react; CSS, because they had to feel like buttons; audio, because a Simon without sound isn't Simon.

That original still exists — hand-written HTML, CSS, JS and four `.wav` files, in [`d20eb75`](https://github.com/lizzyman04/lizzyman04.github.io/commit/d20eb75), the first commit of what this repo used to be. The site grew over it rather than replacing it. The game is now a floating button that opens a playable toast, ported to a component but with the same rules, the same colours and the same four sounds.

Keeping it isn't nostalgia. It's the one part of the site I can't rewrite without noticing how differently I'd write it now, which makes it a better measure of progress than anything I could claim in a paragraph.

## How I think about this codebase

**Content doesn't belong in the code.** Every section renders from `GET /api/content` at runtime. Editing a sentence shouldn't require a build, a commit and a deploy — three chances to break a site over one word. The tradeoff I accepted: the page is useless if the API is down. I'd rather own that failure than own a redeploy every time I change my mind.

**Static until proven otherwise.** No server at the edge, no SSR, no runtime I have to keep alive. `adapter-static` with an SPA fallback, hydrated in the browser, served from a CDN. Fewer moving parts is a feature, and most portfolios are a server bill pretending to be an architecture.

**Both languages, one payload.** PT and EN ship together and the client picks. A language switch that refetches is a language switch that can fail halfway; this one can't. It costs a slightly larger response, which is the cheapest thing I own.

**Decisions get one home.** The cursor is declared once, with `!important`, on a wildcard. It used to live on `body` and get overridden in ten other places — `pointer` here, `not-allowed` there — with a scattering of `cursor: inherit` trying to claw it back, so it changed over links, buttons and disabled inputs. Anything meant to be invariant should be hard to override by accident, or it won't stay invariant.

**Guard the real constraint, not the imagined one.** Text on this site is selectable. It wasn't for a long time, because `user-select: none` sat on `body` to make the page feel app-like — a rule that cost readers the ability to copy a paragraph in exchange for a feeling.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
```

Content is fetched from a live API, so the dev server works out of the box against production. Point it somewhere else with `PUBLIC_API_URL`:

```bash
echo 'PUBLIC_API_URL=http://localhost:8000' > .env
```

## Build & deploy

Every push to `main` runs [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which builds the static SPA (baking in `PUBLIC_API_URL`) and publishes `build/` to GitHub Pages.

```bash
npm run build      # outputs to build/
```

## Credits

Ability icons are [Phosphor Icons](https://phosphoricons.com) (MIT).

## License

Released under the [MIT License](LICENSE).
