import { Fragment, Suspense, lazy } from "react";
import { CountryInfo } from "../../../../constants";
import { CountrySelect } from "./components";

const CitiesSelect = lazy(() => import("./components/CitiesSelect"));

interface Props {
  handleClearCountry: () => void;
  handleCountrySelect: (country: string) => void;
  selectedCountry?: string;
  countriesList: CountryInfo[];
  searchInput: string;
}

const SelectContent: React.FC<Props> = (props: Props) => {
  const { countriesList, handleClearCountry, handleCountrySelect, selectedCountry, searchInput } = props;

  return (
    <Fragment>
      <CountrySelect handleCountrySelect={handleCountrySelect} countriesList={countriesList} searchInput={searchInput} />
      <Suspense>
        <CitiesSelect handleClearCountry={handleClearCountry} selectedCountry={selectedCountry}  />
      </Suspense>
    </Fragment>
  );
};

export default SelectContent;