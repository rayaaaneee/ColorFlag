"use client";

import { MouseEventHandler, ReactEventHandler, SyntheticEvent, useEffect, useRef, useState } from "react";
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
                        initShape();
                    });
            } catch (error) {
                console.error('Error loading country SVG:', error);
            }
        };

        if (selectedCountry) {
            loadCountrySVG();
        }
    }, [selectedCountry]);

    const initShape = () => {
        const allShapes: NodeListOf<SVGElement> | undefined = svgContainer.current?.querySelectorAll('path, circle');
            if (allShapes != undefined) {
                allShapes.forEach((shape) => {
                    const initialFill: string = (shape.getAttribute('fill')) as string;
                    shape.setAttribute('fill', 'white');
                    shape.style.strokeWidth = '2.5px';
                    shape.style.stroke = 'black';
                    shape.classList.add(styles.svgContent);

                    shape.onclick = (e) => {
                        shape.setAttribute('fill', initialFill);
                        shape.classList.remove(styles.svgContent);
                    };
                });
            }
    }

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

    return (
        <>
            <select
                className="w-1/4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={ (e) => setSelectedCountry(e.currentTarget.value) }>
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
            <div ref={svgContainer} className={ `${styles.svgContainer} bg-gray-50 dark:bg-gray-900` }>
            </div>
            <button type="button" onClick={validateFlag} className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">OK</button>
        </>
    );
}
export default Play;
