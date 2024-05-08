import { MouseEventHandler } from "react";


export interface Customs {
    colorClass: string;
    hoverColorClass?: string;
    activeColorClass?: string;
    focusColorClass?: string;
    disabledColorClass?: string;
    textColor?: string;
}
export interface ButtonProps {
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: JSX.Element | string,
    title?: string,
    custom?: Customs,
    disabled?: boolean
}

const Button = ({ onClick = undefined, children = "OK", className="", title = undefined, custom = undefined, disabled = false }: ButtonProps) => {
    return (
        <button
            title={ title }
            onClick={onClick} 
            disabled={ disabled }
            className={`
                ${className} 
                ${custom?.colorClass ? custom.colorClass : "main-bg"} 
                ${custom?.hoverColorClass ? `hover:${custom.hoverColorClass}` : "hoverable"} 
                ${custom?.textColor ? `text-${custom.textColor}` : "text-white"} 
                ${custom?.activeColorClass && `${custom.activeColorClass}` } 
                ${custom?.focusColorClass && `focus:${custom.focusColorClass}` } 
                ${custom?.disabledColorClass && `disabled:${custom.disabledColorClass}` } 
                py-3 px-5 relative select-none rounded-lg text-center align-middle font-sans text-sm font-medium uppercase shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
            type="button" 
            >
            { children }
        </button>
    );
}

export default Button;