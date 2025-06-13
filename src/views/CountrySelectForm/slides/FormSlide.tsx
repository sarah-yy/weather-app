import clsx from "clsx";
import { ChangeEvent, FunctionComponent, Suspense, useMemo, useState } from "react";
import { HistoryIcon } from "../../../assets";
import { IconButton, ThemedText } from "../../../components";
import { CountryInfo, Theme } from "../../../constants";
import { useCountriesContext, useDebounce, useThemeContext, useWeatherContext } from "../../../hooks";

import { SlideLayout, SelectDropdown } from "../components";

const FormSlide: FunctionComponent = () => {
  const { countryInfoMap } = useCountriesContext();
  const { theme } = useThemeContext();
  const { weatherForecast, currentWeather } = useWeatherContext();
  const [input, setInput] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<string | undefined>();

  const countriesList = useMemo(() => {
    const countriesList = Object.values(countryInfoMap);
    if (!searchTerm) return countriesList;
    return countriesList.filter((country: CountryInfo) => {
      return country.name.toLowerCase().includes(searchTerm);
    });
  }, [countryInfoMap, searchTerm]);

  const handleCountrySelect = (country: string) => setSelectedCountry(country);
  const handleClearCountry = () => setSelectedCountry(undefined);

  const handleClose = () => {
    setOpen(false);
    handleClearCountry();
    setSearchTerm(undefined);
    setInput("");
  };

  const handleOpen = () => setOpen(true);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setInput(input);
    handleSetSearchTerm(input);
  };

  const handleSetSearchTerm = useDebounce((input: string) => {
    setSearchTerm(input.length === 0 ? undefined : input.toLowerCase());
  }, 200);

  return (
    <SlideLayout className={clsx("form-slide-div", { fade: !!currentWeather && !!weatherForecast })}>
      <ThemedText component="h1" className="text-4xl sm:text-5xl font-semibold">
        Weather App
      </ThemedText>

      <ThemedText className="text-md sm:text-xl" color="secondary">
        Select a country and city to view the weather conditions.
      </ThemedText>

      <div className="max-w-[30rem] mx-auto my-0 w-full">
        <div
          className={clsx(
            "flex",
            "justify-center",
            "items-center",
            "mt-3",
            "sm:mt-6",
            {
              "light-input-border": theme === Theme.Light,
              "dark-input-border": theme === Theme.Dark,
              "error-input-border": input.length > 0 && countriesList.length === 0,
            },
          )}
        >
          <input
            className={clsx(
              "text-slate-800",
              "dark:text-white",
              "text-lg",
              "sm:text-2xl",
              "py-2",
              "w-full",
              { "error-text": !!searchTerm && countriesList.length === 0 },
            )}
            type="text"
            placeholder="Select country and city"
            onFocus={handleOpen}
            value={input}
            onChange={handleChangeInput}
          />
          
          <IconButton className="w-10 h-10">
            <HistoryIcon className="w-6 h-6" />
          </IconButton>
        </div>

        <Suspense>
          <SelectDropdown
            countriesList={countriesList}
            handleClose={handleClose}
            handleClearCountry={handleClearCountry}
            handleCountrySelect={handleCountrySelect}
            open={open}
            selectedCountry={selectedCountry}
            searchInput={input}
          />
        </Suspense>
      </div>
    </SlideLayout>
  )
};

export default FormSlide;