import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/component.css";
import "./styles/custom.css";
import "./styles/index.css";
import App from "./App.tsx";
import { CountriesProvider, ThemeProvider } from "./provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CountriesProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </CountriesProvider>
  </StrictMode>,
);