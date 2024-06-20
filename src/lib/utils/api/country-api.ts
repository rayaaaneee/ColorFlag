import countriesJson from "@/asset/data/countries.json";


import Continent from "@/utils/interfaces/continent";
import Country from "@/utils/interfaces/country";
import API from "./types/api";

class CountryAPI extends API<Country> {

    public readonly data: Country[] = countriesJson satisfies Country[] as Country[];
    private static instance: CountryAPI;
    private continentAPI: CountryAPI = CountryAPI.getInstance();

    private constructor() {
        super();
    }

    public init(entity: Country): Country { 
        entity.continent = this.continentAPI.find(entity.continent_code);
        return entity;
    }

    public getAll(init = false): Country[] {
        return (this.data satisfies Country[] as Country[]).map((country: Country) => { 
            if (init) country.continent = this.init(country);
            return country;
        });
    }
  
    public get(codes: string[], init = false): Country[] {
        const countries: Country[] = (this.data.filter((country) => codes.includes(country.code)) satisfies Country[] as Country[]);
        if (init) {
            countries.forEach((country: Country) => country.continent = this.init(country));
        }
        return countries;
    }

    public find(code: string, where: (data: Country) => boolean = (_ => true), init = false): Country | undefined {
        const country: Country | undefined = this.data.find((country) => country.code === code && where(country)) satisfies Country | undefined;

        if (init && country) country.continent = this.init(country);
        return country;
    }

    public exists(code: string, where: (country: Country) => boolean = _ => true): boolean {
        return this.data.some((country) => country.code === code);
    }

    public getByContinent(continent: Continent, init = false): Country[] {
        return (this.data.filter((country) => country.continent_code === continent.code) satisfies Country[]).map((country: Country) => { 
            if (init) country.continent = continent;
            return country;
        });
    }

    public static getInstance(): CountryAPI {
        if (!CountryAPI.instance) CountryAPI.instance = new CountryAPI();
        return CountryAPI.instance;
    }
}

export default CountryAPI;

