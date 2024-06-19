import continentsArray from "@/asset/data/continents.json";
import countriesArray from "@/asset/data/countries.json";
import NotFound from "@/components/not-found";
import type Continent from "@/utils/interfaces/continent";
import type Country from "@/utils/interfaces/country";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";
import ClientComponent from "./_components/client-component";

interface PageProps {
    searchParams: { 
        continent_codes?: string | undefined; 
    };
}

export const generateMetadata = ({ searchParams }: PageProps) => {
    const continent_codes: string[] | undefined = searchParams.continent_codes?.split(",");

    const continents: Continent[] = (continentsArray satisfies Continent[] as Continent[]).filter((continent: Continent) => continent_codes ? continent_codes.includes(continent.code) : false);

    const baseTitle: string = 'Choose the country to train';
    const title = continents.length > 0 ? `${baseTitle} in ${ continents.map((continent: Continent) => uppercaseFirstWordsLetters(continent.name)).join(", ") }` : baseTitle;

    return { title };
};

const Page = ({ searchParams }: PageProps) => {

    const continent_codes: string[] | undefined = searchParams.continent_codes?.split(",");

    const continents: Continent[] = (continentsArray satisfies Continent[] as Continent[]).filter((continent: Continent) => continent_codes ? continent_codes.includes(continent.code) : false);

    const countries: Country[] = (countriesArray satisfies Country[] as Country[]).filter(country => continent_codes ? continent_codes.includes(country.continent_code) : true);

    const allContinentsCodesExist = continent_codes ? continent_codes.every((code) => countries.some((country) => country.continent_code === code)) : true;

    if (!allContinentsCodesExist || continent_codes?.length === 0) {
        return <NotFound />
    }

    return (
        <>
            <h1>Choose the country to train { continents.length > 0 && `in ${ continents.map((continent: Continent) => uppercaseFirstWordsLetters(continent.name)).join(", ") }` } :</h1>
            <ClientComponent countries={countries} />
        </>
    );
}
export default Page;
