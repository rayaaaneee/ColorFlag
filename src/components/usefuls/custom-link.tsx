import ChildrenType from "@/useful/types/children-type";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { ForwardedRef, MouseEventHandler, forwardRef } from "react";

export interface CustomLinkPropsInterface {
    href: Url;
    children?: ChildrenType;
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const CustomLink = forwardRef(({ href, children = undefined, className = "", onClick = undefined  }: CustomLinkPropsInterface, ref: ForwardedRef<HTMLAnchorElement>) => {
    return (
        <Link ref={ref} href={href} className={`${className} font-medium w-full text-gray-600 hover:text-gray-700 hover:underline`} onClick={onClick}>
            { children }
        </Link>
    )
});

export default CustomLink;