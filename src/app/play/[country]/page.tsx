"use client";

import { MouseEventHandler, useRef, useState, useEffect, useCallback } from "react";
import styles from "@/asset/scss/play.module.scss";
import { useParams } from 'next/navigation';
import countries from "@/asset/data/countries.json";
import { init } from "next/dist/compiled/webpack/webpack";
import hexToRgb from "@/useful/hexToRgb";

const uppercaseFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const Play = () => {

    const svgContainer = useRef<HTMLDivElement>(null);

    const { country } = useParams<{ country?: string }>() as any;

    const [svgColors, setSvgColors] = useState<string[]>([]);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const countryElement: any = countries.find((element) => {
        const [key, _] = Object.entries(element)[0];
        // return country if key === country
        return (key === country);
    });

    const countryName: string = countryElement ? uppercaseFirstLetter(Object.values(countryElement)[0] as string) : 'Unknown';

    const loadCountrySVG = async () => {
        try {
            fetch(`/api/svg/${country}`)
                .then((response) => response.json())
                .then((data) => {
                    if (svgContainer.current) {
                        svgContainer.current.innerHTML = data.svg;
                    }
                    initShape(true);
                });
        } catch (error) {
            console.error('Error loading country SVG:', error);
        }
    };

    useEffect(() => {
        loadCountrySVG();
    }, []);

    const onColorShape = useCallback((e: MouseEvent) => {
        const shape = e.currentTarget as SVGElement | SVGPathElement | SVGCircleElement | SVGGElement;
        shape.setAttribute('fill', selectedColor as string);
        console.log(shape.getAttribute('fill'));
        shape.classList.remove(styles.svgContent);
        console.log(selectedColor);
    }, [selectedColor]);

    useEffect(() => {
        console.log(svgColors);
        if (selectedColor !== null) initShape();
    }, [selectedColor]);

    const initShape = (firstCall = false) => {
        const allShapes: NodeListOf<SVGElement> | undefined = svgContainer.current?.querySelectorAll('path, circle');
        if (allShapes != undefined) {
            const flagColors: string[] = [];
            allShapes.forEach((shape) => {

                if (firstCall) {
                    const initialFill: string = hexToRgb(shape.getAttribute('fill') as string);
                    if (initialFill !== null && initialFill !== 'none' && !initialFill.startsWith("url")) {
                        shape.setAttribute('fill', 'white');
                        shape.style.strokeWidth = '2.5px';
                        shape.style.stroke = 'black';
                        shape.classList.add(styles.svgContent);
                        if (!flagColors.some((color) => (initialFill === color))
                        ) {
                            flagColors.push(initialFill);
                        }
                    }
                }
                shape.addEventListener("click", onColorShape);
            });
            if (firstCall) setSvgColors(flagColors);
        }
    };

    const validateFlag: MouseEventHandler<HTMLButtonElement> = (e) => {
        const allShapes: NodeListOf<SVGElement> | undefined = svgContainer.current?.querySelectorAll('path, circle');
        if (allShapes != undefined) {
            allShapes.forEach(shape => {
                shape.classList.remove(styles.svgContent);
                shape.removeAttribute("style");
                shape.onclick = null;
            });
        }
    }

    const selectColor: MouseEventHandler<HTMLLIElement> = (e) => {
        const target = e.target as HTMLLIElement;
        const color = target.style.backgroundColor;
        setSelectedColor(color);
    }

    return (
        <>
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-grey">Guess the flag of { countryName }</h1>
            <ul className="flex flex-row flex-wrap items-center justify-center w-fill h-fill gap-5">
                { svgColors.map((color: string) => {
                    console.log(color, selectedColor);
                    return (
                        <li onClick={selectColor} className={ `${styles.colorItem} ${ selectedColor === color && (styles.selected) } cursor-pointer` } key={color} style={{ backgroundColor: color }}>
                        </li>
                    );
                })}
            </ul>
            <div ref={svgContainer} className={ `${styles.svgContainer} bg-gray-50 dark:bg-gray-900` }>
            </div>
            <button type="button" onClick={validateFlag} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">OK</button>
        </>
    );
}
export default Play;
