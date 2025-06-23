import clsx from "clsx";
import { FunctionComponent, lazy, Suspense } from "react";
import { ChevronIcon } from "../../../../assets";
import { ContainedButton, ThemedText } from "../../../../components";
import { useWeatherContext } from "../../../../hooks";
import { SlideLayout } from "../../components";
import { MainTempCard, WeatherStats } from "./components";

const WeatherForecastTable = lazy(() => import("./components/WeatherForecastTable"));

const WeatherSlide: FunctionComponent = () => {
  const { weatherForecast, currentWeather, handleClearWeather } = useWeatherContext();

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
          <ContainedButton className="flex items-center bg-transparent! gap-2 pl-2 pr-3 py-1 back-btn select-none" onClick={handleClearWeather}>
            <ChevronIcon className="w-4 h-4 back-icon" />
            <ThemedText component="span">
              Back
            </ThemedText>
          </ContainedButton>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
          <MainTempCard />
          <WeatherStats />
        </div>

        <Suspense>
          <WeatherForecastTable />
        </Suspense>
      </div>
    </SlideLayout>
  );
};

export default WeatherSlide;