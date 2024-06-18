import cn from "@/lib/utils/cn";
import type ChildrenType from "@/utils/types/children-type";
import { type Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { forwardRef, type ForwardedRef, type MouseEventHandler } from "react";

export interface CustomLinkPropsInterface {
    href: Url;
    children?: ChildrenType;
    className?: string;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const CustomLink = forwardRef(({ href, children = undefined, className = "", onClick = undefined  }: CustomLinkPropsInterface, ref: ForwardedRef<HTMLAnchorElement>) => {
    return (
        <Link ref={ref} href={href} className={cn("font-medium w-full text-gray-600 hover:text-gray-700 hover:underline", className)} onClick={onClick}>
            { children }
        </Link>
    )
});

CustomLink.displayName = "CustomLink";

export default CustomLink;