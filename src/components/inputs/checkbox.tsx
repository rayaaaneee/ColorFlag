import Image from "next/image";
import { ChangeEventHandler } from "react";

import checkedImg from '@/asset/img/general/inputs/checked.svg?url';

interface CheckboxInterface {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox = ({ checked = undefined, defaultChecked = undefined, onChange = undefined}: CheckboxInterface) => {
    return (
        <div className="relative inline-flex items-center">
            <input type="checkbox"
                onChange={onChange}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                id="default-checkbox" defaultChecked={defaultChecked} checked={checked} />
            <span
              className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <Image src={ checkedImg } alt="Check" className="w-3.5 h-3.5" />
            </span>
        </div> 
    );
}

export default Checkbox;