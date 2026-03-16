import { createRoot } from "react-dom/client";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";
import DataPage from "./pages/DataPage.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <div className="flex flex-col h-screen overflow-hidden bg-slate-900 text-white">
      <Navbar />
      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/trending" element={<DataPage />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>,
);
