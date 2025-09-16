import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// remove caches
if ("caches" in window) {
  caches.keys().then(function (names) {
    for (let name of names) caches.delete(name);
  });
}

createRoot(document.getElementById("root")!).render(<App />);
