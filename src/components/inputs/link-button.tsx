"use client";

import cn from "@/lib/utils/cn";
import ChildrenType from "@/utils/types/children-type";
import Link from "next/link";
import { MouseEventHandler } from "react";
import { TooltipPosition } from "../utils/tooltip";
import Button from "./button";

export interface LinkButtonProps {
    children: ChildrenType,
    href: string,
    className?: string,
    linkClassName?: string,
    disabled?: boolean,
    title?: string,
    titlePosition?: TooltipPosition,
    onClick?: MouseEventHandler<HTMLButtonElement>,
}

const LinkButton = ({ children, href, titlePosition = "top", className, linkClassName, title = undefined, disabled = false, onClick }: LinkButtonProps) => {
    console.log(title);
    return (
        <Link href={href} className={cn(`flex flex-row items-center justify-center gap-2`, linkClassName)}>
            <Button asDiv title={title} titlePosition={titlePosition} disabled={disabled} className={className} onClick={onClick}>
                {children}
            </Button>
        </Link>
    );
}

export default LinkButton;