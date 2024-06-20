export enum MapType {
    COUNTRY = 'country',
    US_STATE = 'us-state',
}

export interface MapSvgProps {
    code: string,
    type?: MapType,
}

const MapSvg = async ({ type = MapType.COUNTRY, code }: MapSvgProps): Promise<string | null> => {

    let svg: string | null = null;

    try {
        const res = await fetch(`/images/maps/${type}/${code}.svg`);
        svg = await res.text();
    } catch (e: any) {
        console.error(`No Map found for ${type} with code ${code}`);
        svg = null;
    } finally {
        return svg;
    }
}

export default MapSvg;