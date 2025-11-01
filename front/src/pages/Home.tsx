// src/pages/Home.tsx
import { useEffect, useState } from "react";

type Mix = {
  title: string;
  description?: string;
  length: string;
  tags: string[];
  soundcloud: string;
  mixcloud?: string;
  track_id?: string;
  date?: string;
  location?: string;
};

export default function Home() {
  const [currentMix, setCurrentMix] = useState<Mix | null>(null);
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/mixes")
      .then((res) => res.json())
      .then((data) => {
        const rawMixes = Array.isArray(data?.mixes) ? data.mixes : [];

        // normalize shape from backend → frontend
        const normalized: Mix[] = rawMixes.map((m: Mix) => ({
          title: m.title,
          description: m.description,
          length: m.length ?? "",
          tags: Array.isArray(m.tags) ? m.tags : [],
          soundcloud: m.soundcloud ?? "",
          mixcloud: m.mixcloud ?? "",
          track_id: m.track_id,
          date: m.date,
          location: m.location,
        }));

        setMixes(normalized);
      })
      .catch((err) => {
        console.error("Failed to load mixes", err);
      })
      .finally(() => setLoading(false));
  }, []);

  const featured = !loading && mixes.length > 0 ? mixes[0] : null;

  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      {/* background layer, now behind everything */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#8022ff22_0,_#050505_45%)]" />

      <main className="relative mx-auto max-w-5xl px-4 pt-20 pb-16">
        {/* HERO */}
        <section
          aria-labelledby="hero-title"
          className="flex flex-col gap-10 lg:flex-row lg:items-center"
        >
          <div className="flex-1 space-y-5">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Tel Aviv, Israel · Raw / Deep / Hypnotic Techno
            </p>

            <h1
              id="hero-title"
              className="text-4xl font-bold tracking-tight sm:text-5xl"
            >
              DJ Line808 - Techno DJ from Tel Aviv
            </h1>

            <p className="text-lg text-white/60">
              Dark atmospheres, rolling drums and high-energy grooves. Built for
              clubs, raves and showcases.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://soundcloud.com/line808"
                className="inline-flex items-center gap-2 rounded-lg bg-white text-black px-4 py-2 text-sm font-semibold hover:bg-white/90 transition"
              >
                Listen on SoundCloud
                <span aria-hidden>→</span>
              </a>
              <a
                href="/mixes"
                className="inline-flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 text-sm text-white/80 ring-1 ring-white/10 hover:bg-white/10 transition"
              >
                View all mixes
              </a>
            </div>

            <p className="text-xs text-white/40">
              Available for club nights, festival slots & livestreams.
            </p>
          </div>

          {/* Featured mix */}
          <div className="flex-1">
            {loading ? (
              <p className="text-gray-500">Loading…</p>
            ) : featured ? (
              <article
                aria-label="Featured DJ mix"
                className="rounded-2xl bg-white/3 backdrop-blur border border-white/5 p-5 shadow-xl"
              >
                <p className="text-xs font-medium text-white/50 uppercase tracking-wide mb-2">
                  Featured mix
                </p>
                <h2 className="text-lg font-semibold mb-1">{featured.title}</h2>
                <p className="text-sm text-white/45 mb-4">
                  {featured.length}
                  {featured.tags?.length
                    ? " · " + featured.tags.join(" · ")
                    : ""}
                  {featured.location
                    ? ` · Recorded in ${featured.location}`
                    : ""}
                </p>
                <div className="flex gap-2">
                  {featured.soundcloud ? (
                    <a
                      href={featured.soundcloud}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-lg bg-white/10 px-3 py-2 text-sm hover:bg-white/15 transition text-center"
                    >
                      Play on SoundCloud
                    </a>
                  ) : null}
                  {featured.mixcloud ? (
                    <a
                      href={featured.mixcloud}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 rounded-lg bg-transparent ring-1 ring-white/10 px-3 py-2 text-sm hover:bg-white/5 transition text-center"
                    >
                      Mixcloud
                    </a>
                  ) : null}
                </div>
                <div className="mt-4 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-fuchsia-400 to-sky-400" />
                </div>
              </article>
            ) : (
              <p className="text-gray-500">No mixes yet.</p>
            )}
          </div>
        </section>

        {/* LATEST MIXES */}
        <section aria-labelledby="latest-mixes" className="mt-16 space-y-6">
          <div className="flex items-center justify-between">
            <h2
              id="latest-mixes"
              className="text-sm font-semibold tracking-wide text-white/70"
            >
              Latest mixes
            </h2>
            <a
              href="/mixes"
              className="text-xs text-white/40 hover:text-white/70 transition"
            >
              View all →
            </a>
          </div>

          {loading ? (
            <p className="text-gray-500">Loading mixes…</p>
          ) : mixes.length === 0 ? (
            <p className="text-gray-500 text-sm">No mixes found.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {mixes.map((mix) => (
                <article
                  key={mix.title}
                  className="rounded-xl bg-white/2 border border-white/5 p-4 hover:bg-white/5 transition"
                >
                  <h3 className="text-sm font-medium">{mix.title}</h3>
                  <p className="text-xs text-white/40 mt-1">
                    {mix.length}
                    {mix.tags?.length ? " · " + mix.tags.join(" · ") : ""}
                  </p>
                  <button
                    onClick={() => setCurrentMix(mix)}
                    className="mt-4 inline-flex items-center gap-1 text-xs text-white/70 hover:text-white transition"
                  >
                    ▶ Play
                    <span className="text-white/30">SC</span>
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* SOCIALS */}
        <section aria-labelledby="follow" className="mt-16">
          <h2 id="follow" className="text-sm font-semibold text-white/70 mb-4">
            Follow Line808
          </h2>
          <p className="text-xs text-white/40 mb-4">
            Clips, artwork, behind-the-scenes and release announcements.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Instagram", href: "https://instagram.com/djline808" },
              { label: "TikTok", href: "https://tiktok.com/@dj.line808" },
              { label: "YouTube", href: "https://youtube.com/@djline808" },
              { label: "X / Twitter", href: "https://x.com/dj_line808" },
              { label: "Facebook", href: "https://facebook.com/djline808" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg bg-white/3 px-4 py-2 text-sm text-white/80 hover:bg-white/8 transition"
              >
                {item.label}
              </a>
            ))}
          </div>
        </section>

        {/* CONTACT / BOOKINGS */}
        <section aria-labelledby="contact" className="mt-16 mb-6">
          <div className="rounded-2xl bg-gradient-to-r from-fuchsia-500/10 via-purple-500/0 to-cyan-500/10 border border-white/5 px-6 py-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 id="contact" className="text-sm font-semibold">
                Bookings / collabs
              </h2>
              <p className="text-xs text-white/50">
                Clubs, showcases, livestreams, hard / hypnotic techno.
              </p>
            </div>
            <a
              href="/contact"
              className="rounded-lg bg-white/90 text-black px-4 py-2 text-sm font-semibold hover:bg-white transition"
            >
              Contact Line808 →
            </a>
          </div>
        </section>

        {/* MODAL PLAYER */}
        {currentMix && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="bg-[#111] border border-white/10 rounded-xl p-4 w-[90%] max-w-md shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white/80">
                  Now Playing
                </h3>
                <button
                  onClick={() => setCurrentMix(null)}
                  className="text-white/50 hover:text-white/80 text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Prefer track_id → else fallback to soundcloud URL */}
              {currentMix.track_id ? (
                <iframe
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={
                    "https://w.soundcloud.com/player/?url=" +
                    encodeURIComponent(
                      `https://api.soundcloud.com/tracks/${currentMix.track_id}`
                    ) +
                    "&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
                  }
                ></iframe>
              ) : (
                <p className="text-xs text-white/50">
                  No SoundCloud link for this mix.
                </p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
