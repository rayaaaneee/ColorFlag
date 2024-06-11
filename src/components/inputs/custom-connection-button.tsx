import { FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { TbBrandGithubFilled } from "react-icons/tb";
import { MouseEventHandler } from "react";

import Tooltip from '../usefuls/tooltip';
import Button from "./button";

interface ConnectionButtonProps {
    children?: JSX.Element;
    colorClassName?: string;
    hoverColorClassName?: string;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ConnectionButton = ({ children = undefined, colorClassName = "bg-main", className, onClick, hoverColorClassName }: ConnectionButtonProps) => {
    return (
      <Button onClick={onClick} className={`size-20 ${className}`} customs={{ hoverColorClass: hoverColorClassName, paddingClass: "p-0", colorClass: colorClassName, textColorClass: "text-white", borderRadiusClass: "rounded-full" }}>
          { children }
      </Button>
    )
}

export interface CustomConnectionButtonProps {

}

export const GoogleConnectionButton = ({}: CustomConnectionButtonProps) => 
    (<Tooltip text={"Google"}>
        <ConnectionButton colorClassName="bg-red-500" hoverColorClassName="hover:bg-red-600">
            <FaGoogle className="w-1/3 h-1/3" />
        </ConnectionButton>
    </Tooltip>)

export const GithubConnectionButton = ({}: CustomConnectionButtonProps) => 
    (<Tooltip text={"Github"}>
        <ConnectionButton colorClassName="bg-main" hoverColorClassName="hover:bg-black">
            <TbBrandGithubFilled className="w-2/5 h-2/5" />
        </ConnectionButton>
    </Tooltip>)

export const FacebookConnectionButton = ({}: CustomConnectionButtonProps) => 
    (<Tooltip text={"Facebook"}>
        <ConnectionButton colorClassName="bg-blue-900" hoverColorClassName="hover:bg-blue-950">
            <FaFacebookF className="w-1/3 h-1/3" />
        </ConnectionButton>
    </Tooltip>)