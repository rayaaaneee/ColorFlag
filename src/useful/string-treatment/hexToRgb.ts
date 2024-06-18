import getRgb from '@/useful/string-treatment/getRgb';
import initRgbCssString from '@/useful/string-treatment/initRgbCssString';
import hexRgb, { type RgbaObject } from 'hex-rgb';

const hexToRgb = (hexColor: string): string => {
    let rgbObject: RgbaObject;
    if (hexColor.startsWith("#")) {
        hexColor = hexColor.replace("#", '');
        rgbObject = hexRgb(hexColor);
    } else {
        // Color is like "red" or "white"
        rgbObject = getRgb(hexColor);
    }
    return initRgbCssString(rgbObject);
}

export default hexToRgb;