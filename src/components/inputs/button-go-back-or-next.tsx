import Link from "next/link";
import Button from "./button";
import { IoMdArrowRoundForward } from "react-icons/io";
import { IoMdArrowRoundBack } from "react-icons/io";
import React from "react";

export enum Direction {
    BACK = 1,
    NEXT = 2
}

export interface ButtonGoPlayNextProps<T extends {value:string}> {
    dataSource: T[],
    currentValue: string,
    url: string,
    direction?: Direction
}

const ButtonGoBackOrNext = <T extends {value: string}>({ dataSource, currentValue, url, direction = Direction.NEXT }: ButtonGoPlayNextProps<T>) => {

    const text: string = `Go ${direction === Direction.NEXT ? "next" : "back"}`;
    
    const nextElementIndex: number | undefined  = dataSource.findIndex((element: T) => element.value === currentValue) + (direction === Direction.NEXT ? 1 : -1);

    
    if (nextElementIndex === undefined) {
        console.error("No next value found");
        return <Button>{text}</Button>
    }
    
    const nextElement: T = dataSource[nextElementIndex] || (direction === Direction.NEXT ? dataSource[0] :  dataSource[dataSource.length - 1]);

    return (
        <div>
            <Button>
                <Link href={`${url}/${nextElement?.value}`} className="flex flex-row items-center justify-center gap-2">
                    {direction === Direction.BACK && (<IoMdArrowRoundBack />)}
                    {text}
                    {direction === Direction.NEXT && (<IoMdArrowRoundForward />)}
                </Link>
            </Button>
        </div>
    )
}

export default ButtonGoBackOrNext;