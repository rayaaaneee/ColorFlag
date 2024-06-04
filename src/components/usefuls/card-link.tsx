import { MdOutlineNavigateNext } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/inputs/button";
import Tag from "./tag";
import { Url } from "next/dist/shared/lib/router/router";
import { StaticImageData } from "next/image";

export interface Card {
    image: StaticImageData,
    title: string,
    href: Url,
    imgClass?: string,
    description?: string,
    tags?: string[]
}

interface CardLinkInterface {
    className?: string,
    heightClass?: string,
    element: Card,
}

const CardLink = ({ className = "", element, heightClass = "h-[27rem]" }: CardLinkInterface) => {
    return (
        <div className={`${className} ${heightClass} min-h-fit grid grid-rows-[auto_1fr_auto_auto] text-white max-w-sm rounded w-80 overflow-hidden bg-main opacity-80 shadow-lg`}>
            <div className="overflow-hidden flex items-center justify-center bg-white object-cover" style={{ height: "10.5rem"}}>
                <Image draggable={ false } className={ element.imgClass } src={ element.image } alt="Sunset in the mountains" />
            </div>
            <div className="px-6 pt-4">
                <div className="font-bold text-xl mb-2">{ element.title }</div>
                <p className="text-slate-300 text-base">{ element.description }</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                { element.tags?.map((tag: string, index: number) => {
                    return (
                        <Tag key={index} text={tag} />
                    );
                }) }
            </div>
            <div className="w-full flex items-end justify-end">
                <Link href={element.href} className="mb-3 flex items-center gap-2 mr-3 font-bold py-2 px-4 rounded-lg">
                    <Button 
                        className="w-full h-full" 
                        customs={{ 
                            colorClass: "bg-white", 
                            hoverColorClass: "hover:bg-gray-200", 
                            textColorClass: "text-gray-800", 
                            paddingClass: "py-2 px-3",
                            hasShadow: false,
                        }
                    }>
                        <>
                            <p>Play</p>
                            <MdOutlineNavigateNext className="text-2xl" />
                        </>
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default CardLink;