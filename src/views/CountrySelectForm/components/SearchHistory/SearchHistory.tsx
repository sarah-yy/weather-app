import clsx from "clsx";
import { FunctionComponent, MouseEvent, memo, useCallback, useMemo } from "react";
import { DeleteIcon, HistoryIcon } from "../../../../assets";
import { ContainedButton, ThemedText } from "../../../../components";
import { CountrySearchHistory } from "../../../../constants";
import { useCountriesContext, useThemeContext, useWeatherContext } from "../../../../hooks";

const MAX_SEARCH_ENTRIES: number = 3;

interface SearchObj extends CountrySearchHistory {
  itemKey: string;
}

interface CountrySearch extends CountrySearchHistory {
  itemKey?: string;
}

const SearchHistory: FunctionComponent = () => {
  const { countryInfoMap, searchHistoryData, searchHistoryOrder, handleAddToSearchHistory, handleRemoveFromSearchHistory } = useCountriesContext();
  const { handleSelectCity } = useWeatherContext();

  const searchObjArr = useMemo(() => {
    return searchHistoryOrder.reduce((prev: SearchObj[], id: string, index: number): SearchObj[] => {
      if (!searchHistoryData[id] || index >= MAX_SEARCH_ENTRIES) return prev;
      prev.push({
        ...searchHistoryData[id],
        itemKey: id,
      });
      return prev;
    }, []);
  }, [searchHistoryData, searchHistoryOrder]);

  const handleRemove = useCallback((searchObj: SearchObj) => {
    const newSearchObj = { ...searchObj } as CountrySearch;
    delete newSearchObj.itemKey;
    handleRemoveFromSearchHistory(newSearchObj as CountrySearchHistory);
  }, []);

  const onClickCity = useCallback((searchObj: SearchObj) => {
    const { city, country } = searchObj;
    const countryInfo = countryInfoMap[country];
    if (!countryInfo?.iso3) return;
    handleSelectCity({
      countryIso3: countryInfo.iso3,
      city,
      countryName: country,
    });
    handleAddToSearchHistory({
      city,
      country: country,
    });
  }, [countryInfoMap]);

  if (searchObjArr.length === 0) {
    return null;
  }

  return (
    <div className="max-w-[30rem] mx-auto my-0 w-full py-3">
      <ThemedText component="h3" className="text-lg font-semibold text-start">
        Search History
      </ThemedText>

      <div className="flex flex-col mt-2">
        {searchObjArr.map((searchObj: SearchObj) => (
          <SearchOption
            handleRemove={handleRemove}
            onClickCity={onClickCity}
            searchObj={searchObj}
            key={searchObj.itemKey}
          />
        ))}
      </div>
    </div>
  );
};

interface SearchOptionProps {
  handleRemove: (searchObj: SearchObj) => void;
  onClickCity: (searchObj: SearchObj) => void;
  searchObj: SearchObj;
}

const SearchOption = memo((props: SearchOptionProps) => {
  const { handleRemove, onClickCity, searchObj } = props;
  const { theme } = useThemeContext();
  return (
    <ContainedButton
      className={clsx(
        "w-full",
        "h-[3rem]",
        "grid",
        "grid-cols-[1.75rem_auto_2rem]",
        "px-3",
        "items-center",
        "gap-3",
        "bg-transparent!",
        "search-history-btn",
      )}
      onClick={() => onClickCity(searchObj)}
    >
      <div className="w-7 h-7 p-[0.375rem] bg-slate-200/10 rounded-[50%]">
        <HistoryIcon className={clsx(`svg-fill--${theme}`, "w-4", "h-4")} />
      </div>

      <ThemedText component="p" className="font-semibold select-none text-start">
        {searchObj.city}, {searchObj.country}
      </ThemedText>

      <div
        className={clsx(
          `icon-button--${theme}`,
          "fill",
          "icon-button-base",
          "w-8",
          "h-8",
          "p-[0.25rem]",
          "select-none",
          "z-10",
        )}
        onClick={(e: MouseEvent<HTMLDivElement>) => {
          e.stopPropagation();
          handleRemove(searchObj);
        }}
      >
        <DeleteIcon className={clsx(`svg-fill--${theme}`, "w-4", "h-4")} />
      </div>
    </ContainedButton>
  );
});

export default SearchHistory;