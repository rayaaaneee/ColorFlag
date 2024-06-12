import ChildrenType from "@/useful/types/children-type";

export interface HeadingOneProps {
    children?: ChildrenType,
    className?: string,
}

const HeadingOne = ({ children = undefined, className = "" }: HeadingOneProps) => {
  return (
    <h2 className={`${className}`}>{ children }</h2>
  )
}

export default HeadingOne;
