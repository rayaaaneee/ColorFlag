import Image from "next/image";
import { ChangeEventHandler, ForwardedRef, forwardRef } from "react";

import CheckedImg from '@/asset/img/general/inputs/checked.svg';
import SizeType from "@/useful/types/size-type";
import cn from "@/lib/utils/cn";

export interface CheckboxPropsInterface {
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    size?: SizeType;
}

const Checkbox = forwardRef(({ checked = undefined, size = "md", id = undefined, defaultChecked = undefined, onChange = undefined}: CheckboxPropsInterface, ref: ForwardedRef<HTMLInputElement>) => {

    const getInputSize = () => {
        let className: string = "";
        switch (size) {
            case "sm":
                className = "size-4";
                break;
            case "md":
                className = "size-5";
                break;
            case "lg":
                className = "size-6";
                break;
            case "xl":
                className = "size-7";
                break;
        }
        return className;
    }

    const getIconSize = () => {
        let className: string = "";
        switch (size) {
            case "sm":
                className = "size-2.5";
                break;
            case "md":
                className = "size-3.5";
                break;
            case "lg":
                className = "size-4";
                break;
            case "xl":
                className = "size-5";
                break;
        }
        return className;
    }

    return (
        <div className="relative inline-flex items-center">
            <input type="checkbox"
                onChange={onChange}
                ref={ref}
                className={cn("before:content[''] peer relative cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10", getInputSize())}
                id={id} defaultChecked={defaultChecked} checked={checked} />
            <span
              className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <CheckedImg className={ getIconSize() } />
            </span>
        </div> 
    );
});

export default Checkbox;