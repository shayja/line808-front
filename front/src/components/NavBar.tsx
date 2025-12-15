// src/components/NavBar.tsx
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { trackEvent } from "../lib/analytics";

const NAV_ITEMS = [
  { path: "/", label: "Home", match: (p: string) => p === "/" },
  {
    path: "/mixes",
    label: "Mixes",
    match: (p: string) => p.startsWith("/mixes"),
  },
  {
    path: "/contact",
    label: "Contact",
    match: (p: string) => p.startsWith("/contact"),
  },
];

export default function NavBar() {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-[--color-border] bg-[--color-surface]/80 backdrop-blur-lg sticky top-0 z-50">
      {/* Logo click */}
      <Link
        to="/"
        className="text-[--color-text] font-semibold tracking-wide w-32 transition-all duration-200 hover:opacity-80"
        onClick={() =>
          trackEvent("click_internal_nav", {
            target: "/",
            location: "navbar_logo",
          })
        }
      >
        <img src={logo} alt="DJ Line808" className="w-full h-auto rounded-sm" />
      </Link>

      <div className="flex gap-6 text-sm">
        {NAV_ITEMS.map((item) => {
          const isActive = item.match(location.pathname);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() =>
                trackEvent("click_internal_nav", {
                  target: item.path,
                  location: "navbar",
                  label: item.label,
                })
              }
              className={`px-3 py-2 rounded-md transition-all duration-200 ${
                isActive
                  ? "bg-[--color-primary]/10 text-[--color-primary] font-medium"
                  : "text-[--color-text-muted] hover:text-[--color-text] hover:bg-[--color-surface-2]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
