# lb-card-fe

Next.js 14 (App Router) + Tailwind 3 + TypeScript. The landing page for
[letterboxd-card](https://github.com/AKRISHNASRIKAR/letterboxd-card-backend):
you type a Letterboxd username, it previews the generated stat card and hands you
the embed snippets.

> Replaces an auto-inserted `nextjs-agent-rules` block that claimed this was an
> unfamiliar Next.js release and pointed at `node_modules/next/dist/docs/`. No such
> directory ships with the installed version, which is an ordinary Next 14.2.29.

## What this frontend actually does

It builds a URL and puts it in an `<img>`. The card is rendered entirely by the
backend (Satori → SVG); nothing here draws it. The only JSON the page fetches is
for the optional HTML stats panel.

## Talking to the backend

`NEXT_PUBLIC_API_URL` points at the Express backend. Everything goes through
`lib/api.ts` — build card URLs with `getCardUrl()` rather than string-concatenating
them, so the supported-parameter list stays in one place.

Only send parameters the backend honours. It currently accepts `user` and `count`
(1–4; the renderer caps posters at 4). It also *accepts and ignores* `width`, and
has no `theme` parameter at all — v1 advertised both, which meant users copied
embed URLs containing dead parameters. Don't reintroduce that: if the API
reference section claims a parameter, the backend must honour it.

The backend returns `404` for an unknown member, `429` when rate limited, and
`502` when Letterboxd's bot protection blocks the scrape. All three need a
distinct UI state — a blocked scrape is not the same as a missing user.

## Conventions

- `app/page.tsx` is a **server component**. Interactivity lives in client islands
  under `components/`; don't add `"use client"` to the page to make something work.
- State that should be shareable belongs in the URL (`?user=`, `?count=`), not in
  `useState`.
- Colours come from the CSS custom properties in `app/globals.css`, surfaced as
  Tailwind tokens. Body text must clear WCAG AA (4.5:1) against `--bg`; run
  `npm run check:contrast` after touching them.
- Fonts are loaded through `next/font`, not a CSS `@import`.
