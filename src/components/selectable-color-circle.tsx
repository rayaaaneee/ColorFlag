import styles from "@/asset/scss/play.module.scss";
import { Key, MouseEventHandler } from "react";

export interface SelectableColorCircleProps {
    color: string;
    key?: Key;
    selected?: boolean;
    onClick?: MouseEventHandler<HTMLLIElement>;
    className?: string;
    disabled?: boolean;
}

const SelectableColorCircle = ({ color, selected = undefined, onClick = (_) => {}, className = "", key = undefined, disabled = false }: SelectableColorCircleProps) => {
    return (
        <li onClick={onClick} className={ `${className} ${styles.colorItem} ${ selected && (styles.selected) } ${ disabled && "pointer-events-none opacity-[0.5]" }` } key={key} style={{ background: color, backgroundSize: "cover" }}>
        </li>
    )
}

SelectableColorCircle.displayName = "SelectableColorCircle";

export default SelectableColorCircle;