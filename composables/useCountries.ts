import { COUNTRIES } from "@/app/countries";

export const useCountries = () => {
  const countries = ref(COUNTRIES);

  const getCurrencySymbol = (name: string) => {
    name = name.toLowerCase().trim();
    let currencySymbol;

    countries.value.map((country) => {
      let countryArray: any[] = country.currency.split(" ");
      let currencyName = countryArray.pop().toLowerCase().trim();
      let currencyAbbr = country.abbreviation.toLowerCase();
      let countryName = countryArray.join(" ").toLowerCase().trim();

      if (
        name === currencyName ||
        name === countryName ||
        name === currencyAbbr
      ) {
        currencySymbol = country.symbol;
      }
    });
    return currencySymbol;
  };

  const allCountries = () => unref(countries);

  return {
    allCountries,
    getCurrencySymbol,
  };
};
