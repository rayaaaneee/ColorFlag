import { RgbaObject } from "hex-rgb";
import initRgbCssString from "./string-treatment/initRgbCssString";
import getRgbaObject from "./getRgbaObject";

export const getMaxColors = (minDifference: number): number => {
    const rgbSpace: number = 256 * 256 * 256;
    const volumePerColor: number = Math.pow(minDifference, 3);
    return Math.floor(rgbSpace / volumePerColor);
};

const getRandomRgbColors = (num: number, forbiddenColors: string[] = [], minDifference: number = 100): string[] => {

    const colors: string[] = [];

    const maxColors: number = getMaxColors(minDifference) - forbiddenColors.length;

    if (num > maxColors) {
        console.warn(`The maximum number of colors with a minimum difference of ${minDifference} is ${maxColors}.`);
        num = maxColors;
    }
 
    while (colors.length < num) {
        console.log("colors length", colors.length, "expected", num);
        const rgbObject: RgbaObject = {
            red: Math.floor(Math.random() * 256),
            green: Math.floor(Math.random() * 256),
            blue: Math.floor(Math.random() * 256),
            alpha: 1
        };

        const isAccepted: boolean = [...forbiddenColors, ...colors].map((color: string) => {

            const forbiddenColorRgbObject: RgbaObject = getRgbaObject(color);

            const difference: number = 
                Math.abs(forbiddenColorRgbObject.red - rgbObject.red) 
                + Math.abs(forbiddenColorRgbObject.green - rgbObject.green) 
                + Math.abs(forbiddenColorRgbObject.blue - rgbObject.blue);

            return difference;

        }).every((difference: number) => difference >= minDifference);

        if (isAccepted) {
            const color = initRgbCssString(rgbObject);
            if (!colors.includes(color)) {
                colors.push(color);
            }
        }

    }
    return colors as string[];
}

export default getRandomRgbColors;