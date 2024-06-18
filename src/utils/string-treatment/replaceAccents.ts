interface accentsWithCharsCorresponding {
    [key: string]: string[];
}

const replaceAccents = (str: string): string => {
    const accents: accentsWithCharsCorresponding[] = [
        { a: ['á', 'à', 'ã', 'â', 'ä'] },
        { e: ['é', 'è', 'ê', 'ë'] },
        { i: ['í', 'ì', 'î', 'ï'] },
        { o: ['ó', 'ò', 'õ', 'ô', 'ö'] },
        { u: ['ú', 'ù', 'û', 'ü'] },
        { c: ['ç'] },
        { n: ['ñ'] }
    ];
    accents.forEach((acc) => {
        const key = Object.keys(acc)[0];
        acc[key].forEach((char) => {
            str = str.replace(char, key);
        });
    })
    return str;
}

export default replaceAccents;