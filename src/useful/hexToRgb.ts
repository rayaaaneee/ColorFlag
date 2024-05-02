import hexRgb, { RgbaObject } from 'hex-rgb';

const hexToRgb = (hexColor: string): string => {
    hexColor = hexColor.replace("#", '');
    let rgbObject: RgbaObject = hexRgb(hexColor);
    return `rgb(${rgbObject.red}, ${rgbObject.green}, ${rgbObject.blue})`;
}

export default hexToRgb;