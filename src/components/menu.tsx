"use client";

import styles from "@/asset/scss/layout.module.scss";

import { usePathname } from "next/navigation";
import Link from 'next/link';

import { FaPlay } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";
import { PiSignInBold } from "react-icons/pi";
import { IoSettingsSharp } from "react-icons/io5";
import { RiCodeView } from "react-icons/ri";

import logo from "@/app/favicon.png";
import Image from "next/image";
import Tooltip from "./usefuls/tooltip";

interface MenuItem {
    icon: JSX.Element;
    text: string;
    visible?: boolean | undefined;
    href?: string | undefined;
    onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const Menu = () => {
    const iconAttr = {
        color: "white",
    }

    const pathname: string | null = usePathname();

    const menuItems: MenuItem[] = [
        {
            icon: <FaPlay { ...iconAttr }/>,
            href: "/play",
            text: "Play",
        },
        {
            icon: <RiAccountPinCircleFill { ...iconAttr }/>,
            href: "/account",
            text: "My account",
        },
        {
            icon: <PiSignOutBold { ...iconAttr }/>,
            onClick: (e) => {},
            visible: false,
            text: "Sign out",
        },
        {
            icon: <PiSignInBold { ...iconAttr }/>,
            href: "/signin",
            text: "Sign in",
        },
        {
            icon: <IoSettingsSharp { ...iconAttr }/>,
            href: "/settings",
            text: "Settings",
        },
    ];

    if (process.env.NODE_ENV === "development") {
        const devItem: MenuItem = {
            icon: <RiCodeView { ...iconAttr }/>,
            href: "/dev",
            text: "Dev pages",
        }
        menuItems.push(devItem);
    }
 
    return (
        <div className={`${styles.menu} relative bg-main flex gap-5 flex-col items-center justify-center`}>
            <div className={`absolute top-0 left-0 w-full h-16 flex items-center justify-center`}>
                <Image draggable={false} alt="app-icon" src={logo} className="w-3/5" />
            </div>
            {menuItems.map((el: MenuItem, index: number) => {
                const active: boolean = ((pathname !== null) && (el.href !== undefined) && (pathname.includes(el.href)))
                const className: string = `p-2 bg-main hoverable rounded-lg flex ${active ? "selected" : ""}`;
                if (el.visible === false) return (<></>);
                return (
                    <Tooltip type="default-2" text={el.text} position="right">
                        { el.href !== undefined ? (
                            <Link href={el.href} key={index} className={className}>
                                {el.icon}
                            </Link>
                        ) : (
                            <div key={index} onClick={el.onClick} className={className}>
                                {el.icon}
                            </div>
                        ) }
                    </Tooltip>
                );
            })}
        </div>
    );
}

export default Menu;