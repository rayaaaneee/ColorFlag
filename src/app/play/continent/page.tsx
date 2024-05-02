"use client";

import { MouseEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import Continent from "@/useful/interfaces/continent";
import continentsArray from "@/asset/data/continents.json";
import { useRouter } from "next/navigation";

const Play = () => {

    const continents: Continent[] = continentsArray as Continent[];

    const [selectedContinent, setSelectedContinent] = useState<string>();
    const router = useRouter();

    const goToPage: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (selectedContinent) {
            router.push(`/play/continent/${selectedContinent}`);
        }
    }

    return (
        <>
            <h1>Choose the region to train :</h1>
            <select
                className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={ (e) => setSelectedContinent(e.currentTarget.value) }>
                <option value="null" selected>Please select a continent</option>
                {continents.map((continent: Continent) => {
                    return (
                        <option value={continent.code} key={continent.code}>
                            <p>{ continent.name }</p>
                        </option>
                    )
                })}
            </select>
            <button type="button" onClick={goToPage} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">OK</button>
        </>
    );
}
export default Play;
