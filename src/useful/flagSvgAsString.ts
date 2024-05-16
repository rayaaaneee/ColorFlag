import FlagSvg from "@/components/usefuls/flag-svg";
import { ReactNode } from "react";
import { renderToString } from "react-dom/server";

export const decode = (xml: string): string => {
    return xml.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&#039;/g, "'");
}

const flagSvgAsString = (code: string): string | null => {
    const Svg: JSX.Element | null = FlagSvg({ code });
    
    if (!Svg) {
        return null;
    }
    console.log(Svg);
    return renderToString(Svg);
}

export default flagSvgAsString;