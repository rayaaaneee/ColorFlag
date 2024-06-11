import ChildrenType from "@/useful/types/children-type";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";

export interface CustomLinkPropsInterface {
    href: Url;
    children: ChildrenType;
}

const CustomLink = ({ href, children }: CustomLinkPropsInterface) => {
    return (
        <Link href={href}>
            { children }
        </Link>
    )
}

export default CustomLink;