import { type MouseEventHandler } from "react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";
import { TbBrandGithubFilled } from "react-icons/tb";

import cn from "@/lib/utils/cn";
import Tooltip from '../usefuls/tooltip';
import Button from "./button";

interface ConnectionButtonProps {
    children?: JSX.Element;
    className?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const ConnectionButton = ({ children = undefined, className, onClick }: ConnectionButtonProps) => {
    return (
      <Button onClick={onClick} className={cn("size-20 p-0 text-white rounded-full bg-main", className)}>
          { children }
      </Button>
    )
}

export interface CustomConnectionButtonProps {

}

export const GoogleConnectionButton = ({}: CustomConnectionButtonProps) => 
    (<Tooltip text={"Google"}>
        <ConnectionButton className="bg-red-500 hover:bg-red-600">
            <FaGoogle className="w-1/3 h-1/3" />
        </ConnectionButton>
    </Tooltip>)

export const GithubConnectionButton = ({}: CustomConnectionButtonProps) => 
    (<Tooltip text={"Github"}>
        <ConnectionButton className="bg-main hover:bg-black">
            <TbBrandGithubFilled className="w-2/5 h-2/5" />
        </ConnectionButton>
    </Tooltip>)

export const FacebookConnectionButton = ({}: CustomConnectionButtonProps) => 
    (<Tooltip text={"Facebook"}>
        <ConnectionButton className="bg-blue-900 hover:bg-blue-950">
            <FaFacebookF className="w-1/3 h-1/3" />
        </ConnectionButton>
    </Tooltip>)

export const AppleConnectionButton = ({}: CustomConnectionButtonProps) => 
    (<Tooltip text={"Apple"}>
        <ConnectionButton className="bg-black hover:bg-gray-900">
            <FaApple className="w-1/3 h-1/3" />
        </ConnectionButton>
    </Tooltip>)