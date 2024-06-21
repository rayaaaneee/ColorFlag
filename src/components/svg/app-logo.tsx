"use client";

import { useEffect, useRef } from "react";

import styles from "@/asset/scss/logo.module.scss";

export const FlagColors: Array<FlagColor> = [
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
    id?: string;

    asLoader?: boolean;
    loaderLoop?: boolean;
    allowClick?: boolean;
    loaderTransitionDuration?: number;

    hasHoverEffect?: boolean;
    hasLightBackground?: boolean;
    borderThin?: boolean;

    startsWith?: FlagColorCode | 'any';
    displayedCountries?: Array<FlagColorCode> | 'any';
}

export type FlagColor = { 
    name: string,
    code: FlagColorCode,
    colors: Array<string>
};

// TODO : Insert has light background

const AppLogo = ({ className, id = styles.appLogoSvg, allowClick = true, loaderLoop = false, asLoader = false, loaderTransitionDuration = 150, startsWith = 'any', displayedCountries = "any", hasHoverEffect = false, hasLightBackground = false, borderThin = false }: AppLogoInterface) => {

    if (asLoader) allowClick = false;
    if (startsWith !== 'any' && !displayedCountries.includes(startsWith)) throw new Error('Starts with flag color not in displayed countries');

    const orderedPaths = useRef<SVGPathElement[]>([]);

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
        if (orderedPaths.current.length === 0) return console.error('No path found');

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
                                pathIndex = orderedPaths.current.length - 1;
                                break;
                        }
                        prevPathIndex = null;
                    } else if (pathIndex === orderedPaths.current.length - 1 && isLoadingWayForward) {
                        isLoadingWayForward = false;
                        pathIndex = null;
                        prevPathIndex = orderedPaths.current.length - 1;
                    } else if (pathIndex === 0 && !isLoadingWayForward) {
                        isLoadingWayForward = true;
                        pathIndex = null;
                        prevPathIndex = 0;
                    } else {
                        if (isLoadingWayForward) {
                            pathIndex++;
                            prevPathIndex = pathIndex === 0 ? orderedPaths.current.length - 1 : pathIndex - 1;
                        } else { 
                            pathIndex--;
                            prevPathIndex = pathIndex === orderedPaths.current.length - 1 ? 0 : pathIndex + 1;
                        }
                    }
                } else {
                    if (pathIndex === null) {
                        pathIndex = 0;
                        prevPathIndex = null;
                    } else if (pathIndex === orderedPaths.current.length - 1) {
                        prevPathIndex = pathIndex;
                        pathIndex = null;
                    } else {
                        prevPathIndex = pathIndex;
                        pathIndex++;
                    }
                }

                (pathIndex !== null) && orderedPaths.current[pathIndex]?.setAttribute('data-fill', currentFlagColor!.colors[pathIndex]);

                (pathIndex !== null) && invertFill(orderedPaths.current[pathIndex]);
                (prevPathIndex !== null) && invertFill(orderedPaths.current[prevPathIndex]);

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
            
        } else if (allowClick) orderedPaths.current.forEach((path) => path.addEventListener('click', fromLogotoggleFill));

        return () => {
            if (!asLoader) orderedPaths.current.forEach((path) => path.removeEventListener('click', fromLogotoggleFill));
            if (interval) clearInterval(interval);
        };
    }, []);

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            id={id} 
            viewBox="0 0 640 480" 
            className={`${ className } ${ borderThin && styles.borderThin } ${ (hasHoverEffect === true) && styles.hasHover } ${asLoader && styles.loader} rounded-lg border-black border-2`}>
            <defs>
                <pattern 
                    xmlns="http://www.w3.org/2000/svg" 
                    id="emptyPathImg" 
                    patternUnits="userSpaceOnUse" 
                    width="400"
                    height="400">
                    <image 
                        xmlnsXlink="http://www.w3.org/1999/xlink" 
                        xlinkHref={`/images/${hasLightBackground ? 
                            `png-background` 
                            : `png-background-grey`
                        }.jpg`} 
                        x="0" 
                        y="0"
                        width="400" 
                        height="400">
                    </image>
                </pattern>
            </defs>
            <path 
                fill={asLoader ? `url(#emptyPathImg)` : `#fff`} 
                data-fill={asLoader ? undefined : `url(#emptyPathImg)`} 
                d="M0 0h640v480H0z"
                ref={path => { if (path !== null) orderedPaths.current[1] = path}}>
            </path>
            <path
                fill={`url(#emptyPathImg)`}
                data-fill={asLoader ? undefined : `#000091`} 
                d="M0 0h213.3v480H0z"
                ref={path => { if (path !== null) orderedPaths.current[0] = path}}>
            </path>
            <path 
                fill={asLoader ? `url(#emptyPathImg)` : `#e1000f`} 
                data-fill={asLoader ? undefined : `url(#emptyPathImg)`} 
                d="M426.7 0H640v480H426.7z"
                ref={path => { if (path !== null) orderedPaths.current[2] = path}}>
            </path>
        </svg>
    );
}

export default AppLogo;