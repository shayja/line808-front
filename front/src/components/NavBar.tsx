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
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-900 bg-[#0a0b0f]/80 backdrop-blur">
      {/* Logo click */}
      <Link
        to="/"
        className="text-white font-semibold tracking-wide w-32"
        onClick={() =>
          trackEvent("click_internal_nav", {
            target: "/",
            location: "navbar_logo",
          })
        }
      >
        <img src={logo} alt="DJ Line808" className="w-full h-auto" />
      </Link>

      <div className="flex gap-4 text-sm">
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
              className={
                isActive
                  ? "text-[--color-primary]"
                  : "text-gray-300 hover:text-white"
              }
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
