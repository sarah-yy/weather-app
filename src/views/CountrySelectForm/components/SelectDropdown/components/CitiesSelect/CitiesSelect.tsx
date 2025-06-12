import clsx from "clsx";
import { useMemo } from "react";
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

  const countryInfo = useMemo(() => countryInfoMap[selectedCountry ?? ""], [selectedCountry, countryInfoMap]);

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
        "max-h-[16rem]",
        "min-h-[16rem]",
        "w-full",
        "top-0",
        "select-city-page",
        "py-3",
        "px-2",
        { active: !!selectedCountry }
      )}
    >
      <div className="flex gap-2">
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
            "flex",
            "flex-col",
            "overflow-y-scroll",
            "w-full",
            "gap-2",
            `div-scroll--${theme}`,
            "p-2",
            "relative",
          )}
        >
          {countryInfo.cities.map((city: string) => (
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
              key={city}
              onClick={() => onClickCity(city)}
            >
              {city}
            </ContainedButton>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CitiesSelect;