import dynamic from "next/dynamic";
import { ComponentType, ReactNode } from "react";

export interface FlagSvgProps {
    code: string,
}

const FlagSvg = ({ code }: FlagSvgProps): JSX.Element | null => {
    let Component: ComponentType | undefined;

    try {
        Component = require(`@/asset/img/flags/4x3/${code}.svg`);
    } catch (e: any) {
        console.error(e.message);
        Component = undefined;
    }

    if (!Component) {
        return null;
    }

    console.log(Component);

    return <Component />;
}

export default FlagSvg;