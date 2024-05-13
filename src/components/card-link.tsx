import { MdOutlineNavigateNext } from "react-icons/md";
import Card from "@/useful/interfaces/card";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/inputs/button";

interface CardLinkInterface {
    className?: string,
    element: Card
}

const CardLink = ({ className = "", element }: CardLinkInterface) => {
    return (
        <div style={{ backgroundColor: undefined /*element.background*/}} className={`${className}min-h-95 text-white max-w-sm rounded min-h-fit overflow-hidden bg-main opacity-80 shadow-lg`}>
            <div className="overflow-hidden flex items-center justify-center bg-white object-cover" style={{ height: "10.5rem"}}>
                <Image draggable={ false } className={ element.imgClass } src={ element.image } alt="Sunset in the mountains" />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{ element.title }</div>
                <p className="text-slate-300 text-base">{ element.description }</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                { element.hashtags.map((element: string, index: number) => {
                    return (
                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{ element }</span>
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
                            textColor: "text-gray-800", 
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