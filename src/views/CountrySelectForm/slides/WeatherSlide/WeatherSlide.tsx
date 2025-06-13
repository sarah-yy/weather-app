import clsx from "clsx";
import { FunctionComponent, useMemo } from "react";
import { ChevronIcon } from "../../../../assets";
import { Card, ContainedButton, ThemedText } from "../../../../components";
import { useCountriesContext, useWeatherContext } from "../../../../hooks";
import { capitalize } from "../../../../utils";
import { SlideLayout } from "../../components";
import { WeatherForecastTable, WeatherStats } from "./components";

const WeatherSlide: FunctionComponent = () => {
  const { weatherForecast, weatherQueryParams, currentWeather, handleClearWeather } = useWeatherContext();
  const { countryInfoMap } = useCountriesContext();
  const countryInfo = useMemo(() => countryInfoMap[weatherQueryParams?.countryName ?? ""], [countryInfoMap, weatherQueryParams]);
  console.log("currentWeather", currentWeather, "countryInfo", countryInfo);
  const weatherItem = currentWeather?.weather[0];

  return (
    <SlideLayout
      className={clsx(
        "absolute",
        "top-0",
        "weather-slide-div",
        { "slide-in": !!currentWeather && !!weatherForecast },
        "pt-[3.5rem]!",
        "sm:px-6",
        "md:px-8",
      )}
    >
      <div className="max-w-[75rem] mx-auto my-0 w-full pb-[4rem]">
        <div>
          <ContainedButton className="flex items-center bg-transparent! gap-2 pl-2 pr-3 py-1 back-btn" onClick={handleClearWeather}>
            <ChevronIcon className="w-4 h-4 back-icon" />
            <ThemedText component="span">
              Back
            </ThemedText>
          </ContainedButton>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <Card className="grid grid-cols-[7.5rem_auto] lg:grid-cols-[10rem_auto] gap-6 py-6 px-4 lg:px-10 dark:bg-slate-800/40! bg-slate-100/60!">
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
          </Card>

          <WeatherStats />
        </div>

        <WeatherForecastTable />
      </div>
    </SlideLayout>
  )
};

export default WeatherSlide;