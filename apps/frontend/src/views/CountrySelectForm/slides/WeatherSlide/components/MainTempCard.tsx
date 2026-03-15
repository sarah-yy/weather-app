import { FunctionComponent, useMemo } from "react";
import { ThemedText } from "../../../../../components";
import { useCountriesContext, useWeatherContext } from "../../../../../hooks";
import { capitalize } from "../../../../../utils";
import WeatherCard from "./WeatherCard";

const MainTempCard: FunctionComponent = () => {
  const { currentWeather, weatherQueryParams } = useWeatherContext();
  const { countryInfoMap } = useCountriesContext();
  const countryInfo = useMemo(() => countryInfoMap[weatherQueryParams?.countryName ?? ""], [countryInfoMap, weatherQueryParams]);
  const weatherItem = currentWeather?.weather[0];

  return (
    <WeatherCard className="grid grid-cols-[7.5rem_auto] lg:grid-cols-[10rem_auto] gap-6 py-6 px-4 lg:px-10">
      <div
        className="w-[7.5rem] h-[7.5rem] lg:w-[10rem] lg:h-[10rem]"
        style={{
          backgroundImage: `url(https://openweathermap.org/img/wn/${weatherItem?.icon ?? ""}@4x.png)`,
          backgroundSize: "cover",
        }}
      />

      <div>
        <ThemedText
          component="p"
          color="secondary"
          className="text-start"
        >
          {weatherQueryParams?.city}, {countryInfo?.name}
        </ThemedText>

        <div className="flex items-baseline gap-1 mt-4">
          <ThemedText
            component="h1"
            className="text-5xl lg:text-7xl font-semibold text-start"
          >
            {currentWeather?.main.temp.toFixed(0)}
          </ThemedText>
          <ThemedText
            component="h4"
            className="text-lg lg:text-2xl font-semibold text-start"
          >
            &deg;C
          </ThemedText>
        </div>

        <ThemedText
          component="p"
          color="secondary"
          className="text-start mt-3"
        >
          {capitalize(weatherItem?.description ?? "")}
        </ThemedText>
      </div>
    </WeatherCard>
  );
};

export default MainTempCard;