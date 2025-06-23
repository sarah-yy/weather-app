import clsx from "clsx";
import { FunctionComponent, useEffect, useMemo, useState } from "react";
import { RainIcon } from "../../../../../assets";
import { ContainedButton, ThemedText } from "../../../../../components";
import { useThemeContext, useWeatherContext } from "../../../../../hooks";
import { capitalize, getDayOfWeek, forceDoubleDigits } from "../../../../../utils";
import { ForecastObj, MILLISECONDS_IN_SECOND } from "../../../../../constants";
import WeatherCard from "./WeatherCard";

const MAX_FILTERS = 5;

const WeatherForecastTable: FunctionComponent = () => {
  const { theme } = useThemeContext();
  const { weatherForecast } = useWeatherContext();
  const [filters, setFilters] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>();

  const handleChangeFilter = (filter: string) => setSelectedFilter(filter);

  useEffect(() => {
    if (!weatherForecast) return;
    const dateFilters = Object.keys(weatherForecast.entries);
    setFilters(dateFilters.slice(0, MAX_FILTERS));
    setSelectedFilter(dateFilters[0]);
  }, [weatherForecast?.entries]); // eslint-disable-line react-hooks/exhaustive-deps

  const selectedEntries = useMemo(() => {
    if (!weatherForecast) return [];
    return weatherForecast.entries[selectedFilter ?? ""] ?? [];
  }, [selectedFilter, weatherForecast]);

  return (
    <div className="mt-5 lg:mt-6">
      <ThemedText component="h2" className="text-xl sm:text-3xl font-semibold text-start">
        3hr Forecast
      </ThemedText>

      <div className="flex items-center mt-4 overflow-x-auto gap-1">
        {filters.map((filter: string, index: number) => {
          const date = new Date(filter);
          const label = index === 0 ? "Today" : getDayOfWeek(date);
          return (
            <ContainedButton
              key={filter}
              className={clsx(
                "bg-transparent!",
                "px-3",
                "py-1",
                { selected: selectedFilter === filter },
                "min-w-[7rem]",
              )}
              onClick={() => handleChangeFilter(filter)}
            >
              <ThemedText className="select-none" component="span">
                {label}
              </ThemedText>
            </ContainedButton>
          );
        })}
      </div>

      <div className="flex flex-col mt-4 gap-2">
        {selectedEntries.map((entry: ForecastObj) => {
          const entryDate = new Date(entry.dt * MILLISECONDS_IN_SECOND);
          return (
            <WeatherCard className="py-3 px-6 grid grid-cols-[3rem_1fr_1fr] md:grid-cols-4 items-center" key={entry.dt}>
              <ThemedText className="font-semibold text-start text-sm">
                {forceDoubleDigits(entryDate.getHours())}:{forceDoubleDigits(entryDate.getMinutes())}
              </ThemedText>

              <div className="flex items-center gap-2">
                <div
                  className="w-12 h-12"
                  style={{
                    backgroundImage: `url(https://openweathermap.org/img/wn/${entry.weather[0]?.icon ?? ""}@4x.png)`,
                    backgroundSize: "cover",
                  }}
                />
                <ThemedText className="italic text-sm none sm:block" color="secondary">{capitalize(entry.weather[0]?.description)}</ThemedText>
                <ThemedText className="italic text-sm block sm:none" color="secondary">{capitalize(entry.weather[0]?.main)}</ThemedText>
              </div>

              <div className="none md:flex! items-center justify-center gap-2">
                <RainIcon className={`svg-fill--${theme}`} />
                <ThemedText className="text-sm" color="secondary">&nbsp;{entry.pop}%</ThemedText>
              </div>

              <div className="flex items-center justify-end gap-2">
                <ThemedText className="text-sm font-semibold">{entry.main.temp_max}&deg;C</ThemedText>
                <ThemedText className="text-sm" color="secondary">/&nbsp;{entry.main.temp_min}&deg;C</ThemedText>
              </div>
            </WeatherCard>
          );
        })}
      </div>
    </div>
  );
};

export default WeatherForecastTable;