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

    let svg: string | null = null;

    try {
        const res = await fetch(`/images/flags/${type}/${code}.svg`);
        svg = await res.text();
    } catch (e: any) {
        console.error(`No flag found for ${type} with code ${code}`);
        svg = null;
    } finally {
        return svg;
    }
}

export default FlagSvg;