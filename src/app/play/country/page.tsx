"use client";

import { MouseEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import Country from "@/useful/interfaces/country";
import countriesArray from "@/asset/data/countries.json";
import Select, { ElementValue, SelectDataSourceInterface, Setter } from "@/components/inputs/select";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/inputs/button";

const Play = () => {

    const countries: Country[] = countriesArray as Country[];

    const [selectedCountry, setSelectedCountry] = useState<ElementValue>();
    const router = useRouter();

    const goToPage: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (selectedCountry) {
            router.push(`/play/country/${selectedCountry}`);
        } else {
            toast.error("Please select a country");
        }
    }

    return (
        <>
            <h1>Choose the country to train :</h1>
            <Select 
                dataSources={ countries.map(
                    (country:Country) => ({
                        name: country.name,
                        value: country.code
                    } as SelectDataSourceInterface)
                ) }
                itemName="country"
                isSearcheable={true}
                setter={setSelectedCountry as Setter}
            />
            <Button onClick={goToPage} customs={{ zIndex: 0 }} >OK</Button>
        </>
    );
}
export default Play;
