"use client";

import { useEffect, useRef } from "react";

import FranceCustomFlag from "@/asset/img/general/custom-french-flag.svg";
import FranceCustomFlagLoader from "@/asset/img/general/custom-flag-loader.svg";

const FlagColors: Array<FlagColor> = [
    {
        name: "france",
        code: "fr",
        colors: ["#000091", "#fff", "#e1000f"]
    },
    {
        name: "belgium",
        code: "be",
        colors: ["#000001", "#ffd90c", "#f31830"]
    },
    {
        name: "romania",
        code: "ro",
        colors: ["#00319c", "#ffde00", "#de2110"]
    },
    {
        name: "italy",
        code: "it",
        colors: ["#009246", "#fff", "#ce2b37"]
    },
    {
        name: "ireland",
        code: "ie",
        colors: ["#009A49", "#fff", "#FF7900"]
    },
    {
        name: "ivory-coast",
        code: "ci",
        colors: ["#ff9a00", "#fff", "#00cd00"]
    },
    {
        name: "nigeria",
        code: "ng",
        colors: ["#008753", "#fff", "#008753"]
    },
    {
        name: "mexico",
        code: "mx",
        colors: ["#006847", "#fff", "#ce1126"]
    },
    {
        name: "guinea",
        code: "gn",
        colors: ["red", "#ff0", "#090"]
    },
    {
        name: "chad",
        code: "td",
        colors: ["#002664", "#fecb00", "#c60c30"]
    },
]

export type FlagColorCode = 'fr' | 'be' | 'ro' | 'it' | 'ie' | 'ci' | 'ng' | 'mx' | 'gn' | 'td';

export interface AppLogoInterface {
    className?: string;
    asLoader?: boolean;
    loaderLoop?: boolean;
    loaderTransitionDuration?: number;
    allowClick?: boolean;

    // Not implemented yet
    startsWith?: FlagColorCode | 'any';
    displayedCountries?: Array<FlagColorCode> | 'any';
}

export type FlagColor = { 
    name: string,
    code: FlagColorCode,
    colors: Array<string>
};


const AppLogo = ({className, allowClick = true, loaderLoop = false, asLoader = false, loaderTransitionDuration = 150, startsWith = 'any', displayedCountries = "any" }: AppLogoInterface) => {

    if (asLoader) allowClick = false;
    if (startsWith !== 'any' && !displayedCountries.includes(startsWith)) throw new Error('Starts with flag color not in displayed countries');

    const logo = useRef<SVGElement | null>(null);

    const invertFill = (path: SVGPathElement) => {
        const fill: string | null = path.getAttribute('fill');
        const dataFill: string | null = path.getAttribute('data-fill');

        if (!fill || !dataFill) throw new Error('No fill or data-fill attribute found');

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
        let isLoadingWayForward: boolean = true;
        
        if (asLoader) {

            let pathIndex: number | null = null;
            let prevPathIndex: number | null = null;
            let usedFlagColors: Array<FlagColor> = [];
            let currentFlagColor: FlagColor | undefined = undefined;

            const getNextFlagColor = (): FlagColor => {
                let nextFlagColor: FlagColor | undefined = undefined;
                do {
                    const randomIndex: number = Math.floor(Math.random() * FlagColors.length);
                    const randomFlagColor: FlagColor = FlagColors[randomIndex];
                    if (!usedFlagColors.includes(randomFlagColor) && (displayedCountries === 'any' || displayedCountries.includes(randomFlagColor.code))) {
                        nextFlagColor = randomFlagColor;
                    }
                } while (nextFlagColor === undefined);
                console.log('Next flag color:', nextFlagColor);
                return nextFlagColor;
            }

            if (startsWith === 'any') {
                usedFlagColors.push(getNextFlagColor());
            } else {
                const flagColor: FlagColor | undefined = FlagColors.find((flagColor) => flagColor.code === startsWith);

                if (flagColor !== undefined) {
                    usedFlagColors.push(flagColor);
                } else {
                    console.error('Flag color not found');
                    return;
                }
            }
            currentFlagColor = usedFlagColors.at(0);

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

                (pathIndex !== null) && orderedPaths[pathIndex]?.setAttribute('data-fill', currentFlagColor!.colors[pathIndex]);

                (pathIndex !== null) && invertFill(orderedPaths[pathIndex]);
                (prevPathIndex !== null) && invertFill(orderedPaths[prevPathIndex]);

                if (pathIndex === null) {
                    (interval !== null) && clearInterval(interval);
                    
                    
                    if (displayedCountries === 'any' && usedFlagColors.length === FlagColors.length) usedFlagColors = [];
                    else if (usedFlagColors.length === displayedCountries.length) usedFlagColors = [];
                    
                    currentFlagColor = getNextFlagColor();
                    usedFlagColors.push(currentFlagColor);

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