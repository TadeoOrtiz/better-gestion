import { createRoot } from "react-dom/client";
import { Navbar } from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <Navbar />
        <div className="p-10 bg-slate-900 min-h-screen text-white">
            <Routes>
                <Route path="/" element={<App />} />
            </Routes>
        </div>
    </BrowserRouter>,
);
