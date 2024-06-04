"use client";

import { useEffect, useRef } from "react"
import FranceCustomFlag from "@/asset/img/pages/custom-france-flag.svg";

export interface AppLogoInterface {
    className?: string;
    asLoader?: boolean;
    allowClick?: boolean;
}

const AppLogo = ({className, allowClick = true, asLoader = false}: AppLogoInterface) => {

    if (asLoader) allowClick = false;

    const logo = useRef<SVGElement | null>(null);


    const fromLogotoggleFill = (e: Event) => {
        const path = e.currentTarget as SVGPathElement;
        const fill: string | null = path.getAttribute('fill');
        const dataFill: string | null = path.getAttribute('data-fill');
        if (dataFill) path.setAttribute('fill', dataFill);
        if (fill) path.setAttribute('data-fill', fill);
    }

    useEffect(() => {
        if (!logo.current) return console.error('SVG Element not found');

        const unorderedPaths: NodeListOf<SVGPathElement> = logo.current?.querySelectorAll('path');
        if (!unorderedPaths) return console.error('No paths found in logo');

        const orderedPaths: SVGPathElement[] = Array.from(unorderedPaths).sort((a, b) => {
            const aClass: string | null = a.getAttribute('class');
            const bClass: string | null = b.getAttribute('class');
            if (!aClass || !bClass) return 0;

            const aClassIndex: number = parseInt(aClass.split('logo-path-')[1]);
            const bClassIndex: number = parseInt(bClass.split('logo-path-')[1]);
            return aClassIndex - bClassIndex;
        });

        let interval: NodeJS.Timeout | null = null;

        if (asLoader) {
            orderedPaths.forEach(path => { 
                const fill: string | null = path.getAttribute('fill');
                const dataFill: string | null = path.getAttribute('data-fill');

                if (!fill || !dataFill) {
                    return console.error('Fill or data-fill not found in path');
                }

                if (fill.startsWith('url')) return;
                else {
                    path.setAttribute('data-fill', fill);
                    path.setAttribute('fill', dataFill);
                }
            });

            let pathIndex: number = 0;
            interval = setInterval(() => {
                if (pathIndex >= orderedPaths.length) pathIndex = 0;
                orderedPaths.forEach((path, index) => {
                    if (index === pathIndex) {
                        const fill: string | null = path.getAttribute('fill');
                        const dataFill: string | null = path.getAttribute('data-fill');
                        if (dataFill) path.setAttribute('fill', dataFill);
                        if (fill) path.setAttribute('data-fill', fill);
                    }
                });
                pathIndex++;
            }, 300);
        } else unorderedPaths.forEach((path) => path.addEventListener('click', fromLogotoggleFill));

        return () => {
            if (!asLoader) orderedPaths.forEach((path) => path.removeEventListener('click', fromLogotoggleFill));
            if (interval) clearInterval(interval);
        };
    }, []);

    return (<FranceCustomFlag
        ref={logo}
        className={`${ className } rounded-lg border-black border-2`} 
    />);
}

export default AppLogo;