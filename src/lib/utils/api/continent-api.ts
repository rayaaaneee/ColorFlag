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
        entity.countries = this.countryAPI.getByContinent(entity);
        return entity;
    }

    public getAll(init = false): Continent[] {
        return this.data.map((continent: Continent) => { 
            if (init) continent = this.init(continent);
            return continent;
        });
    }
  
    public find(code: string, where: (data: Continent) => boolean = _ => true,  init = false): Continent | undefined {
        let continent: Continent | undefined = this.data.find((continent) => continent.code === code && where(continent)) satisfies Continent | undefined;

        if (continent && init) continent = this.init(continent);
        return continent;
    }

    public get(codes: string[], init = false): Continent[] {
        return (this.data.filter((continent) => codes.includes(continent.code)) satisfies Continent[] as Continent[]).map((continent: Continent) => { 
            if (init) continent = this.init(continent);
            return continent;
        });
    }

    public exists(code: string): boolean {
        return this.data.some((continent) => continent.code === code);
    }

    public static getInstance(): ContinentAPI {
        if (!ContinentAPI.instance) ContinentAPI.instance = new ContinentAPI();
        return ContinentAPI.instance;
    }
}

export default ContinentAPI;