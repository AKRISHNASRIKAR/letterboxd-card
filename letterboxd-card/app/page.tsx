"use client";

import { useState, useCallback } from "react";
import { fetchStats } from "../../lib/api";
import { UserInput } from "@/components/UserInput";
import { ThemePicker } from "@/components/ThemePicker";
import { PreviewCard } from "@/components/PreviewCard";
import { CopyableLink } from "@/components/CopyableLink";
import { StatsPreview } from "@/components/StatsPreview";
import { Badge } from "@/components/ui/Badge";
import type { LetterboxdStats, Theme } from "../../types/letterboxd";

/* ── icons ── */
const GitHubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ArrowRight = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

/* ── feature list ── */
const FEATURES = [
  {
    icon: "🎬",
    title: "Rich stat cards",
    desc: "Total films, this year, lists, followers, and recent watches — all in one beautiful card.",
  },
  {
    icon: "🎨",
    title: "3 themes",
    desc: "Default, Dark, and Minimal. Fork the repo and add your own in minutes.",
  },
  {
    icon: "⚡",
    title: "Edge-cached",
    desc: "Vercel CDN + Redis caching. Cards serve in milliseconds even under heavy load.",
  },
  {
    icon: "🔗",
    title: "One URL",
    desc: "Works in any <img> tag — GitHub, Notion, portfolios, personal sites.",
  },
  {
    icon: "📦",
    title: "JSON API",
    desc: "Prefer raw data? Hit /api/stats and build your own UI on top.",
  },
  {
    icon: "🛠️",
    title: "Self-hostable",
    desc: "One-click Vercel deploy. MIT licensed. Fork it, own it, run it yourself.",
  },
];

/* ── API endpoints ── */
const ENDPOINTS = [
  {
    path: "/api/card",
    desc: "PNG stat card — use in img src",
    params: "?user= &theme= &width= &count=",
  },
  { path: "/api/stats", desc: "Full stats as JSON", params: "?user=" },
  {
    path: "/api/films",
    desc: "Recent watch history as JSON",
    params: "?user= &count=",
  },
  { path: "/api/lists", desc: "User's public lists as JSON", params: "?user=" },
];

/* ── steps ── */
const STEPS = [
  {
    num: "01",
    title: "Enter your username",
    desc: "Type your Letterboxd username in the box above and click Generate.",
  },
  {
    num: "02",
    title: "Pick a theme",
    desc: "Choose Default, Dark, or Minimal to match your README style.",
  },
  {
    num: "03",
    title: "Copy and paste",
    desc: "Click any snippet to copy. Paste the markdown directly into your GitHub README — done.",
  },
];

