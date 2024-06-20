import NotFound from "@/components/not-found";
import { HeadingOne } from "@/components/utils/headings";
import CountryAPI from "@/lib/utils/api/country-api";
import Country from "@/utils/interfaces/country";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";
import { Metadata } from "next";
import ClientComponent from "./_components/client-component";

export interface PageProps {
    params: {
        country_code: string;
    }
}

export interface CountryMapGame extends Country {
    isAnswer?: boolean;
}

const getCountry = (country_code: string): {
    country: CountryMapGame | undefined;
    name: string;
} => {

    const country: CountryMapGame | undefined = CountryAPI.getInstance().find(country_code, (country) => {
        return country.non_country === true;
    }, true);

    if (country) country.isAnswer = true;

    return {
        country,
        name: uppercaseFirstWordsLetters(country?.name ?? 'Unknown')
    };
}

export const generateMetadata = ({ params: { country_code } }: PageProps): Metadata => { 

    const { name } = getCountry(country_code);

    return {
        title: `Guess the shape of ${name}`,
    };
}

const Page = ({ params: { country_code } }: PageProps) => {

    const { country, name: countryName } = getCountry(country_code);

    if (!country) return (<NotFound />);

    const otherCountries: CountryMapGame[] = CountryAPI.getInstance().getRandomEntities(3, (data) => {
        return data.continent_code === country.continent_code;
    }, true);
    otherCountries.forEach((country: CountryMapGame) => country.isAnswer = false)

    const countries: CountryMapGame[] = [country, ...otherCountries].sort(() => Math.random() - 0.5);

    return (
        <div className="flex flex-col gap-5 items-center justify-center">
            <HeadingOne>
                Guess the shape of {countryName}
            </HeadingOne>
            <ClientComponent countries={countries} />
        </div>
    );
}

export default Page;