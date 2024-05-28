import path from "path";
import { ComponentType, ReactNode } from "react";

export enum FlagType {
    COUNTRY = 'country',
    US_STATE = 'us-state',
    SPORT_TEAM = 'sport-team',
    ORGANIZATION = 'organization',
    OTHER = 'other'
}

export interface FlagSvgProps {
    code: string,
    type?: FlagType,
}

const FlagSvg = async ({ type = FlagType.COUNTRY, code }: FlagSvgProps): Promise<string | null> => {

    let Component: ComponentType;

    try {
        const res = await fetch(`/flags/${type}/${code}.svg`);
        const svg: string = await res.text();
        return svg;
    } catch (e: any) {
        console.error(`No flag found for ${type} with code ${code}`);
        return null;
    }
}

export default FlagSvg;