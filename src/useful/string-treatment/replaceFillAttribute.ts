/**
 * Replace the value of all fill attributes in an HTML string with their lowercase version.
 * 
 * @param htmlString The HTML string to modify.
 * @returns The modified HTML string with fill attributes replaced by lowercase values.
 * 
 * @example
 * 
 * replaceFillAttribute('<div/>') => '<div></div>'
 * replaceFillAttribute('<div class="foo" />') => '<div class="foo"></div>'
 * replaceFillAttribute('<div class="foo" id="bar"/>') => '<div class="foo" id="bar"></div>'
 * replaceFillAttribute('<svg><path fill="#ABC"/></svg>') => '<svg><path fill="#abc"></path></svg>'
 */

const replaceFillAttribute = (htmlString: string): string => {
    // Expression régulière pour trouver les attributs fill
    const fillAttributeRegex = /fill="([^"]*)"/g;

    // Remplacer toutes les occurrences des attributs fill avec leur version en minuscules
    const modifiedHtmlString: string = htmlString.replace(fillAttributeRegex, (_, fillValue: string) => {
        const lowerFillValue = fillValue.toLowerCase();
        return `fill="${lowerFillValue}"`;
    });

    return modifiedHtmlString;
}

export default replaceFillAttribute;