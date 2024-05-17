import styles from "@/asset/scss/play.module.scss";
import { MouseEventHandler } from "react";

export interface SelectableColorCircleProps {
    color: string;
    selected?: boolean;
    onClick?: MouseEventHandler<HTMLLIElement>;
    className?: string;
    disabled?: boolean;
}

const SelectableColorCircle = ({ color, selected = undefined, onClick = (_) => {}, className = "", disabled = false }: SelectableColorCircleProps) => {
    return (
        <li onClick={onClick} className={ `${className} ${styles.colorItem} ${ selected && (styles.selected) } ${ disabled && "pointer-events-none opacity-[0.5] min-w-fit" }` } style={{ background: color, backgroundSize: "cover" }}>
        </li>
    )
}

SelectableColorCircle.displayName = "SelectableColorCircle";

export default SelectableColorCircle;