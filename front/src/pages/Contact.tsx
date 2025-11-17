// src/pages/Contact.tsx
import EmailLink from "../components/EmailLink";
import { trackEvent } from "../lib/analytics";

export default function Contact() {
  const user = "djline808";
  const domain = "gmail.com";

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-12 text-center gap-6">
      {/* Page title */}
      <h1 className="text-3xl md:text-4xl font-bold">Contact / Booking</h1>

      <p className="text-gray-300 max-w-xl">
        For club bookings, guest mixes, label showcases or live streaming
        sessions — reach out. Please include date, city, venue and set length
        (if known).
      </p>

      {/* EMAIL BOX */}
      <div className="bg-[#111216] border border-gray-800 rounded-xl px-6 py-5 max-w-md w-full text-left mt-4">
        <h2 className="text-lg font-semibold mb-2">Email</h2>

        <div
          onClick={() =>
            trackEvent("click_email", {
              method: "mailto",
              email: `${user}@${domain}`,
              location: "contact_page",
            })
          }
        >
          <EmailLink user={user} domain={domain} />
        </div>

        <p className="text-gray-500 text-xs mt-3">
          Subject: <code>Booking — DJ Line808</code>
        </p>
      </div>

      {/* QUICK INFO */}
      <div className="grid md:grid-cols-3 gap-4 max-w-3xl w-full mt-8">
        <div className="bg-[#111216] border border-gray-800 rounded-lg p-4 text-left">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
            Location
          </p>
          <p className="text-sm">Tel Aviv, Israel</p>
        </div>

        <div className="bg-[#111216] border border-gray-800 rounded-lg p-4 text-left">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
            Available for
          </p>
          <p className="text-sm">
            Clubs, raves, festival slots, guest mixes, podcasts
          </p>
        </div>

        <div className="bg-[#111216] border border-gray-800 rounded-lg p-4 text-left">
          <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">
            Socials
          </p>
          <p className="text-sm">
            {[
              { label: "Instagram", href: "https://instagram.com/djline808" },
              { label: "SoundCloud", href: "https://soundcloud.com/line808" },
              { label: "YouTube", href: "https://youtube.com/@djline808" },
            ].map((item, i) => (
              <span key={item.label}>
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
                  className="hover:text-[--color-primary]"
                >
                  {item.label}
                </a>
                {i < 2 && " · "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
