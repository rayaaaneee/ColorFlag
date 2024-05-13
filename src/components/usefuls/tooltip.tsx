import { FaCircleCheck } from "react-icons/fa6";
import { MdInfo } from "react-icons/md";
import { TiWarning } from "react-icons/ti";
import { RiErrorWarningFill } from "react-icons/ri";
import ChildrenType from "@/useful/types/children-type";


export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type TooltipType = 'default' | "default-2" | 'success' | 'warning' | 'error';

export interface TooltipInterface {
    children: ChildrenType
    text: ChildrenType;
    position?: TooltipPosition;
    forceShow?: boolean;
    disabled?: boolean;
    className?: string;
    tooltipClassName?: string;
    type?: TooltipType;
    hasIcon?: boolean;
}


const Tooltip = ({ children, text, position = "top", forceShow = false, disabled = false, className = "", tooltipClassName = "", type = "default", hasIcon = false }: TooltipInterface) => {

    const getPositionClasses = (): string => {
        switch (position) {
            case 'top':
                return 'top-[-4px] left-1/2 transform -translate-x-1/2 -translate-y-full';
            case 'bottom':
                return 'bottom-[-4px] left-1/2 transform -translate-x-1/2 translate-y-full';
            case 'left':
                return 'left-[-4px] top-1/2 transform -translate-x-full -translate-y-1/2';
            case 'right':
                return 'right-[-4px] top-1/2 transform translate-x-full -translate-y-1/2';
        }
    }

    const getTooltipTypeClasses = (): string => {
        let classes = 'bg-main';
        switch (type) {
            case 'success':
                classes = 'bg-green-500';
                break;
            case 'warning':
                classes = 'bg-yellow-500';
                break;
            case 'error':
                classes = 'bg-red-500';
                break;
            case 'default-2':
                classes = 'bg-scnd';
                break;
        }
        return classes;
    }

    const getTooltipIcon = (): JSX.Element => {
        let icon: JSX.Element = <MdInfo />;
        switch (type) {
            case 'success':
                icon = <FaCircleCheck />;
                break;
            case 'warning':
                icon = <TiWarning />;
                break;
            case 'error':
                icon = <RiErrorWarningFill />;
                break;
        }
        return icon;
    }

    return (
        <div className={`relative group ${className}`}>
            {children}
            <div role="tooltip" className={`${getPositionClasses()} ${getTooltipTypeClasses()} absolute z-10 ${(forceShow && !disabled) ? "flex" : "hidden"} ${ !disabled && 'group-hover:flex' } ${tooltipClassName} px-3 py-2 flex-row items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-white rounded-lg shadow-sm tooltip pointer-events-none`}>
                {hasIcon && getTooltipIcon()}
                {text}
            </div>
        </div>
    )
}

Tooltip.displayName = "Tooltip";

export default Tooltip;