import { SimpleMap } from "./types";

export interface CitiesByCountryIndivJson {
  country: string;
  cities: string[];
}

export type CitiesByCountryJson = CitiesByCountryIndivJson[];

export interface CountryFlagIndiv {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export type CountryFlagJson = CountryFlagIndiv[];

export interface CountryInfo {
  cities?: string[];
  flagImgUrl?: string;
  iso2?: string;
  iso3?: string;
  name: string;
}

export type CountryInfoMap = SimpleMap<CountryInfo>;

export interface CountrySearchHistory {
  country: string;
  city: string;
}

export interface SearchHistoryLocalStorage {
  order: string[];
  data: SimpleMap<CountrySearchHistory>;
}

export const defaultSearchHistory: SearchHistoryLocalStorage = {
  order: [],
  data: {},
};

export const MAX_SEARCH_HISTORY_ITEMS = 10;