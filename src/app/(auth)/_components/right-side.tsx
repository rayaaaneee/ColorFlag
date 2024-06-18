import cn from "@/lib/utils/cn";
import type SidePropsInterface from "./side-props-interface";

const RightSide = ({ children = undefined, className = "" }: SidePropsInterface) => 
    (<div className={cn(`bg-main text-white p-5 flex flex-col items-center justify-center text-center gap-4`, className)}>{children}</div>);

export default RightSide;
