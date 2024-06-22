"use client";

import SvgPattern, { SvgPatternInterface } from "@/components/svg/svg-pattern";
import cn from "@/lib/utils/cn";
import randint from "@/utils/randint";
import { MouseEventHandler, useEffect, useRef } from "react";
import { renderToString } from "react-dom/server";
import { CountryMapGame } from "../page";

export interface MapButtonCardProps {
    country: CountryMapGame;
    selected: boolean;
    isAnswer?: boolean;
    showAnswer?: boolean;
    onClick?: MouseEventHandler<HTMLDivElement>;
    id?: string;
    className?: string;
}

const MapButtonCard = ({ country, id, className, showAnswer = false, selected = false, onClick }: MapButtonCardProps) => {
    const SvgImage: any = require(`~/public/images/maps/country/${country.id}.svg`).default;

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => { 
        console.log(svgRef.current);
        if (svgRef.current) {

            let defs: SVGDefsElement | null = svgRef.current.querySelector('defs');
            if (!defs) {
                defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                svgRef.current.appendChild(defs);
            }
            const svgWidth: number = 8000;
            const svgHeight: number = 8000;
            const objectPattern: SvgPatternInterface = {
                x: 0,
                y: 0,
                patternWidth: svgWidth,
                patternHeight: svgWidth,
                imageWidth: svgWidth,
                imageHeight: svgWidth,
                customPatternId: `pattern-map-${country.id}`,
                customImageSrc: `maps/map${randint(1, 4)}.jpg`,
            };

            const pattern: string = renderToString(<SvgPattern {...objectPattern} />);

            if (!defs.querySelector(`#${objectPattern.customPatternId}`)) {
                defs.insertAdjacentHTML('afterbegin', pattern);
                const group: SVGGElement | null = svgRef.current.querySelector('g');
                if (group) {
                    group.setAttribute('fill', `url(#${objectPattern.customPatternId})`);
                    group.setAttribute('stroke', '#000');
                    group.setAttribute('stroke-width', '40');
                }
            }

            svgRef.current.classList.remove('opacity-0');

        }
    }, [SvgImage]);
    
    if (!SvgImage) return (null);

    return (
        <div onClick={onClick} id={id} className={cn(`w-52 h-52 bg-gray-400 rounded-xl justify-self-center flex items-center justify-center cursor-pointer text-[#6d6d6d] hover:bg-gray-300 transition-colors`, 
            selected && `bg-green-100 hover:bg-green-200`,
            showAnswer && country.isAnswer && `bg-green-100 hover:bg-green-200`,
            showAnswer && !country.isAnswer && selected && `bg-red-100 hover:bg-red-200 animate-pulse-fast`,
            className
        )}>
            <SvgImage ref={svgRef} draggable={false} alt="country-map" className="w-[80%] h-fit opacity-0 transition-opacity" />
        </div>
    );
}

export default MapButtonCard;