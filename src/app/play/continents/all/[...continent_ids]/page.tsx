import NotFound from "@/components/not-found";
import ContinentAPI from "@/lib/utils/api/continent-api";
import type Continent from "@/utils/interfaces/continent";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";

interface PageProps {
    params: { 
        continent_ids: string[]; 
    };
}

const getContinents = (continent_ids: string[]): {
    continents: Continent[];
    names: string[];
} => {
    continent_ids = continent_ids.map((code) => code.replace("-", "/"));
    
    const continents: Continent[] = ContinentAPI.getInstance().get(continent_ids.map((code) => code.replace("-", "/"))).asList();
    const names: string[] = continents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));

    return { continents, names };
}

export const generateMetadata = ({ params }: PageProps) => {

    const { continent_ids } = params;

    const { names: continentNames } = getContinents(continent_ids);

    const title = `Guess all flags - ${continentNames.join(", ")}`;

    return { title };

}

const Page = ({ params }: PageProps) => {

    const { continent_ids } = params;

    const { names: continentNames, continents } = getContinents(continent_ids);

    if (continents.length === 0 || continents.length !== continent_ids.length) return <NotFound />

    return (
        <>
        </>
    );
}

export default Page;