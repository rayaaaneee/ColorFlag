"use client";

import styles from "@/asset/scss/layout.module.scss";

import { usePathname } from "next/navigation";
import Link from 'next/link';

import { FaPlay } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";
import { PiSignInBold } from "react-icons/pi";

const Menu = () => {
    const iconAttr = {
        color: "white",
        className: "cursor-pointer",
    }

    const pathname = usePathname();
 
    return (
        <div className={ `${styles.menu} flex gap-5 flex-col items-center justify-center` }>
            <Link href={"/play"}>
                <FaPlay { ...iconAttr }/>
            </Link>
            <Link href={"/account"}>
                <RiAccountPinCircleFill { ...iconAttr }/>
            </Link>
            <div onClick={(e) => {}}>
                <PiSignOutBold { ...iconAttr }/>
            </div>
            <Link href={"/signin"}>
                <PiSignInBold { ...iconAttr }/>
            </Link>
        </div>
    );
}

export default Menu;