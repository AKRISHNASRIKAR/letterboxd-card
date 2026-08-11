# letterboxd-card-frontend

The landing page for [letterboxd-card](https://github.com/AKRISHNASRIKAR/letterboxd-card-backend):
type a Letterboxd username, preview the generated stat card, copy the embed
snippet.

Next.js 14 (App Router) · Tailwind 3 · TypeScript.

## Getting started

```bash
npm install
cp .env.example .env.local     # point NEXT_PUBLIC_API_URL at your backend
npm run dev
```

`NEXT_PUBLIC_API_URL` is the only environment variable. Without it the page still
renders, but every card URL comes out relative and the console says so.

```bash
npm run build            # production build
npm run lint             # eslint
npm run check:contrast   # WCAG AA check on the colour tokens
```

## How it works

The frontend builds a URL and puts it in an `<img>`. The card itself is rendered
entirely by the backend (Satori → SVG); nothing here draws it.

`app/page.tsx` is a **server component**. It parses `?user=` and `?count=` from
the query string and renders every section as static markup. The only thing that
ships to the browser is `<Generator>` and the components it owns, so a deep link
like `/?user=akrishnasrikar&count=3` paints the whole page — input pre-filled,
card already requested — before hydration.

Once mounted, `<Generator>` mirrors its state back into the URL with
`history.replaceState`, so any preview is linkable and survives a refresh.

For each username it fires two requests in parallel:

- the card `<img>`, which is what the user actually wants, and
- `/api/stats`, which fills the live data panel and — if the image fails —
  explains why.

## API parameters

Only what the backend honours:

| Parameter | Values | Notes |
|-----------|--------|-------|
| `user`    | required | Letterboxd username |
| `count`   | 1–4      | Posters on the card; the renderer caps the row at 4 |

There is no `theme` parameter, and `width` is accepted by the backend and
ignored. Neither appears in generated URLs — see `lib/api.ts`, which is the only
place card URLs are built.

Errors the UI distinguishes: `404` unknown member, `429` rate limited, `502`
Letterboxd's bot protection blocked the scrape, plus a local network failure.

## Notes on v2

Changed from v1:

- Page split into a server shell and one client island; v1 was a single
  `"use client"` component, so all the static copy had to hydrate before the
  input worked.
- State moved into the URL, making previews shareable.
- Poster count is now adjustable.
- `StatsPreview` — written in v1 but never imported — is now the live data panel.
- Rethemed onto Letterboxd's palette — the same one the card renders with
  (`#14181c` ground, `#00e054` green, with `#ff8000` / `#40bcf4` completing the
  trio). Previously the site was gold on near-black while the card it showcased
  was blue-grey and green, so the product clashed with its own page. `--bg` and
  `--surface` now match the card's values exactly, so a preview sits flush
  against the panel.
- Colour tokens reworked for WCAG AA. v1's two muted tokens sat at 3.61:1 and
  1.77:1 and between them carried most of the body copy; `npm run check:contrast`
  keeps that from regressing. Note that Letterboxd's own mid greys (`#89a`,
  `#789`) fail on the lighter surfaces, so the muted tiers are lifted versions
  rather than exact copies.
- Real favicon (`app/icon.svg` + `app/apple-icon.tsx`), replacing the
  `create-next-app` default. Three film-strip bars in the brand trio —
  deliberately not Letterboxd's three overlapping circles, since the site
  disclaims affiliation.
- Fonts moved from a render-blocking CSS `@import` to `next/font`.
- API reference corrected: v1 advertised a removed `theme` parameter, an ignored
  `width`, twice the `count` range, and described the SVG endpoint as PNG.
- Real OG image, `metadataBase`, `robots.ts`, `sitemap.ts`.
- Removed duplicate postcss and eslint configs left over from scaffolding.
