"use client";

import { MouseEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import Country from "@/useful/interfaces/country";
import countriesArray from "@/asset/data/countries.json";
import SearchSelect, { ElementValue, SearchSelectDataSourceInterface } from "@/components/search-select";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Play = () => {

    const countries: Country[] = countriesArray as Country[];

    const [selectedCountry, setSelectedCountry] = useState<ElementValue>();
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
            <SearchSelect 
                dataSources={ countries.map(
                    (country:Country) => ({
                        name: country.name,
                        value: country.code
                    } as SearchSelectDataSourceInterface)
                ) }
                itemName="country"
                setSelectedParentValue={setSelectedCountry}
            />
            <button type="button" onClick={goToPage} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">OK</button>
        </>
    );
}
export default Play;
