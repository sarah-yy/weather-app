import clsx from "clsx";
import { FunctionComponent } from "react";
import { MoonIcon, SunIcon } from "../../assets";
import { IconButton } from "../../components";
import { Theme } from "../../constants";
import DarkOverlayBackground from "../../assets/backgrounds/DarkOverlayBackground.jpg";
import LightOverlayBackground from "../../assets/backgrounds/LightOverlayBackground.jpg";
import { useWeatherContext, useThemeContext } from "../../hooks";
import { FormSlide, WeatherSlide } from "./slides";

const CountrySelectForm: FunctionComponent = () => {
  const { handleToggleTheme, theme } = useThemeContext();
  const { weatherForecast, currentWeather } = useWeatherContext();

  return (
    <div
      className={clsx(
        "fixed",
        "w-full",
        "h-full",
        "min-h-screen",
        "background-div",
        { "overflow-auto": !!weatherForecast && !!currentWeather },
      )}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${theme === Theme.Dark ? DarkOverlayBackground : LightOverlayBackground})`,
      }}
    >
      <IconButton className="fixed top-[1.5rem] right-4 sm:right-[2rem] z-20" onClick={handleToggleTheme}>
        {theme === Theme.Dark ? <SunIcon /> : <MoonIcon />}
      </IconButton>

      <FormSlide />
      <WeatherSlide />
    </div>
  );
};

export default CountrySelectForm;