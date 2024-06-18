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

// replaceColorWithShorterHex('red') => '#f00'
// replaceColorWithShorterHex('green') => '#0f0'
export const replaceColorWithShorterHex = (color: string): string => {
    const colors: { [key: string]: string } = { black: '#000', white: '#fff', red: '#f00', green: '#0f0', blue: '#00f' };
    for (const key in colors) {
        color = color.replaceAll(key, colors[key]);
    }
    return color;
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
        const longHex = rgbHex(r, g, b);
        if (hexCanBecomeShorter(longHex)) {
            return shortenHexColor(longHex);
        }
        return `#${longHex}`;
    }
}

export default rgbToHex;