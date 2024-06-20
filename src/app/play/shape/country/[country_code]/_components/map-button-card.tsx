import cn from "@/lib/utils/cn";
import Image from "next/image";
import { MouseEventHandler } from "react";
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
    return (
        <div onClick={onClick} id={id} className={cn(`w-52 h-52 bg-gray-200 rounded-xl justify-self-center flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors`, 
            selected && `bg-green-100 hover:bg-green-200`,
            showAnswer && country.isAnswer && `bg-green-100 hover:bg-green-200`,
            showAnswer && !country.isAnswer && selected && `bg-red-100 hover:bg-red-200 animate-pulse-fast`,
            className
        )}>
            <Image draggable={false} src={`/images/maps/country/${country.code}.svg`} alt="Country shape" width={100} height={100} objectFit="cover" className="w-[60%]" />
        </div>
    );
}

export default MapButtonCard;