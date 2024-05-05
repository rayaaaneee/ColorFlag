"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import continentsImg from "@/asset/img/pages/play/continents.webp";
import countryImg from "@/asset/img/pages/play/country.png";
import sportsImg from "@/asset/img/pages/sports.png"

import Card from "@/useful/interfaces/card";
import CardLink from "@/components/card-link";

const Play = () => {

    const [selectedCountry, setSelectedCountry] = useState<string>();
    const router = useRouter();

    const cardsContent: Card[] = [
        {
            image: continentsImg,
            title: "Choose a continent",
            imgClass: "w-full",
            description: "lorem sghvkcss  sccccccccccccc",
            href: "/play/continent",
            background: "rgb(183 128 128 / 50%)",
            hashtags: [
                "worldwide"
            ]
        },
        {
            image: countryImg,
            title: "Choose a country",
            imgClass: "w-1/3 m-auto",
            description: "sxxxxxxxxxxxxxxxx",
            href: "/play/country",
            background: "rgb(129 146 181 / 48%)",
            hashtags: [
                "local"
            ]
        },
        {
            image: sportsImg,
            title: "Choose a sport",
            imgClass: "w-1/3 m-auto",
            description: "sxxxxxxxxxxxxxxxx",
            href: "/play/sport",
            background: "rgb(129 181 152 / 48%)",
            hashtags: [
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
