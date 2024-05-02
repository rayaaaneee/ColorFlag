import rgbHex from 'rgb-hex';

const rgbToHex = (rgbColor: string): string => {
    rgbColor = rgbColor.replace("rgb(", '').replace(")", '');
    const [r, g, b] = rgbColor.split(',').map(Number);
    return rgbHex(r, g, b);
}

export default rgbToHex;