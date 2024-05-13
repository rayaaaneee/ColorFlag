"use client";

import { useParams } from "next/navigation";
import Continent from "@/useful/interfaces/continent";
import continentArray from "@/asset/data/continents.json";
import countriesArray from "@/asset/data/countries.json";
import NotFound from "@/components/not-found";
import Country from "@/useful/interfaces/country";
import { useState } from "react";

const PlayContinent = () => {

    const continents: Continent[] = continentArray as Continent[];
    const countries: Country[] = countriesArray as Country[];

    const { continent_code } = useParams<{ continent_code?: string }>() as any;

    const currentContinent: Continent | undefined = continents.find((continent: Continent) => continent.code === continent_code);

    const continentCountries: Country[] = countries.filter((country: Country) => country.continent === continent_code);

    const [currentCountry, setCurrentCountry] = useState<Country>(continentCountries[0] || {});

    return (
        <>
            { currentContinent === undefined ? 
                (<NotFound />) : 
                (
                    <>

                    </>
            ) }
        </>
    );
}

export default PlayContinent;