export const format = (node: HTMLDivElement, spaces = 4): string => {

    var indent: string = '\n' + new Array(spaces + 1).join(' '),
        index: number = 0,
        i: number = 0,
        length: number = 0,
        nodeStr: string | undefined = '',
        result: string = '',
        children: any[] | null = null;

    if (node.nodeType === 3) {
        nodeStr = node.nodeValue?.trim();
    } else if (node.nodeType === 8) {
        nodeStr = '<!--' + node.nodeValue + '-->';
    } else {
        nodeStr = '<' + node.nodeName;
        if (node.attributes) {
            for (index = 0, length = node.attributes.length; index < length; index += 1) {
                nodeStr += ' ' + node.attributes[index].nodeName + '="' + node.attributes[index].nodeValue + '"';
            }
        }
        nodeStr += '>';
        if (node.childNodes && node.childNodes.length) {
            children = Array.prototype.slice.call(node.childNodes);
            for (i = 0, length = children.length; i < length; i += 1) {
                nodeStr += format(children[i], spaces + 4);
            }
            nodeStr += '</' + node.nodeName + '>';
        } else {
            nodeStr += '</' + node.nodeName + '>';
        }
    }
    return result += indent + nodeStr;
}

const indent = (xml: string, spaces: number = 4): string => {
    var div: HTMLDivElement = document.createElement('div');
    div.innerHTML = xml.trim();

    return format(div, spaces);
}

export default indent;