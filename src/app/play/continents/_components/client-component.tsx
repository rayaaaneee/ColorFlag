"use client";

import Button from "@/components/inputs/button";
import Select, { ElementValue, SelectDataSourceInterface, Setter } from "@/components/inputs/select";
import Continent from "@/utils/interfaces/continent";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useState } from "react";
import toast from "react-hot-toast";

export interface ClientComponentProps {
    continents: Continent[],
}

export const ClientComponent = ({ continents }: ClientComponentProps) => {

    const [selectedContinents, setSelectedContinents] = useState<ElementValue[]>([]);
    const router = useRouter();

    const goToPage: MouseEventHandler<HTMLButtonElement> = (_) => {
        if (selectedContinents.length > 0) {
            router.push(`/play/continents/${selectedContinents.map(
                (name: ElementValue) => (name as string | null | undefined)?.replace("/", "-")).join("/")
            }`);
        } else {
            toast.error("Please select at least one continent");
        }
    }

    return (
        <>
            <Select 
                dataSource={ continents as SelectDataSourceInterface[] } 
                itemName="continent"
                isMultiple={true}
                setter={setSelectedContinents as Setter}
            />
            <Button onClick={goToPage} >OK</Button>
        </>
    )
}
