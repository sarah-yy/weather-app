import clsx from "clsx";
import React from "react";
import { ThemedText } from "../../components";
import { Theme } from "../../constants";
import DarkOverlayBackground from "../../assets/backgrounds/DarkOverlayBackground.jpg";
import LightOverlayBackground from "../../assets/backgrounds/LightOverlayBackground.jpg";
import { useThemeContext } from "../../hooks";

const FormOverlay: React.FC = () => {
  const { handleToggleTheme, theme } = useThemeContext();
  return (
    <div
      className={clsx(
        "fixed",
        "w-full",
        "h-full",
        "min-h-screen",
        "form-overlay-div",
      )}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${theme === Theme.Dark ? DarkOverlayBackground : LightOverlayBackground})`,
      }}
    >
      <button className="fixed top-[1.5rem] right-[2rem]" onClick={handleToggleTheme}>
        Change Theme
      </button>
      <div className="w-full h-full flex flex-col pt-[12.5rem] gap-6 bg-white/70 dark:bg-slate-900/80">
        <ThemedText component="h1" className="text-5xl font-semibold">
          Weather App
        </ThemedText>

        <ThemedText className="text-xl text-slate-500! dark:text-slate-400!">
          Select a country and city to view the weather conditions.
        </ThemedText>

        <div className="flex justify-center mt-6">
          <input
            className={clsx(
              "text-slate-800",
              "dark:text-white",
              "text-2xl",
              {
                "light-input-border": theme === Theme.Light,
                "dark-input-border": theme === Theme.Dark,
              },
              "py-2",
            )}
            type="text"
            placeholder="Select country and city"
          />
        </div>
      </div>
    </div>
  );
};

export default FormOverlay;