import Continent from "@/utils/interfaces/continent";

interface Country {
    id: string,
    name: string,
    continent_id: string,
    non_country?: boolean,

    continent?: Continent,
}

export default Country;