/* ════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState<Theme>("default");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<LetterboxdStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async (user: string) => {
    setLoading(true);
    setError(null);
    setStats(null);

    try {
      const data = await fetchStats(user);
      setStats(data);
      setUsername(user);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  const hasResult = !loading && !!stats;

  return (
    <div style={{ fontFamily: "var(--sans)" }}>
      {/* ══════════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════════ */}
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5"
        style={{
          background: "rgba(9,9,11,0.82)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* logo */}
        <div className="flex items-center gap-2.5">
          <span
            className="text-sm font-medium"
            style={{ color: "var(--accent)", fontFamily: "var(--mono)" }}
          >
            letterboxd-card
          </span>
          <Badge variant="accent">v1.0</Badge>
        </div>

        {/* links */}
        <div className="hidden sm:flex items-center gap-1">
          {["Docs", "Themes", "API"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="px-3 py-1.5 rounded-lg text-xs transition-colors"
              style={{
                color: "var(--muted)",
                fontFamily: "var(--sans)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text2)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--muted)")
              }
            >
              {l}
            </a>
          ))}
        </div>

        {/* github */}
        <a
          href="https://github.com/AKRISHNASRIKAR/letterboxd-card-backend"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs transition-all"
          style={{
            color: "var(--text2)",
            border: "1px solid var(--border2)",
            fontFamily: "var(--sans)",
            textDecoration: "none",
            background: "transparent",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "var(--text)";
            el.style.borderColor = "var(--border3)";
            el.style.background = "var(--surface2)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.color = "var(--text2)";
            el.style.borderColor = "var(--border2)";
            el.style.background = "transparent";
          }}
        >
          <GitHubIcon />
          <span>Star on GitHub</span>
        </a>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        {/* radial background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 900px 600px at 50% -80px, rgba(212,168,83,0.055) 0%, transparent 70%),
              radial-gradient(ellipse 500px 400px at 85% 40%,   rgba(212,168,83,0.025) 0%, transparent 60%),
              radial-gradient(ellipse 400px 300px at 15% 60%,   rgba(212,168,83,0.02)  0%, transparent 60%)
            `,
          }}
        />

        {/* film strip top bar */}
        <div className="absolute top-0 left-0 right-0 h-1 film-strip-top" />

        <div className="relative max-w-2xl mx-auto px-6 pt-20 pb-16 text-center">
          {/* eyebrow pill */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs mb-8 animate-fade-up"
            style={{
              border: "1px solid rgba(212,168,83,0.2)",
              background: "rgba(212,168,83,0.055)",
              color: "var(--accent)",
              fontFamily: "var(--sans)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: "var(--accent)",
                animation: "pulse 2.5s ease-in-out infinite",
              }}
            />
            Open source · MIT license · No auth required
          </div>

          {/* headline */}
          <h1
            className="mb-5 leading-[1.05] animate-fade-up stagger-1"
            style={{
              fontSize: "clamp(34px, 6vw, 58px)",
              fontFamily: "var(--serif)",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Your Letterboxd stats,
            <br />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>
              everywhere you write.
            </em>
          </h1>

          {/* sub */}
          <p
            className="text-base mb-12 max-w-md mx-auto leading-relaxed animate-fade-up stagger-2"
            style={{ color: "var(--text2)" }}
          >
            Generate a beautiful stat card from any Letterboxd profile. Embed it
            in your GitHub README, portfolio, or anywhere that renders an image
            URL.
          </p>

          {/* ── GENERATOR CARD ─────────────────────────────────── */}
          <div
            className="rounded-2xl p-6 text-left space-y-5 animate-fade-up stagger-3"
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border2)",
              boxShadow:
                "0 0 0 1px rgba(255,255,255,0.03), 0 40px 80px rgba(0,0,0,0.5)",
            }}
          >
            {/* input */}
            <UserInput onGenerate={handleGenerate} loading={loading} />

            {/* divider + theme picker */}
            <div
              className="flex items-center justify-between flex-wrap gap-3"
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "16px",
              }}
            >
              <ThemePicker value={theme} onChange={setTheme} />

              {stats && (
                <span
                  className="text-[11px]"
                  style={{ color: "var(--muted2)", fontFamily: "var(--mono)" }}
                >
                  cached · refreshes hourly
                </span>
              )}
            </div>

            {/* error state */}
            {error && (
              <div
                className="flex items-start gap-3 rounded-xl px-4 py-3 animate-fade-in"
                style={{
                  background: "var(--redbg)",
                  border: "1px solid rgba(224,92,92,0.25)",
                }}
              >
                <svg
                  className="mt-0.5 shrink-0"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  style={{ color: "var(--red)" }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p
                  className="text-sm"
                  style={{ color: "var(--red)", fontFamily: "var(--sans)" }}
                >
                  {error}
                </p>
              </div>
            )}

            {/* loading skeleton */}
            {loading && (
              <div className="space-y-3">
                <div className="skeleton h-[72px] rounded-2xl" />
                <div className="skeleton h-[52px] rounded-2xl" />
                <div className="skeleton h-[220px] rounded-2xl" />
              </div>
            )}

            {/* results */}
            {hasResult && (
              <div
                className="space-y-6 animate-fade-in"
                style={{
                  borderTop: "1px solid var(--border)",
                  paddingTop: "20px",
                }}
              >
                {/* stats summary */}
                <StatsPreview stats={stats} />

                {/* card preview */}
                <div>
                  <p
                    className="text-[11px] uppercase tracking-widest mb-3"
                    style={{
                      color: "var(--muted2)",
                      fontFamily: "var(--sans)",
                    }}
                  >
                    Card preview
                  </p>
                  <PreviewCard username={username} theme={theme} />
                </div>

                {/* embed code */}
                <div>
                  <p
                    className="text-[11px] uppercase tracking-widest mb-3"
                    style={{
                      color: "var(--muted2)",
                      fontFamily: "var(--sans)",
                    }}
                  >
                    Embed code
                  </p>
                  <CopyableLink username={username} theme={theme} />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          HOW TO USE
      ══════════════════════════════════════════════════════════ */}
      <section
        id="docs"
        className="max-w-2xl mx-auto px-6 py-20"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="text-center mb-12">
          <h2
            className="text-3xl mb-3"
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Three steps, done.
          </h2>
          <p className="text-sm" style={{ color: "var(--text2)" }}>
            No accounts, no API keys, no maintenance.
          </p>
        </div>

        <div className="space-y-3">
          {STEPS.map((s) => (
            <div
              key={s.num}
              className="flex items-start gap-5 rounded-2xl px-6 py-5 group transition-all duration-200"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border2)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)")
              }
            >
              <span
                className="text-2xl font-bold shrink-0 leading-none mt-0.5 select-none"
                style={{
                  color: "rgba(212,168,83,0.2)",
                  fontFamily: "var(--mono)",
                  transition: "color 0.2s",
                }}
              >
                {s.num}
              </span>
              <div>
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "var(--text)", fontFamily: "var(--sans)" }}
                >
                  {s.title}
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--muted)", fontFamily: "var(--sans)" }}
                >
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURES
      ══════════════════════════════════════════════════════════ */}
      <section
        id="themes"
        className="max-w-2xl mx-auto px-6 py-20"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="text-center mb-12">
          <h2
            className="text-3xl mb-3"
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Everything you need
          </h2>
          <p className="text-sm" style={{ color: "var(--text2)" }}>
            No auth. No API key. No setup. Just a URL.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl p-5 transition-all duration-200"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border2)";
                el.style.background = "var(--surface2)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "var(--border)";
                el.style.background = "var(--surface)";
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-4"
                style={{
                  background: "var(--accentbg)",
                  border: "1px solid rgba(212,168,83,0.15)",
                }}
              >
                {f.icon}
              </div>
              <p
                className="text-sm font-semibold mb-1.5"
                style={{ color: "var(--text)", fontFamily: "var(--sans)" }}
              >
                {f.title}
              </p>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--muted)", fontFamily: "var(--sans)" }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          API REFERENCE
      ══════════════════════════════════════════════════════════ */}
      <section
        id="api"
        className="max-w-2xl mx-auto px-6 py-20"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="text-center mb-12">
          <h2
            className="text-3xl mb-3"
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            API reference
          </h2>
          <p className="text-sm" style={{ color: "var(--text2)" }}>
            All endpoints accept{" "}
            <code className="code-pill">?user=USERNAME</code> as the required
            parameter.
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid var(--border)" }}
        >
          {ENDPOINTS.map((ep, i) => (
            <div
              key={ep.path}
              className="flex items-center gap-4 px-5 py-4 transition-colors"
              style={{
                background: "var(--surface)",
                borderTop: i > 0 ? "1px solid var(--border)" : "none",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--surface2)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "var(--surface)")
              }
            >
              {/* method badge */}
              <span
                className="text-xs font-semibold px-2 py-1 rounded-lg shrink-0"
                style={{
                  background: "var(--greenbg)",
                  color: "var(--green)",
                  border: "1px solid rgba(82,194,122,0.2)",
                  fontFamily: "var(--mono)",
                  minWidth: "42px",
                  textAlign: "center",
                }}
              >
                GET
              </span>

              {/* path */}
              <code
                className="text-sm shrink-0"
                style={{ color: "var(--accent)", fontFamily: "var(--mono)" }}
              >
                {ep.path}
              </code>

              {/* desc */}
              <span
                className="text-xs flex-1 hidden sm:block"
                style={{ color: "var(--muted)", fontFamily: "var(--sans)" }}
              >
                {ep.desc}
              </span>

              {/* params */}
              <code
                className="text-[11px] hidden md:block shrink-0"
                style={{ color: "var(--muted2)", fontFamily: "var(--mono)" }}
              >
                {ep.params}
              </code>
            </div>
          ))}
        </div>

        {/* example curl */}
        <div className="mt-6">
          <p
            className="text-xs mb-2"
            style={{ color: "var(--muted2)", fontFamily: "var(--sans)" }}
          >
            Example
          </p>
          <div
            className="rounded-xl px-4 py-3.5 overflow-x-auto"
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
            }}
          >
            <code
              className="text-xs whitespace-nowrap"
              style={{
                color: "rgba(212,168,83,0.8)",
                fontFamily: "var(--mono)",
              }}
            >
              curl
              &quot;https://letterboxd-card-backend.vercel.app/api/stats?user=dave&quot;
            </code>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════ */}
      <section className="max-w-2xl mx-auto px-6 pb-20">
        <div
          className="rounded-2xl px-8 py-10 text-center relative overflow-hidden"
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(212,168,83,0.18)",
          }}
        >
          {/* glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 500px 300px at 50% 100%, rgba(212,168,83,0.07) 0%, transparent 70%)",
            }}
          />

          <p
            className="text-xs uppercase tracking-widest mb-4 relative"
            style={{ color: "var(--accent)", fontFamily: "var(--sans)" }}
          >
            Open source
          </p>
          <h3
            className="text-2xl mb-3 relative"
            style={{
              fontFamily: "var(--serif)",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Love it? Star it.
          </h3>
          <p
            className="text-sm mb-8 max-w-sm mx-auto relative"
            style={{ color: "var(--text2)", fontFamily: "var(--sans)" }}
          >
            The project is fully open source. Fork it, contribute themes, report
            bugs, or just leave a ★.
          </p>
          <a
            href="https://github.com/YOUR_NAME/letterboxd-card-backend"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold transition-all accent-glow"
            style={{
              background: "var(--accent)",
              color: "#160e00",
              textDecoration: "none",
              fontFamily: "var(--sans)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#dfb86a")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                "var(--accent)")
            }
          >
            <GitHubIcon />
            Star on GitHub
            <ArrowRight />
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <footer
        className="px-6 py-8"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-5 flex-wrap justify-center">
            <span
              className="text-sm"
              style={{ color: "var(--muted)", fontFamily: "var(--mono)" }}
            >
              letterboxd-card
            </span>
            {[
              {
                label: "GitHub",
                href: "https://github.com/YOUR_NAME/letterboxd-card-backend",
              },
              {
                label: "Issues",
                href: "https://github.com/YOUR_NAME/letterboxd-card-backend/issues",
              },
              {
                label: "MIT License",
                href: "https://github.com/YOUR_NAME/letterboxd-card-backend/blob/main/LICENSE",
              },
              {
                label: "CONTRIBUTING",
                href: "https://github.com/YOUR_NAME/letterboxd-card-backend/blob/main/CONTRIBUTING.md",
              },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs transition-colors"
                style={{
                  color: "var(--muted2)",
                  fontFamily: "var(--sans)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--muted)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--muted2)")
                }
              >
                {l.label}
              </a>
            ))}
          </div>

          <p
            className="text-xs"
            style={{ color: "var(--muted2)", fontFamily: "var(--sans)" }}
          >
            Not affiliated with Letterboxd.
          </p>
        </div>
      </footer>
    </div>
  );
}
