import ButtonGoBackOrNext, { Direction } from "./inputs/button-go-back-or-next";

interface ButtonsGoBackAndNextInterface<T extends { value: string }> {
    className?: string;
    url: string;
    dataSource: T[];
    currentValue: string;
    cannotLoop?: boolean;
}

const ButtonsGoBackAndNext = <T extends {value: string}>({className = "", url, dataSource, currentValue, cannotLoop = false}: ButtonsGoBackAndNextInterface<T>) => {
    return (
        <div className={`w-fit h-fit flex gap-3 ${className}`}>
            <ButtonGoBackOrNext direction={Direction.BACK} url={url} dataSource={dataSource} currentValue={currentValue} cannotLoop={cannotLoop} />
            <ButtonGoBackOrNext url={url} dataSource={dataSource} currentValue={currentValue} cannotLoop={cannotLoop} />
        </div>
    )
}

export default ButtonsGoBackAndNext;