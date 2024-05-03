"use client";

import { MouseEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import Country from "@/useful/interfaces/country";
import countriesArray from "@/asset/data/countries.json";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Play = () => {

    const countries: Country[] = countriesArray as Country[];

    const [selectedCountry, setSelectedCountry] = useState<string>();
    const router = useRouter();

    const goToPage: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (selectedCountry) {
            router.push(`/play/country/${selectedCountry}`);
        } else {
            toast.error("Please select")
        }
    }

    return (
        <>
            <h1>Choose the country to train :</h1>
            <select
                className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={ (e) => setSelectedCountry(e.currentTarget.value) }>
                <option value="null" selected disabled>Please select a country</option>
                {countries.map((country: Country, index: number) => {
                    return (<option value={country.code} key={index}>{ country.name }</option>)
                })}
            </select>
            <button type="button" onClick={goToPage} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">OK</button>
        </>
    );
}
export default Play;
