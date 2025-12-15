// src/layouts/RootLayout.tsx
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-[--color-dark] text-[--color-text] flex flex-col">
      <div className="absolute inset-0 -z-50 bg-[--gradient-surface] opacity-50" />
      <NavBar />
      <main className="flex-1 fade-in">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
