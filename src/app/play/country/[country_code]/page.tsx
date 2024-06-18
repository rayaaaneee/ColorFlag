import countriesArray from "@/asset/data/countries.json";
import ColorableFlag, { type sourceElementInterface } from "@/components/colorable-flag";
import NotFound from "@/components/not-found";
import type Country from "@/utils/interfaces/country";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";
import { type Metadata } from "next";

interface PageProps {
    params: { 
        country_code: string; 
    };
}

export const generateMetadata = ({ params }: PageProps): Metadata => {
    const countries: Country[] = countriesArray satisfies Country[] as Country[];

    const { country_code } = params;

    const countryElement: Country | undefined = countries.find((element: Country) => (element.code === country_code));

    const title = countryElement ? `Guess the flag of ${uppercaseFirstWordsLetters(countryElement.name)}` : 'Unknown';

    return { title };
}

const Page = ({ params }: PageProps) => {

    const countries: Country[] = countriesArray satisfies Country[] as Country[];

    const { country_code } = params;

    const countryElement: Country | undefined = countries.find((element: Country) => (element.code === (country_code as string)));

    if (!countryElement) {
        return (<NotFound />);
    }

    const countryName: string = uppercaseFirstWordsLetters(countryElement.name);
    
    return (
        <div className='w-full h-full mt-20 flex flex-col gap-4'>
            <h1 className="text-center mb-4 text-5xl font-bold leading-none tracking-tight text-gray-900">Guess the flag of { countryName }</h1>
            <ColorableFlag 
                sourceElement={ countryElement as sourceElementInterface }
                className='flex flex-col gap-3'
            />
        </div>
    );
}

export default Page;
