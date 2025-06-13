import { CountryFlagJson, CitiesByCountryJson } from "../constants";
import { HTTPManager, getReqUrl } from "./http";

const Endpoints = {
  CitiesAll: "countries",
  FlagsAll: "countries/flag/images",
};

export class CountriesClient {
  readonly url = "https://countriesnow.space/api/v0.1";
  
  private httpClient: HTTPManager;

  constructor() {
    this.httpClient = new HTTPManager();
  }

  public async CitiesAll(): Promise<CitiesByCountryJson> {
    const queryUrl = getReqUrl(this.url, Endpoints.CitiesAll);
    const response = await this.httpClient.Get<{ data: CitiesByCountryJson }>(queryUrl);
    return response.data as CitiesByCountryJson;
  }

  public async FlagsAll(): Promise<CountryFlagJson> {
    const queryUrl = getReqUrl(this.url, Endpoints.FlagsAll);
    const response = await this.httpClient.Get<{ data: CountryFlagJson }>(queryUrl);
    return response.data as CountryFlagJson;
  }
}