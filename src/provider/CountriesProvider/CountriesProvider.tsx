import { type FunctionComponent, type PropsWithChildren, createContext, useEffect, useState } from "react";
import { type CitiesByCountryIndivJson, type CountryFlagIndiv, type CountryInfoMap, type CountryInfo, type SimpleMap } from "../../constants";
import { CountriesClient } from "../../utils";

interface CountriesProps {
  countryInfoMap: CountryInfoMap;
}

export const CountriesContext = createContext<CountriesProps | undefined>(undefined);

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
        citiesAll.forEach((citiesObj: CitiesByCountryIndivJson) => {
          const { country, cities } = citiesObj;
          countriesInfo[country] = { cities, name: country };
        });
        countryFlagsAll.forEach((flagObj: CountryFlagIndiv) => {
          const { flag, iso2, iso3, name } = flagObj;
          if (!countriesInfo[name]) {
            countriesInfo[name] = { name };
          }
          countriesInfo[name].flagImgUrl = flag;
          countriesInfo[name].iso2 = iso2;
          countriesInfo[name].iso3 = iso3;
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