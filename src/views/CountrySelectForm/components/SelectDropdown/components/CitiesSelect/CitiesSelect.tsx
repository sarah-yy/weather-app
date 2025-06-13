import { useVirtualizer, VirtualItem } from "@tanstack/react-virtual";
import clsx from "clsx";
import { useMemo, useRef } from "react";
import { ChevronIcon } from "../../../../../../assets";
import { Card, ContainedButton, IconButton } from "../../../../../../components";
import { useCountriesContext, useThemeContext, useWeatherContext } from "../../../../../../hooks";

interface Props {
  handleClearCountry: () => void;
  selectedCountry?: string;
}

const CitiesSelect: React.FC<Props> = (props: Props) => {
  const { handleClearCountry, selectedCountry } = props;
  const { countryInfoMap } = useCountriesContext();
  const { theme } = useThemeContext();
  const { handleSelectCity } = useWeatherContext();
  const parentRef = useRef<HTMLDivElement>(null);

  const { cities, countryInfo } = useMemo(() => {
    const countryInfo = countryInfoMap[selectedCountry ?? ""];
    const cities = countryInfo?.cities ?? [];
    return { cities, countryInfo };
  }, [selectedCountry, countryInfoMap]);

  const virtualizer = useVirtualizer({
    count: cities.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 48,
    scrollToFn: () => null,
    gap: 8,
  });
  const items = virtualizer.getVirtualItems();

  const onClickCity = (city: string) => {
    if (!countryInfo?.iso3) return;
    handleSelectCity({
      countryIso3: countryInfo.iso3,
      city,
      countryName: countryInfo.name,
    });
  };

  return (
    <Card
      className={clsx(
        "absolute",
        "max-h-[14rem]",
        "min-h-[14rem]",
        "w-full",
        "top-0",
        "select-city-page",
        "py-3",
        "px-2",
        { active: !!selectedCountry }
      )}
    >
      <div className="flex gap-2 pb-2">
        <IconButton onClick={handleClearCountry}>
          <ChevronIcon className="back-icon w-4 h-4" />
        </IconButton>

        {countryInfo && (
          <div className="flex items-center gap-3 font-semibold">
            <div
              className="w-8 h-5 flag"
              style={{
                backgroundImage: `url(${countryInfo.flagImgUrl})`,
                backgroundSize: "cover",
                backgroundPositionY: "center",
              }}
            />

            {countryInfo.name}
          </div>
        )}
      </div>

      {countryInfo?.cities && (
        <div
          className={clsx(
            "overflow-y-scroll",
            "w-full",
            `div-scroll--${theme}`,
            "px-2",
            "pb-2",
            "max-h-[11rem]",
            "min-h-[11rem]",
          )}
          ref={parentRef}
        >
          <div
            className="relative flex flex-col mb-2"
            style={{ height: virtualizer.getTotalSize() }}
          >
            {items.map((virtualRow: VirtualItem) => {
              const city = cities[virtualRow.index];
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
                  onClick={() => onClickCity(city)}
                  style={{
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                >
                  {city}
                </ContainedButton>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
};

export default CitiesSelect;