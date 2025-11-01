// src/pages/Contact.tsx
import EmailLink from "../components/EmailLink";

export default function Contact() {
  //const user = "dj";
  //const domain = "line808.com";
  const user = "djline808";
  const domain = "gmail.com";

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-12 text-center gap-6">
      <h1 className="text-3xl md:text-4xl font-bold">Contact / Booking</h1>
      <p className="text-gray-300 max-w-xl">
        For club bookings, guest mixes, label showcases or live streaming
        sessions — reach out. Please include date, city, venue and set length
        (if known).
      </p>

      {/* primary contact */}
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-12 text-center gap-6">
        <h1 className="text-3xl md:text-4xl font-bold">Contact / Booking</h1>
        <p className="text-gray-300 max-w-xl">
          For club bookings, guest mixes, label showcases or live streaming
          sessions — reach out.
        </p>

        <div className="bg-[#111216] border border-gray-800 rounded-xl px-6 py-5 max-w-md w-full text-left">
          <h2 className="text-lg font-semibold mb-2">Email</h2>
          <EmailLink user={user} domain={domain} />
          <p className="text-gray-500 text-xs mt-3">
            Subject: <code>Booking — DJ Line808</code>
          </p>
        </div>
      </div>

      {/* quick info */}
      <div className="grid md:grid-cols-3 gap-4 max-w-3xl w-full mt-4">
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
            <a
              href="https://instagram.com/djline808"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[--color-primary]"
            >
              Instagram
            </a>{" "}
            ·{" "}
            <a
              href="https://soundcloud.com/line808"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[--color-primary]"
            >
              SoundCloud
            </a>{" "}
            ·{" "}
            <a
              href="https://youtube.com/@djline808"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[--color-primary]"
            >
              YouTube
            </a>
          </p>
        </div>
      </div>

      {/* later: form */}
      {/* <form className="max-w-md w-full mt-6 space-y-4"> ... </form> */}
    </div>
  );
}
