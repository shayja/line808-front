// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="mt-12 py-8 text-xs text-[--color-text-muted] text-center border-t border-[--color-border]">
      <div className="container mx-auto px-6">
        <p className="mb-2">
          © {new Date().getFullYear()} DJ Line808 — Raw · Deep · Hypnotic Techno
        </p>
        <div className="flex justify-center gap-4 text-[0.7rem] text-[--color-text-subtle]">
          <span>Tel Aviv, Israel</span>
          <span>·</span>
          <a href="/contact" className="hover:text-[--color-primary] transition-colors">
            Contact & Bookings
          </a>
          <span>·</span>
          <a href="https://soundcloud.com/line808" target="_blank" rel="noreferrer" className="hover:text-[--color-primary] transition-colors">
            SoundCloud
          </a>
        </div>
      </div>
    </footer>
  );
}
