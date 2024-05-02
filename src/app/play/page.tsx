"use client";

import { MouseEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import continentsImg from "@/asset/img/continents.webp";
import countryImg from "@/asset/img/country.png";
import Image from "next/image";
import Link from "next/link";

const Play = () => {

    const [selectedCountry, setSelectedCountry] = useState<string>();
    const router = useRouter();

    const cardsContent: any = [
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
        }
    ]

    return (
        <>
            <div className="flex flex-row gap-5 items-center justify-center">
                { cardsContent.map((el: any, index: number) => {
                    return (
                        <Link style={{ backgroundColor: el.background}} href={el.href} key={index} className={`text-white cursor-pointer max-w-sm rounded h-96 overflow-hidden shadow-lg`}>
                            <div className="overflow-hidden flex items-center justify-center bg-white object-cover" style={{ height: "10.5rem"}}>
                                <Image className={ el.imgClass } src={ el.image } alt="Sunset in the mountains" />
                            </div>
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{ el.title }</div>
                                <p className="text-gray-700 text-base">{ el.description }</p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                { el.hashtags.map((el: string, index: number) => {
                                    return (
                                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{ el }</span>
                                    );
                                }) }
                            </div>
                        </Link>
                    );
                }) }
            </div>
        </>
    );
}
export default Play;
