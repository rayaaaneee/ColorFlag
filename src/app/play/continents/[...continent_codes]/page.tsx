import NotFound from "@/components/not-found";
import CardLink, { type Card } from "@/components/utils/card-link";
import type Continent from "@/utils/interfaces/continent";

import allCountriesInContinentImg from '@/asset/img/pages/play/all-countries-in-continents.png';
import choosingCountryImg from '@/asset/img/pages/play/countries.png';
import shapesIconImg from '@/asset/img/pages/play/shapes.jpg';

import { HeadingTwo } from "@/components/utils/headings";
import ContinentAPI from "@/lib/utils/api/continent-api";
import uppercaseFirstWordsLetters from "@/utils/string-treatment/uppercaseFirstWordsLetters";

interface PageProps {
    params: { 
        continent_codes: string[]; 
    };
}

const getContinents = (continent_codes: string[]): {
    continents: Continent[];
    names: string[];
} => {
    continent_codes = continent_codes.map((code) => code.replace("-", "/"));

    const continents: Continent[] = Array.from(ContinentAPI.getInstance().get(continent_codes));

    const names: string[] = continents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));

    return { continents, names };
}

export const generateMetadata = ({ params }: PageProps) => {

    const { continent_codes } = params;

    const { names: continentNames } = getContinents(continent_codes);

    const title = `Train - ${continentNames.join(", ")}`;

    return { title };
}

const Page = ({ params }: PageProps) => {

    const { continent_codes } = params;

    const { continents, names } = getContinents(continent_codes);

    const cardElements: Card[] = [
        {
            image: choosingCountryImg,
            title: `Choose a country`,
            imgClass: "w-1/2 m-auto",
            description: "",
            href: `/play/country?continent_codes=${continents.map((continent: Continent) => continent.code).join(",")}`,
            tags: [
                "local",
            ]
        },
        {
            image: allCountriesInContinentImg,
            title: `Guess all countries flags`,
            description: "",
            imgClass: "w-[45%] m-auto",
            href: `/play/continents/all/${continents.map((continent: Continent) => continent.code.replace("/", "-")).join("/")}`,
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
            href: `/play/shapes/all?continent_codes=${continents.map((continent: Continent) => continent.code.replace("/", "-")).join("/")}`,
            tags: [
                "geography",
                "worldmap"
            ]
        }
    ];

    if (continents.length === 0 || continents.length !== continent_codes.length) return <NotFound />

    return (
        <>
            <HeadingTwo>{names.join(", ")}</HeadingTwo>
            <div className="flex flex-row gap-5 items-center justify-center">
                { cardElements.map((card, index) => {
                    return <CardLink heightClass="h-[22rem]" key={`continent-card-${index}`} element={card} />
                }) }
            </div>
        </>
    );
}

export default Page;