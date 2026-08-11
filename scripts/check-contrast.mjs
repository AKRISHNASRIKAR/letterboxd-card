// Verifies every colour token used for text clears WCAG AA against the surfaces
// it can sit on. v1 shipped body copy at 1.77:1, which is effectively invisible;
// this fails the build rather than letting that regress.
//
//   node scripts/check-contrast.mjs
//
// Tokens that are decorative only (borders, glows, film-strip) are exempt and
// listed in DECORATIVE — if you use one for text, add it to TEXT_TOKENS instead.

import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const css = readFileSync(join(root, "app/globals.css"), "utf8")

/** Text tokens must clear 4.5:1 (AA normal text) on every surface below. */
const TEXT_TOKENS = ["text", "text2", "muted", "muted2", "accent", "accent3", "orange", "blue", "red"]

/** Backgrounds text can land on. */
const SURFACES = ["bg", "surface", "surface2", "surface3"]

const DECORATIVE = [
  "accent2", "border", "border2", "border3",
  "accentbg", "accentbg2", "orangebg", "bluebg", "redbg", "decor",
]

/** Foreground/background pairs that aren't token-on-surface. */
const PAIRS = [
  { fg: "on-accent", bg: "accent", label: "button text on accent" },
]

const AA_NORMAL = 4.5

function tokenValue(name) {
  const m = css.match(new RegExp(`--${name}:\\s*([^;]+);`))
  if (!m) throw new Error(`token --${name} not found in globals.css`)
  return m[1].trim()
}

function toRgb(value) {
  const hex = value.match(/^#([0-9a-f]{6})$/i)
  if (hex) {
    const h = hex[1]
    return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16))
  }
  const rgba = value.match(/rgba?\(([^)]+)\)/)
  if (rgba) return rgba[1].split(",").slice(0, 3).map(n => Number(n.trim()))
  throw new Error(`cannot parse colour: ${value}`)
}

const channel = c => {
  const s = c / 255
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
}

function luminance(value) {
  const [r, g, b] = toRgb(value)
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

function contrast(a, b) {
  const [la, lb] = [luminance(a), luminance(b)]
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

let failed = 0
const rows = []

for (const token of TEXT_TOKENS) {
  const fg = tokenValue(token)
  // The worst surface is the one that fails first; report that.
  let worst = null
  for (const surface of SURFACES) {
    const ratio = contrast(fg, tokenValue(surface))
    if (!worst || ratio < worst.ratio) worst = { ratio, surface }
  }
  const pass = worst.ratio >= AA_NORMAL
  if (!pass) failed++
  rows.push({ token, value: fg, ...worst, pass })
}

for (const p of PAIRS) {
  const ratio = contrast(tokenValue(p.fg), tokenValue(p.bg))
  const pass = ratio >= AA_NORMAL
  if (!pass) failed++
  rows.push({ token: p.fg, value: tokenValue(p.fg), surface: p.bg, ratio, pass })
}

const pad = (s, n) => String(s).padEnd(n)
console.log(`${pad("token", 12)} ${pad("value", 10)} ${pad("worst surface", 15)} ratio   AA`)
for (const r of rows) {
  console.log(
    `${pad("--" + r.token, 12)} ${pad(r.value, 10)} ${pad("--" + r.surface, 15)} ` +
    `${r.ratio.toFixed(2).padStart(5)}   ${r.pass ? "pass" : "FAIL"}`,
  )
}

const unchecked = DECORATIVE.filter(t => TEXT_TOKENS.includes(t))
if (unchecked.length) {
  console.error(`\nToken listed as both text and decorative: ${unchecked.join(", ")}`)
  process.exit(1)
}

if (failed) {
  console.error(`\n${failed} text token(s) below WCAG AA ${AA_NORMAL}:1.`)
  process.exit(1)
}
console.log(`\nAll ${rows.length} text tokens clear WCAG AA (${AA_NORMAL}:1).`)
