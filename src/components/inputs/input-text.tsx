"use client";

import cn from "@/lib/utils/cn";
import type SizeType from "@/utils/types/size-type";
import { forwardRef, useState, type ChangeEventHandler, type ForwardedRef } from "react";
import { MdKey } from "react-icons/md";

export interface InputTextProps {
    placeholder?: string;
    className?: string;
    inputClassName?: string;
    size?: SizeType;
    value?: string;
    name?: string;
    id?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    type?: "email" | "username" | "password" | "text";
    disabled?: boolean;
    mainColor?: boolean;
}

const InputText = forwardRef(({disabled = false, size = "md", className = "", inputClassName = "", id, mainColor = false, name, type="text", value, placeholder, onChange}: InputTextProps, ref: ForwardedRef<HTMLInputElement>) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => setIsPasswordVisible((prevState) => !prevState);

    const getIcon = (type: string): JSX.Element => {
        let svg: JSX.Element = <></>;
        let defaultClassName: string = `${getIconSize()} text-gray-400`;

        switch(type) {
            case "username":
                svg = (<svg className={defaultClassName} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>);
                break;
            case "email":
                svg = (<svg className={defaultClassName} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"/>
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"/>
                    </svg>);
                break;
            case "password":
                svg = (<MdKey className={defaultClassName} />);
        }
        return svg;
    }

    const getSize = (): string => {
        let className: string = "";
        switch(size) {
            case "sm":
                className = "h-8";
                break;
            case "md":
                className = "h-10";
                break;
            case "lg":
                className = "h-12";
                break;
            case "xl":
                className = "h-14";
                break;
        }
        return className;
    }

    const getIconSize = (): string => {
        let className: string = "";
        switch(size) {
            case "sm":
                className = "size-4";
                break;
            case "md":
            case "lg":
                className = "size-5";
                break;
            case "xl":
                className = "size-6";
                break;
        }
        return className;
    }

    const getFontSize = (): string => {
        let className: string = "";
        switch(size) {
            case "sm":
                className = "text-xs";
                break;
            case "md":
                className = "text-sm";
                break;
            case "lg":
                className = "text-base";
                break;
            case "xl":
                className = "text-lg";
                break;
        }
        return className;
    }

    const getIconPaddingLeft = (): string => {
        let className: string = "";
        switch(size) {
            case "sm":
                className = "pl-2.5";
                break;
            case "md":
            case "lg":
                className = "pl-3";
                break;
            case "xl":
                className = "pl-3.5";
                break;
        }
        return className;
    }

    const getInputPaddingStart = (): string => {
        let className: string = "";
        switch(size) {
            case "sm":
                className = "ps-8";
                break;
            case "md":
            case "lg":
                className = "ps-10";
                break;
            case "xl":
                className = "ps-12";
                break;
        }
        return className;
    }

    const getInputPaddingRight = (): string => {
        let className: string = "";
        switch(size) {
            case "sm":
                className = "pe-10";
                break;
            case "md":
            case "lg":
                className = "pe-11";
                break;
            case "xl":
                className = "pe-12";
                break;
        }
        return className;
    }

    return (
        <div className={cn("relative", className)}>
            { (!["text"].includes(type)) && (
                <div className={cn(
                    "h-full absolute flex items-center justify-center pointer-events-none rounded-tl-full rounded-bl-full",
                    (mainColor === true) ? 'bg-main' : 'bg-sncd',
                    getIconPaddingLeft(),
                )}>
                    { getIcon(type) }
                </div>
            ) }
            <input name={name} ref={ref} id={id} onChange={onChange} disabled={disabled} type={(type === "password") ? (isPasswordVisible ? 'text' : 'password') : type} defaultValue={value} 
                className={cn(
                    "focus:outline-none text-white rounded-full block w-full pl-5 p-2.5",
                    mainColor ? 'bg-main' : 'bg-scnd',
                    getSize(),
                    getFontSize(),
                    getInputPaddingStart(),
                    type === "password" && getInputPaddingRight(),
                    inputClassName,
                )} placeholder={placeholder} />
            { (type === "password") &&  (
                <button tabIndex={-1} onClick={togglePasswordVisibility} type="button" className={`absolute top-0 h-full end-0 px-3.5 rounded-e-full flex items-center justify-center`}>
                    <svg className={cn(
                        "flex-shrink text-white",
                        getIconSize(),
                    )} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path className={`${isPasswordVisible && "hidden"}`} d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                        <path className={`${isPasswordVisible && "hidden"}`} d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                        <path className={`${isPasswordVisible && "hidden"}`} d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                        <line className={`${isPasswordVisible && "hidden"}`} x1="2" x2="22" y1="2" y2="22"></line>
                        <path className={`${isPasswordVisible ? "block" : "hidden"}`} d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                        <circle className={`${isPasswordVisible ? "block" : "hidden"}`} cx="12" cy="12" r="3"></circle>
                    </svg>
                </button>
            ) }
      </div>
    )
});

InputText.displayName = "InputText";

export default InputText;