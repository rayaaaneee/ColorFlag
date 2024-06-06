import ChildrenType from "@/useful/types/children-type";
import { MouseEventHandler } from "react";


export interface Customs {
    colorClass?: string;
    hoverColorClass?: string;
    activeColorClass?: string;
    focusColorClass?: string;
    disabledColorClass?: string;
    textColorClass?: string;
    paddingClass?: string;
    hasShadow?: boolean;
    hasTextUpperCase?: boolean;
    zIndexClass?: number;
    borderRadiusClass?: string;
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
    type?: "button" | "submit" | "reset"
}

const Button = ({ onClick, children = "OK", className="", title = undefined, customs = undefined, disabled = false, onMouseEnter, onMouseLeave, type = "button" }: ButtonProps) => {
    return (
        <button
            title={ title }
            onClick={onClick} 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{ zIndex: customs?.zIndexClass ? customs.zIndexClass : 0 }}
            disabled={ disabled }
            className={`
                ${className} 
                ${customs?.colorClass ? customs.colorClass : "bg-main"} 
                ${customs?.hoverColorClass ? customs.hoverColorClass : "hoverable"} 
                ${customs?.textColorClass ? customs.textColorClass : "text-white"} 
                ${customs?.activeColorClass && customs.activeColorClass } 
                ${customs?.focusColorClass && customs.focusColorClass } 
                ${customs?.disabledColorClass && customs.disabledColorClass } 
                ${customs?.paddingClass ? customs.paddingClass : "px-5 py-3"} 
                ${(customs === undefined || customs.hasShadow) && `shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:shadow-none active:shadow-none disabled:shadow-none`}
                ${disabled ? `cursor-not-allowed` : `cursor-pointer`}
                ${customs?.borderRadiusClass ? customs.borderRadiusClass : "rounded-lg"}
                ${(customs === undefined || customs?.hasTextUpperCase === true || customs?.hasTextUpperCase === undefined) && `uppercase`}
                overflow-hidden relative tracking-wide flex flex-row items-center justify-center gap-1 select-none text-center align-middle font-sans text-sm font-medium  transition-all focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50`}
            type={ type }
            >
            { children }
        </button>
    );
}

export default Button;