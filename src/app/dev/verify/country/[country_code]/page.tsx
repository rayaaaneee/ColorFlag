"use client";

import ColorableFlag from '@/components/colorable-flag';
import Country from '@/useful/interfaces/country';
import SyntaxHighlighter from 'react-syntax-highlighter';

import styles from "@/asset/scss/dev.module.scss";

import ButtonGoBackOrNext, { Direction } from "@/components/inputs/button-go-back-or-next";

import countriesArray from "@/asset/data/countries.json";
import { useParams } from 'next/navigation';
import uppercaseFirstWordsLetters from '@/useful/uppercaseFirstWordsLetters';
import { vs2015 as theme } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import Checkbox from '@/components/inputs/checkbox';
import CopyButton from '@/components/inputs/copy-button';
import SelectableColorCircle from '@/components/selectable-color-circle';
import Tooltip from '@/components/tooltip';

import eraserTexture from '@/asset/img/pages/dev/eraser.png';
import selectorTexture from '@/asset/img/pages/dev/selector.png';

import { CiEraser } from "react-icons/ci";
import Button from '@/components/inputs/button';
import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import PaintbrushMouse from '@/components/svg/paintbrush-mouse';
import Position from '@/useful/interfaces/position';

interface VerifyCountriesProps {

}

const VerifyCountries = ({}: VerifyCountriesProps) => {

    const exampleCode = `
    <div className='w-full flex flex-col items-center justify-center gap-12'>
        <div className=' w-full grid grid-cols-2 items-center justify-center gap-12'>
            <ColorableFlag 
                sourceElement={ countryElement } 
                itemName='country' 
                canValidate={ false } 
                canColor={ false }
            />
            <SyntaxHighlighter wrapLines="true" showLineNumbers="true" language="javascript">
                {exampleCode}
            </SyntaxHighlighter>
        </div>
    </div>
    `;

    const [cleared, setCleared] = useState<boolean>(false);
    const [allShapesKeeped, setAllShapesKeeped] = useState<boolean>(false);

    interface ButtonInterface { 
        texture: StaticImageData, 
        key: ButtonKey, 
        pathBackground: string 
    }
    
    const buttons: ButtonInterface[] = [
        {
            texture: selectorTexture,
            key: 'selection',
            pathBackground: 'selectedPathImg'
        },
        {
            texture: eraserTexture,
            key: 'eraser',
            pathBackground: 'emptyGreyPathImg'
        }
    ];
    type ButtonKey = 'selection' | 'eraser';
    const [selection, setSelection] = useState<ButtonInterface | null>(null);

    const [initialPaintbrushPosition, setInitialPaintbrushPosition] = useState<Position | null>(null);

    const countries: Country[] = countriesArray as Country[];

    const { country_code } = useParams<{ country_code?: string }>() as any;

    const countryElement: Country | undefined = countries.find((element: Country) => (element.code === (country_code as string)));

    const countryName: string = countryElement !== undefined ? uppercaseFirstWordsLetters(countryElement.name) : 'Unknown';

    const clearAll: MouseEventHandler<HTMLButtonElement> = (e) => {
        setCleared(true);
        setAllShapesKeeped(false);
        setSelection(null);
        setInitialPaintbrushPosition(null);
    }

    useEffect(() => {
        if (allShapesKeeped) {
            setSelection(null);
            setInitialPaintbrushPosition(null);
        }
    }, [allShapesKeeped]);

    const onSelect = (e: MouseEvent, button: ButtonInterface) => {
        if (selection?.key === button.key) {
            setSelection(null);
            setInitialPaintbrushPosition(null);

        } else {
            const rect: DOMRect = e.currentTarget.getBoundingClientRect();
            const middleX = rect.x + (rect.width / 2);
            const middleY = rect.y + (rect.height / 2);
            setInitialPaintbrushPosition({ x: middleX, y: middleY });
        
            setSelection(button);
        }
    }

    return (
        <>
            <div className='w-full h-full flex flex-col items-center justify-start gap-12'>
                <div className='w-full flex flex-row items-center justify-center mt-16 gap-12'>
                    <CopyButton stringToCopy={exampleCode} />
                    <div id={styles.codeRenderer} className='w-4/5'>
                        <SyntaxHighlighter style={theme} showLineNumbers={true} language="xml">
                            {exampleCode}
                        </SyntaxHighlighter>
                    </div>
                </div>
                <div className='absolute left-10 bottom-10 w-fit flex flex-col items-start justify-center gap-3'>
                    <ul className='flex flex-row gap-3 items-center justify-start'>
                        {buttons.map((button) => (
                                <Tooltip disabled={ allShapesKeeped } key={button.key} text={uppercaseFirstWordsLetters(button.key)}>
                                    <SelectableColorCircle onClick={e => onSelect(e, button)} disabled={ allShapesKeeped } color={`url(${button.texture.src})`} key={button.key} />
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
                        <Tooltip text={ cleared ? 'Cleared' : 'Clear all'}>
                            <Button onMouseLeave={(e) => (setCleared(false))} onClick={clearAll} customs={{paddingClass: "p-2"}}>
                                <CiEraser className='w-6 h-6' />
                            </Button>
                        </Tooltip>
                    </div>
                    <div className='flex flex-row gap-3'>
                        <ButtonGoBackOrNext 
                            dataSource={countries.map(country => ({ value: country.code}))} 
                            currentValue={ country_code } 
                            url={ `/dev/verify/country` }
                            direction={Direction.BACK} 
                        />
                        <ButtonGoBackOrNext 
                            dataSource={countries.map(country => ({ value: country.code}))} 
                            currentValue={ country_code } 
                            url={ `/dev/verify/country` }
                        />
                    </div>
                </div>
                <ColorableFlag 
                    className='absolute bottom-16 right-16'
                    sourceElement={ countryElement } 
                    itemName='country' 
                    canValidate={ false } 
                    canColor={ false }
                />
                { initialPaintbrushPosition !== null && <PaintbrushMouse initialPosition={initialPaintbrushPosition} color={`url(#${selection?.pathBackground})`} /> }
            </div>
        </>
    );
};

export default VerifyCountries;