export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipInterface {
    children: JSX.Element;
    text: string;
    position?: TooltipPosition;
    forceShow?: boolean;
    disabled?: boolean;
}

const Tooltip = ({ children, text, position = "top", forceShow = false, disabled = false }: TooltipInterface) => {

    const getPositionClasses = () => {
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

    return (
        <div className="relative group">
            {children}
            <div role="tooltip" className={`${getPositionClasses()} absolute z-10 ${(forceShow && !disabled) ? "block" : "hidden"} ${ !disabled && 'group-hover:block' } px-3 py-2 whitespace-nowrap text-sm font-medium text-white main-bg rounded-lg shadow-sm tooltip`}>
                {text}
            </div>
        </div>
    )
}

Tooltip.displayName = "Tooltip";

export default Tooltip;