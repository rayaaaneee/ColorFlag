"use client";

import { MouseEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import Continent from "@/useful/interfaces/continent";
import continentsArray from "@/asset/data/continents.json";
import { useRouter } from "next/navigation";
import Select, { ElementValue, Setter } from "@/components/inputs/select";
import Button from "@/components/inputs/button";

const Play = () => {

    const continents: Continent[] = continentsArray as Continent[];

    const [selectedContinent, setSelectedContinent] = useState<ElementValue>();
    const router = useRouter();

    const goToPage: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (selectedContinent) {
            router.push(`/play/continent/${selectedContinent}`);
        }
    }

    return (
        <>
            <h1>Choose the region to train :</h1>
            <Select 
                dataSources={ continents.map(
                    (continent:Continent) => ({
                        name: continent.name,
                        value: continent.code
                    })
                ) } 
                itemName="continent"
                setter={setSelectedContinent as Setter}/>
            <Button onClick={goToPage} >OK</Button>
        </>
    );
}

export default Play;
