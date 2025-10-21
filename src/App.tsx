import logo from "./assets/logo.png";

function App() {
  const user = "dj";
  const domain = "line808.com";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[--color-dark] text-white text-center px-6">
      <img
        src={logo}
        alt="DJ Line808"
        className="w-40 h-40 rounded-full mb-6"
      />
      <h1 className="text-5xl font-bold mb-3">DJ Line808</h1>
      <p className="text-gray-400 max-w-lg mb-6">
        High-energy DJ mixing deep house, techno, and electronic vibes.
        Available for club sets, private events, and festivals.
      </p>
      <p className="text-lg mb-6">
        📧{"Contact me at "}
        <a
          href={`mailto:${user}@${domain}`}
          className="text-[--color-primary] hover:text-[--color-accent] underline"
        >
          {user}@{domain}
        </a>
      </p>
      🔥 Follow DJ Line808:
      <div className="flex flex-wrap gap-6 justify-center mt-6">
        <a
          href="https://facebook.com/line808"
          target="_blank"
          className="hover:text-[--color-primary]"
        >
          Facebook
        </a>
        <a
          href="https://instagram.com/djline808"
          target="_blank"
          className="hover:text-[--color-accent]"
        >
          Instagram
        </a>
        <a
          href="https://soundcloud.com/line808"
          target="_blank"
          className="hover:text-[--color-primary]"
        >
          SoundCloud
        </a>
        <a
          href="https://mixcloud.com/line808"
          target="_blank"
          className="hover:text-[--color-accent]"
        >
          Mixcloud
        </a>
        <a
          href="https://youtube.com/@djline808"
          target="_blank"
          className="hover:text-[--color-primary]"
        >
          YouTube
        </a>
      </div>
      <footer className="mt-12 text-xs text-gray-500">
        © {new Date().getFullYear()} DJ Line808 — All rights reserved
      </footer>
    </div>
  );
}

export default App;
