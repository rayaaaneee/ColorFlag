import { MdOutlineNavigateNext } from "react-icons/md";
import Card from "@/useful/interfaces/card";
import Image from "next/image";
import Link from "next/link";

interface CardLinkInterface {
    element: Card
}

const CardLink = ({ element }: CardLinkInterface) => {
    return (
        <div style={{ backgroundColor: element.background}} className={`text-white max-w-sm rounded h-96 overflow-hidden shadow-lg`}>
            <div className="overflow-hidden flex items-center justify-center bg-white object-cover" style={{ height: "10.5rem"}}>
                <Image className={ element.imgClass } src={ element.image } alt="Sunset in the mountains" />
            </div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{ element.title }</div>
                <p className="text-gray-700 text-base">{ element.description }</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                { element.hashtags.map((element: string, index: number) => {
                    return (
                        <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#{ element }</span>
                    );
                }) }
            </div>
            <div className="w-full flex items-end justify-end">
                <Link href={element.href} className="flex items-center gap-2 mr-6 bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg">
                    Play
                    <MdOutlineNavigateNext className="text-2xl" />
                </Link>
            </div>
        </div>
    );
}

export default CardLink;