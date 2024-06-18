import cn from "@/lib/utils/cn";
import { type Key } from "react";

export interface TagInterface {
    text: string,
    className?: string,
    hasHash?: boolean,
    key?: Key,
}

const Tag = ({text, className = "", hasHash = true, key = undefined}: TagInterface) => {
    return (
        <span key={key} className={cn("inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2", className)}>{`${hasHash && '#' || ""}${text}`}</span>
    );
}

export default Tag;