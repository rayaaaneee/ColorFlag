import Continent from "@/utils/interfaces/continent";

import continentsJson from "@/asset/data/continents.json";

import CountryAPI from "./country-api";
import API from "./types/api";

class ContinentAPI extends API<Continent> {

    public readonly data: Continent[] = continentsJson;
    private static instance: ContinentAPI;
    private countryAPI: CountryAPI = CountryAPI.getInstance();

    private constructor() {
        super();
    }

    public init(entity: Continent): Continent {
        entity.countries = Array.from(this.getCountries(entity));
        return entity;
    }

    public getCountries(continent: Continent, init: boolean = false) {
        return this.countryAPI.findAll((country) => country.continent_code === continent.code, init);
    }

    public static getInstance(): ContinentAPI {
        if (!ContinentAPI.instance) ContinentAPI.instance = new ContinentAPI();
        return ContinentAPI.instance;
    }
}

export default ContinentAPI;