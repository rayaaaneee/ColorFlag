import cn from "@/lib/utils/cn";
import type SidePropsInterface from "./side-props-interface";

const LeftSide = ({ children = undefined, className = "" }: SidePropsInterface) => 
    (<div className={cn("bg-white bg-opacity-70 flex flex-col gap-4 items-center justify-center", className)}>{children}</div>)

export default LeftSide;
