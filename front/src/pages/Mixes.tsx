// src/pages/Mixes.tsx
import { useEffect } from "react";
import { useMixes } from "../hooks/useMixes";
import MixCard from "../components/MixCard";
import { trackEvent } from "../lib/analytics";

export default function Mixes() {
  const { mixes, loading } = useMixes();

  useEffect(() => {
    if (!loading) {
      trackEvent("view_mix_list", {
        mix_count: mixes.length,
        location: "mixes_page",
      });
    }
  }, [loading, mixes.length]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="text-center mb-12 fade-in">
        <h1 className="text-4xl font-bold mb-4 text-[--color-text]">
          <span className="text-[--color-primary]">Techno Mixes</span> by DJ Line808
        </h1>
        <p className="text-[--color-text-muted] max-w-3xl mx-auto mb-6">
          Raw, Deep & Hypnotic DJ sets recorded in Tel Aviv. Stream on
          SoundCloud, Mixcloud, or YouTube.
        </p>
        <div className="inline-flex items-center gap-2 bg-[--color-surface-2] px-4 py-2 rounded-full text-sm text-[--color-text-muted]">
          <span className="text-[--color-primary]">🎧</span>
          {mixes.length} mixes available
        </div>
      </header>

      {loading ? (
        <div className="space-y-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="skeleton-loader h-32 rounded-xl"></div>
          ))}
        </div>
      ) : mixes.length === 0 ? (
        <div className="text-center py-16">
          <div className="mb-6">
            <div className="inline-block p-4 bg-[--color-surface-2] rounded-full mb-4">
              <span className="text-2xl">🎵</span>
            </div>
          </div>
          <h2 className="text-xl font-semibold text-[--color-text] mb-2">
            No mixes found
          </h2>
          <p className="text-[--color-text-muted] mb-4">
            Check back soon for new DJ sets and recordings.
          </p>
          <a
            href="/contact"
            onClick={() =>
              trackEvent("click_internal_nav", {
                target: "/contact",
                location: "mixes_empty_state",
              })
            }
            className="inline-flex items-center gap-2 text-[--color-primary] hover:text-[--color-accent] transition-colors"
          >
            <span>📩</span> Contact for bookings
          </a>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mixes.map((mix) => (
            <MixCard key={mix.track_id || mix.title} mix={mix} />
          ))}
        </div>
      )}
    </div>
  );
}
