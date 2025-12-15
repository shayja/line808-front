// src/components/MixCard.tsx
import type { Mix } from "../hooks/useMixes";
import { trackEvent } from "../lib/analytics";

export default function MixCard({ mix }: { mix: Mix }) {
  const mixId = mix.track_id || mix.title;

  // Platform configuration
  const platforms = [
    {
      name: "SoundCloud",
      key: "soundcloud",
      color: "bg-[#ff7700]",
      hoverColor: "hover:bg-[#e66a00]",
      textColor: "text-black",
      url: mix.soundcloud,
      icon: "🎵"
    },
    {
      name: "Mixcloud",
      key: "mixcloud",
      color: "border border-[#52aad8]",
      hoverColor: "hover:bg-[#52aad8]/10",
      textColor: "text-[#52aad8]",
      url: mix.mixcloud,
      icon: "☁️"
    },
    {
      name: "YouTube",
      key: "youtube",
      color: "bg-[#ff0000]",
      hoverColor: "hover:bg-[#cc0000]",
      textColor: "text-white",
      url: mix.youtube && mix.youtube.trim() !== "" ? `https://youtu.be/${mix.youtube}?si=kKfWagk-qJN9lrFa` : null,
      icon: "▶️"
    }
  ];

  return (
    <article
      key={mixId}
      className="rounded-xl bg-[--color-surface-2] border border-[--color-border] p-5 hover:bg-[--color-surface-3] transition-all duration-300 card-hover"
    >
      <div className="mb-3">
        <h3 className="text-base font-semibold text-[--color-text] mb-1 leading-tight">
          {mix.title}
        </h3>
        {mix.description && (
          <p className="text-xs text-[--color-text-muted] mb-2 line-clamp-2">
            {mix.description}
          </p>
        )}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="text-[--color-text-subtle]">{mix.length}</span>
          {mix.tags?.map((tag, index) => (
            <span key={index} className="text-[--color-primary]">· {tag}</span>
          ))}
          {mix.location && (
            <span className="text-[--color-text-subtle]">· {mix.location}</span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {platforms.map((platform) => (
          platform.url && (
            <a
              key={platform.key}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                trackEvent("click_listen", {
                  platform: platform.key,
                  mix_title: mix.title,
                  mix_id: mix.track_id,
                  href: platform.url,
                });
              }}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1 ${
                platform.color
              } ${
                platform.hoverColor
              } ${
                platform.textColor
              }`}
            >
              <span>{platform.icon}</span>
              <span>{platform.name}</span>
            </a>
          )
        ))}
      </div>
    </article>
  );
}
