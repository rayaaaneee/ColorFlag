import ChildrenType from "@/useful/types/children-type";

export interface ParagraphPropsInterface { 
    children?: ChildrenType,
    className?: string,
}

const Paragraph = ({ children = undefined, className = "" }: ParagraphPropsInterface) => {
  return (
    <p className={ className }>{ children }</p>
  )
}

export default Paragraph;
