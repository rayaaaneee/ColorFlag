import NotFound from "@/components/not-found";
import { HeadingOne } from "@/components/utils/headings";
import CountryAPI from "@/lib/utils/api/country-api";
import Country from "@/utils/interfaces/country";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";
import { Metadata } from "next";
import ClientComponent from "./_components/client-component";

export interface PageProps {
    params: {
        country_id: string;
    }
}

export interface CountryMapGame extends Country {
    isAnswer?: boolean;
}

const getCountry = (country_id: string): {
    country: CountryMapGame | undefined;
    name: string;
} => {
    const country: CountryMapGame | undefined = CountryAPI.getInstance().find((country) => 
        (country.non_country !== true && country.id === country_id)
    , true);

    if (country) country.isAnswer = true;

    return {
        country,
        name: uppercaseFirstWordsLetters(country?.name ?? 'Unknown')
    };
}

export const generateMetadata = ({ params: { country_id } }: PageProps): Metadata => { 

    const { name } = getCountry(country_id);

    return {
        title: `Guess the shape of ${name}`,
    };
}

const Page = ({ params: { country_id } }: PageProps) => {

    const { country, name: countryName } = getCountry(country_id);

    if (!country) return (<NotFound />);

    const continent_id = country.continent_id;

    const otherCountries: CountryMapGame[] = CountryAPI.getInstance().getRandomEntities(3, (country) => {
        return country.continent_id === continent_id && country.non_country !== true && country.id !== country_id;
    }, true);
    otherCountries.forEach((country: CountryMapGame) => country.isAnswer = false)

    const countries: CountryMapGame[] = [country, ...otherCountries].sort(() => Math.random() - 0.5);

    return (
        <div className="flex flex-col gap-5 items-center justify-center">
            <HeadingOne className="text-center">
                Guess the map of {countryName}
            </HeadingOne>
            <ClientComponent countries={countries} />
        </div>
    );
}

export default Page;