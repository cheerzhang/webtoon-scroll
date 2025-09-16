import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// remove caches
import { registerSW } from "virtual:pwa-register";

const updateSW = registerSW({
  onNeedRefresh() {
    updateSW(true);
  },
  onOfflineReady() {
    console.log("✅ App is ready for offline use");
  }
});

createRoot(document.getElementById("root")!).render(<App />);
