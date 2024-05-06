"use client";

import { MouseEventHandler, useRef, useState, useEffect, useCallback, ReactNode, useMemo } from "react";
import { useParams } from 'next/navigation';
import { renderToString } from 'react-dom/server'
import toast from "react-hot-toast";

import styles from "@/asset/scss/play.module.scss";

import countriesArray from "@/asset/data/countries.json";
import Country from "@/useful/interfaces/country";

import hexToRgb from "@/useful/hexToRgb";
import uppercaseFirstWordsLetters from "@/useful/uppercaseFirstWordsLetters";

import PaintbrushMouse from "@/components/svg/paintbrush-mouse";
import SvgDefs from "@/components/svg/svg-defs";
import Position from "@/useful/interfaces/position";
import shuffle from "@/useful/array.shuffle";
import Image from "next/image";

const PlayCountry = () => {

    const countries: Country[] = countriesArray as Country[];

    const svgContainer = useRef<HTMLDivElement>(null);

    const { country_code } = useParams<{ country_code?: string }>() as any;

    const [colorableShapes, setColorableShapes] = useState<(SVGElement | SVGPathElement | SVGCircleElement | SVGGElement)[]>([]);

    const [svgColors, setSvgColors] = useState<string[]>([]);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const [initialPaintbrushPosition, setInitialPaintbrushPosition] = useState<Position | null>(null);

    const isValidated: boolean = useMemo(() => (colorableShapes.length !== 0 && selectedColor === null && svgColors.length === 0), [colorableShapes, selectedColor, svgColors]);

    const countryElement: Country | undefined = countries.find((element: Country) => (element.code === country_code));

    const countryName: string = countryElement !== undefined ? uppercaseFirstWordsLetters(countryElement.name) : 'Unknown';

    let colorableSvgElement: SVGElement | null = null;

    const loadCountrySVG = async () => {
        if (countryElement === undefined) return;
        try {
            fetch(`/api/svg/${country_code}`)
                .then((response) => response.json())
                .then((data) => {
                    if (svgContainer.current && colorableSvgElement === null) {
                        svgContainer.current.insertAdjacentHTML('afterbegin', data.svg as string);
                        colorableSvgElement = svgContainer.current.querySelector('svg');
                        if (colorableSvgElement !== null) {
                            colorableSvgElement.classList.add(styles.left);
                            const svgWidth: number = svgContainer.current.clientWidth;
                            const svgDefs: ReactNode = (<SvgDefs
                                x={0}
                                y={0}
                                patternWidth={svgWidth}
                                patternHeight={svgWidth}
                                imageWidth={svgWidth}
                                imageHeight={svgWidth}
                            />);
                            const svgDefsString: string = renderToString(svgDefs);
                            colorableSvgElement.insertAdjacentHTML('afterbegin', svgDefsString);
                        }
                        initShape(true);
                    }
                });
        } catch (error) {
            console.error('Error loading country SVG:', error);
        }
    };

    useEffect(() => {
        loadCountrySVG();
    }, []);

    const onColorShape = useCallback((e: MouseEvent) => {
        if (selectedColor !== null) {
            const shape = e.currentTarget as SVGElement | SVGPathElement | SVGCircleElement | SVGGElement;
            shape.setAttribute('fill', selectedColor);
        } else {
            toast.error("Please select a color");
        }
    }, [selectedColor]);

    useEffect(() => {
        if (selectedColor !== null) {
            initShape();
            document.body.style.cursor = "none";
        }
        return () => {
            document.body.removeAttribute("style");
        }
    }, [selectedColor]);

    const initShape = (firstCall = false) => {
        const allShapes: NodeListOf<SVGElement> | undefined = svgContainer.current?.querySelectorAll('path[fill], circle[fill]');
        if (firstCall) { 
            const colorableShapesTmp: (SVGElement | SVGPathElement | SVGCircleElement | SVGGElement)[] = [];
            if (allShapes != undefined) {
                let flagColors: string[] = [];
                allShapes.forEach((shape: SVGElement, index: number) => {
                    if (!shape.classList.contains('keep')) {
                        const initialFill: string | null = shape.getAttribute('fill');
                        if (initialFill !== null && initialFill !== 'none' && !initialFill.startsWith("url")) {
                            const rgbInitialFill: string = hexToRgb(initialFill); 
                            shape.setAttribute('fill', 'url(#emptyPathImg)');

                            shape.style.strokeWidth = '2.5px';
                            shape.style.stroke = 'black';
                            shape.classList.add(styles.svgContent);

                            colorableShapesTmp.push(shape);

                            if (!flagColors.some((color) => (rgbInitialFill === color))) {
                                flagColors.push(rgbInitialFill);
                            }
                        }
                    }
                });
                flagColors = shuffle<string>(flagColors);
                setSvgColors(flagColors);
                setColorableShapes(colorableShapesTmp);
            }

            colorableShapesTmp.forEach((shape) => {
                shape.onclick = onColorShape;
            });

        } else {

            colorableShapes.forEach((shape) => {
                shape.onclick = onColorShape;
            });

        }
    };

    const validateFlag: MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
        if (colorableShapes.length != 0) {
            setSelectedColor(null);
            setSvgColors([]);
            console.log('colorableShapes:', colorableShapes);
            colorableShapes.forEach(shape => {
                shape.classList.remove(styles.svgContent);
                shape.removeAttribute("style");
                shape.onclick = null;
            });
        }
    }, [colorableShapes]);

    useEffect(() => {
        if (isValidated === true) {
            toast.success("Flag validated");
            svgContainer.current?.classList.add(styles.validated);
        }
    }, [isValidated]);

    const selectColor: MouseEventHandler<HTMLLIElement> = (e) => {
        if (selectedColor === null) {
            const rect: DOMRect = e.currentTarget.getBoundingClientRect();
            const middleX = rect.x + (rect.width / 2);
            const middleY = rect.y + (rect.height / 2);
            setInitialPaintbrushPosition({ x: middleX, y: middleY });
        }
        const target = e.target as HTMLLIElement;
        const color = target.style.backgroundColor;
        setSelectedColor(color);
    }

    return (
        <>
            <h1 className="text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-grey">Guess the flag of { countryName }</h1>
            { svgColors.length > 0 && 
                (<ul className="flex flex-row flex-wrap items-center justify-center w-fill max-w-[65vw] h-fill gap-5">
                    { svgColors.map((color: string) => {
                        return (
                            <li onClick={selectColor} className={ `${styles.colorItem} ${ selectedColor === color && (styles.selected) } ${ selectedColor === null && 'cursor-pointer' }` } key={color} style={{ backgroundColor: color }}>
                            </li>
                        );
                    })}
                </ul>)
            }
            <div ref={svgContainer} className={ `${styles.svgContainer} ${!isValidated && "main-bg" } mx-auto my-16` }>
                <Image alt="correction" className={`${styles.right} ${!isValidated && "opacity-0" }`} src={ require(`@/asset/img/flags/4x3/${country_code}.svg`) } />
            </div>
            <button type="button" onClick={validateFlag} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">OK</button>
            { (selectedColor && initialPaintbrushPosition) && 
                (<PaintbrushMouse 
                    initialPosition={{
                        x: initialPaintbrushPosition.x, 
                        y: initialPaintbrushPosition.y
                    }} 
                    color={ selectedColor }
                />)
            }
        </>
    );
}
export default PlayCountry;
