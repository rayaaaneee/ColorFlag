import Button, { type ButtonProps } from "@/components/inputs/button";
import Link from "next/link";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

export enum Direction {
    BACK = 1,
    NEXT = 2
}

export interface ButtonGoPlayNextProps<T extends {id:string}> extends ButtonProps {
    dataSource: T[],
    currentValue: string,
    url: string,
    direction?: Direction,
    cannotLoop?: boolean,
}

const ButtonGoBackOrNext = <T extends {id: string}>({ dataSource, currentValue, url, direction = Direction.NEXT, className = "", onClick = undefined, disabled = false, title = undefined, cannotLoop = false }: ButtonGoPlayNextProps<T>) => {

    const text: string = `Go ${direction === Direction.NEXT ? "next" : "back"}`;
    
    const nextElementIndex: number | undefined  = dataSource.findIndex((element: T) => element.id === currentValue) + (direction === Direction.NEXT ? 1 : -1);

    
    if (nextElementIndex === undefined) {
        console.error("No next value found");
        return <Button>{text}</Button>
    }
    
    const nextElement: T | undefined = dataSource[nextElementIndex] || (cannotLoop ? undefined : (direction === Direction.NEXT ? dataSource[0] :  dataSource[dataSource.length - 1]));

    return (
        <>
            { nextElement !== undefined && (
                <Button title={title} disabled={disabled} className={className} onClick={onClick}>
                    <Link href={`${url}/${nextElement.id}`} className="flex flex-row items-center justify-center gap-2">
                        {direction === Direction.BACK && (<IoMdArrowRoundBack />)}
                        {text}
                        {direction === Direction.NEXT && (<IoMdArrowRoundForward />)}
                    </Link>
                </Button>
            ) }
        </>
    )
}

export default ButtonGoBackOrNext;