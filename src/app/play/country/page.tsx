import NotFound from "@/components/not-found";
import ContinentAPI from "@/lib/utils/api/continent-api";
import CountryAPI from "@/lib/utils/api/country-api";
import type Continent from "@/utils/interfaces/continent";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";
import ClientComponent from "./_components/client-component";

const getContinents = (continent_ids: string): {
    continents: Continent[];
    names: string[];
    allIdsExist: boolean;
} => { 
    let ids = continent_ids.split(",");
    ids = ids.map((code) => code.replace("-", "/"));

    const continents: Continent[] = ContinentAPI.getInstance().get(ids, true).asList();
    const names: string[] = continents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));
    const allIdsExist = ids.every((code) => ContinentAPI.getInstance().findAll().some(country => country.id === code));

    return { continents, names, allIdsExist };
}

interface PageProps {
    searchParams: { 
        continent_ids?: string | undefined; 
    };
}

export const generateMetadata = ({ searchParams: { continent_ids } }: PageProps) => {
    
    const { continents, names } = getContinents(continent_ids ? continent_ids : '');

    const baseTitle: string = 'Choose the country to train';
    const title = continents.length > 0 ? `${baseTitle} in ${ names.join(", ") }` : baseTitle;

    return { title };
};

const Page = ({ searchParams: { continent_ids } }: PageProps) => {

    const { continents, allIdsExist, names: continentNames } = getContinents(continent_ids ? continent_ids : '');

    if (continent_ids && (!allIdsExist || (continent_ids.length === 0))) {
        return <NotFound />
    }

    const countries = continent_ids ? continents.map((continent) => {
        if (continent.countries) return continent.countries
        else return []
    }).flat() : CountryAPI.getInstance().getAll().asList();

    return (
        <>
            <h1>Choose the country to train { continents.length > 0 && `in ${ continentNames.join(", ") }` } :</h1>
            <ClientComponent countries={countries} />
        </>
    );
}
export default Page;
