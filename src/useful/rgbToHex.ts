import rgbHex from 'rgb-hex';

export const shortenHexColor = (hex: string): string => 
    (`#${hex
        .replace('#', '')
        .split('')
        .filter((_, i) => i % 2 === 0)
        .join('')}`);


export const hexCanBecomeShorter = (hex: string): boolean => {
    const hexWithoutHash = hex.replace('#', '');
    return hexWithoutHash.split('').every((char, i) => i % 2 === 0 ? char === hexWithoutHash[i + 1] : true);
}

const rgbToHex = (rgbColor: string): string => {
    rgbColor = rgbColor.replace("rgb(", '').replace(")", '');
    const [r, g, b]: number[] = rgbColor.split(',').map(Number);
    if (rgbColor.split(',').length === 1) {
        switch (rgbColor) {
            case 'black':
                return '#000000';
            case 'white':
                return '#ffffff';
            case 'red':
                return '#ff0000';
            case 'green':
                return '#00ff00';
            case 'blue':
                return '#0000ff';
            default:
                return rgbColor;
        }
    } else {
        return `#${rgbHex(r, g, b)}`;
    }
}

export default rgbToHex;