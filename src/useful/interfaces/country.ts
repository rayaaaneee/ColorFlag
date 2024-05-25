import Continent from "@/useful/interfaces/continent";

interface Country {
    code: string,
    name: string,
    continent_code: string,
    non_country?: boolean,
    continent?: Continent,
}

export default Country;