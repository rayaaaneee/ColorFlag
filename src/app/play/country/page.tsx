import NotFound from "@/components/not-found";
import ContinentAPI from "@/lib/utils/api/continent-api";
import CountryAPI from "@/lib/utils/api/country-api";
import type Continent from "@/utils/interfaces/continent";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";
import ClientComponent from "./_components/client-component";

const getContinents = (continent_codes: string): {
    continents: Continent[];
    names: string[];
    allCodesExist: boolean;
} => { 
    let codes = continent_codes.split(",");
    codes = codes.map((code) => code.replace("-", "/"));

    const continents: Continent[] = ContinentAPI.getInstance().get(codes, true);
    const names: string[] = continents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));
    const allCodesExist = codes.every((code) => ContinentAPI.getInstance().exists(code));

    return { continents, names, allCodesExist };
}

interface PageProps {
    searchParams: { 
        continent_codes?: string | undefined; 
    };
}

export const generateMetadata = ({ searchParams: { continent_codes } }: PageProps) => {
    
    const { continents, names } = getContinents(continent_codes ? continent_codes : '');

    const baseTitle: string = 'Choose the country to train';
    const title = continents.length > 0 ? `${baseTitle} in ${ names.join(", ") }` : baseTitle;

    return { title };
};

const Page = ({ searchParams: { continent_codes } }: PageProps) => {



    const { continents, allCodesExist, names: continentNames } = getContinents(continent_codes ? continent_codes : '');

    if (continent_codes && (!allCodesExist || (continent_codes.length === 0))) {
        return <NotFound />
    }

    const countries = continent_codes ? continents.map((continent) => {
        if (continent.countries) return continent.countries
        else return []
    }).flat() : CountryAPI.getInstance().getAll();

    return (
        <>
            <h1>Choose the country to train { continents.length > 0 && `in ${ continentNames.join(", ") }` } :</h1>
            <ClientComponent countries={countries} />
        </>
    );
}
export default Page;
