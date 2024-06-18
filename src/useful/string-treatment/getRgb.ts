import { type RgbaObject } from 'hex-rgb';

const getRgb = (colorName: string /* Example : "red", "white" */): RgbaObject => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const ctx = canvas.getContext("2d");
    if (ctx) {
        ctx.fillStyle = colorName;
        ctx.fillRect(0, 0, 1, 1);
        const data = ctx.getImageData(0, 0, 1, 1).data;
        return { red: data[0], green: data[1], blue: data[2], alpha: 1 };
    }
    return { red: 0, green: 0, blue: 0, alpha: 1 };
}

export default getRgb;