import { CurrentWeatherResultObj, ForecastJson, QueryCurrentWeatherReq, QueryForecastReq, QueryGeocodingReq, GeocodingResultJson } from "../constants";
import { HTTPManager, getReqUrl } from "./http";

const Endpoints = {
  Geocoding: "geo/1.0/direct",
  CurrentWeather: "data/2.5/weather",
  Forecast: "data/2.5/forecast",
};

export class OpenWeatherClient {
  readonly url = "https://api.openweathermap.org";
  private httpClient: HTTPManager;
  private appId: string;

  constructor() {
    this.httpClient = new HTTPManager();
    this.appId = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  }

  public async Geocoding(req: QueryGeocodingReq): Promise<GeocodingResultJson> {
    const queryUrl = getReqUrl(this.url, Endpoints.Geocoding, {
      ...req,
      appId: this.appId,
    });
    const response = await this.httpClient.Get<GeocodingResultJson>(queryUrl);
    return response as GeocodingResultJson;
  }

  public async CurrentWeather(req: QueryCurrentWeatherReq): Promise<CurrentWeatherResultObj> {
    const queryUrl = getReqUrl(this.url, Endpoints.CurrentWeather, {
      ...req,
      appId: this.appId,
    });
    return await this.httpClient.Get<CurrentWeatherResultObj>(queryUrl);
  }

  public async Forecast(req: QueryForecastReq): Promise<ForecastJson> {
    const queryUrl = getReqUrl(this.url, Endpoints.Forecast, {
      ...req,
      appId: this.appId,
    });
    return await this.httpClient.Get<ForecastJson>(queryUrl);
  }
}