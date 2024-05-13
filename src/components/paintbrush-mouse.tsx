import { useEffect, useState } from "react";
import { renderToString } from "react-dom/server";
import PaintbrushSvg from "./svg/paintbrush-svg";

interface PaintbrushInterface {
    color: string,
}

const PaintbrushMouse = ({ color }: PaintbrushInterface) => {

    const [lastUrl, setLastUrl] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.cursor = `url("${lastUrl}"), auto`;
    }, [lastUrl]);

    useEffect(() => {

        if (lastUrl) {
            URL.revokeObjectURL(lastUrl);
        }

        const svg: string = renderToString(<PaintbrushSvg color={color} />);
        const blob: Blob = new Blob([svg], { type: "image/svg+xml" });
        const blobUrl: string = URL.createObjectURL(blob);
        setLastUrl(blobUrl);

        document.body.classList.add("paintbrush-cursor");

        return () => {
            document.body.style.removeProperty("cursor");
            document.body.classList.remove("paintbrush-cursor");
            if (lastUrl !== null) {
                URL.revokeObjectURL(lastUrl);
            }
        };
    }, [color]);

    return (<></>);
}

export default PaintbrushMouse;