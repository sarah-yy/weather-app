import { Fragment, Suspense, lazy } from "react";
import { CountryInfo } from "../../../../constants";
import { CountrySelect } from "./components";

const CitiesSelect = lazy(() => import("./components/CitiesSelect"));

interface Props {
  handleClearCountry: () => void;
  handleCloseDropdown: () => void;
  handleCountrySelect: (country: string) => void; // eslint-disable-line no-unused-vars
  selectedCountry?: string;
  countriesList: CountryInfo[];
  searchInput: string;
}

const SelectContent: React.FC<Props> = (props: Props) => {
  const { countriesList, handleClearCountry, handleCloseDropdown, handleCountrySelect, selectedCountry, searchInput } = props;

  return (
    <Fragment>
      <CountrySelect handleCountrySelect={handleCountrySelect} countriesList={countriesList} searchInput={searchInput} />
      <Suspense>
        <CitiesSelect handleClearCountry={handleClearCountry} selectedCountry={selectedCountry} handleCloseDropdown={handleCloseDropdown}  />
      </Suspense>
    </Fragment>
  );
};

export default SelectContent;