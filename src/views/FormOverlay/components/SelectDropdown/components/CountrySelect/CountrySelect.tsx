import clsx from "clsx";
import { FunctionComponent } from "react";
import { ContainedButton } from "../../../../../../components";
import { CountryInfo } from "../../../../../../constants";
import { useThemeContext } from "../../../../../../hooks";

interface Props {
  handleCountrySelect: (country: string) => void;
  countriesList: CountryInfo[];
}

const CountrySelect: FunctionComponent<Props> = (props: Props) => {
  const { handleCountrySelect, countriesList } = props;
  const { theme } = useThemeContext();

  return (
    <div
      className={clsx(
        "flex",
        "flex-col",
        "max-h-[16rem]",
        "min-h-[16rem]",
        "overflow-y-scroll",
        "w-full",
        "gap-2",
        `div-scroll--${theme}`,
        "p-2",
        "relative",
      )}
    >
      {countriesList.map((countryInfo: CountryInfo) => (
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
      ))}
    </div>
  );
};

export default CountrySelect;