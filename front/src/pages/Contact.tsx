// src/pages/Contact.tsx
import EmailLink from "../components/EmailLink";
import ContactForm from "../components/ContactForm";
import { trackEvent } from "../lib/analytics";

export default function Contact() {
  const user = "djline808";
  const domain = "gmail.com";

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-center">
      {/* Page title */}
      <div className="mb-8 fade-in">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-[--color-text]">Contact</span>
          <span className="text-[--color-primary]"> / Booking</span>
        </h1>
        <p className="text-[--color-text-muted] max-w-2xl mx-auto mb-6">
          For club bookings, guest mixes, label showcases or live streaming
          sessions - reach out. Please include date, city, venue and set length
          (if known).
        </p>
        <div className="inline-flex items-center gap-2 bg-[--color-primary]/10 px-4 py-2 rounded-full text-sm text-[--color-primary]">
          <span>📍</span> Based in Tel Aviv, Israel
        </div>
      </div>

      {/* EMAIL + FORM WRAPPER */}
      <div className="flex flex-col lg:flex-row gap-8 items-stretch justify-center w-full max-w-6xl mt-8">
        {/* EMAIL BOX */}
        <div className="bg-[--color-surface-2] border border-[--color-border] rounded-2xl px-8 py-6 max-w-md w-full text-left card-hover">
          <h2 className="text-xl font-bold mb-4 text-[--color-text]">Email</h2>

          <div
            onClick={() =>
              trackEvent("click_email", {
                method: "mailto",
                email: `${user}@${domain}`,
                location: "contact_page",
              })
            }
            className="mb-4"
          >
            <EmailLink user={user} domain={domain} />
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2 text-[--color-text-muted]">
              <span className="text-[--color-primary]">📧</span>
              <span>Direct email contact</span>
            </div>
            <div className="flex items-center gap-2 text-[--color-text-muted]">
              <span className="text-[--color-accent]">⏱️</span>
              <span>Response within 24-48 hours</span>
            </div>
          </div>

          <p className="text-[--color-text-subtle] text-xs mt-6 pt-4 border-t border-[--color-border]">
            Subject: <code className="bg-[--color-surface-3] px-2 py-1 rounded">Booking — DJ Line808</code>
          </p>
        </div>

        {/* CONTACT FORM */}
        <div className="flex justify-center w-full lg:max-w-2xl">
          <div className="w-full bg-[--color-surface-2] border border-[--color-border] rounded-2xl p-8">
            <h2 className="text-xl font-bold mb-6 text-[--color-text]">Contact Form</h2>
            <ContactForm />
          </div>
        </div>
      </div>

      {/* QUICK INFO */}
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl w-full mt-12">
        <div className="bg-[--color-surface-2] border border-[--color-border] rounded-xl p-6 text-left card-hover">
          <p className="text-xs uppercase tracking-wide text-[--color-text-muted] mb-3">
            Location
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[--color-primary]">📍</span>
            <p className="text-[--color-text] font-medium">Tel Aviv, Israel</p>
          </div>
        </div>

        <div className="bg-[--color-surface-2] border border-[--color-border] rounded-xl p-6 text-left card-hover">
          <p className="text-xs uppercase tracking-wide text-[--color-text-muted] mb-3">
            Available for
          </p>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[--color-accent]">🎧</span>
              <span className="text-sm text-[--color-text]">Clubs & raves</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[--color-secondary]">🎤</span>
              <span className="text-sm text-[--color-text]">Festival slots</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[--color-primary]">📻</span>
              <span className="text-sm text-[--color-text]">Guest mixes & podcasts</span>
            </div>
          </div>
        </div>

        <div className="bg-[--color-surface-2] border border-[--color-border] rounded-xl p-6 text-left card-hover">
          <p className="text-xs uppercase tracking-wide text-[--color-text-muted] mb-3">
            Socials
          </p>
          <div className="space-y-2">
            {[
              { label: "Instagram", href: "https://instagram.com/djline808", icon: "📷" },
              { label: "SoundCloud", href: "https://soundcloud.com/line808", icon: "🎵" },
              { label: "YouTube", href: "https://youtube.com/@djline808", icon: "📺" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span>{item.icon}</span>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() =>
                    trackEvent("click_social", {
                      network: item.label.toLowerCase(),
                      href: item.href,
                      location: "contact_page",
                    })
                  }
                  className="text-[--color-primary] hover:text-[--color-accent] transition-colors"
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
