import cn from "@/lib/utils/cn";
import ChildrenType from "@/useful/types/children-type";
import { MouseEventHandler } from "react";


export interface ButtonProps {
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    onMouseEnter?: MouseEventHandler<HTMLButtonElement>,
    onMouseLeave?: MouseEventHandler<HTMLButtonElement>,
    children?: ChildrenType,
    title?: string,
    hasShadow?: boolean,
    disabled?: boolean
    type?: "button" | "submit" | "reset"
}

const Button = ({ onClick, children = "OK", className="", title = undefined, hasShadow = false, disabled = false, onMouseEnter, onMouseLeave, type = "button" }: ButtonProps) => {
    return (
        <button
            title={ title }
            onClick={onClick} 
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            disabled={ disabled }
            className={cn(
                "bg-main hoverable text-white rounded-lg px-5 py-3 text-sm overflow-hidden relative tracking-wide flex flex-row items-center justify-center gap-1 select-none text-center align-middle font-sans font-thin transition-all focus:opacity-[0.85] active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed", 
                {
                    "shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:shadow-none active:shadow-none disabled:shadow-none": hasShadow,
                },
                className,
            )}
               
            type={ type }
            >
            { children }
        </button>
    );
}

export default Button;