import type { Mix } from "../hooks/useMixes";

export default function MixCard({ mix }: { mix: Mix }) {
  return (
    <article
      key={mix.track_id || mix.title}
      className="rounded-xl bg-white/2 border border-white/5 p-4 hover:bg-white/5 transition"
    >
      <h3 className="text-sm font-medium">{mix.title}</h3>
      <p className="text-xs text-white/40 mt-1">
        {mix.length}
        {mix.tags?.length ? " · " + mix.tags.join(" · ") : ""}
      </p>
      <div className="flex flex-wrap gap-3 mt-4">
        {/* SoundCloud */}
        {mix.soundcloud && (
          <a
            href={mix.soundcloud}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 rounded-lg bg-[#ff7700] text-black font-semibold hover:brightness-110 transition"
          >
            SoundCloud
          </a>
        )}

        {/* Mixcloud */}
        {mix.mixcloud && (
          <a
            href={mix.mixcloud}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 rounded-lg border border-[#52aad8] text-sm hover:bg-[#52aad8]/10 transition"
          >
            Mixcloud
          </a>
        )}

        {/* YouTube */}
        {mix.youtube && mix.youtube.trim() !== "" && (
          <a
            href={`https://youtu.be/${mix.youtube}?si=kKfWagk-qJN9lrFa`}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="px-4 py-2 rounded-lg bg-[#ff0000] text-white font-semibold hover:brightness-110 transition"
          >
            YouTube
          </a>
        )}
      </div>
    </article>
  );
}
