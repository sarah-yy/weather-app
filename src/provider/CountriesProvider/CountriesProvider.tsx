import { type FunctionComponent, type PropsWithChildren, createContext, useEffect, useState } from "react";
import { type CitiesByCountryIndivJson, type CountryFlagIndiv, type CountryInfoMap, type CountryInfo, type SimpleMap } from "../../constants";
import { CountriesClient } from "../../utils";

interface CountriesProps {
  countryInfoMap: CountryInfoMap;
}

export const CountriesContext = createContext<CountriesProps | undefined>(undefined); // eslint-disable-line react-refresh/only-export-components

const overrideCities: SimpleMap<string[]> = {
  Singapore: ["Singapore"],
};

const CountriesProvider: FunctionComponent<PropsWithChildren> = (props: PropsWithChildren) => {
  const { children } = props;
  const [countryInfoMap, setCountryInfoMap] = useState<CountryInfoMap>({});

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
        console.log("err", err);
        console.error((err as Error).message);
      }
    };
    fetchCountriesData();
  }, []);

  return (
    <CountriesContext.Provider value={{ countryInfoMap }}>
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesProvider;