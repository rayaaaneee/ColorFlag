import cn from "@/lib/utils/cn";
import ButtonGoBackOrNext, { ButtonGoBackOrNextProps, Direction } from "./inputs/button-go-back-or-next";

export interface ButtonsGoBackAndNextProps<T extends { id: string }> extends ButtonGoBackOrNextProps<T> {
    url: string;
    dataSource: T[];
    currentValue: string;
}

const ButtonsGoBackAndNext = <T extends {id: string}>({className = "", url, dataSource, currentValue, canLoop = false}: ButtonsGoBackAndNextProps<T>) => {
    return (
        <div className={cn("w-fit h-fit flex gap-3", className)}>
            <ButtonGoBackOrNext direction={Direction.BACK} url={url} dataSource={dataSource} currentValue={currentValue} canLoop={canLoop} />
            <ButtonGoBackOrNext url={url} dataSource={dataSource} currentValue={currentValue} canLoop={canLoop} />
        </div>
    )
}

export default ButtonsGoBackAndNext;