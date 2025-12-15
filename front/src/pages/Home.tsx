// src/pages/Home.tsx
import { useMixes } from "../hooks/useMixes";
import MixCard from "../components/MixCard";
import { trackEvent } from "../lib/analytics";

export default function Home() {
  const { mixes, loading } = useMixes();
  const featured = !loading ? mixes.find((m) => m.youtube) : null;

  return (
    <div className="relative min-h-screen bg-[--color-dark] text-[--color-text]">
      {/* Enhanced background with gradient overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_var(--color-primary)_0%,_var(--color-dark)_60%)] opacity-20" />

      <main className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-16 pb-20">
        {/* HERO */}
        <section
          aria-labelledby="hero-title"
          className="flex flex-col gap-10 lg:flex-row lg:items-center"
        >
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-[--color-primary]/10 px-4 py-1.5 text-xs text-[--color-primary] ring-1 ring-[--color-primary]/20">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-medium">Tel Aviv, Israel</span>
              <span className="text-[--color-text-muted]">
                · Raw / Deep / Hypnotic Techno
              </span>
            </p>

            <h1
              id="hero-title"
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            >
              <span className="text-[--color-text]">DJ Line808</span>
              <span className="text-[--color-primary]"> - Techno DJ</span>
            </h1>

            <p className="text-lg text-[--color-text-muted] max-w-lg">
              Dark atmospheres, rolling drums and high-energy grooves. Built for
              clubs, raves and showcases.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://soundcloud.com/line808"
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("click_listen", {
                    platform: "soundcloud",
                    location: "hero",
                    href: "https://soundcloud.com/line808",
                  })
                }
                className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-5 py-3 text-sm font-semibold hover:bg-white/90 transition-all duration-200 btn-primary"
              >
                🎵 Listen on SoundCloud
              </a>
              <a
                href="/mixes"
                onClick={() =>
                  trackEvent("click_internal_nav", {
                    target: "/mixes",
                    location: "hero",
                  })
                }
                className="inline-flex items-center gap-2 rounded-lg bg-[--color-surface-2] px-5 py-3 text-sm text-[--color-text] ring-1 ring-[--color-border] hover:bg-[--color-surface-3] transition-all duration-200 btn-secondary"
              >
                📀 View all mixes
              </a>
            </div>

            <p className="text-xs text-[--color-text-subtle] pt-2">
              🌍 Available for club nights, festival slots & livestreams.
            </p>
          </div>

          {/* Featured YouTube video */}
          <div className="flex-1">
            {loading ? (
              <div className="skeleton-loader h-96 rounded-2xl"></div>
            ) : featured ? (
              <article
                aria-label="Featured DJ mix"
                className="rounded-2xl bg-[--color-surface-2]/50 backdrop-blur border border-[--color-border] p-6 shadow-xl card-hover"
              >
                <div className="mb-4">
                  <p className="text-xs font-medium text-[--color-primary] uppercase tracking-wide mb-2 flex items-center gap-2">
                    <span>▶️</span> Featured Mix
                  </p>

                  <h2 className="text-xl font-bold mb-2 text-[--color-text] leading-tight">
                    {featured.title}
                  </h2>

                  {featured.description && (
                    <p className="text-sm text-[--color-text-muted] mb-3 line-clamp-2">
                      {featured.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-3 text-xs mb-4">
                    <span className="text-[--color-text-subtle]">
                      {featured.length}
                    </span>
                    {featured.tags?.map((tag, index) => (
                      <span key={index} className="text-[--color-accent]">
                        · {tag}
                      </span>
                    ))}
                    {featured.location && (
                      <span className="text-[--color-text-subtle]">
                        · {featured.location}
                      </span>
                    )}
                  </div>
                </div>

                {/* Responsive YouTube embed */}
                {featured.youtube ? (
                  <div className="relative w-full pt-[56.25%] rounded-xl overflow-hidden mb-4 glow-primary">
                    <iframe
                      className="absolute inset-0 w-full h-full rounded-xl"
                      src={`https://www.youtube.com/embed/${featured.youtube}?si=DVCV1wE4sT_lIq_k`}
                      title={featured.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                    ></iframe>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 bg-[--color-surface-3] rounded-xl mb-4">
                    <p className="text-[--color-text-subtle]">
                      No YouTube video available
                    </p>
                  </div>
                )}

                {/* Enhanced Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {featured.soundcloud && (
                    <a
                      href={featured.soundcloud}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackEvent("click_listen", {
                          platform: "soundcloud",
                          location: "featured",
                          mix_title: featured.title,
                          mix_id: featured.track_id,
                          href: featured.soundcloud,
                        })
                      }
                      className="rounded-lg bg-[#ff7700] text-black px-4 py-3 text-sm font-semibold hover:bg-[#e66a00] transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span>🎵</span> Play on SoundCloud
                    </a>
                  )}

                  {featured.mixcloud && (
                    <a
                      href={featured.mixcloud}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() =>
                        trackEvent("click_listen", {
                          platform: "mixcloud",
                          location: "featured",
                          mix_title: featured.title,
                          mix_id: featured.track_id,
                          href: featured.mixcloud,
                        })
                      }
                      className="rounded-lg border border-[#52aad8] text-[#52aad8] px-4 py-3 text-sm font-semibold hover:bg-[#52aad8]/10 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span>☁️</span> Mixcloud
                    </a>
                  )}
                </div>
              </article>
            ) : (
              <div className="flex items-center justify-center h-96 bg-[--color-surface-3] rounded-2xl border border-[--color-border]">
                <p className="text-[--color-text-muted]">
                  No featured mixes available
                </p>
              </div>
            )}
          </div>
        </section>

        {/* LATEST MIXES */}
        <section className="mt-20 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[--color-text]">
              Latest mixes
            </h2>
            <a
              href="/mixes"
              onClick={() =>
                trackEvent("click_internal_nav", {
                  target: "/mixes",
                  location: "latest_mixes_heading",
                })
              }
              className="inline-flex items-center gap-1 text-sm text-[--color-text-muted] hover:text-[--color-primary] transition-colors link-hover"
            >
              View all <span>→</span>
            </a>
          </div>

          {loading ? (
            <div className="grid gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="skeleton-loader h-48 rounded-xl"
                ></div>
              ))}
            </div>
          ) : mixes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mixes.slice(0, 6).map((mix) => (
                <MixCard key={mix.title} mix={mix} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[--color-text-muted] mb-4">
                No mixes available yet
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 text-[--color-primary] hover:text-[--color-accent] transition-colors"
              >
                <span>💌</span> Contact for bookings
              </a>
            </div>
          )}
        </section>

        {/* SOCIALS */}
        <section aria-labelledby="follow" className="mt-20">
          <h2
            id="follow"
            className="text-lg font-bold text-[--color-text] mb-3"
          >
            Follow Line808
          </h2>
          <p className="text-[--color-text-muted] mb-6 max-w-2xl">
            Stay connected for exclusive clips, behind-the-scenes content,
            artwork reveals, and the latest release announcements.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {[
              {
                label: "Instagram",
                href: "https://instagram.com/djline808",
                icon: "📷",
              },
              {
                label: "TikTok",
                href: "https://tiktok.com/@dj.line808",
                icon: "🎥",
              },
              {
                label: "YouTube",
                href: "https://youtube.com/@djline808",
                icon: "📺",
              },
              {
                label: "X / Twitter",
                href: "https://x.com/dj_line808",
                icon: "🐦",
              },
              {
                label: "Facebook",
                href: "https://facebook.com/djline808",
                icon: "👥",
              },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                onClick={() =>
                  trackEvent("click_social", {
                    network: item.label.toLowerCase(),
                    href: item.href,
                    location: "home_socials",
                  })
                }
                className="rounded-xl bg-[--color-surface-2] p-4 hover:bg-[--color-surface-3] transition-all duration-200 card-hover flex flex-col items-center justify-center gap-2 text-center"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* CONTACT / BOOKINGS */}
        <section aria-labelledby="contact" className="mt-20 mb-12">
          <div className="rounded-2xl bg-gradient-to-r from-[--color-primary]/10 to-[--color-accent]/5 border border-[--color-border] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2
                id="contact"
                className="text-xl font-bold text-[--color-text] mb-2"
              >
                Bookings & Collaborations
              </h2>
              <p className="text-[--color-text-muted] mb-3">
                Available for club nights, festival slots, guest mixes, and live
                streaming sessions.
              </p>
              <p className="text-sm text-[--color-text-subtle]">
                Specializing in Raw, Deep & Hypnotic Techno for underground
                venues and major events.
              </p>
            </div>
            <a
              href="/contact"
              onClick={() =>
                trackEvent("click_internal_nav", {
                  target: "/contact",
                  location: "contact_cta",
                })
              }
              className="rounded-lg bg-white text-black px-6 py-3 text-sm font-semibold hover:bg-white/90 transition-all duration-200 btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              <span>📩</span> Contact Line808
            </a>
          </div>
        </section>

        {/* MODAL PLAYER (commented out) */}
        {/* ... */}
      </main>
    </div>
  );
}
