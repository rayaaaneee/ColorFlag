"use client";

import { MouseEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import Continent from "@/useful/interfaces/continent";
import continentsArray from "@/asset/data/continents.json";
import { useRouter } from "next/navigation";
import Select, { ElementValue, Setter } from "@/components/select";

const Play = () => {

    const continents: Continent[] = continentsArray as Continent[];

    const [selectedContinent, setSelectedContinent] = useState<ElementValue>();
    const router = useRouter();

    const goToPage: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (selectedContinent) {
            router.push(`/play/continent/${selectedContinent}`);
        }
    }

    return (
        <>
            <h1>Choose the region to train :</h1>
            <Select 
                dataSources={ continents.map(
                    (continent:Continent) => ({
                        name: continent.name,
                        value: continent.code
                    })
                ) } 
                itemName="continent"
                setter={setSelectedContinent as Setter}/>
            <button type="button" onClick={goToPage} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">OK</button>
        </>
    );
}

export default Play;
