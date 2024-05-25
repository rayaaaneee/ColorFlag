import dynamic from "next/dynamic";
import { ComponentType, ReactNode } from "react";

export interface FlagSvgProps {
    code: string,
}

const FlagSvg = ({ code }: FlagSvgProps): JSX.Element | null => {

    let Component: ComponentType;

    try {
        Component = require(`@/asset/img/flags/4x3/${code}.svg`).default;
    } catch (e: any) {
        console.error(e.message);
        return null;
    }

    return <Component />;
}

export default FlagSvg;