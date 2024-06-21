import Button, { type ButtonProps } from "@/components/inputs/button";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import LinkButton from "./link-button";

export enum Direction {
    BACK = 1,
    NEXT = 2
}

export interface ButtonGoBackOrNextProps<T extends {id:string}> extends ButtonProps {
    dataSource: T[],
    currentValue: string,
    url: string,
    direction?: Direction,
    canLoop?: boolean,
}

const ButtonGoBackOrNext = <T extends {id: string}>({ dataSource, currentValue, url, direction = Direction.NEXT, className = "", onClick = undefined, disabled = false, title = undefined, canLoop = false, titlePosition = "top" }: ButtonGoBackOrNextProps<T>) => {

    const text: string = `Go ${direction === Direction.NEXT ? "next" : "back"}`;
    
    const nextElementIndex: number | undefined  = dataSource.findIndex((element: T) => element.id === currentValue) + (direction === Direction.NEXT ? 1 : -1);

    
    if (nextElementIndex === undefined) {
        console.error("No next value found");
        return <Button>{text}</Button>
    }
    
    const nextElement: T | undefined = dataSource[nextElementIndex] || (canLoop ? undefined : (direction === Direction.NEXT ? dataSource[0] :  dataSource[dataSource.length - 1]));

    return (
        <>
            {nextElement !== undefined && (
                <LinkButton href={`${url}/${nextElement.id}`} title={title} disabled={disabled} className={className} onClick={onClick} titlePosition={titlePosition}>
                    <>
                        {direction === Direction.BACK && (<IoMdArrowRoundBack />)}
                        {text}
                        {direction === Direction.NEXT && (<IoMdArrowRoundForward />)}
                    </>
                </LinkButton>
            ) }
        </>
    )
}

export default ButtonGoBackOrNext;