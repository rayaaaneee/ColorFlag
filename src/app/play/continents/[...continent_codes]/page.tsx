"use client";

import { useParams } from "next/navigation";
import Continent from "@/useful/interfaces/continent";
import continentArray from "@/asset/data/continents.json";
import NotFound from "@/components/not-found";
import CardLink, { Card } from "@/components/usefuls/card-link";

import allCountriesInContinentImg from '@/asset/img/pages/play/all-countries-in-continents.png';
import choosingCountryImg from '@/asset/img/pages/play/countries.png';
import uppercaseFirstWordsLetters from "@/useful/string-treatment/uppercaseFirstWordsLetters";

const Page = () => {

    const continents: Continent[] = continentArray satisfies Continent[] as Continent[];

    const { continent_codes } = useParams<{ continent_codes?: string[] }>() as any;
    console.log(continent_codes);
    const selectedContinents: Continent[] = continents.filter((continent: Continent) => continent_codes.includes(continent.code.replace("/", "-")));
    console.log(selectedContinents);

    const continentNames: string[] = selectedContinents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));

    const cardElements: Card[] = [
        {
            image: choosingCountryImg,
            title: `Choose a country in ${continentNames.join(", ")}`,
            imgClass: "w-1/2 m-auto",
            description: "",
            href: `/play/country?continent_code=${selectedContinents.map((continent: Continent) => continent.code).join(",")}`,
            tags: [
                "local",
            ]
        },
        {
            image: allCountriesInContinentImg,
            title: `Guess all countries flags in ${continentNames.join(", ")}`,
            description: "",
            imgClass: "w-[45%] m-auto",
            href: `/play/continents/all/${selectedContinents.map((continent: Continent) => continent.code.replace("/", "-")).join("/")}`,
            tags: [
                "tour",
                "global",
            ]
        }
    ];

    if (selectedContinents.length === 0 || selectedContinents.length !== continent_codes.length) return <NotFound />

    return (
        <div className="flex flex-row gap-5 items-center justify-center">
            { cardElements.map((card, index) => {
                return <CardLink heightClass="h-[25rem]" key={`continent-card-${index}`} element={card} />
            }) }
        </div>
    );
}

export default Page;