import styles from "@/asset/scss/play.module.scss";
import cn from "@/lib/utils/cn";
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
        <li onClick={onClick} className={ cn(styles.colorItem, selected && styles.selected, { "pointer-events-none opacity-[0.5] min-w-fit": disabled }, className) } style={{ background: color, backgroundSize: "cover" }}>
        </li>
    )
}

SelectableColorCircle.displayName = "SelectableColorCircle";

export default SelectableColorCircle;