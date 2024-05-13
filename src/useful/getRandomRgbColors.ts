import { RgbaObject } from "hex-rgb";
import initRgbCssString from "./initRgbCssString";
import getRgbaObject from "./getRgbaObject";

const getRandomRgbColors = (num: number, forbiddenColors: string[] = [], minDifference: number = 100): string[] => {
    
    const colors: string[] = [];

    while (colors.length < num) {

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