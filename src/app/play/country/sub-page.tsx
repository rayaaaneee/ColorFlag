"use client";

import Country from "@/useful/interfaces/country";
import Select, { ElementValue, SelectDataSourceInterface, Setter } from "@/components/inputs/select";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Button from "@/components/inputs/button";
import { MouseEventHandler, useEffect, useState } from "react";

export interface SubPagePropsInterface {
    countries: Country[];
}

const SubPage = ({countries}: SubPagePropsInterface) => {

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
            <Button onClick={goToPage} className="z-0" >OK</Button>
        </>            
    );
}

export default SubPage;