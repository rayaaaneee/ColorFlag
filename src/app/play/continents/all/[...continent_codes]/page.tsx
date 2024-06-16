import continentArray from "@/asset/data/continents.json";
import countriesArray from "@/asset/data/countries.json";
import NotFound from "@/components/not-found";
import Continent from "@/useful/interfaces/continent";
import Country from "@/useful/interfaces/country";
import uppercaseFirstWordsLetters from "@/useful/string-treatment/uppercaseFirstWordsLetters";

interface PageProps {
    params: { 
        continent_codes: string[]; 
    };
}

export const generateMetadata = ({ params }: PageProps) => {
    const continents: Continent[] = continentArray satisfies Continent[] as Continent[];

    const { continent_codes } = params;

    const selectedContinents: Continent[] = continents.filter((continent: Continent) => continent_codes.includes(continent.code.replace("/", "-")));

    const continentNames: string[] = selectedContinents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));

    const title = `Guess all flags - ${continentNames.join(", ")}`;

    return { title };

}

const Page = ({ params }: PageProps) => {

    const continents: Continent[] = continentArray satisfies Continent[] as Continent[];
    const countries: Country[] = countriesArray satisfies Country[] as Country[];

    const { continent_codes } = params;

    const selectedContinents: Continent[] = continents.filter((continent: Continent) => continent_codes.includes(continent.code.replace("/", "-")));

    const selectedCountries: Country[] = countries.filter((country: Country) => continent_codes.includes(country.continent_code.replace("/", "-")));

    const continentNames: string[] = selectedContinents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));

    if (selectedContinents.length === 0 || selectedContinents.length !== continent_codes.length) return <NotFound />

    return (
        <>
        </>
    );
}

export default Page;