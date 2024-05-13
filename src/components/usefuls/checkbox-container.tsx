import { ChangeEventHandler } from "react";
import Checkbox from "../inputs/checkbox";

export interface CheckboxContainerProps {
    label: string;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

const CheckboxContainer = ({ label, checked = undefined, onChange = undefined, className = undefined }: CheckboxContainerProps) => {
    return (
        <div className={`${ className } flex items-center bg-main py-3 px-5 rounded-lg`}>
            <Checkbox onChange={onChange} checked={checked} />
            <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ label }</label>
        </div>
    );
}

export default CheckboxContainer;