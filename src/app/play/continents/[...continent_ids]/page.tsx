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
        continent_ids: string[]; 
    };
}

const getContinents = (continent_ids: string[]): {
    continents: Continent[];
    names: string[];
} => {
    continent_ids = continent_ids.map((code) => code.replace("-", "/"));

    const continents: Continent[] = ContinentAPI.getInstance().get(continent_ids).asList();

    const names: string[] = continents.map((currentContinent: Continent) => uppercaseFirstWordsLetters(currentContinent.name || ""));

    return { continents, names };
}

export const generateMetadata = ({ params }: PageProps) => {

    const { continent_ids } = params;

    const { names: continentNames } = getContinents(continent_ids);

    const title = `Train - ${continentNames.join(", ")}`;

    return { title };
}

const Page = ({ params }: PageProps) => {

    const { continent_ids } = params;

    const { continents, names } = getContinents(continent_ids);

    const cardElements: Card[] = [
        {
            image: choosingCountryImg,
            title: `Choose a country`,
            imgClass: "w-1/2 m-auto",
            description: "",
            href: `/play/country?continent_ids=${continents.map((continent: Continent) => continent.id).join(",")}`,
            tags: [
                "local",
            ]
        },
        {
            image: allCountriesInContinentImg,
            title: `Guess all countries flags`,
            description: "",
            imgClass: "w-[45%] m-auto",
            href: `/play/continents/all/${continents.map((continent: Continent) => continent.id.replace("/", "-")).join("/")}`,
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
            href: `/play/shapes/all?continent_ids=${continents.map((continent: Continent) => continent.id.replace("/", "-")).join("/")}`,
            tags: [
                "geography",
                "worldmap"
            ]
        }
    ];

    if (continents.length === 0 || continents.length !== continent_ids.length) return <NotFound />

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