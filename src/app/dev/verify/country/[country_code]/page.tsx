"use client";

import ColorableFlag, { Shape, ShapeClickerCallback } from '@/components/colorable-flag';
import Country from '@/useful/interfaces/country';
import SyntaxHighlighter from 'react-syntax-highlighter';

import styles from "@/asset/scss/dev.module.scss";

import countriesArray from "@/asset/data/countries.json";
import { useParams } from 'next/navigation';
import uppercaseFirstWordsLetters from '@/useful/string-treatment/uppercaseFirstWordsLetters';
import { vs2015 as theme } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Checkbox from '@/components/usefuls/checkbox-container';
import CopyButton from '@/components/inputs/copy-button';
import SelectableColorCircle from '@/components/selectable-color-circle';
import Tooltip from '@/components/usefuls/tooltip';

import { CiEraser } from "react-icons/ci";
import Button from '@/components/inputs/button';
import { MouseEvent, MouseEventHandler, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import PaintbrushMouse from '@/components/paintbrush-mouse';
import { IoSendSharp } from "react-icons/io5";
import toast from 'react-hot-toast';

import Alert from '@/components/usefuls/alert';
import rgbToHex, { hexCanBecomeShorter, shortenHexColor } from '@/useful/string-treatment/rgbToHex';
import Image from 'next/image';
import { IoMdInformation, IoMdLink } from 'react-icons/io';
import Link from 'next/link';
import getAttributes, { AttributeInterface } from '@/useful/getAttributes';
import getCssSelector from '@/useful/getCssSelector';
import ButtonsGoBackAndNext from '@/components/buttons-go-back-and-next';
import EraserButton from '@/components/usefuls/eraser-button';
import DEV_MODE from '@/useful/dev-mode';
import NotFound from '@/components/not-found';

export interface VerifyCountriesProps {

}

export interface SvgCodeInterface {
    svg: string;
    firstAssignment: boolean;
}

export type ButtonKey = 'selector' | 'eraser';
export interface ToolButtonInterface { 
    texture: string, 
    key: ButtonKey, 
    mouseBackground: string,
    pathBackground: string 
}

const VerifyCountries = ({}: VerifyCountriesProps) => {

    const [svgCode, setSvgCode] = useState<SvgCodeInterface | null>(null);

    const [allShapesKeeped, setAllShapesKeeped] = useState<boolean>(false);
    const [colorableShapes, setColorableShapes] = useState<Shape[]>([]);
    const [originalFlagOpened, setOriginalFlagOpened] = useState<boolean>(false);

    const deselectAllShapes = () => {
        colorableShapes.forEach((shape) => {
            shape.setAttribute('fill', `url(#emptyPathImg)`);
        });
    }

    const selectAllShapes = () => {
        colorableShapes.forEach((shape) => {
            shape.setAttribute('fill', `url(#selectedPathImg)`);
        });
    }
    
    const tools: ToolButtonInterface[] = [
        {
            texture: '/selector.png',
            key: 'selector',
            mouseBackground: '#aeeaae',
            pathBackground: 'selectedPathImg'
        },
        {
            texture: '/eraser.png',
            key: 'eraser',
            mouseBackground: '#b2b2b2',
            pathBackground: 'emptyPathImg'
        }
    ];
    const [toolSelected, setToolSelected] = useState<ToolButtonInterface | null>(null);

    const countries: Country[] = countriesArray as Country[];

    const { country_code } = useParams<{ country_code?: string }>() as any;

    const countryElement: Country | undefined = countries.find((element: Country) => (element.code === (country_code as string)));

    const countryName: string = countryElement !== undefined ? uppercaseFirstWordsLetters(countryElement.name) : 'Unknown';

    const svgCodeContainer = useRef<HTMLDivElement>(null);

    const hasSelectedShapes: boolean = useMemo(() => {
        if (svgCode === null) return false;
        return allShapesKeeped || svgCode?.svg.includes('class="keep"');
    }, [svgCode, allShapesKeeped]);

    const [alreadyTreated, setAlreadyTreated] = useState<boolean>(false);
    
    useEffect(() => {
        if (svgCode !== null) {
            if (svgCode.firstAssignment) {
                const alreadyKeepedAll: boolean = svgCode.svg.includes('class="keep-all"');
                const alreadyKeepedOnes: boolean = svgCode.svg.includes('class="keep"');
                if (alreadyKeepedAll) {
                    setAllShapesKeeped(true);
                    selectAllShapes();
                } else if (alreadyKeepedOnes) {
                    svgCodeContainer.current?.querySelectorAll('.keep').forEach((element: Element) => {
                        console.log("finding colorable shape for ", element);
                        const elementAttrs: AttributeInterface[] = getAttributes(element, ["class", "id"]);
                        const colorableShape: Shape | undefined = 
                            colorableShapes.find((colorableShape: Shape) => {
                                let isFindingShape: boolean = true;
                                elementAttrs.forEach((elementAttr: AttributeInterface) => {
                                    if (elementAttr.name === "fill") {
                                        if (elementAttr.value !== null) {
                                            const colorableShapeDataFill: string = colorableShape.getAttribute('data-fill') as string;
                                            if (rgbToHex(colorableShapeDataFill) !== elementAttr.value && colorableShapeDataFill !== elementAttr.value) {
                                                isFindingShape = false;
                                            }
                                        }
                                    } else {
                                        if (colorableShape.getAttribute(elementAttr.name) !== elementAttr.value) {
                                            isFindingShape = false;
                                        }
                                    }
                                });
                                return isFindingShape;
                            });
                        console.log("founded shape is", colorableShape);
                        if (colorableShape !== undefined) {
                            colorableShape.setAttribute('fill', `url(#selectedPathImg)`);
                        }
                    })
                }
                setAlreadyTreated(alreadyKeepedAll || alreadyKeepedOnes);
            }
        }
    }, [svgCode]);

    const clearAll: MouseEventHandler<HTMLButtonElement> = (e) => {
        setAllShapesKeeped(false);
        setToolSelected(null);
        manageShapesClasses(true, true);
        deselectAllShapes();
    }

    const updateSvgCode = () => {
        if (svgCodeContainer.current !== null) {
            const svgElement: SVGElement | null = svgCodeContainer.current?.querySelector('svg');
            if (svgElement !== null) {
                setSvgCode({svg: svgElement.outerHTML, firstAssignment: false});
                return;
            }
        }
        toast.error('Cannot update the svg code');
    }


    const manageShapesClasses = (removeKeep: boolean = false, removeKeepAll: boolean = false): void => {
        if (svgCodeContainer.current !== null) {
            const svgElement: SVGElement | null = svgCodeContainer.current?.querySelector('svg');
            if (svgElement !== null) {
                if (removeKeepAll) {
                    svgElement.removeAttribute('class');
                } else {
                    svgElement.classList.add('keep-all');
                }

                svgElement.querySelectorAll('.keep').forEach((element: Element) => {
                    if (removeKeep) {
                        element.removeAttribute('class');
                    } else {
                        element.classList.add('keep');
                    }
                });
                updateSvgCode();
                selectAllShapes();
            }
        }
    }

    useEffect(() => {
        if (allShapesKeeped) {
            setToolSelected(null);
            manageShapesClasses(true, false);
        } else {
            if (svgCodeContainer.current !== null) {
                if (svgCodeContainer.current.querySelector("svg") !== null) {
                    manageShapesClasses(false, true);
                    updateSvgCode();
                    deselectAllShapes();
                }
            }
        }
    }, [allShapesKeeped]);

    const onSelect = (e: MouseEvent, button: ToolButtonInterface) => {
        if (toolSelected?.key === button.key) {
            setToolSelected(null);
        } else {
            setToolSelected(button);
        }
    }

    const onClickOnShape: ShapeClickerCallback = useCallback((shape: Shape) => {
        if (toolSelected === null) {
            toast.error('Please select a tool first');
            return;
        }
        if (allShapesKeeped) {
            toast.error('You cannot select shapes when all shapes are kept');
            return;
        }

        if (shape.getAttribute("data-fill") !== null) {
            console.log("shape clicked", shape);
            const pathBackground: string = toolSelected.pathBackground;
            shape.setAttribute('fill', `url(#${pathBackground})`);
    
            const shapeCopy: HTMLElement = shape.cloneNode(true) as HTMLElement;
            shapeCopy.removeAttribute('class');

            const dataFill: string = rgbToHex(shape.getAttribute('data-fill') as string);
            const canBeShortened: boolean = hexCanBecomeShorter(dataFill);
            const shortenDataFill: string | null = canBeShortened ? shortenHexColor(dataFill) : null;

            shapeCopy.setAttribute('fill', canBeShortened ? (shortenDataFill as string) : dataFill);
            shapeCopy.removeAttribute('data-fill');
            shapeCopy.removeAttribute('style');

            if (svgCodeContainer.current !== null) {

                const selector: string = getCssSelector(shapeCopy);
                const findedElement: Shape | null = svgCodeContainer.current.querySelector(selector);

                if (findedElement !== null) {

                    if (toolSelected.key === 'selector') {
                        shapeCopy.classList.add('keep');
                    }
                    // TODO: Si l'élément cliqué possède des enfants cela engendre un bug
                    svgCodeContainer.current.querySelector(selector)!.replaceWith(shapeCopy);

                    updateSvgCode();

                } else {
                    if (toolSelected.key === 'selector') {
                        toast.error('Cannot find the shape to select');
                    } else if (toolSelected.key === 'eraser') {
                        toast.error('Cannot find the shape to erase');
                    }
                }

            } else {
                toast.error('An error occured');
            }
        } else {
            toast.error('This shape cannot be colored');
        }

    }, [toolSelected, allShapesKeeped]);

    const validateSvg: MouseEventHandler<HTMLButtonElement> = (e) => {
        if (hasSelectedShapes) {
            if (svgCode !== null) {
                fetch(`/api/flag/country/${country_code}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ svg: svgCode.svg })
                })
                .then((response: Response) => response.json())
                .then((data: any) => {
                    toast.success(data.message);
                })
                .catch(error => {
                    toast.error('An error occured');
                    console.error(error);
                });
            }
        } else {
            toast.error('Please select at least one shape before sending');
        }
    }

    if (DEV_MODE) {
        return <NotFound />;
    }

    return (
        <>
            { alreadyTreated && (
                <Alert hasIcon type='warning' duration={3000}>
                    <p>This flag seems to be already treated.</p>
                </Alert>
            ) }
            { originalFlagOpened && (
                <Alert position='top-right' type='info' onClose={e => setOriginalFlagOpened(false)}>
                    <Image src={`/flags/1x1/${country_code}.svg`} draggable={false} className='rounded-2xl w-48 h-48' alt={`${countryName}-flag`} width={100} height={100} />
                </Alert>
            ) }
            <div ref={svgCodeContainer} className='hidden' dangerouslySetInnerHTML={{ __html : svgCode?.svg || "" }}></div>
            <h1 className='absolute top-3 text-3xl text-slate-600 font-bold'>{countryName}</h1>
            <div className='w-full h-full flex flex-col items-center justify-start gap-12'>
                <div className='w-full flex flex-row items-center justify-center mt-16 gap-12'>
                    <CopyButton stringToCopy={svgCode?.svg || ""} />
                    <div id={styles.codeRenderer} className='w-4/5'>
                        <SyntaxHighlighter wrapLongLines customStyle={{maxHeight: "400px", maxWidth: "1100px"}} style={theme} showLineNumbers={true} language="xml">
                            {svgCode?.svg || "loading..."}
                        </SyntaxHighlighter>
                    </div>
                </div>
                <div className='absolute left-10 bottom-10 w-fit flex flex-col items-start justify-center gap-3'>
                    <ul className='flex flex-row gap-3 items-center justify-start'>
                        {tools.map((button) => (
                                <Tooltip disabled={ allShapesKeeped } key={button.key} text={uppercaseFirstWordsLetters(button.key)}>
                                    <SelectableColorCircle onClick={e => onSelect(e, button)} disabled={ allShapesKeeped } color={`url(${button.texture})`} />
                                </Tooltip>
                            )
                        )}
                    </ul>
                    <div className='flex flex-row gap-3 items-center'>
                        <Checkbox 
                            checked={allShapesKeeped}
                            label='Keep all shapes'
                            onChange={(e) => setAllShapesKeeped(e.currentTarget.checked)}
                        />
                        <EraserButton onClick={clearAll} tooltipTexts={{ hovered: 'Clear all', clicked: 'Cleared' }} />
                    </div>
                    <ButtonsGoBackAndNext
                        dataSource={countries.map(country => ({ value: country.code}))} 
                        currentValue={ country_code } 
                        url={ `/dev/verify/country` }
                        cannotLoop={true}
                    />
                </div>
                <ColorableFlag 
                    className='flex flex-col items-end justify-center absolute bottom-10 right-10'
                    sourceElement={ countryElement } 
                    itemName='country'  
                    onChangeSvg={setSvgCode}
                    onClickOnShape={onClickOnShape}
                    colorableShapesSetter={setColorableShapes}
                    toolSelected={toolSelected}
                    childrenContainerClassName='gap-3'
                    devMode={ true }
                >
                    <Tooltip text='See original' position='top'>
                        <Button onClick={e => setOriginalFlagOpened(bool => !bool)} customs={{ borderRadiusClass: "rounded-full", paddingClass: "p-1" }}>
                            <IoMdInformation className='text-4xl'/>
                        </Button>
                    </Tooltip>
                    <Tooltip disabled={(hasSelectedShapes)} text='Select at least one shape before sending' type='error' hasIcon={true} position='left'>
                        <Button disabled={(!hasSelectedShapes)} className='gap-2' onClick={validateSvg}>
                            <p>Send</p>
                            <IoSendSharp />
                        </Button>
                    </Tooltip>
                    <Link target='_blank' href={`/play/country/${country_code}`}>
                        <Button className='gap-2'>
                            <p>Try</p>
                            <IoMdLink className='text-lg mt-[1px]' />
                        </Button>
                    </Link>
                </ColorableFlag>
                { (toolSelected !== null) && <PaintbrushMouse color={`${toolSelected?.mouseBackground}`} /> }
            </div>
        </>
    );
};

export default VerifyCountries;