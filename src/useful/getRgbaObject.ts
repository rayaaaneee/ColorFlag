import { RgbaObject } from "hex-rgb"

const getRgbaObject = (rgb: string): RgbaObject => {
    const rgbArray: string[] = rgb.replace("rgb(", "").replace(")", "").split(",");

    return {
        red: parseInt(rgbArray[0]),
        green: parseInt(rgbArray[1]),
        blue: parseInt(rgbArray[2]),
        alpha: 1
    } as RgbaObject;
}

export default getRgbaObject;