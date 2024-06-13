import ChildrenType from "@/useful/types/children-type";

export interface HeadingProps {
    children?: ChildrenType,
    className?: string,
    id?: string,
    colorClass?: string,
}

export const HeadingOne = ({ children = undefined, className = "", id = undefined, colorClass = "text-black" }: HeadingProps) => 
    (<h1 id={id} className={`${className} ${colorClass} text-7xl mb-5`}>{ children }</h1>);


export const HeadingTwo = ({ children = undefined, className = "", id = undefined, colorClass = "text-slate-600"  }: HeadingProps) => 
    (<h1 id={id} className={`${className}  ${colorClass} text-3xl mb-3`}>{ children }</h1>);


export const HeadingThree = ({ children = undefined, className = "", id = undefined, colorClass = "text-slate-600" }: HeadingProps) => 
    (<h1 id={id} className={`${className}  ${colorClass} text-xl mb-5`}>{ children }</h1>);

export const HeadingFour = ({ children = undefined, className = "", id = undefined, colorClass = "text-slate-600" }: HeadingProps) => 
    (<h1 id={id} className={`${className}  ${colorClass} text-3xl mb-5`}>{ children }</h1>);
