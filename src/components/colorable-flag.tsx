import { MouseEventHandler, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import Image from "next/image";
import toast from "react-hot-toast";
import styles from "@/asset/scss/play.module.scss";
import hexToRgb from "@/useful/string-treatment/hexToRgb";
import PaintbrushMouse from "./paintbrush-mouse";
import SvgDefs from "@/components/svg/svg-defs";
import getRandomRgbColors from "@/useful/getRandomRgbColors";
import shuffle from "@/useful/array.shuffle";
import NotFound from "@/components/not-found";
import Button from "@/components/inputs/button";
import SelectableColorCircle from "./selectable-color-circle";
import { SvgPatternInterface } from "./svg/svg-pattern";
import ChildrenType from "@/useful/types/children-type";
import { SvgCodeInterface, ToolButtonInterface } from "@/app/dev/verify/country/[country_code]/page";
import transformSelfClosingToRegularTag from "@/useful/string-treatment/transformSelfClosingToRegularTag";
import { replaceColorWithShorterHex } from "@/useful/string-treatment/rgbToHex";
import replaceFillAttribute from "@/useful/string-treatment/replaceFillAttribute";
import Loading from "./usefuls/loading";
import EraserButton from "./usefuls/eraser-button";
import ProgressBar from "./usefuls/progress-bar";
import FlagSvg, { FlagType } from "./usefuls/flag-svg";
import AppLogo from "./usefuls/app-logo";

export interface sourceElementInterface {
    name: string;
    code: string;
}

export interface ScoreInterface {
    score: number;
    bonus: number;
}

export type ValidatorCallback = (score: ScoreInterface) => void;
export type Shape = SVGElement | SVGPathElement | SVGCircleElement | SVGGElement;
export type ShapeClickerCallback = (shape: Shape) => void | React.Dispatch<React.SetStateAction<Shape>>;

export interface ColorableFlagInterface {
    sourceElement: sourceElementInterface | undefined;
    devMode?: boolean;
    toolSelected?: ToolButtonInterface | null;
    className?: string;
    onValidate?: ValidatorCallback;
    onClickOnShape?: ShapeClickerCallback;
    colorableShapesSetter?: React.Dispatch<React.SetStateAction<Shape[]>>;
    onChangeSvg?: (svgCode: SvgCodeInterface) => void;
    children?: ChildrenType;
    childrenContainerClassName?: string;
}

const ColorableFlag = ({ sourceElement, onValidate = (_) => {}, onClickOnShape = (_) => {}, devMode = false, className = "", onChangeSvg = (_) => {}, children = undefined, toolSelected = undefined, colorableShapesSetter = undefined, childrenContainerClassName = "" }: ColorableFlagInterface) => {

    const [svgColors, setSvgColors] = useState<string[]>([]);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    const [coloredShapes, setColoredShapes] = useState<Shape[]>([]);

    const [colorableShapes, setColorableShapes] = useState<Shape[]>([]);

    useEffect(() => {
        colorableShapes.forEach((shape) => {
            shape.onclick = onColorShape;

            const allUses: NodeListOf<SVGUseElement> | undefined = svgContainer.current?.querySelectorAll('use');

            if (allUses !== undefined) {

                const correspondingUse: SVGUseElement | undefined = Array.from(allUses).find((use: SVGUseElement) => (use.href.baseVal.replace('#', '') === shape.id));

                if (correspondingUse) {
                    correspondingUse.onmouseenter = (e) => {
                        if (!shape.classList.contains(styles.hovered)) {
                            shape.classList.add(styles.hovered);
                        }
                    };
                    correspondingUse.onmouseleave = (e) => {
                        if (shape.classList.contains(styles.hovered)) {
                            shape.classList.remove(styles.hovered);
                        }
                    };
                }
            }
        });
    }, [colorableShapes, selectedColor, toolSelected, coloredShapes]);

    const svgContainer = useRef<HTMLDivElement>(null);


    let colorableSvgElement: SVGElement | null = null;

    const isValidated: boolean = useMemo(() => (colorableShapes.length !== 0 && selectedColor === null && svgColors.length === 0), [colorableShapes, selectedColor, svgColors]);

    const loadElementSVG = async () => {
        if (sourceElement === undefined) return;

        const stringFlag: string | null = await FlagSvg({ code : sourceElement.code, type : FlagType.COUNTRY});

        if (stringFlag !== null) {

            if (svgContainer.current && colorableSvgElement === null) {

                const svgWithShorterHex: string = replaceColorWithShorterHex(transformSelfClosingToRegularTag(replaceFillAttribute(stringFlag)).trim());
                svgContainer.current.insertAdjacentHTML('afterbegin', svgWithShorterHex);
                colorableSvgElement = svgContainer.current.querySelector('svg');
                onChangeSvg({ svg: svgWithShorterHex, firstAssignment: true });
                if (colorableSvgElement !== null) {
                    colorableSvgElement.classList.add(styles.left);
                    const svgWidth: number = svgContainer.current.clientWidth;

                    const basePattern: SvgPatternInterface = {
                        x: 0,
                        y: 0,
                        patternWidth: svgWidth,
                        patternHeight: svgWidth,
                        imageWidth: svgWidth,
                        imageHeight: svgWidth
                    };
                    const patterns: SvgPatternInterface[] = [
                        { ...basePattern }
                    ]

                    if (devMode) {
                        patterns.push({ ...basePattern, customPatternId: 'selectedPathImg', customImageSrc: 'selected-background.jpg'})
                    }

                    const svgDefs: ReactNode = (<SvgDefs
                        patterns={patterns}
                    />);

                    const svgDefsString: string = renderToString(svgDefs);
                    colorableSvgElement.insertAdjacentHTML('afterbegin', svgDefsString);
                }
    
                initShapes(true);
            }
        } else {
            toast.error("Flag not found");
        } 
    };

    const onColorShape = useCallback((e: MouseEvent) => {
        const shape: Shape = e.currentTarget as Shape;
        onClickOnShape(shape);
        if (selectedColor !== null) {
            if (!coloredShapes.includes(shape)) {
                setColoredShapes(prev => [...prev, shape]);
            }
            shape.setAttribute('fill', selectedColor);
        } else if (!devMode) {
            toast.error("Please select a color");
        }
    }, [selectedColor, onClickOnShape, toolSelected, coloredShapes]);

    const score: ScoreInterface = useMemo(() => {

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
        let bonus: number = 0;
        if (goodColorsPercentage >= 90) {
            bonus = 20;
        } else if (goodColorsPercentage >= 80) {
            bonus = 15;
        } else if (goodColorsPercentage >= 70) {
            bonus = 10;
        } else if (goodColorsPercentage >= 60) {
            bonus = 5;
        } else if (goodColorsPercentage >= 40) {
            bonus = 3;
        } else if (goodColorsPercentage >= 20) {
            bonus = 1;
        }

        return {
            score: initialScore,
            bonus: bonus
        } as ScoreInterface;

    }, [isValidated]);

    /* const [displayedScore, setD] */

    useEffect(() => {
        if (isValidated) {
            if (svgContainer.current !== null) {
                const scoreContainer: HTMLParagraphElement | null = svgContainer.current.querySelector('#score-container');

                if (scoreContainer !== null) {
                    if (score.score > 0) {
                        let scoreValue: number = 0;
                        scoreContainer.innerText = `${scoreValue}`;
                        const interval: NodeJS.Timeout = setInterval(() => {
                            if (scoreValue < score.score) {
                                scoreValue += 1;
                                scoreContainer.innerText = `${scoreValue}`;
                            } else {
                                if (scoreValue === score.score + score.bonus) {
                                    clearInterval(interval);
                                } else {
                                    scoreValue += 1;
                                    scoreContainer.innerText = `${scoreValue}`;
                                }
                            }
                        }, 10);
                    } else {
                        scoreContainer.innerText = `${score.score}`;
                    }
                }
            }
        }
    }, [score]);

    useEffect(() => {
        loadElementSVG();
    }, []);

    useEffect(() => {
        selectedColor !== null && initShapes();
    }, [selectedColor]);

    const initColors = (colors: string[]) => {

        let nbColorsToGenerate: number = 0;

        if (colors.length <= 2) nbColorsToGenerate = 5;
        else if (colors.length <= 3) nbColorsToGenerate = 4;
        else if (colors.length <= 5) nbColorsToGenerate = 3;
        else if (colors.length <= 8) nbColorsToGenerate = 2;
        else nbColorsToGenerate = 1;

        const randomColors: string[] = getRandomRgbColors(nbColorsToGenerate, colors);

        colors = shuffle<string>([...colors, ...randomColors]);

        setSvgColors(colors);
    }

    const initShapes = (firstCall = false) => {
        const acceptedTags: string[] = ['path', 'circle', 'g', 'rect'];
        const allShapes: NodeListOf<SVGElement> | undefined = svgContainer.current?.querySelectorAll(acceptedTags.map((selector: string) => (`svg:not(.${styles.loaderSvg}) ${selector}[fill]:not(defs *)`)).join(', '));
        const allShapesKeeped: boolean = colorableSvgElement?.classList.contains("keep-all") || false;
        if (firstCall) { 
            const colorableShapesTmp: Shape[] = [];
            if (allShapes != undefined) {
                let flagColors: string[] = [];
                allShapes.forEach((shape: SVGElement) => {
                    if ((allShapesKeeped || shape.classList.contains("keep")) || devMode) {
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
                if (colorableShapesSetter !== undefined) colorableShapesSetter(colorableShapesTmp);
            }

        }
    };

    useEffect(() => {
        if (isValidated === true) {
            onValidate(score);
            toast.success("Flag validated");
            svgContainer.current?.classList.add(styles.validated);
        }
    }, [isValidated]);

    const validateFlag = () => {
        if (colorableShapes.length != 0) {
            if (coloredShapes.length === colorableShapes.length) {
                setSelectedColor(null);
                setSvgColors([]);
                colorableShapes.forEach(shape => {
                    shape.classList.remove(styles.svgContent);
                    shape.removeAttribute("style");
                    shape.onclick = null;
                });
            } else {
                toast.error("Please color all shapes before validating");
            }
        }
    }

    const selectColor: MouseEventHandler<HTMLLIElement> = (e) => {
        const target = e.target as HTMLLIElement;
        const color = target.style.backgroundColor;
        setSelectedColor(color);
    }

    const onEraseAll: MouseEventHandler<HTMLButtonElement> = (e) => {
        setSelectedColor(null);
        setColoredShapes([]);
        colorableShapes.forEach(shape => {
            shape.setAttribute('fill', 'url(#emptyPathImg)');
        });
    }

    return (
        <div className={`${className}`}>
            { sourceElement === undefined ? (<NotFound />)
                :
                (<>
                    { (!devMode) && (
                        <ul className={`list-none flex flex-row items-center justify-center w-fit max-w-[65vw] flex-wrap min-h-[50px] h-fit gap-5 m-auto`}>
                            { (svgColors.length > 0) && 
                                (<>
                                    { svgColors.map((color: string) => {
                                        return (
                                            <SelectableColorCircle className={selectedColor === null ? 'cursor-pointer' : '' } onClick={selectColor} color={color} selected={selectedColor === color} key={color} />
                                        );
                                    })}
                                    <EraserButton onClick={onEraseAll} tooltipTexts={{hovered: "Erase all", clicked: "Erased"}} />
                                </>)
                            }
                        </ul>
                    ) }
                    <div ref={svgContainer} className={ `${styles.svgContainer} ${!isValidated && "bg-gray-700" } flex items-center justify-center mx-auto ${ !devMode && "my-5"}` }>

                        { (svgColors.length === 0 && !isValidated) && (
                            <AppLogo asLoader={true} loaderLoop={true} loaderTransitionDuration={80} className="w-full h-full" />
                        ) }
                        {/* <Loading className={styles.loaderSvg} /> */}

                        <div className={`${isValidated ? "opacity-100" : "opacity-0" } w-full h-full absolute flex flex-col gap-2 items-center justify-center text-slate-800 text-8xl font-mono`}>
                            <div className="flex flex-row items-center justify-center gap-2">
                                <p id="score-container"></p>
                                <p>%</p>
                            </div>
                            <div className="w-56">
                                <ProgressBar value={score.score + score.bonus} colorSync={true} />
                            </div>
                        </div>
                        <Image alt="correction" className={`${styles.right} ${!isValidated && "opacity-0" }`} src={`/images/flags/country/${sourceElement.code}.svg`} width={100} height={100} />
                    </div>
                    { (selectedColor) && 
                        (<PaintbrushMouse
                            color={ selectedColor }
                        />)
                    }
                    { (!devMode && !isValidated) && (<div className="w-full flex items-center justify-center">
                        <Button onClick={validateFlag} />
                    </div>) }
                </>) 
            }
            {children && (
                <div className={`${childrenContainerClassName} w-fit h-fit flex flex-row items-center justify-center mt-2`}>
                {children}
                </div>
            ) }
        </div>
    )
};

ColorableFlag.displayName = "ColorableFlag";

export default ColorableFlag;