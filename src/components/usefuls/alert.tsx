import ChildrenType from "@/useful/types/children-type";
import { MouseEventHandler, useRef, useState } from "react";

import { FaCircleCheck } from "react-icons/fa6";
import { MdInfo } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import { RiErrorWarningFill } from "react-icons/ri";

export type AlertPositionType = "top-left" | "top-right" | "bottom-left" | "bottom-right";

export interface AlertInterface {
    children: ChildrenType;
    type?: "success" | "error" | "warning" | "default";
    position?: AlertPositionType;
    hasIcon?: boolean;
    disabled?: boolean;
    onClose?: MouseEventHandler<HTMLButtonElement>;
    closeable?: boolean;
    duration?: number;
}

const Alert = ({ children = undefined, position = "top-right", type = "default", hasIcon = false, disabled = false, closeable = true, onClose = (_) => {}, duration = undefined }: AlertInterface) => {

    const [opened, setOpened] = useState<boolean>(true);

    const getAlertTypeClasses = (): string => {
        let classes = "bg-main";
        switch (type) {
            case "success":
                classes = "bg-green-500";
                break;
            case "warning":
                classes = "bg-yellow-500";
                break;
            case "error":
                classes = "bg-red-500";
                break;
        }
        return classes;
    }

    const getAlertPositionClasses = (): string => {
        let classes: string = "top-4 right-4";
        switch (position) {
            case "top-left":
                classes = "top-4 left-4";
                break;
            case "bottom-left":
                classes = "bottom-4 left-4";
                break;
            case "bottom-right":
                classes = "bottom-4 right-4";
                break;
        }
        return classes;
    }

    const getAlertIcon = (): JSX.Element => {
        const attr = { className: "w-6 h-6 mr-2" };
        let icon: JSX.Element = <MdInfo {...attr} />;
        switch (type) {
            case 'success':
                icon = <FaCircleCheck {...attr} />;
                break;
            case 'warning':
                icon = <TiWarning {...attr} />;
                break;
            case 'error':
                icon = <RiErrorWarningFill {...attr} />;
                break;
        }
        return icon;
    }

    const closeAlert: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        setOpened(false);
        onClose(e);
    }

    const closeButton = useRef<HTMLButtonElement | null>(null);

    if (closeable && duration && opened) {
        const timeout = setTimeout(() => {
            if (closeButton.current) {
                closeButton.current.click();
            }
        }, duration);
    }

    return (
        <div className={`${(disabled || !opened) ? "opacity-0 pointer-events-none" : "opacity-100" } flex  flex-row items-center fixed z-[101] ${getAlertPositionClasses()} ${getAlertTypeClasses()} block w-fit p-6 mb-4 text-base leading-5 text-white rounded-lg font-regular transition-opacity duration-300`}>
            { closeable && 
                (<button ref={closeButton} onClick={closeAlert} className="w-[20px] h-[20px] absolute flex items-center justify-center top-2 right-2 p-1 rounded-full text-white hover:bg-white hover:text-black">&times;</button>) 
            }
            { hasIcon && getAlertIcon() }
            { children }
        </div>
    );
}

export default Alert;