import { ChangeEventHandler } from "react";
import Image from "next/image";
import checkedImg from '@/asset/img/general/inputs/checked.svg';

export interface CheckboxProps {
    label: string;
    checked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    className?: string;
}

const Checkbox = ({ label, checked = false, onChange = undefined, className = undefined }: CheckboxProps) => {
    return (
        <div className={`${ className } flex items-center bg-main py-3 px-5 rounded-lg`}>
            <div className="relative inline-flex items-center">
                <input type="checkbox"
                    onChange={onChange}
                    className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                    id="default-checkbox" checked={checked} />
                <span
                  className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <Image src={ checkedImg } alt="Check" className="w-3.5 h-3.5" />
                </span>
            </div> 
            <label htmlFor="default-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ label }</label>
        </div>
    );
}

export default Checkbox;