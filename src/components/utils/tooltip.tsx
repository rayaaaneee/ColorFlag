import cn from "@/lib/utils/cn";
import type ChildrenType from "@/utils/types/children-type";
import { FaCircleCheck } from "react-icons/fa6";
import { MdInfo } from "react-icons/md";
import { RiErrorWarningFill } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";


export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export type TooltipType = 'default' | "default-2" | 'success' | 'warning' | 'error';

export interface TooltipInterface {
    children: ChildrenType;
    text: ChildrenType;
    position?: TooltipPosition;
    forceShow?: boolean;
    disabled?: boolean;
    className?: string;
    tooltipClassName?: string;
    type?: TooltipType;
    hasIcon?: boolean;
}


const Tooltip = ({ children, text, position = "top", forceShow = false, disabled = false, className = undefined, tooltipClassName = undefined, type = "default", hasIcon = false }: TooltipInterface) => {

    const getPositionClasses = (): string => {
        let classes = '';
        switch (position) {
            case 'top':
                classes = 'top-[-4px] left-1/2 transform -translate-x-1/2 -translate-y-full';
                break;
            case 'bottom':
                classes = 'bottom-[-4px] left-1/2 transform -translate-x-1/2 translate-y-full';
                break;
            case 'left':
                classes = 'left-[-4px] top-1/2 transform -translate-x-full -translate-y-1/2';
                break;
            case 'right':
                classes = 'right-[-4px] top-1/2 transform translate-x-full -translate-y-1/2';
                break;
        }
        return classes;
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
        <div className={cn('relative group w-fit', className)}>
            {children}
            <div role="tooltip" className={cn(
                "absolute z-10 px-3 py-2 flex-row items-center justify-center gap-2 whitespace-nowrap text-sm font-medium text-white rounded-lg shadow-sm tooltip pointer-events-none",
                getPositionClasses(), 
                getTooltipTypeClasses(), 
                (forceShow && !disabled) ? "flex" : "hidden", 
                { "group-hover:flex": !disabled && text },
                tooltipClassName)}>
                    {hasIcon && getTooltipIcon()}
                    {text}
            </div>
        </div>
    )
}

Tooltip.displayName = "Tooltip";

export default Tooltip;