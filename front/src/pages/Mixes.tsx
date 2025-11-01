// src/pages/Mixes.tsx
import { useEffect, useState } from "react";

type Mix = {
  title: string;
  description: string;
  length: string;
  tags: string[];
  soundcloud: string;
  mixcloud: string;
  track_id: string;
  date: string;
  location: string;
};

export default function Mixes() {
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/mixes")
      .then((res) => res.json())
      .then((data) => {
        setMixes(data.mixes ?? []);
      })
      .catch((err) => {
        console.error("Failed to load mixes", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">
          Techno Mixes by DJ Line808 (RDH)
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Raw, Deep &amp; Hypnotic DJ sets recorded in 2025. Stream on
          SoundCloud or Mixcloud. Suitable for promoters, radios and podcast
          features.
        </p>
      </header>

      {loading ? (
        <p className="text-gray-500">Loading mixes…</p>
      ) : (
        <div className="grid gap-6">
          {mixes.map((mix) => (
            <article
              key={mix.track_id || mix.title}
              className="bg-[#0e0f13] border border-gray-900 rounded-xl p-5"
            >
              <h2 className="text-2xl font-semibold mb-1">{mix.title}</h2>
              <p className="text-sm text-gray-500 mb-3">
                {mix.date} · {mix.location} · RDH Techno
              </p>
              {/* we don't get description from backend yet, so show tags */}
              <p className="text-gray-200 mb-4">
                {mix.tags && mix.tags.length > 0
                  ? mix.tags.join(" · ")
                  : "Techno mix"}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {mix.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-[#191a20] border border-gray-800 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={mix.soundcloud}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-lg bg-[#ff7700] text-black font-semibold hover:brightness-110 transition"
                >
                  Listen on SoundCloud
                </a>
                {mix.mixcloud ? (
                  <a
                    href={mix.mixcloud}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg border border-[#52aad8] text-sm hover:bg-[#52aad8]/10 transition"
                  >
                    Open on Mixcloud
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
