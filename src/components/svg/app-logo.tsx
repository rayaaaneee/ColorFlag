"use client";

import { useEffect, useRef } from "react";

import FranceCustomFlag from "@/asset/img/general/custom-french-flag.svg";
import FranceCustomFlagLoader from "@/asset/img/general/custom-french-flag-loader.svg";

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

        if (!fill || !dataFill) throw new Error('No fill or data-fill attribute found');

        if (dataFill) path.setAttribute('fill', dataFill);
        if (fill) path.setAttribute('data-fill', fill);
    }

   /*  const removeFill = (path: SVGPathElement) => {
        const fill: string | null = path.getAttribute('fill');
        const dataFill: string | null = path.getAttribute('data-fill');

        if (fill && dataFill) {
            if (fill?.startsWith('url')) {
                path.setAttribute('fill', dataFill);
            } else if (dataFill?.startsWith('url')) {
                path.setAttribute('fill', fill);
            } else {
                throw new Error('No empty backgrounded fill founded');
            }
        } else {
            throw new Error('No fill or data-fill attribute found');
        }
    }

    const addFill = (path: SVGPathElement) => {
        const fill: string | null = path.getAttribute('fill');
        const dataFill: string | null = path.getAttribute('data-fill');

        if (fill && dataFill) {
            if (fill?.startsWith('url')) {
                path.setAttribute('fill', dataFill || 'none');
            } else if (dataFill?.startsWith('url')) {
                path.setAttribute('fill', fill || 'none');
            } else {
                throw new Error('No empty backgrounded fill founded');
            }
        } else {
            throw new Error('No fill or data-fill attribute found');
        }
    } */

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
        let isLoadingWayForward: boolean = true;

        if (asLoader) {

            let pathIndex: number | null = null;
            let prevPathIndex: number | null = null;

            const intervalFunction = () => {

                if (loaderLoop) {
                    if (pathIndex === null) {
                        switch (isLoadingWayForward) {
                            case true:
                                pathIndex = 0;
                                break;
                            case false:
                                pathIndex = orderedPaths.length - 1;
                                break;
                        }
                        prevPathIndex = null;
                    } else if (pathIndex === orderedPaths.length - 1 && isLoadingWayForward) {
                        isLoadingWayForward = false;
                        pathIndex = null;
                        prevPathIndex = orderedPaths.length - 1;
                    } else if (pathIndex === 0 && !isLoadingWayForward) {
                        isLoadingWayForward = true;
                        pathIndex = null;
                        prevPathIndex = 0;
                    } else {
                        if (isLoadingWayForward) {
                            pathIndex++;
                            prevPathIndex = pathIndex === 0 ? orderedPaths.length - 1 : pathIndex - 1;
                        } else { 
                            pathIndex--;
                            prevPathIndex = pathIndex === orderedPaths.length - 1 ? 0 : pathIndex + 1;
                        }
                    }
                } else {
                    if (pathIndex === null) {
                        pathIndex = 0;
                        prevPathIndex = null;
                    } else if (pathIndex === orderedPaths.length - 1) {
                        prevPathIndex = pathIndex;
                        pathIndex = null;
                    } else {
                        prevPathIndex = pathIndex;
                        pathIndex++;
                    }
                }

                if (pathIndex !== null) invertFill(orderedPaths[pathIndex]);
                if (prevPathIndex !== null) invertFill(orderedPaths[prevPathIndex]);

                if (pathIndex === null) {
                    (interval !== null) && clearInterval(interval);
                    const timeout: NodeJS.Timeout = setTimeout(() => {
                        interval = setInterval(intervalFunction, loaderTransitionDuration);
                        clearTimeout(timeout);
                    }, loaderTransitionDuration * 1.5);
                }

            }

            interval = setInterval(intervalFunction, loaderTransitionDuration);
            
        } else if (allowClick) orderedPaths.forEach((path) => path.addEventListener('click', fromLogotoggleFill));

        return () => {
            if (!asLoader) orderedPaths.forEach((path) => path.removeEventListener('click', fromLogotoggleFill));
            if (interval) clearInterval(interval);
        };
    }, []);

    return (
        <>
            { asLoader ? (
                <FranceCustomFlagLoader
                    ref={logo}
                    className={`${ className } rounded-lg border-black border-2`} 
                />) : (
                <FranceCustomFlag
                    style={{ cursor: 'pointer'}}
                    ref={logo}
                    className={`${ className } rounded-lg border-black border-2`} 
                />
            )}
        </>
    );
}

export default AppLogo;