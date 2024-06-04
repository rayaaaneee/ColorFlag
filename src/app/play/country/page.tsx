"use client";

import Country from "@/useful/interfaces/country";
import countriesArray from "@/asset/data/countries.json";
import continentsArray from "@/asset/data/continents.json";
import { useSearchParams } from "next/navigation";
import NotFound from "@/components/not-found";
import Continent from "@/useful/interfaces/continent";
import uppercaseFirstWordsLetters from "@/useful/string-treatment/uppercaseFirstWordsLetters";
import SubPage from "./sub-page";

const Page = () => {

    const continent_codes: string[] | null | undefined = useSearchParams()?.get("continent_code")?.split(",");

    const continents: Continent[] = (continentsArray satisfies Continent[] as Continent[]).filter((continent: Continent) => continent_codes ? continent_codes.includes(continent.code) : false);


    const countries: Country[] = (countriesArray satisfies Country[] as Country[]).filter(country => continent_codes ? continent_codes.includes(country.continent_code) : true);

    const allContinentsCodesExist = continent_codes ? continent_codes.every((code) => countries.some((country) => country.continent_code === code)) : true;
    if (!allContinentsCodesExist || continent_codes?.length === 0) {
        return <NotFound />
    }

    return (
        <>
            <h1>Choose the country to train { continents.length > 0 && `in ${ continents.map((continent: Continent) => uppercaseFirstWordsLetters(continent.name)).join(", ") }` } :</h1>
            <SubPage countries={countries} />
        </>
    );
}
export default Page;
