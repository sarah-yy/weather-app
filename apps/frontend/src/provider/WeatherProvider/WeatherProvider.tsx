import { type FunctionComponent, type PropsWithChildren, createContext, useEffect, useState } from "react";
import { BaseWeatherReq, CurrentWeatherResultObj, ForecastsObj, ForecastObj, WeatherQueryParams, SimpleMap } from "../../constants";
import { OpenWeatherClient } from "../../utils";

interface WeatherProps {
  currentWeather: CurrentWeatherResultObj | undefined;
  handleClearWeather: () => void;
  handleSelectCity: (weatherParams: WeatherQueryParams) => void; // eslint-disable-line no-unused-vars
  weatherForecast: ForecastsObj | undefined;
  weatherQueryParams: WeatherQueryParams | undefined;
}

export const WeatherContext = createContext<WeatherProps | undefined>(undefined); // eslint-disable-line react-refresh/only-export-components

const WeatherProvider: FunctionComponent<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props;
  const [weatherClient, setWeatherClient] = useState<OpenWeatherClient>();
  const [weatherQueryParams, setWeatherQueryParams] = useState<WeatherQueryParams | undefined>(undefined);
  const [weatherForecast, setWeatherForecast] = useState<ForecastsObj | undefined>(undefined);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherResultObj | undefined>(undefined);

  useEffect(() => {
    const newWeatherClient = new OpenWeatherClient();
    setWeatherClient(newWeatherClient);
  }, []);

  useEffect(() => {
    if (!weatherQueryParams || !weatherClient) return;

    const queryWeather = async () => {
      try {
        const geocodingResponse = await weatherClient.Geocoding({
          q: `${weatherQueryParams.city},${weatherQueryParams.countryIso3}`,
          limit: 1,
        });
        if (!geocodingResponse[0]) {
          throw new Error("City geolocation data not found. Please contact support.");
        }

        const geocode = geocodingResponse[0];
        const baseWeatherReq: BaseWeatherReq = {
          lat: geocode.lat,
          lon: geocode.lon,
          units: "metric",
        };
        const [currentWeatherResponse, weatherForecast] = await Promise.all([
          weatherClient.CurrentWeather(baseWeatherReq),
          weatherClient.Forecast(baseWeatherReq),
        ]);

        const forecastEntries = weatherForecast.list.reduce((prev: SimpleMap<ForecastObj[]>, forecast: ForecastObj) => {
          const dateKey = forecast.dt_txt.split(" ")[0];
          if (!dateKey) return prev;
          
          if (!prev[dateKey]) {
            prev[dateKey] = [forecast];
          } else {
            prev[dateKey].push(forecast);
          }
          return prev;
        }, {});
        const weatherForecastResult: any = { ...weatherForecast, entries: forecastEntries };
        if (weatherForecastResult.list) delete weatherForecastResult.list;


        setCurrentWeather(currentWeatherResponse);
        setWeatherForecast(weatherForecastResult as ForecastsObj);
      } catch (err) {
        console.error((err as Error).message);
      }
    };
    queryWeather();
  }, [weatherQueryParams, weatherClient]);

  const handleSelectCity = (weatherParams: WeatherQueryParams) => {
    setWeatherQueryParams(weatherParams);
  };

  const handleClearWeather = () => {
    setWeatherQueryParams(undefined);
    setWeatherForecast(undefined);
    setCurrentWeather(undefined);
  };

  return (
    <WeatherContext.Provider
      value={{
        currentWeather,
        handleClearWeather,
        handleSelectCity,
        weatherForecast,
        weatherQueryParams,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;