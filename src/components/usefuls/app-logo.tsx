"use client";

import { useEffect, useRef } from "react"
import FranceCustomFlag from "@/asset/img/pages/custom-france-flag.svg";

export interface AppLogoInterface {
    className?: string;
    asLoader?: boolean;
    loaderLoop?: boolean;
    loaderTransitionDuration?: number;
    allowClick?: boolean;
}

const AppLogo = ({className, allowClick = true, loaderLoop = false, asLoader = false, loaderTransitionDuration = 200 }: AppLogoInterface) => {

    if (asLoader) allowClick = false;

    const logo = useRef<SVGElement | null>(null);

    const invertFill = (path: SVGPathElement) => {
        const fill: string | null = path.getAttribute('fill');
        const dataFill: string | null = path.getAttribute('data-fill');
        if (dataFill) path.setAttribute('fill', dataFill);
        if (fill) path.setAttribute('data-fill', fill);
    }

    const fromLogotoggleFill = (e: Event) => {
        const path = e.currentTarget as SVGPathElement;
        invertFill(path);
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
        let isLoadingWayForward: boolean;

        if (asLoader) {
            orderedPaths.forEach(path => { 
                const fill: string | null = path.getAttribute('fill');
                const dataFill: string | null = path.getAttribute('data-fill');

                if (!fill || !dataFill) {
                    return console.error('Fill or data-fill not found in path');
                }

                if (fill.startsWith('url')) return;
                else {
                    invertFill(path);
                }
            });

            let pathIndex: number = 0;
            let prevIndex: number | undefined;

            const intervalFunction = () => {

                if (prevIndex !== undefined && !loaderLoop) prevIndex = pathIndex === 0 ? orderedPaths.length - 1 : pathIndex - 1;

                orderedPaths.forEach((path, index) => {
                    if (index === pathIndex || (index === prevIndex && pathIndex !== -1)) invertFill(path);
                });

                if (loaderLoop) {
                    switch (pathIndex) {
                        case 0:
                            isLoadingWayForward = true;
                            if (interval !== null) clearInterval(interval);
                            break;
                        case orderedPaths.length - 1:
                            isLoadingWayForward = false;
                            if (interval !== null) clearInterval(interval);
                            break;
                    }
                    if (pathIndex === orderedPaths.length - 1 || pathIndex === 0) {
                        if (interval !== null) clearInterval(interval);
                        setTimeout(() => {
                            interval = setInterval(intervalFunction, loaderTransitionDuration);
                        }, loaderTransitionDuration/2);
                    }

                    prevIndex = pathIndex;
                    if (isLoadingWayForward) pathIndex++;
                    else pathIndex--;

                } else {

                    if (prevIndex === undefined) prevIndex = pathIndex;

                    if (pathIndex === orderedPaths.length - 1) pathIndex = 0;
                    else pathIndex++;

                }

            }

            interval = setInterval(intervalFunction, loaderTransitionDuration);
        } else if (allowClick) unorderedPaths.forEach((path) => path.addEventListener('click', fromLogotoggleFill));

        return () => {
            if (!asLoader) orderedPaths.forEach((path) => path.removeEventListener('click', fromLogotoggleFill));
            if (interval) clearInterval(interval);
        };
    }, []);

    return (<FranceCustomFlag
        style={{ cursor: !asLoader ? 'pointer' : 'default'}}
        ref={logo}
        className={`${ className } rounded-lg border-black border-2`} 
    />);
}

export default AppLogo;