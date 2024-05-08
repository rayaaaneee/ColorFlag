import { ChangeEventHandler } from "react";

export interface CheckboxProps {
    label: string;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({ label, checked = false, onChange = undefined }: CheckboxProps) => {
    return (
        <div className="flex items-center main-bg py-3 px-5 rounded-lg">
            <input defaultChecked={checked} onChange={onChange} id="default-checkbox" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ label }</label>
        </div>
    );
}

export default Checkbox;