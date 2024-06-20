import countriesJson from "@/asset/data/countries.json";


import Continent from "@/utils/interfaces/continent";
import Country from "@/utils/interfaces/country";
import ContinentAPI from "./continent-api";
import API from "./types/api";

class CountryAPI extends API<Country> {

    public readonly data: Country[] = countriesJson satisfies Country[] as Country[];
    private static instance: CountryAPI;
    private continentAPI: ContinentAPI = ContinentAPI.getInstance();

    private constructor() {
        super();
    }

    public init(entity: Country): Country { 
        entity.continent = this.continentAPI.find((country) => country.code === entity.continent_code) as Continent | undefined;
        return entity;
    }

    public static getInstance(): CountryAPI {
        if (!CountryAPI.instance) CountryAPI.instance = new CountryAPI();
        return CountryAPI.instance;
    }
}

export default CountryAPI;

