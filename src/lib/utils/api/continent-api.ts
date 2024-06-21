import Continent from "@/utils/interfaces/continent";

import continentsJson from "@/asset/data/continents.json";

import CountryAPI from "./country-api";
import API from "./types/api";

class ContinentAPI extends API<Continent> {

    public readonly data: Continent[] = continentsJson;
    private static instance: ContinentAPI;
    private static countryAPI: CountryAPI;
    
    private constructor() {
        super();
        ContinentAPI.countryAPI = CountryAPI.getInstance();
    }

    public init(continent: Continent): Continent {
        continent.countries = this.getCountries(continent).asList();
        return continent;
    }

    public getCountries(continent: Continent, init: boolean = false) {
        return ContinentAPI.countryAPI.findAll((country) => country.continent_id === continent.id, init);
    }

    public static getInstance(): ContinentAPI {
        if (!ContinentAPI.instance) ContinentAPI.instance = new ContinentAPI();
        return ContinentAPI.instance;
    }
}

export default ContinentAPI;