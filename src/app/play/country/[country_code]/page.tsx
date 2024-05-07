"use client";

import { MouseEventHandler, useRef, useState, useEffect, useCallback, ReactNode, useMemo } from "react";
import { useParams } from 'next/navigation';
import Image from "next/image";

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
import getRandomRgbColors from "@/useful/getRandomRgbColors";
import ButtonGoBackOrNext, { Direction } from "@/components/inputs/button-go-back-or-next";
import Button from "@/components/inputs/button";

const PlayCountry = () => {

    const countries: Country[] = countriesArray as Country[];

    const svgContainer = useRef<HTMLDivElement>(null);

    const { country_code } = useParams<{ country_code?: string }>() as any;

    const [colorableShapes, setColorableShapes] = useState<(SVGElement | SVGPathElement | SVGCircleElement | SVGGElement)[]>([]);

    const [svgColors, setSvgColors] = useState<string[]>([]);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const [initialPaintbrushPosition, setInitialPaintbrushPosition] = useState<Position | null>(null);

    const isValidated: boolean = useMemo(() => (colorableShapes.length !== 0 && selectedColor === null && svgColors.length === 0), [colorableShapes, selectedColor, svgColors]);

    const score: number = useMemo(() => {

        const totalShapes: number = colorableShapes.length;
        const shapeColors: string[] = colorableShapes.map((shape) => (hexToRgb(shape.getAttribute('data-fill') as string)));

        let correctShapes: number = 0;
        let goodColors: number = 0;

        colorableShapes.forEach((shape) => {
            const initialFill: string = shape.getAttribute('data-fill') as string;
            const currentFill: string = shape.getAttribute('fill') as string;
            if (initialFill === currentFill) {
                correctShapes++;
            }
            if (shapeColors.some((color) => (color === currentFill))) {
                goodColors++;
            }
        });

        const initialScore: number = Math.round((correctShapes / totalShapes) * 100);
        const goodColorsPercentage: number = Math.round((goodColors / totalShapes) * 100);

        if (initialScore === 100) return initialScore;

        // According to good colors percentage, we can add some points to the score

        return initialScore;

    }, [isValidated]);

    useEffect(() => {
        if (isValidated) {
            console.log("Score:", score);
        }
    }, [isValidated]);

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

    const initColors = (colors: string[]) => {

        let nbColorsToGenerate: number = 0;

        if (colors.length <= 3) nbColorsToGenerate = 3;
        else if (colors.length <= 5) nbColorsToGenerate = 2;
        else if (colors.length <= 8) nbColorsToGenerate = 1;

        const randomColors: string[] = getRandomRgbColors(nbColorsToGenerate, colors);

        colors = shuffle<string>([...colors, ...randomColors]);

        setSvgColors(colors);
    }

    const initShape = (firstCall = false) => {
        const selectors: string[] = ['path', 'circle', 'g'];
        const allShapes: NodeListOf<SVGElement> | undefined = svgContainer.current?.querySelectorAll(selectors.map((selector: string) => (`svg > ${selector}[fill]`)).join(', '));
        if (firstCall) { 
            const colorableShapesTmp: (SVGElement | SVGPathElement | SVGCircleElement | SVGGElement)[] = [];
            if (allShapes != undefined) {
                let flagColors: string[] = [];
                allShapes.forEach((shape: SVGElement, index: number) => {
                    if (shape.classList.contains('keep')) {
                        const initialFill: string | null = shape.getAttribute('fill');
                        if (initialFill !== null && initialFill !== 'none' && !initialFill.startsWith("url")) {
                            const rgbInitialFill: string = hexToRgb(initialFill); 
                            shape.setAttribute('fill', 'url(#emptyPathImg)');
                            shape.setAttribute('data-fill', rgbInitialFill);

                            shape.style.stroke = 'black';
                            let strokeWidth: string = "1px";
                            if (shape.tagName === 'g') {
                                strokeWidth = "0.2px";
                            }
                            shape.style.strokeWidth = strokeWidth;
                            shape.classList.add(styles.svgContent);

                            colorableShapesTmp.push(shape);

                            if (!flagColors.some((color) => (rgbInitialFill === color))) {
                                flagColors.push(rgbInitialFill);
                            }
                        }
                    }
                });
                initColors(flagColors);
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
            <Button onClick={validateFlag} />
            <div className="flex flex-row justify-center gap-5">
                <ButtonGoBackOrNext direction={ Direction.BACK } dataSource={countries.map((country: Country) => ({value: country.code}))} currentValue={ country_code } url={"/play/country"}/>
                <ButtonGoBackOrNext dataSource={countries.map((country: Country) => ({value: country.code}))} currentValue={ country_code } url={"/play/country"}/>
            </div>
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
