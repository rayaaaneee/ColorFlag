"use client";

import { useParams } from "next/navigation";
import React, { useState } from "react";

import Continent from "@/useful/interfaces/continent";
import continentArray from "@/asset/data/continents.json";
import countriesArray from "@/asset/data/countries.json";
import NotFound from "@/components/not-found";
import Country from "@/useful/interfaces/country";
import uppercaseFirstWordsLetters from "@/useful/string-treatment/uppercaseFirstWordsLetters";

const Page = () => {

    const continents: Continent[] = continentArray as Continent[];
    const countries: Country[] = countriesArray as Country[];

    const { continent_codes } = useParams<{ continent_codes?: string[] }>() as any;

    const selectedContinents: Continent[] = continents.filter((continent: Continent) => continent_codes.includes(continent.code.replace("/", "-")));

    const selectedCountries: Country[] = countries.filter((country: Country) => continent_codes.includes(country.continent_code.replace("/", "-")));

    const continentNames: string[] = selectedContinents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));

    if (selectedContinents.length === 0 || selectedContinents.length !== continent_codes.length) return <NotFound />

    return (
        <>
        </>
    );
}

export default Page;