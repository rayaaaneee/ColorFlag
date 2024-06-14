import getAttributes, { AttributeInterface } from "./getAttributes";

const getCssSelector = (element: Element, displayClass: boolean = false, displayId: boolean = false): string => {

    const attributes: AttributeInterface[] = getAttributes(element, ["class", "id"]);
    
    let selector: string = element.tagName.toLowerCase();
    
    if (displayClass) {
      const selectorClass: string = element.className.split(" ").map((className: string) => `.${className}`).join("");
      selector += selectorClass;
    }
    if (displayId) {
      const selectorId: string = element.id && `#${element.id}`;
      selector += selectorId;
    }
  
    attributes.forEach((attr: AttributeInterface) => {
      selector += `[${attr.name}${attr.value && `="${attr.value}"`}]`
    });
  
    return selector;
}

export default getCssSelector;