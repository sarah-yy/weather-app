import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/component.css";
import "./styles/custom.css";
import "./styles/index.css";
import App from "./App.tsx";
import { CountriesProvider, WeatherProvider, ThemeProvider } from "./provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CountriesProvider>
      <WeatherProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </WeatherProvider>
    </CountriesProvider>
  </StrictMode>,
);