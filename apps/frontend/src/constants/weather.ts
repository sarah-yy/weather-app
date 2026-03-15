import { SimpleMap } from "./types";

export interface BaseCoordsObj {
  lat: number;
  lon: number;
}

export type MeasurementUnits = "standard" | "metric" | "imperial";

export interface QueryGeocodingReq {
  q: string;
  limit?: number;
}

export interface GeocodingResultObj {
  name: string;
  local_names: SimpleMap<string>;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export type GeocodingResultJson = GeocodingResultObj[];

export interface WeatherQueryParams {
  countryIso3: string;
  city: string;
  countryName: string;
}

export interface BaseWeatherReq extends BaseCoordsObj {
  units?: MeasurementUnits;
}

export type QueryCurrentWeatherReq = BaseWeatherReq;

export interface MainWeatherDetails {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  temp_kf?: number;
}

export interface WeatherDisplayObj {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CloudsObj {
  all: number;
}

export interface WindObj {
  speed: number;
  deg: number;
  gust: number;
}

export type VisibilityValue = number;

export interface CurrentWeatherResultObj {
  coord: BaseCoordsObj;
  weather: WeatherDisplayObj[];
  base: string;
  main: MainWeatherDetails;
  visibility: VisibilityValue;
  wind: WindObj;
  clouds: CloudsObj;
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  },
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export type QueryForecastReq = BaseWeatherReq;

export interface ForecastObj {
  dt: number;
  main: MainWeatherDetails;
  weather: WeatherDisplayObj[];
  clouds: CloudsObj;
  wind: WindObj;
  visibility: VisibilityValue;
  pop: number;
  rain?: {
    "3h": number;
  };
  snow?: {
    "3h": number;
  };
  sys: "d" | "n";
  dt_txt: string;
}

export interface ForecastJson {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastObj[];
  city: {
    id: number;
    name: string;
    coord: BaseCoordsObj;
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export type ForecastsObj = Omit<ForecastJson, "list"> & {
  entries: SimpleMap<ForecastObj[]>;
};