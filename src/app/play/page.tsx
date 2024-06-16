import type { Metadata } from 'next';

import continentsImg from "@/asset/img/pages/play/continents.webp";
import countryImg from "@/asset/img/pages/play/countries.png";
import sportsImg from "@/asset/img/pages/play/sports.png";

import CardLink, { Card } from "@/components/usefuls/card-link";

export const metadata: Metadata = {
  title: 'Play',
  description: 'Choose a game mode to play and test your knowledge of flags, countries and geography',
};

const Play = () => {

    const cardsContent: Card[] = [
        {
            image: continentsImg,
            title: "Choose one or any continents",
            imgClass: "w-full",
            description: "Train your geography skills by guessing or coloring the flags of the countries in a continent",
            href: "/play/continents",
            tags: [
                "worldwide"
            ]
        },
        {
            image: countryImg,
            title: "Choose one or any countries",
            imgClass: "w-1/3 m-auto",
            description: "Test your knowledge by guessing or coloring the flags of the countries in the world",
            href: "/play/country",
            tags: [
                "local"
            ]
        },
        {
            image: sportsImg,
            title: "Choose a sport",
            imgClass: "w-1/3 m-auto",
            description: "Guess flag colors of famous sports club in the world",
            href: "/play/sport",
            tags: [
                "culture"
            ]
        }
    ]

    return (
        <>
            <div className="flex flex-row gap-5 items-center justify-center">
                { cardsContent.map((el: Card, index: number) => {
                    return (<CardLink heightClass="h-[28rem]" element={el} key={index} />);
                }) }
            </div>
        </>
    );
}
export default Play;
