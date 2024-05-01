"use client";

import { ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
import countries from "@/asset/data/countries.json";
import styles from "@/asset/scss/play.module.scss";

const Play = () => {

    const [selectedCountry, setSelectedCountry] = useState<string>();

    const svgContainer = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const loadCountrySVG = async () => {
            try {
                fetch(`/api/svg/${selectedCountry}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (svgContainer.current) {
                            svgContainer.current.innerHTML = data.svg;
                        }
                        const allShapes: NodeListOf<SVGElement> | undefined = svgContainer.current?.querySelectorAll('path, circle');
                        if (allShapes != undefined) {
                            allShapes.forEach((shape) => {
                                const initialFill: string = (shape.getAttribute('fill')) as string;
                                shape.setAttribute('fill', 'white');
                                (shape).style.strokeWidth = '2.5px';
                                shape.style.stroke = 'black';

                                shape.addEventListener('click', (event) => {
                                    shape.setAttribute('fill', initialFill);
                                });
                            });
                        }
                    });
            } catch (error) {
                console.error('Error loading country SVG:', error);
            }
        };

        if (selectedCountry) {
            loadCountrySVG();
        }
    }, [selectedCountry]);

    return (
        <main id={ styles.main }>
            <select onChange={ (e) => setSelectedCountry(e.currentTarget.value) }>
                <option value="null" selected>Please select a country</option>
                {countries.map((element) => {
                    const [key, value] = Object.entries(element)[0];
                    return (
                        <>
                            <option value={key}>
                                <p>{ value }</p>
                            </option>
                        </>
                    )
                })}
            </select>
            <div ref={svgContainer} className={ styles.svgContainer } />
        </main>
    );
}
export default Play;
