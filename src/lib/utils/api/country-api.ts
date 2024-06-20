import countriesJson from "@/asset/data/countries.json";

import ContinentAPI from "./continent-api";

import Continent from "@/utils/interfaces/continent";
import Country from "@/utils/interfaces/country";

class CountryAPI {

    static getAll(init = false): Country[] {
        return (countriesJson satisfies Country[] as Country[]).map((country: Country) => { 
            if (init) country.continent = ContinentAPI.find(country.continent_code);
            return country;
        });
    }
  
    static get(codes: string[], init = false): Country[] {
        const countries: Country[] = (countriesJson.filter((country) => codes.includes(country.code)) satisfies Country[] as Country[]);
        if (init) {
            countries.forEach((country: Country) => country.continent = ContinentAPI.find(country.continent_code));
        }
        return countries;
    }

    static find(code: string, init = false): Country | undefined {
        const country: Country | undefined = countriesJson.find((country) => country.code === code) satisfies Country | undefined;

        if (init && country) country.continent = ContinentAPI.find(country.continent_code);
        return country;
    }

    static getByContinent(continent: Continent, init = false): Country[] {
        return (countriesJson.filter((country) => country.continent_code === continent.code) satisfies Country[]).map((country: Country) => { 
            if (init) country.continent = continent;
            return country;
        });
    }
}

export default CountryAPI;