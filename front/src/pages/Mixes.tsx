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
    <div className="max-w-5xl mx-auto px-6 py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Techno Mixes by DJ Line808 (RDH)
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Raw, Deep &amp; Hypnotic DJ sets recorded in 2025. Stream on
          SoundCloud or Mixcloud.
        </p>
      </header>

      {loading ? (
        <p className="text-gray-500">Loading mixes…</p>
      ) : mixes.length === 0 ? (
        <p className="text-gray-500 text-sm">No mixes found.</p>
      ) : (
        <div className="grid gap-6">
          {mixes.map((mix) => (
            <MixCard key={mix.track_id || mix.title} mix={mix} />
          ))}
        </div>
      )}
    </div>
  );
}
