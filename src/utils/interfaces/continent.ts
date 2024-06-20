import Country from "./country";

interface Continent {
    name: string;
    code: string;
    non_continent?: boolean;

    countries?: Country[];
}

export default Continent;