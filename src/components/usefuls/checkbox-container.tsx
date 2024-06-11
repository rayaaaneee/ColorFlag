import { ChangeEventHandler } from "react";
import Checkbox from "../inputs/checkbox";
import { CheckboxPropsInterface } from "../inputs/checkbox";

export interface CheckboxContainerProps extends CheckboxPropsInterface{
    label: string;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    className?: string;
    hasBackground?: boolean;
    defaultChecked?: boolean;
}

const CheckboxContainer = ({ label, hasBackground = false, defaultChecked = false, checked = undefined, id = undefined, onChange = undefined, className = undefined }: CheckboxContainerProps) => {
    return (
        <div className={`${ className } flex items-center ${ hasBackground && "bg-main py-3 px-5" } rounded-lg`}>
            <Checkbox defaultChecked={defaultChecked} onChange={onChange} id={id} checked={checked} />
            <label htmlFor={id} className={`ms-2 text-sm ${ hasBackground ? 'text-gray-300' : 'text-gray-900' }`}>{ label }</label>
        </div>
    );
}

export default CheckboxContainer;