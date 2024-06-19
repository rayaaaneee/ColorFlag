"use client";

import Button from "@/components/inputs/button";
import Select, { type ElementValue, type SelectDataSourceInterface, type Setter } from "@/components/inputs/select";
import type Country from "@/utils/interfaces/country";
import { useRouter } from "next/navigation";
import { useState, type MouseEventHandler } from "react";
import toast from "react-hot-toast";

export interface ClientComponentPropsInterface {
    countries: Country[];
}

const ClientComponent = ({countries}: ClientComponentPropsInterface) => {

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

export default ClientComponent;