import clsx from "clsx";
import { FunctionComponent, MouseEvent, memo, useCallback, useMemo } from "react";
import { DeleteIcon, HistoryIcon } from "../../../../assets";
import { ContainedButton, ThemedText } from "../../../../components";
import { CountrySearchHistory } from "../../../../constants";
import { useCountriesContext, useThemeContext, useWeatherContext } from "../../../../hooks";

interface SearchObj extends CountrySearchHistory {
  itemKey: string;
}

interface CountrySearch extends CountrySearchHistory {
  itemKey?: string;
}

const SearchHistory: FunctionComponent = () => {
  const {
    countryInfoMap,
    searchHistoryData,
    searchHistoryOrder,
    handleAddToSearchHistory,
    handleRemoveAllSearchHistory,
    handleRemoveFromSearchHistory,
  } = useCountriesContext();
  const { theme } = useThemeContext();
  const { handleSelectCity } = useWeatherContext();

  const searchObjArr = useMemo(() => {
    return searchHistoryOrder.reduce((prev: SearchObj[], id: string): SearchObj[] => {
      if (!searchHistoryData[id]) return prev;
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
      <div className="flex justify-between">
        <ThemedText component="h3" className="text-lg font-semibold text-start">
          Search History
        </ThemedText>

        <ContainedButton
          className={clsx(
            "delete-all-btn",
            "flex",
            "items-center",
            "h-[1.5rem]",
            "px-[0.375rem]",
            "py-[0.125rem]",
            "bg-transparent!",
          )}
          onClick={handleRemoveAllSearchHistory}
        >
          <span className={clsx("text-xs", "error-text")}>Delete All</span>
        </ContainedButton>
      </div>

      <div
        className={clsx(
          "flex",
          "flex-col",
          "mt-2",
          "max-h-[9rem]",
          "overflow-y-auto",
          `div-scroll--${theme}`,
        )}
      >
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
        "min-h-[3rem]",
        "max-h-[3rem]",
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

      <ThemedText component="p" className="font-semibold select-none text-start whitespace-nowrap text-ellipsis">
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