import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "./lib/i18n/LanguageContext";
import { Toaster } from "react-hot-toast";

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LanguageProvider>
      <BrowserRouter basename={basename}>
        <App />
      </BrowserRouter>
    </LanguageProvider>
  </React.StrictMode>,
);
