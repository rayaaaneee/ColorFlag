import Continent from "@/utils/interfaces/continent";

import continentsJson from "@/asset/data/continents.json";

import CountryAPI from "./country-api";
import API from "./types/api";

class ContinentAPI extends API<Continent> {

    public readonly data: Continent[] = continentsJson;
    private static instance: ContinentAPI;
    
    private constructor(
        private countryAPI: CountryAPI
    ) {
        super();
    }

    public init(continent: Continent): Continent {
        continent.countries = Array.from(this.getCountries(continent).asList());
        return continent;
    }

    public getCountries(continent: Continent, init: boolean = false) {
        return this.countryAPI.findAll((country) => country.continent_id === continent.id, init);
    }

    public static getInstance(): ContinentAPI {
        console.log('ContinentAPI getInstance');
        if (!ContinentAPI.instance) ContinentAPI.instance = new ContinentAPI(CountryAPI.getInstance());
        return ContinentAPI.instance;
    }
}

export default ContinentAPI;