"use client";

import Button from "@/components/inputs/button";
import Select, { type ElementValue, type SelectDataSourceInterface, type Setter } from "@/components/inputs/select";
import { useRouter } from "next/navigation";
import { useState, type MouseEventHandler } from "react";
import toast from "react-hot-toast";
import { SelectableCountry } from "../page";

export interface ClientComponentPropsInterface {
    countries: SelectableCountry[];
}

const ClientComponent = ({ countries }: ClientComponentPropsInterface) => {

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
                setter={setSelectedCountry as Setter}
                dataSource={ countries as SelectDataSourceInterface[] }
                itemName="country"

                isSearcheable={true}

                groupBy="continent_id"
                groupNames="continent_name"
                sortGroups={true}
            />
            <Button onClick={goToPage} className="z-0" >OK</Button>
        </>            
    );
}

export default ClientComponent;