import ChildrenType from "@/useful/types/children-type";

export interface ParagraphPropsInterface { 
    children?: ChildrenType,
    className?: string,
}

const Paragraph = ({ children = undefined, className = "" }: ParagraphPropsInterface) => {
  return (
    <p className={ `${className} mb-3 text-gray-500` }>{ children }</p>
  )
}

export default Paragraph;
