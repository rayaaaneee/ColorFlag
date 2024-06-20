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

    static getRandomCountry(continentCodes: string[] = [], forbiddenCodes: string[] = [], init = false): Country { 
        const country_index: number = Math.floor(Math.random() * countriesJson.length);
        const country: Country = countriesJson[country_index] as Country;
        if (forbiddenCodes.includes(country.code) || (continentCodes.length > 0 && !continentCodes.includes(country.continent_code))) {
            return this.getRandomCountry(continentCodes, forbiddenCodes, init);
        }
        if (init) country.continent = ContinentAPI.find(country.continent_code);
        return country;
    }

    static getRandomCountries(quantity: number, continentCodes: string[] = [], forbiddenCodes: string[] = [], init = false): Country[] {
        const countries: Country[] = [];
        const continents: Continent[] = ContinentAPI.get(continentCodes, true);

        if (quantity > countriesJson.length) quantity = countriesJson.length;

        const countriesCount: number = continents.map(continent => continent.countries).flat().length;
        if ((continents.length > 0) && (quantity > countriesCount)) quantity = countriesCount;

        while (countries.length < quantity) {
            const country: Country = this.getRandomCountry(continents.map(continent => continent.code), forbiddenCodes, init);

            if (!countries.includes(country)) {
                countries.push(country);
            }
        }

        return countries;
    }
}

export default CountryAPI;