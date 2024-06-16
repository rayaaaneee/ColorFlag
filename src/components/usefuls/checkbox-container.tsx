import cn from "@/lib/utils/cn";
import SizeType from "@/useful/types/size-type";
import { ChangeEventHandler } from "react";
import Checkbox, { CheckboxPropsInterface } from "../inputs/checkbox";

export interface CheckboxContainerProps extends CheckboxPropsInterface{
    label: string;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    className?: string;
    hasBackground?: boolean;
    defaultChecked?: boolean;
    size?: SizeType,
    checkboxRef?: React.RefObject<HTMLInputElement>;
}

const CheckboxContainer = ({ label, size = "md", hasBackground = false, defaultChecked = false, checked = undefined, id = undefined, onChange = undefined, className = undefined, checkboxRef = undefined }: CheckboxContainerProps) => {
    
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
        <div className={cn("flex items-center rounded-lg", { "bg-main py-3 px-5": hasBackground }, className)}>
            <Checkbox ref={checkboxRef} defaultChecked={defaultChecked} size={size} onChange={onChange} id={id} checked={checked} />
            <label htmlFor={id} className={cn("ms-2", getFontSize(), hasBackground ? "text-gray-300" : "text-gray-900")}>{ label }</label>
        </div>
    );
}

export default CheckboxContainer;