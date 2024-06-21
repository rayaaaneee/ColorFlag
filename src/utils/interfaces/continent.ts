import Country from "./country";

interface Continent {
    name: string;
    id: string;
    non_continent?: boolean;

    countries?: Country[];
}

export default Continent;