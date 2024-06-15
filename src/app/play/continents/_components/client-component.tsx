"use client";

import Button from "@/components/inputs/button";
import Select, { ElementValue, Setter } from "@/components/inputs/select";
import Continent from "@/useful/interfaces/continent";
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
                dataSources={ continents.map(
                    (continent:Continent) => ({
                        name: continent.name,
                        value: continent.code
                    })
                ) } 
                itemName="continent"
                isMultiple={true}
                setter={setSelectedContinents as Setter}
            />
            <Button onClick={goToPage} >OK</Button>
        </>
    )
}
