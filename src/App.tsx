import logo from "./assets/logo.png";

function App() {
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
      href: "https://facebook.com/line808",
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
      href: "https://x.com/djline808",
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[--color-dark] text-white text-center px-6">
      <img
        src={logo}
        alt="DJ Line808"
        className="w-40 h-40 rounded-full mb-6 shadow-lg"
      />

      <h1 className="text-5xl font-bold mb-3">DJ Line808</h1>

      <p className="text-gray-400 max-w-lg mb-6">
        Techno DJ - deep, hypnotic, high-energy grooves. Available for club
        sets, festivals, and private events.
      </p>

      {/* Listen Section */}
      <h2 className="text-xl font-semibold mb-4">🎵 Listen on:</h2>
      <LinkGrid links={listenLinks} />

      {/* Follow Section */}
      <h2 className="text-xl font-semibold mt-10 mb-4">📱 Follow me on:</h2>
      <LinkGrid links={followLinks} />

      {/* Contact */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">📧 Contact:</h2>
        <a
          href={`mailto:${user}@${domain}`}
          className="text-[--color-primary] hover:text-[--color-accent] underline text-lg"
        >
          {user}@{domain}
        </a>
      </div>

      {/* Footer */}
      <footer className="mt-12 text-xs text-gray-500">
        © {new Date().getFullYear()} DJ Line808 — All rights reserved
      </footer>
    </div>
  );
}

export default App;
