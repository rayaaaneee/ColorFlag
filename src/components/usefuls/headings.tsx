import cn from "@/lib/utils/cn";
import type ChildrenType from "@/useful/types/children-type";

export interface HeadingProps {
    children?: ChildrenType,
    className?: string,
    id?: string,
}

export const HeadingOne = ({ children = undefined, className = "", id = undefined }: HeadingProps) => 
    (<h1 id={id} className={cn("text-black text-7xl mb-5", className)}>{ children }</h1>);


export const HeadingTwo = ({ children = undefined, className = "", id = undefined  }: HeadingProps) => 
    (<h1 id={id} className={cn("text-slate-600 text-3xl mb-3", className)}>{ children }</h1>);


export const HeadingThree = ({ children = undefined, className = "", id = undefined }: HeadingProps) => 
    (<h1 id={id} className={cn("text-slate-600 text-xl mb-5", className)}>{ children }</h1>);

export const HeadingFour = ({ children = undefined, className = "", id = undefined }: HeadingProps) => 
    (<h1 id={id} className={cn("text-slate-600 text-3xl mb-5", className)}>{ children }</h1>);
