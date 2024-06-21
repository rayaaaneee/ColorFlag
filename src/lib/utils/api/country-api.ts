import countriesJson from "@/asset/data/countries.json";


import Continent from "@/utils/interfaces/continent";
import Country from "@/utils/interfaces/country";
import ContinentAPI from "./continent-api";
import API from "./types/api";

class CountryAPI extends API<Country> {

    private static instance: CountryAPI;
    public readonly data: Country[] = countriesJson satisfies Country[] as Country[];

    private constructor(
        private continentAPI: ContinentAPI
    ) {
        super();
    }

    public init(entity: Country): Country { 
        entity.continent = this.continentAPI.find((country) => country.id === entity.continent_id) as Continent | undefined;
        return entity;
    }

    public static getInstance(): CountryAPI {
        console.log('CountryAPI getInstance');
        if (!CountryAPI.instance) CountryAPI.instance = new CountryAPI(ContinentAPI.getInstance());
        return CountryAPI.instance;
    }
}

export default CountryAPI;

