import { ChangeEventHandler } from "react";
import Checkbox from "../inputs/checkbox";
import { CheckboxPropsInterface } from "../inputs/checkbox";
import SizeType from "@/useful/types/size-type";

export interface CheckboxContainerProps extends CheckboxPropsInterface{
    label: string;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    className?: string;
    hasBackground?: boolean;
    defaultChecked?: boolean;
    size?: SizeType,
}

const CheckboxContainer = ({ label, size = "md", hasBackground = false, defaultChecked = false, checked = undefined, id = undefined, onChange = undefined, className = undefined }: CheckboxContainerProps) => {
    
    const getFontSize = () => {
        let className: string = "";
        switch (size) {
            case "sm":
                className = "text-xs";
                break;
            case "md":
                className = "text-sm";
                break;
            case "lg":
                className = "text-lg";
                break;
            case "xl":
                className = "text-xl";
                break;
        }
        return className;
    }
    
    return (
        <div className={`${ className } flex items-center ${ hasBackground && "bg-main py-3 px-5" } rounded-lg`}>
            <Checkbox defaultChecked={defaultChecked} size={size} onChange={onChange} id={id} checked={checked} />
            <label htmlFor={id} className={`ms-2 ${getFontSize()} ${ hasBackground ? 'text-gray-300' : 'text-gray-900' }`}>{ label }</label>
        </div>
    );
}

export default CheckboxContainer;