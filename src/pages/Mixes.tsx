// src/pages/Mixes.tsxß

const mixes = [
  {
    title: "DJ Line808 - Memory Circuit (DJ Mix) [2025]",
    date: "2025",
    soundcloud: "https://soundcloud.com/line808/dj-set-2025-10",
    mixcloud:
      "https://www.mixcloud.com/line808/dj-line808-memory-circuit-dj-mix/",
    description:
      "RDH techno trip - raw percussion, hypnotic layers, club-ready energy. Recorded in 2025.",
    tags: ["RDH", "Raw Techno", "Hypnotic", "2025"],
  },
  {
    title: "DJ Line808 - Deep Signal (Techno Mix | October 2025)",
    date: "October 2025",
    soundcloud: "https://soundcloud.com/line808/deep-signal-dj-mix",
    mixcloud:
      "https://www.mixcloud.com/line808/line808-deep-signal-techno-mix-october-2025/",
    description:
      "Part of the Deep Signal series - deep, rolling, hypnotic techno for late hours.",
    tags: ["RDH", "Deep Techno", "Series", "2025"],
  },
];

export default function Mixes() {
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

      <div className="grid gap-6">
        {mixes.map((mix) => (
          <article
            key={mix.title}
            className="bg-[#0e0f13] border border-gray-900 rounded-xl p-5"
          >
            <h2 className="text-2xl font-semibold mb-1">{mix.title}</h2>
            <p className="text-sm text-gray-500 mb-3">
              {mix.date} · Tel Aviv · RDH Techno
            </p>
            <p className="text-gray-200 mb-4">{mix.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {mix.tags.map((tag) => (
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
              <a
                href={mix.mixcloud}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-lg border border-[#52aad8] text-sm hover:bg-[#52aad8]/10 transition"
              >
                Open on Mixcloud
              </a>
            </div>
          </article>
        ))}
      </div>

      <footer className="mt-10 text-xs text-gray-500 text-center">
        © {new Date().getFullYear()} DJ Line808 - Raw · Deep · Hypnotic
      </footer>
    </div>
  );
}
