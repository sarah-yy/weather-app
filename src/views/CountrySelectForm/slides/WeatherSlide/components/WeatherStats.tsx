import { FunctionComponent, useMemo } from "react";
import { useThemeContext, useWeatherContext } from "../../../../../hooks";
import { Card, ThemedText } from "../../../../../components";
import { WindIcon } from "../../../../../assets";

const WeatherStats: FunctionComponent = () => {
  const { theme } = useThemeContext();
  const { currentWeather } = useWeatherContext();

  const statItems: StatItem[] = useMemo(() => {
    return [{
      key: "min-max-temp",
      title: "Min/Max Temp.",
      content: (
        <div className="flex gap-1 justify-center items-end">
          <ThemedText component="h4" className="text-xl lg:text-3xl font-semibold text-sky-500! dark:text-sky-400/60!">
            {currentWeather?.main.temp_min}
          </ThemedText>
          <ThemedText component="p" color="secondary" className="text-xl lg:text-3xl font-semibold">
            /
          </ThemedText>
          <ThemedText component="h4" className="text-xl lg:text-3xl font-semibold text-red-500! dark:text-red-400/60!">
            {currentWeather?.main.temp_max}
          </ThemedText>
          <ThemedText component="p" className="text-sm md:text-lg font-semibold mb-[0.125rem] md:mb-0">
            &deg;C
          </ThemedText>
        </div>
      ),
    }, {
      key: "humidity",
      title: "Humidity",
      content: `${currentWeather?.main.humidity}%`,
    }, {
      key: "wind-speed",
      title: "Wind Speed",
      content: (
        <div className="flex gap-2 justify-center items-center">
          <WindIcon className={`svg-fill--${theme}`} />
          <ThemedText component="h4" className="text-xl lg:text-3xl font-semibold">
            {currentWeather?.wind.speed} m/s
          </ThemedText>
        </div>
      ),
    }, {
      key: "cloudiness",
      title: "Cloudiness",
      content: `${currentWeather?.clouds.all}%`,
    }];
  }, [currentWeather, theme]);

  return (
    <Card className="grid grid-cols-2 gap-y-2 py-6 px-4 lg:px-10 dark:bg-slate-800/40! bg-slate-100/60!">
      {statItems.map((statItem: StatItem) => (
        <WeatherStat key={statItem.key} title={statItem.title} content={statItem.content} />
      ))}
    </Card>
  );
};

export interface StatItem {
  key: string;
  title: string | React.ReactNode;
  content: string | React.ReactNode;
}

export type RequiredStatParams = Omit<StatItem, "key">;

const WeatherStat: FunctionComponent<RequiredStatParams> = (statItem: RequiredStatParams) => {
  const { title, content } = statItem;
  return (
    <div className="flex flex-col gap-2">
      {typeof title !== "string" ? title : (
        <ThemedText color="secondary" component="p" className="text-sm md:text-md">
          {title}
        </ThemedText>
      )}
      {typeof content !== "string" ? content : (
        <ThemedText component="h4" className="text-xl lg:text-3xl font-semibold">
          {content}
        </ThemedText>
      )}
    </div>
  );
};

export default WeatherStats;