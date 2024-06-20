import Continent from "@/utils/interfaces/continent";

import continentsJson from "@/asset/data/continents.json";

import CountryAPI from "./country-api";

class ContinentAPI {

    static getAll(init = false): Continent[] {
        return (continentsJson satisfies Continent[] as Continent[]).map((continent: Continent) => { 
            if (init) continent.countries = CountryAPI.getByContinent(continent);
            return continent;
        });
    }
  
    static find(code: string, init = false): Continent | undefined {
        const continent: Continent | undefined = continentsJson.find((country) => country.code === code) satisfies Continent | undefined;

        if (continent && init) continent.countries = CountryAPI.getByContinent(continent);
        return continent;
    }

    static get(codes: string[], init = false): Continent[] {
        return (continentsJson.filter((continent) => codes.includes(continent.code)) satisfies Continent[] as Continent[]).map((continent: Continent) => { 
            if (init) continent.countries = CountryAPI.getByContinent(continent);
            return continent;
        });
    }

    static exists(code: string): boolean {
        return continentsJson.some((continent) => continent.code === code);
    }
}

export default ContinentAPI;