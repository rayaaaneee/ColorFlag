import cn from "@/lib/utils/cn";
import type ChildrenType from "@/utils/types/children-type";
import { type MouseEventHandler } from "react";
import Tooltip, { TooltipPosition } from "../utils/tooltip";


export interface ButtonProps {
    className?: string,
    tooltipClassName?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    onMouseEnter?: MouseEventHandler<HTMLButtonElement>,
    onMouseLeave?: MouseEventHandler<HTMLButtonElement>,
    children?: ChildrenType,
    title?: string,
    titlePosition?: TooltipPosition,
    hasShadow?: boolean,
    disabled?: boolean,
    asDiv?: boolean,
    type?: "button" | "submit" | "reset"
}

const Button = ({ onClick, children = "OK", className = "", title, hasShadow = false, disabled = false, onMouseEnter, onMouseLeave, type = "button", titlePosition = "top", asDiv = false, tooltipClassName }: ButtonProps) => {
    const btnProps = {
        title: title,
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        disabled: disabled,
        className: cn(
            "bg-main hoverable text-white rounded-lg px-5 py-3 text-sm overflow-hidden relative tracking-wide flex flex-row items-center justify-center gap-1 select-none text-center align-middle font-sans font-thin transition-all focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed",
            {
                "shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:shadow-none active:shadow-none disabled:shadow-none": hasShadow,
            },
            className,
        ),
        type: type,
    }

    const divProps = {
        ...btnProps,
        onClick: undefined,
        onMouseEnter: undefined,
        onMouseLeave: undefined,
    };
    
    return (
        <Tooltip className={tooltipClassName} text={title} position={titlePosition}>
            {asDiv ? (
                <div { ...divProps }>
                    { children }
                </div>
            ): (
                <button { ...btnProps }>
                    { children }
                </button>
            )}
        </Tooltip>
    );
}

export default Button;