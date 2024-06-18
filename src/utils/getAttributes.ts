export type AttributeValue = string | null;

export interface AttributeInterface {
  name: string,
  value: AttributeValue
}

const getAttributes = (element: Element, undesirablesAttrs: string[] = []): AttributeInterface[] => {
  const attrs: AttributeInterface[] = [];
  const nbAttrs: number = element.attributes.length;

  for(let i = 0; i < nbAttrs; i ++) {
    const attrName: string = element.attributes[i].nodeName;
    let attrValue: AttributeValue = element.attributes[i].nodeValue;

    if (!undesirablesAttrs.includes(attrName)) {
      attrs.push({name: attrName, value: attrValue});
    }
  }

  return attrs;
}

export default getAttributes;