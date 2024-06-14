import cn from "@/lib/utils/cn";
import ChildrenType from "@/useful/types/children-type"

export interface BarPropsInterface {
    children?: ChildrenType,
    className?: string,
    barClassName?: string
}

const Bar = ({ children = undefined, className = "", barClassName = "" }: BarPropsInterface) => {

    const defaultBarClassName = cn("w-1/2 border-gray-300 border-[1.5px] rounded-full", barClassName);

    return (
        <div className={cn("w-full flex flex-row items-center justify-center gap-2 text-nowrap", className)}>
            <hr className={defaultBarClassName} />
            { children }
            <hr className={defaultBarClassName} />
        </div>
    )
}

export default Bar;