"use client";

import { MouseEventHandler, useState } from "react";
import Continent from "@/useful/interfaces/continent";
import continentsArray from "@/asset/data/continents.json";
import { useRouter } from "next/navigation";
import Select, { ElementValue, Setter } from "@/components/inputs/select";
import Button from "@/components/inputs/button";
import toast from "react-hot-toast";

const Page = () => {

    const continents: Continent[] = continentsArray satisfies Continent[] as Continent[];

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
            <h1>Choose the continent(s) to train :</h1>
            <Select 
                dataSources={ continents.map(
                    (continent:Continent) => ({
                        name: continent.name,
                        value: continent.code
                    })
                ) } 
                itemName="continent"
                isMultiple={true}
                setter={setSelectedContinents as Setter}/>
            <Button onClick={goToPage} >OK</Button>
        </>
    );
}

export default Page;
