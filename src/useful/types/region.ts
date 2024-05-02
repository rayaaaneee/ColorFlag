type Region = {
    name: string;
    code: string;
}

export const processRegions = (item: any) => {
    const code = Object.keys(item)[0];
    const name = item[code];
    return { code, name };
}

export default Region;