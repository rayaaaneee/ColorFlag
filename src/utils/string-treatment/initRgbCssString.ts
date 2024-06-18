import { type RgbaObject } from "hex-rgb";

const initRgbCssString = (rgb: RgbaObject): string => (`rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`)

export default initRgbCssString;