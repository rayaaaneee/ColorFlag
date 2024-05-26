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

const FlagSvg = ({ type = FlagType.COUNTRY, code }: FlagSvgProps): JSX.Element | null => {

    let Component: ComponentType;

    try {
        Component = require(/*webpackIgnore: true*/`@/asset/img/flags/country/${code}.svg`).default as ComponentType;
    } catch (e: any) {
        console.error(`No flag found for ${type} with code ${code}`);
        return null;
    }

    return <Component />;
}

export default FlagSvg;