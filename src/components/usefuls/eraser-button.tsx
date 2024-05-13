import { MouseEventHandler, useState } from "react";
import Tooltip from "./tooltip";
import Button from "../inputs/button";
import { CiEraser } from "react-icons/ci";

export interface EraserButtonTooltipTexts {
    hovered: string;
    clicked: string;
}

export interface EraserButtonInterface {
    onClick: MouseEventHandler<HTMLButtonElement>;
    tooltipTexts?: EraserButtonTooltipTexts;
    className?: string;
}

const EraserButton = ({onClick, tooltipTexts = { hovered: "Clear all", clicked: "Cleared" }, className = ""}: EraserButtonInterface) => {
    const [cleared, setCleared] = useState<boolean>(false);
    return (
        <Tooltip className={`${className}`} text={ cleared ? tooltipTexts.clicked : tooltipTexts.hovered }>
            <Button onMouseLeave={e => setCleared(false)} onClick={e => {setCleared(true);onClick(e)} } customs={{paddingClass: "p-2"}}>
                <CiEraser className='w-6 h-6' />
            </Button>
        </Tooltip>
    );
}

export default EraserButton;