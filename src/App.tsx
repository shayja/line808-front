// src/App.tsx
import logo from "./assets/logo.jpeg";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Mixes from "./pages/Mixes";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[--color-dark] text-white flex flex-col">
      {/* Top bar */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-900 bg-[#0a0b0f]/80 backdrop-blur">
        <Link to="/" className="text-white font-semibold tracking-wide w-32">
          <img src={logo} alt="DJ Line808" className="w-full h-auto" />
        </Link>
        <div className="flex gap-4 text-sm">
          <Link
            to="/"
            className={
              location.pathname === "/"
                ? "text-[--color-primary]"
                : "text-gray-300 hover:text-white"
            }
          >
            Home
          </Link>
          <Link
            to="/mixes"
            className={
              location.pathname.startsWith("/mixes")
                ? "text-[--color-primary]"
                : "text-gray-300 hover:text-white"
            }
          >
            Mixes
          </Link>
          <Link
            to="/contact"
            className={
              location.pathname.startsWith("/contact")
                ? "text-[--color-primary]"
                : "text-gray-300 hover:text-white"
            }
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* Page content */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mixes" element={<Mixes />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Global footer */}
      <Footer />
    </div>
  );
}
