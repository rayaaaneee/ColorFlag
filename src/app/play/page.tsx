"use client";

import { MouseEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import continentsImg from "@/asset/img/continents.jpg";
import countryImg from "@/asset/img/country.png";
import Image from "next/image";

const Play = () => {

    const [selectedCountry, setSelectedCountry] = useState<string>();
    const router = useRouter();

    const cardsContent: any = [
        {
            image: continentsImg,
            title: "Choose a continent",
            imgClass: "w-full",
            description: "lorem sghvkcss  sccccccccccccc",
            href: "/play/region",
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
            hashtags: [
                "local"
            ]
        }
    ]

    return (
        <>
            <div className="flex flex-row gap-5 items-center justify-center">
                { cardsContent.map((el: any) => {
                    return (
                        <div onClick={ e => (router.push(el.href)) } className=" cursor-pointer max-w-sm rounded h-96 overflow-hidden shadow-lg">
                            <Image className={ el.imgClass } src={ el.image } alt="Sunset in the mountains" />
                            <div className="px-6 py-4">
                                <div className="font-bold text-xl mb-2">{ el.title }</div>
                                <p className="text-gray-700 text-base">{ el.description }</p>
                            </div>
                            <div className="px-6 pt-4 pb-2">
                                { el.hashtags.map((el: string) => {
                                    return (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{ el }</span>
                                    );
                                }) }
                            </div>
                        </div>
                    );
                }) }
            </div>
        </>
    );
}
export default Play;
