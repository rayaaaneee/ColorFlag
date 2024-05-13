/**
Convert RGB(A) color to HEX.

@example
```

    transformSelfClosingToRegularTag('<div/>') => '<div></div>'
    transformSelfClosingToRegularTag('<div class="foo" />') => '<div class="foo"></div>'
    transformSelfClosingToRegularTag('<div class="foo" id="bar"/>') => '<div class="foo" id="bar"></div>'
    transformSelfClosingToRegularTag('<svg><path d='M 0'/><svg/>') => '<svg><path d='M 0'></path></svg>'
    
```
*/

const transformSelfClosingToRegularTag = (input: string) => {

    const selfClosingTagRegex: RegExp = /<(\w+)([^>]*)\/>/g;

    const output = input.replace(selfClosingTagRegex, "<$1$2></$1>");

    return output;
}

export default transformSelfClosingToRegularTag;