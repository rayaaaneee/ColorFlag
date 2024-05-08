import { MouseEventHandler } from "react";

export interface ButtonProps {
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children?: JSX.Element | string,
    title?: string,
}

const Button = ({ onClick = undefined, children = "OK", className="", title = undefined }: ButtonProps) => {
    return (
        <button 
            title={ title }
            type="button" 
            onClick={onClick} 
            className={`${className} main-bg hoverable focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 text-white border-gray-600 hover:border-gray-600 focus:ring-gray-700`}
            >
            { children }
        </button>
    );
}

export default Button;