

import Button from "@/components/inputs/button";
import { MouseEventHandler } from "react";

export interface ConnectionButtonProps {
    children?: JSX.Element;
    colorClassName?: string;
    hoverColorClassName?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ConnectionButton = ({ children = undefined, colorClassName = "bg-main", className, onClick, hoverColorClassName }: ConnectionButtonProps) => {
    return (
      <Button onClick={onClick} className={`w-14 h-14 ${className}`} customs={{ hoverColorClass: hoverColorClassName, paddingClass: "p-0", colorClass: colorClassName, textColorClass: "text-white", borderRadiusClass: "rounded-full" }}>
          { children }
      </Button>
    )
}

export default ConnectionButton
