import ColorableFlag, { type sourceElementInterface } from "@/components/colorable-flag";
import NotFound from "@/components/not-found";
import CountryAPI from "@/lib/utils/api/country-api";
import type Country from "@/utils/interfaces/country";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";
import { type Metadata } from "next";

const getCountry = (country_id: string): {
    country: Country | undefined;
    name: string;
} => {
    debugger;
    const country: Country | undefined = CountryAPI.getInstance().find(country => country.id === country_id);
    return {
        country: country,
        name: uppercaseFirstWordsLetters(country?.name ?? 'Unknown')
    };
}

interface PageProps {
    params: { 
        country_id: string; 
    };
}

export const generateMetadata = ({ params: { country_id } }: PageProps): Metadata => {
    
    const { country } = getCountry(country_id);

    const title = country ? `Guess the flag of ${uppercaseFirstWordsLetters(country.name)}` : 'Unknown';

    return { title };
}

const Page = ({ params: { country_id } }: PageProps) => {

    const { country } = getCountry(country_id);

    if (!country) {
        return (<NotFound />);
    }

    const countryName: string = uppercaseFirstWordsLetters(country.name);
    
    return (
        <div className='w-full h-full mt-20 flex flex-col gap-4'>
            <h1 className="text-center mb-4 text-5xl font-bold leading-none tracking-tight text-gray-900">Guess the flag of { countryName }</h1>
            <ColorableFlag 
                sourceElement={ country as sourceElementInterface }
                className='flex flex-col gap-3'
            />
        </div>
    );
}

export default Page;
