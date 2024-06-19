import continentArray from "@/asset/data/continents.json";
import NotFound from "@/components/not-found";
import CardLink, { type Card } from "@/components/utils/card-link";
import type Continent from "@/utils/interfaces/continent";

import allCountriesInContinentImg from '@/asset/img/pages/play/all-countries-in-continents.png';
import choosingCountryImg from '@/asset/img/pages/play/countries.png';
import shapesIconImg from '@/asset/img/pages/play/shapes.jpg';

import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";

interface PageProps {
    params: { 
        continent_codes: string[]; 
    };
}

export const generateMetadata = ({ params }: PageProps) => {
    const continents: Continent[] = continentArray satisfies Continent[] as Continent[];

    const { continent_codes } = params;

    const selectedContinents: Continent[] = continents.filter((continent: Continent) => continent_codes.includes(continent.code.replace("/", "-")));

    const continentNames: string[] = selectedContinents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));

    const title = `Train - ${continentNames.join(", ")}`;

    return { title };
}

const Page = ({ params }: PageProps) => {

    const continents: Continent[] = continentArray satisfies Continent[] as Continent[];

    const { continent_codes } = params;

    const selectedContinents: Continent[] = continents.filter((continent: Continent) => continent_codes.includes(continent.code.replace("/", "-")));

    const continentNames: string[] = selectedContinents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));

    const cardElements: Card[] = [
        {
            image: choosingCountryImg,
            title: `Choose a country`,
            imgClass: "w-1/2 m-auto",
            description: "",
            href: `/play/country?continent_codes=${selectedContinents.map((continent: Continent) => continent.code).join(",")}`,
            tags: [
                "local",
            ]
        },
        {
            image: allCountriesInContinentImg,
            title: `Guess all countries flags`,
            description: "",
            imgClass: "w-[45%] m-auto",
            href: `/play/continents/all/${selectedContinents.map((continent: Continent) => continent.code.replace("/", "-")).join("/")}`,
            tags: [
                "tour",
                "global",
            ]
        },
        {
            image: shapesIconImg,
            title: `Shape test`,
            description: "",
            imgClass: "w-[65%] m-auto",
            href: `/play/shapes/all?continent_codes=${selectedContinents.map((continent: Continent) => continent.code.replace("/", "-")).join("/")}`,
            tags: [
                "geography",
                "worldmap"
            ]
        }
    ];

    if (selectedContinents.length === 0 || selectedContinents.length !== continent_codes.length) return <NotFound />

    return (
        <div className="flex flex-row gap-5 items-center justify-center">
            { cardElements.map((card, index) => {
                return <CardLink heightClass="h-[22rem]" key={`continent-card-${index}`} element={card} />
            }) }
        </div>
    );
}

export default Page;