"use client";

import Button from "@/components/inputs/button";
import ButtonGoBackOrNext, { Direction } from "@/components/inputs/button-go-back-or-next";
import CountryAPI from "@/lib/utils/api/country-api";
import { Fragment, MouseEventHandler, useState } from "react";
import toast from "react-hot-toast";
import { CountryMapGame } from "../page";
import MapButtonCard from "./map-button-card";

export interface ClientComponentProps {
    countries: CountryMapGame[];
}

const ClientComponent = ({ countries }: ClientComponentProps) => {

    const [selectedItem, setSelectedItem] = useState<CountryMapGame | null>(null);
    const [answer, setAnswer] = useState<CountryMapGame | null>(null);

    const submitMap: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (answer) return;

        setAnswer(selectedItem);
        if (selectedItem?.isAnswer === true) {
            toast.success("Correct answer!");
        } else {
            toast.error("Wrong answer!");
        }
    }
    
    return (
        <>
            <div className="grid grid-cols-2 gap-7 items-center justify-center w-fit m-auto">
                {countries.map((country: CountryMapGame, index: number) => {
                    return (
                        <Fragment key={index}>
                            <MapButtonCard country={country} onClick={answer ? undefined : e => setSelectedItem(country)} selected={selectedItem === country} isAnswer={country.isAnswer} showAnswer={answer !== null} />
                        </Fragment>
                    )
                })}
            </div>
            <div className="flex gap-4">
                <Button disabled={(selectedItem === null) || (answer !== null)} onClick={submitMap} className="font-medium">
                    Submit
                </Button>
                {answer && ( 
                    <ButtonGoBackOrNext
                        currentValue={countries.find(c => c.isAnswer === true)!.id}
                        dataSource={CountryAPI.getInstance().findAll(c => c.non_country !== true).asList()}
                        direction={Direction.NEXT}
                        url="/play/map/country"
                        className="font-medium"
                    >
                    </ButtonGoBackOrNext>
                ) }
            </div>
        </>
    );
}

export default ClientComponent;