"use client";

import { MouseEventHandler, useRef, useState, useEffect, useCallback } from "react";
import styles from "@/asset/scss/play.module.scss";
import { useParams } from 'next/navigation';
import countriesArray from "@/asset/data/countries.json";
import hexToRgb from "@/useful/hexToRgb";
import Country from "@/useful/interfaces/country";
import toast from "react-hot-toast";

import PaintbrushMouse from "@/components/svg/paintbrush-mouse";

const uppercaseFirstLetter = (string: string) => {
    return string.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

const PlayCountry = () => {

    const countries: Country[] = countriesArray as Country[];

    const svgContainer = useRef<HTMLDivElement>(null);

    const paintbrush = useRef(null);

    
    const { country } = useParams<{ country?: string }>() as any;
    

    const [colorableShapes, setColorableShapes] = useState<(SVGElement | SVGPathElement | SVGCircleElement | SVGGElement)[]>([]);
    
    const [svgColors, setSvgColors] = useState<string[]>([]);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);


    const countryElement: Country | undefined = countries.find((element: Country) => (element.code === country));

    const countryName: string = countryElement !== undefined ? uppercaseFirstLetter(countryElement.name) : 'Unknown';

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
        console.log(selectedColor);
        if (selectedColor !== null) {
            const shape = e.currentTarget as SVGElement | SVGPathElement | SVGCircleElement | SVGGElement;
            shape.setAttribute('fill', selectedColor as string);
            shape.classList.remove(styles.svgContent);
        } else {
            toast.error("Please select a color");
        }
    }, [selectedColor]);

    useEffect(() => {
        if (selectedColor !== null) {
            initShape();
            document.body.style.cursor = "none";
        }
    }, [selectedColor]);

    const initShape = (firstCall = false) => {
        if (firstCall) { 
        const allShapes: NodeListOf<SVGElement> | undefined = svgContainer.current?.querySelectorAll('path[fill], circle[fill]');
            if (allShapes != undefined) {
                const flagColors: string[] = [];
                allShapes.forEach((shape) => {
                    const initialFill: string | null = shape.getAttribute('fill');
                    if (initialFill !== null && initialFill !== 'none' && !initialFill.startsWith("url")) {
                        const rgbInitialFill: string = hexToRgb(initialFill); 
                        shape.setAttribute('fill', 'white');
                    
                        shape.style.strokeWidth = '2.5px';
                        shape.style.stroke = 'black';
                        shape.classList.add(styles.svgContent);
                        shape.onclick = onColorShape;
                        setColorableShapes(colorableShapes => {
                            colorableShapes.push(shape);
                            return colorableShapes;
                        });
                            
                        if (!flagColors.some((color) => (rgbInitialFill === color))) {
                            flagColors.push(rgbInitialFill);
                        }
                    }
                });
                setSvgColors(flagColors);
            }
        }
    };

    const validateFlag: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        console.log(colorableShapes);
        if (colorableShapes.length != 0) {
            colorableShapes.forEach(shape => {
                shape.classList.remove(styles.svgContent);
                shape.removeAttribute("style");
                shape.onclick = null;
            });
        }
    }, [colorableShapes])

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
                    return (
                        <li onClick={selectColor} className={ `${styles.colorItem} ${ selectedColor === color && (styles.selected) } ${ selectedColor === null && 'cursor-pointer' }` } key={color} style={{ backgroundColor: color }}>
                        </li>
                    );
                })}
            </ul>
            <div ref={svgContainer} className={ `${styles.svgContainer} bg-gray-50 dark:bg-gray-900` }>
            </div>
            <button type="button" onClick={validateFlag} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">OK</button>
            { selectedColor && <PaintbrushMouse color={ selectedColor }/> }
        </>
    );
}
export default PlayCountry;
