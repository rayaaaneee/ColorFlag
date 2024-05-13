import { Url } from "next/dist/shared/lib/router/router";
import { StaticImageData } from "next/image";

interface Card {
    image: StaticImageData,
    title: string,
    imgClass: string,
    description: string,
    href: Url,
    //background: string,
    tags: string[]
}

export default Card;