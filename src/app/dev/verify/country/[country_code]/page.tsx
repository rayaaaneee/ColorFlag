"use client";

import ColorableFlag from '@/components/colorable-flag';
import Country from '@/useful/interfaces/country';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { dark as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';

import ButtonGoBackOrNext, { Direction } from "@/components/inputs/button-go-back-or-next";

import countriesArray from "@/asset/data/countries.json";
import { useParams } from 'next/navigation';
import uppercaseFirstWordsLetters from '@/useful/uppercaseFirstWordsLetters';
import { vs2015 } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { FaCopy } from "react-icons/fa6";
import Button from '@/components/inputs/button';
import { MouseEventHandler } from 'react';
import Checkbox from '@/components/inputs/checkbox';
import CopyButton from '@/components/inputs/copy-button';

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

    const countries: Country[] = countriesArray as Country[];

    const { country_code } = useParams<{ country_code?: string }>() as any;

    const countryElement: Country | undefined = countries.find((element: Country) => (element.code === (country_code as string)));

    const countryName: string = countryElement !== undefined ? uppercaseFirstWordsLetters(countryElement.name) : 'Unknown';

    const copyCode: MouseEventHandler<HTMLButtonElement> = (e) => {
        navigator.clipboard.writeText(exampleCode);
    }

    return (
      <>
          <div className='w-full h-full flex flex-col items-center justify-start gap-12'>
              <div className='w-full flex flex-row items-center justify-center mt-16 gap-12'>
                  {/* <Button onClick={copyCode}>
                      <FaCopy />
                  </Button> */}
                  <CopyButton stringToCopy={exampleCode} />
                  <div className='w-4/5'>
                      <SyntaxHighlighter style={vs2015} showLineNumbers={true} language="xml">
                          {exampleCode}
                      </SyntaxHighlighter>
                  </div>
              </div>
              <div className='absolute left-10 bottom-10 w-fit flex flex-col items-center justify-center gap-3'>
                  <Checkbox 
                    label='Keep all shapes'
                    checked={true} 
                  />
                  <div className='flex flex-row'>
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
                  className='absolute bottom-3 right-3'
                  sourceElement={ countryElement } 
                  itemName='country' 
                  canValidate={ false } 
                  canColor={ false }
              />
          </div>
      </>
    );
};

export default VerifyCountries;