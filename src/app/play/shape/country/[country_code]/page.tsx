import { HeadingOne } from "@/components/utils/headings";
import CountryAPI from "@/lib/utils/api/country-api";
import Country from "@/utils/interfaces/country";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";
import { Metadata } from "next";

export interface PageProps {
    params: {
        country_code: string;
    }
}

const getCountry = (country_code: string): {
    country: Country | undefined;
    name: string;
} => {
    const country: Country | undefined = CountryAPI.find(country_code);
    return {
        country: country,
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

    return (
        <div>
            <HeadingOne>
                Guess the shape of {countryName}
            </HeadingOne>
        </div>
    );
}

export default Page;