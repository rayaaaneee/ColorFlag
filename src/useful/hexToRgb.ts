import hexRgb, { RgbaObject } from 'hex-rgb';
import getRgb from '@/useful/getRgb';

const hexToRgb = (hexColor: string): string => {
    let rgbObject: RgbaObject;
    if (hexColor.startsWith("#")) {
        hexColor = hexColor.replace("#", '');
        rgbObject = hexRgb(hexColor);
    } else {
        // Color is like "red" or "white"
        rgbObject = getRgb(hexColor);
    }
    return `rgb(${rgbObject.red}, ${rgbObject.green}, ${rgbObject.blue})`;
}

export default hexToRgb;