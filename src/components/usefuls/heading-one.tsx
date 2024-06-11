import ChildrenType from "@/useful/types/children-type";
import { Children } from "react";

export interface HeadingOneProps {
    children?: ChildrenType,
    className?: string,
}

const HeadingOne = ({ children = undefined, className = "" }: HeadingOneProps) => {
  return (
    <h1 className={`${className} text-7xl font-bold mb-5`}>{ children }</h1>
  )
}

export default HeadingOne;
