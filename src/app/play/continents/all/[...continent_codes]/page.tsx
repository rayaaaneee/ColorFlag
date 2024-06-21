import NotFound from "@/components/not-found";
import ContinentAPI from "@/lib/utils/api/continent-api";
import type Continent from "@/utils/interfaces/continent";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";

interface PageProps {
    params: { 
        continent_codes: string[]; 
    };
}

const getContinents = (continent_codes: string[]): {
    continents: Continent[];
    names: string[];
} => {
    continent_codes = continent_codes.map((code) => code.replace("-", "/"));
    
    const continents: Continent[] = Array.from(ContinentAPI.getInstance().get(continent_codes.map((code) => code.replace("-", "/"))).asList());
    const names: string[] = continents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));

    return { continents, names };
}

export const generateMetadata = ({ params }: PageProps) => {

    const { continent_codes } = params;

    const { names: continentNames } = getContinents(continent_codes);

    const title = `Guess all flags - ${continentNames.join(", ")}`;

    return { title };

}

const Page = ({ params }: PageProps) => {

    const { continent_codes } = params;

    const { names: continentNames, continents } = getContinents(continent_codes);

    if (continents.length === 0 || continents.length !== continent_codes.length) return <NotFound />

    return (
        <>
        </>
    );
}

export default Page;