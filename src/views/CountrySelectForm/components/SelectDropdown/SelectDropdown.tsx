import clsx from "clsx";
import { Fragment } from "react";
import { Card } from "../../../../components";
import { CountryInfo } from "../../../../constants";
import SelectContent from "./SelectContent";

interface Props {
  handleClearCountry: () => void;
  handleCountrySelect: (country: string) => void;
  selectedCountry?: string;
  countriesList: CountryInfo[];
  open: boolean;
  handleClose: () => void;
  searchInput: string;
}

const SelectDropdown: React.FC<Props> = (props: Props) => {
  const { countriesList, handleClearCountry, handleCountrySelect, selectedCountry, open, handleClose, searchInput } = props;

  return (
    <Fragment>
      <div className={clsx("relative", { "z-[-1]": !open, "z-5": open })}>
        <div
          className={clsx(
            "absolute",
            { open },
            "left-0",
            "dropdown-div",
            "w-full"
          )}
        >
          {open && (
            <Card className={clsx("dropdown-card", "relative", "overflow-hidden", { open })}>
              <SelectContent
                countriesList={countriesList}
                handleClearCountry={handleClearCountry}
                handleCountrySelect={handleCountrySelect}
                selectedCountry={selectedCountry}
                searchInput={searchInput}
              />
            </Card>
          )}
        </div>
      </div>

      {open && (
        <div className="fixed w-full h-full top-0 left-0 z-0" onClick={handleClose} />
      )}
    </Fragment>
  )
};

export default SelectDropdown;