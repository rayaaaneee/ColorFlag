import ChildrenType from "@/useful/types/children-type";
import { MouseEventHandler } from "react";


export interface Customs {
    colorClass?: string;
    hoverColorClass?: string;
    activeColorClass?: string;
    focusColorClass?: string;
    disabledColorClass?: string;
    textColor?: string;
    paddingClass?: string;
    hasShadow?: boolean;
    zIndex?: number;
}
export interface ButtonProps {
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    onMouseEnter?: MouseEventHandler<HTMLButtonElement>,
    onMouseLeave?: MouseEventHandler<HTMLButtonElement>,
    children?: ChildrenType,
    title?: string,
    customs?: Customs,
    disabled?: boolean
}

const Button = ({ onClick = undefined, children = "OK", className="", title = undefined, customs: custom = undefined, disabled = false, onMouseEnter, onMouseLeave }: ButtonProps) => {
    return (
        <button
            title={ title }
            onClick={onClick} 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ zIndex: custom?.zIndex ? custom.zIndex : 0 }}
            disabled={ disabled }
            className={`
                ${className} 
                ${custom?.colorClass ? custom.colorClass : "bg-main"} 
                ${custom?.hoverColorClass ? custom.hoverColorClass : "hoverable"} 
                ${custom?.textColor ? custom.textColor : "text-white"} 
                ${custom?.activeColorClass && custom.activeColorClass } 
                ${custom?.focusColorClass && custom.focusColorClass } 
                ${custom?.disabledColorClass && custom.disabledColorClass } 
                ${custom?.paddingClass ? custom.paddingClass : "px-5 py-3"} 
                ${(custom === undefined || custom.hasShadow) && `shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:shadow-none active:shadow-none disabled:shadow-none`}
                ${disabled ? `cursor-not-allowed` : `cursor-pointer`}
                relative flex flex-row items-center justify-center gap-1 select-none rounded-lg text-center align-middle font-sans text-sm font-medium uppercase  transition-all focus:opacity-[0.85] active:opacity-[0.85]  disabled:pointer-events-none disabled:opacity-50`}
            type="button" 
            >
            { children }
        </button>
    );
}

export default Button;