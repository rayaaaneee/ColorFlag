"use client";

import styles from "@/asset/scss/layout.module.scss";

import { usePathname } from "next/navigation";
import Link from 'next/link';

import { FaPlay } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";
import { PiSignInBold } from "react-icons/pi";
import { IoSettingsSharp } from "react-icons/io5";

interface MenuItem {
    icon: JSX.Element;
    visible?: boolean | undefined;
    href?: string | undefined;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
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
        },
        {
            icon: <RiAccountPinCircleFill { ...iconAttr }/>,
            href: "/account",
        },
        {
            icon: <PiSignOutBold { ...iconAttr }/>,
            onClick: (e) => {},
            visible: false,
        },
        {
            icon: <PiSignInBold { ...iconAttr }/>,
            href: "/signin",
        },
        {
            icon: <IoSettingsSharp { ...iconAttr }/>,
            href: "/settings",
        }
    ];
 
    return (
        <div className={`${styles.menu} main-bg flex gap-5 flex-col items-center justify-center`}>
            {menuItems.map((el: MenuItem, index: number) => {
                const active: boolean = ((pathname !== null) && (el.href !== undefined) && (pathname.includes(el.href)))
                const className: string = `p-2 main-bg hoverable rounded-lg ${active ? "scnd-bg" : ""}`;
                if (el.visible === false) return (null);
                return el.href !== undefined ? (
                    <Link href={el.href} key={index} className={ className }>
                        {el.icon}
                    </Link>
                ) : (
                    <a key={index} onClick={el.onClick} className={ className }>
                        {el.icon}
                    </a>
                )
            })}
        </div>
    );
}

export default Menu;