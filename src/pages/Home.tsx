// src/pages/Home.tsx
import React from "react";


export default function Home() {
  const user = "dj";
  const domain = "line808.com";

  const listenLinks = [
    {
      name: "SoundCloud",
      href: "https://soundcloud.com/line808",
      icon: "soundcloud",
      color: "#ff7700",
    },
    {
      name: "Mixcloud",
      href: "https://mixcloud.com/line808",
      icon: "mixcloud",
      color: "#52aad8",
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@djline808",
      icon: "youtube",
      color: "#ff0000",
    },
  ];

  const followLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/djline808",
      icon: "facebook",
      color: "#1877f2",
    },
    {
      name: "Instagram",
      href: "https://instagram.com/djline808",
      icon: "instagram",
      color: "#e1306c",
    },
    {
      name: "TikTok",
      href: "https://tiktok.com/@dj.line808",
      icon: "tiktok",
      color: "#69c9d0",
    },
    {
      name: "X",
      href: "https://x.com/dj_line808",
      icon: "x",
      color: "#ffffff",
    },
  ];

  const LinkGrid = ({ links }: { links: typeof listenLinks }) => (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-xl mx-auto">
      {links.map(({ name, href, icon, color }, i) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-[#111216] hover:scale-105 transition transform border border-gray-800 hover:border-[--color-primary]"
        >
          <svg
            className="w-5 h-5 fill-white icon-glow"
            style={{ "--glow": color, "--i": i } as React.CSSProperties}
          >
            <use href={`/icons.svg#icon-${icon}`} />
          </svg>
          <span className="text-sm">{name}</span>
        </a>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-10 gap-6">
      <h1 className="text-4xl md:text-5xl font-bold leading-tight">
        DJ Line808 - Techno DJ from Tel Aviv
      </h1>

      <p className="text-gray-300 max-w-2xl mx-auto">
        Raw, Deep &amp; Hypnotic (RDH) techno sets built for clubs, raves and
        festivals. Electronic journeys with dark atmospheres, rolling drums and
        high-energy grooves.
      </p>

      <p className="text-sm text-gray-500">
        Tel Aviv, Israel · Available for club nights, showcases &amp; streamed
        DJ mixes.
      </p>

      {/* Listen Section */}
      <section className="w-full max-w-3xl mx-auto mt-4">
        <h2 className="text-xl font-semibold mb-3">🎵 Listen to the mixes</h2>
        <p className="text-gray-400 text-sm mb-4">
          New techno mixes uploaded to SoundCloud, Mixcloud and YouTube.
        </p>
        <LinkGrid links={listenLinks} />
      </section>

      {/* Follow Section */}
      <section className="w-full max-w-3xl mx-auto mt-6">
        <h2 className="text-xl font-semibold mb-4">📱 Follow Line808</h2>
        <p className="text-gray-400 text-sm mb-4">
          Clips, artwork, behind-the-scenes and release announcements.
        </p>
        <LinkGrid links={followLinks} />
      </section>

      {/* Contact */}
      <section className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📧 Booking / contact</h2>
        <p className="text-gray-400 text-sm mb-3">
          For club shows, guest mixes and collaborations:
        </p>
        <a
          href={`mailto:${user}@${domain}`}
          className="text-[--color-primary] hover:text-[--color-accent] underline text-lg"
        >
          {user}@{domain}
        </a>
      </section>

      <footer className="mt-8 text-xs text-gray-500">
        © {new Date().getFullYear()} DJ Line808 — Raw · Deep · Hypnotic
      </footer>
    </div>
  );
}
