import { type FunctionComponent, type PropsWithChildren, createContext, useEffect, useState } from "react";
import { type CitiesByCountryIndivJson, type CountryFlagIndiv, type CountryInfoMap, type CountryInfo, CountrySearchHistory, MAX_SEARCH_HISTORY_ITEMS, type SimpleMap, defaultSearchHistory, localStorageKeys, setLocalStorage } from "../../constants";
import { CountriesClient } from "../../utils";

interface CountriesProps {
  countryInfoMap: CountryInfoMap;
  handleAddToSearchHistory: (cityCountry: CountrySearchHistory) => void;
  handleRemoveFromSearchHistory: (cityCountry: CountrySearchHistory) => void;
  handleRemoveAllSearchHistory: () => void;
  searchHistoryData: SimpleMap<CountrySearchHistory>;
  searchHistoryOrder: string[];
}

export const CountriesContext = createContext<CountriesProps | undefined>(undefined); // eslint-disable-line react-refresh/only-export-components

const overrideCities: SimpleMap<string[]> = {
  Singapore: ["Singapore"],
};

const getItemKey = (cityCountry: CountrySearchHistory): string => {
  const { city, country } = cityCountry;
  return `${city}-${country}`;
};

let defaultSearchHistoryData: SimpleMap<CountrySearchHistory> = { ...defaultSearchHistory.data };
try {
  const localStoreHistoryDataStr = localStorage.getItem(localStorageKeys.searchHistoryData);
  if (!localStoreHistoryDataStr) {
    throw new Error("no search history data found");
  }

  const localStoreHistoryData = JSON.parse(localStoreHistoryDataStr);
  if (!localStoreHistoryData) {
    throw new Error("invalid search history data");
  }
  defaultSearchHistoryData = localStoreHistoryData as SimpleMap<CountrySearchHistory>;
} catch {
  defaultSearchHistoryData = { ...defaultSearchHistory.data };
} // eslint-disable-line no-empty

let defaultSearchHistoryOrder: string[] = [ ...defaultSearchHistory.order ];
try {
  const localStoreHistoryOrderStr = localStorage.getItem(localStorageKeys.searchHistoryOrder);
  if (!localStoreHistoryOrderStr) {
    throw new Error("no search history order found");
  }

  const localStoreHistoryOrder = JSON.parse(localStoreHistoryOrderStr);
  if (!localStoreHistoryOrder) {
    throw new Error("invalid search history order");
  }
  defaultSearchHistoryOrder = localStoreHistoryOrder as string[];
} catch {
  defaultSearchHistoryOrder = [ ...defaultSearchHistory.order ];
} // eslint-disable-line no-empty

const CountriesProvider: FunctionComponent<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props;
  const [countryInfoMap, setCountryInfoMap] = useState<CountryInfoMap>({});
  const [searchHistoryData, setSearchHistoryData] = useState<SimpleMap<CountrySearchHistory>>(defaultSearchHistoryData);
  const [searchHistoryOrder, setSearchHistoryOrder] = useState<string[]>(defaultSearchHistoryOrder);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const countriesClient = new CountriesClient();
        const [citiesAll, countryFlagsAll] = await Promise.all([
          countriesClient.CitiesAll(),
          countriesClient.FlagsAll(),
        ]);
        
        const countriesInfo: SimpleMap<CountryInfo> = {};
        countryFlagsAll.forEach((flagObj: CountryFlagIndiv) => {
          const { flag, iso2, iso3, name } = flagObj;
          countriesInfo[name] = {
            name,
            iso2,
            iso3,
            flagImgUrl: flag,
          };
        });
        citiesAll.forEach((citiesObj: CitiesByCountryIndivJson) => {
          const { country, cities } = citiesObj;
          if (!countriesInfo[country]?.iso3) {
            delete countriesInfo[country];
            return;
          }

          countriesInfo[country] = {
            ...countriesInfo[country],
            cities: overrideCities[country] ?? cities,
            name: country,
          };
        });
        setCountryInfoMap(countriesInfo);
      } catch (err) {
        console.error((err as Error).message);
      }
    };
    fetchCountriesData();
  }, []);

  const handleAddToSearchHistory = (cityCountry: CountrySearchHistory) => {
    const itemKey = getItemKey(cityCountry);

    setSearchHistoryOrder((prev) => {
      const newPrev = [...prev];
      if (newPrev.includes(itemKey)) {
        newPrev.sort((a: string, b: string) => {
          if (a === itemKey) return -1;
          if (b === itemKey) return 1;
          return 0;
        });
        setLocalStorage(localStorageKeys.searchHistoryOrder, newPrev);
        return newPrev;
      }

      newPrev.unshift(itemKey);
      if (newPrev.length > MAX_SEARCH_HISTORY_ITEMS) {
        const shortenedPrev = newPrev.slice(0, MAX_SEARCH_HISTORY_ITEMS);
        setLocalStorage(localStorageKeys.searchHistoryOrder, shortenedPrev);
        return shortenedPrev;
      }
      setLocalStorage(localStorageKeys.searchHistoryOrder, newPrev);
      return newPrev;
    });
    setSearchHistoryData((prev) => {
      const newPrev = {
        ...prev,
        [itemKey]: cityCountry,
      };
      setLocalStorage(localStorageKeys.searchHistoryData, newPrev);
      return newPrev;
    });
  };

  const handleRemoveFromSearchHistory = (cityCountry: CountrySearchHistory) => {
    const itemKey = getItemKey(cityCountry);
    setSearchHistoryOrder((prev) => {
      const newPrev = prev.filter((currentKey: string) => currentKey !== itemKey);
      setLocalStorage(localStorageKeys.searchHistoryOrder, newPrev);
      return newPrev;
    });
    setSearchHistoryData((prev) => {
      const newPrev = { ...prev };
      delete newPrev[itemKey];
      setLocalStorage(localStorageKeys.searchHistoryData, newPrev);
      return newPrev;
    });
  };

  const handleRemoveAllSearchHistory = () => {
    setSearchHistoryData({});
    setLocalStorage(localStorageKeys.searchHistoryData, {});
    setSearchHistoryOrder([]);
    setLocalStorage(localStorageKeys.searchHistoryOrder, []);
  };

  return (
    <CountriesContext.Provider
      value={{
        countryInfoMap,
        handleAddToSearchHistory,
        handleRemoveFromSearchHistory,
        handleRemoveAllSearchHistory,
        searchHistoryData,
        searchHistoryOrder,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;