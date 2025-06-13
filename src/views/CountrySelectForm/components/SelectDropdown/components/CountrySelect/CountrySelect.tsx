import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";
import { FunctionComponent, useRef } from "react";
import NoResultsDark from "../../../../../../assets/graphics/NoResultsDark.png";
import NoResultsLight from "../../../../../../assets/graphics/NoResultsLight.png";
import { ContainedButton, ThemedText } from "../../../../../../components";
import { CountryInfo, Theme } from "../../../../../../constants";
import { useThemeContext } from "../../../../../../hooks";

interface Props {
  handleCountrySelect: (country: string) => void;
  searchInput: string;
  countriesList: CountryInfo[];
}

const CountrySelect: FunctionComponent<Props> = (props: Props) => {
  const { handleCountrySelect, countriesList, searchInput } = props;
  const { theme } = useThemeContext();
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: countriesList.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    scrollToFn: () => null,
    gap: 8,
  });
  const items = virtualizer.getVirtualItems();

  if (countriesList.length === 0) {
    return (
      <div
        className={clsx(
          "flex",
          "justify-center",
          "items-center",
          "max-h-[16rem]",
          "min-h-[16rem]",
        )}
      >
        <div>
          <img
            src={theme === Theme.Dark ? NoResultsDark : NoResultsLight}
            className="w-[3rem] h-[3rem] block my-0 mx-auto"
          />
          <ThemedText
            component="p"
            className="max-w-[18.75rem] mt-3"
          >
            No results for &quot;{searchInput}&quot; found. Please try another input.
          </ThemedText>
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "max-h-[16rem]",
        "min-h-[16rem]",
        "overflow-y-scroll",
        "w-full",
        `div-scroll--${theme}`,
        "p-2",
      )}
      ref={parentRef}
    >
      <div
        className="relative flex flex-col"
        style={{ height: virtualizer.getTotalSize() }}
      >
        {items.map((virtualRow: VirtualItem) => {
          const countryInfo = countriesList[virtualRow.index];
          return (
            <ContainedButton
              className={clsx(
                "p-3",
                "flex",
                "justify-start",
                "items-center",
                "gap-3",
                "font-semibold",
                "max-h-[3rem]",
                "min-h-[3rem]",
                "absolute",
                "w-full",
              )}
              data-index={virtualRow.index}
              key={virtualRow.key}
              onClick={() => handleCountrySelect(countryInfo.name)}
              style={{
                height: virtualRow.size,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <div
                className="w-8 h-5 flag"
                style={{
                  backgroundImage: `url(${countryInfo?.flagImgUrl ?? ""})`,
                  backgroundSize: "cover",
                  backgroundPositionY: "center",
                }}
              />

              {countryInfo.name}
            </ContainedButton>
          );
        })}
        {/* {countriesList.map((countryInfo: CountryInfo) => (
          <ContainedButton
            className={clsx(
              "p-3",
              "flex",
              "justify-start",
              "items-center",
              "gap-3",
              "font-semibold",
              "max-h-[3rem]",
              "min-h-[3rem]",
            )}
            data-index={}
            key={countryInfo.name}
            onClick={() => handleCountrySelect(countryInfo.name)}
          >
            <div
              className="w-8 h-5 flag"
              style={{
                backgroundImage: `url(${countryInfo.flagImgUrl})`,
                backgroundSize: "cover",
                backgroundPositionY: "center",
              }}
            />

            {countryInfo.name}
          </ContainedButton>
        ))} */}
      </div>
    </div>
  );
};

export default CountrySelect;