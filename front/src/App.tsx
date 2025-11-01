import { Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/Home";
import Mixes from "./pages/Mixes";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="mixes" element={<Mixes />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
