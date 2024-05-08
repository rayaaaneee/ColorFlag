"use client";

import { useParams } from 'next/navigation';

import countriesArray from "@/asset/data/countries.json";
import Country from "@/useful/interfaces/country";
import uppercaseFirstWordsLetters from "@/useful/uppercaseFirstWordsLetters";
import ColorableFlag, { sourceElementInterface } from "@/components/colorable-flag";

const PlayCountry = () => {

    const countries: Country[] = countriesArray as Country[];

    const { country_code } = useParams<{ country_code?: string }>() as any;

    const countryElement: Country | undefined = countries.find((element: Country) => (element.code === (country_code as string)));

    const countryName: string = countryElement !== undefined ? uppercaseFirstWordsLetters(countryElement.name) : 'Unknown';
    
    return (
        <>
            <h1 className="text-center mb-4 text-5xl font-extrabold leading-none tracking-tight text-gray-900">Guess the flag of { countryName }</h1>
            <ColorableFlag 
                sourceElement={ countryElement as sourceElementInterface }
                itemName="country" 
            />
        </>
    );
}

export default PlayCountry;
