import cn from "@/lib/utils/cn";
import type ChildrenType from "@/utils/types/children-type";

export interface ParagraphPropsInterface { 
    children?: ChildrenType,
    className?: string,
}

const Paragraph = ({ children = undefined, className = "" }: ParagraphPropsInterface) => {
  return (
    <p className={ cn("mb-3 text-gray-500", className) }>{ children }</p>
  )
}

export default Paragraph;
