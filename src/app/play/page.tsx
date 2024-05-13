"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import continentsImg from "@/asset/img/pages/play/continents.webp";
import countryImg from "@/asset/img/pages/play/countries.png";
import sportsImg from "@/asset/img/pages/play/sports.png"

import Card from "@/useful/interfaces/card";
import CardLink from "@/components/usefuls/card-link";

const Play = () => {

    const [selectedCountry, setSelectedCountry] = useState<string>();
    const router = useRouter();

    const cardsContent: Card[] = [
        {
            image: continentsImg,
            title: "Choose a continent",
            imgClass: "w-full",
            description: "Train your geography skills by guessing or coloring the flags of the countries in a continent",
            href: "/play/continent",
            tags: [
                "worldwide"
            ]
        },
        {
            image: countryImg,
            title: "Choose a country",
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
                    return (<CardLink element={el} key={index} />);
                }) }
            </div>
        </>
    );
}
export default Play;
