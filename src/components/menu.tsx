import styles from "@/asset/scss/layout.module.scss";

import { FaPlay } from "react-icons/fa";
import { RiAccountPinCircleFill } from "react-icons/ri";
import { PiSignOutBold } from "react-icons/pi";
import { PiSignInBold } from "react-icons/pi";

const Menu = () => {
    const iconAttr = {
        color: "white",
        className: "cursor-pointer",
    }
    return (
        <div className={ `${styles.menu} flex gap-5 flex-col items-center justify-center` }>
            <FaPlay { ...iconAttr }/>
            <RiAccountPinCircleFill { ...iconAttr }/>
            <PiSignOutBold { ...iconAttr }/>
            <PiSignInBold { ...iconAttr }/>
        </div>
    );
}

export default Menu;