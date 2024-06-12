import ChildrenType from "@/useful/types/children-type";

export interface ParagraphPropsInterface { 
    children?: ChildrenType
}

const Paragraph = ({ children = undefined }: ParagraphPropsInterface) => {
  return (
    <p>{ children }</p>
  )
}

export default Paragraph;
