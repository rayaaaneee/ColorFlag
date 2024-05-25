"use client";

import { MouseEventHandler, useState } from "react";
import Country from "@/useful/interfaces/country";
import countriesArray from "@/asset/data/countries.json";
import continentsArray from "@/asset/data/continents.json";
import Select, { ElementValue, SelectDataSourceInterface, Setter } from "@/components/inputs/select";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/inputs/button";
import NotFound from "@/components/not-found";
import Continent from "@/useful/interfaces/continent";
import uppercaseFirstWordsLetters from "@/useful/string-treatment/uppercaseFirstWordsLetters";

const Play = () => {

    const continent_codes: string[] | null | undefined = useSearchParams()?.get("continent_code")?.split(",");

    const continents: Continent[] = (continentsArray as Continent[]).filter((continent: Continent) => continent_codes ? continent_codes.includes(continent.code) : false);


    const countries: Country[] = (countriesArray as Country[]).filter(country => continent_codes ? continent_codes.includes(country.continent_code) : true);

    const [selectedCountry, setSelectedCountry] = useState<ElementValue>();
    const router = useRouter();

    const goToPage: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (selectedCountry) {
            router.push(`/play/country/${selectedCountry}`);
        } else {
            toast.error("Please select a country");
        }
    }

    const allContinentsCodesExist = continent_codes ? continent_codes.every((code) => countries.some((country) => country.continent_code === code)) : true;
    if (!allContinentsCodesExist || continent_codes?.length === 0) {
        return <NotFound />
    }

    return (
        <>
            <h1>Choose the country to train { continents.length > 0 && `in ${ continents.map((continent: Continent) => uppercaseFirstWordsLetters(continent.name)).join(", ") }` } :</h1>
            <Select 
                dataSources={ countries.map(
                    (country:Country) => ({
                        name: country.name,
                        value: country.code
                    } as SelectDataSourceInterface)
                ) }
                itemName="country"
                isSearcheable={true}
                setter={setSelectedCountry as Setter}
            />
            <Button onClick={goToPage} customs={{ zIndex: 0 }} >OK</Button>
        </>
    );
}
export default Play;
