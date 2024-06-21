import cn from "@/lib/utils/cn";
import { useEffect, useState } from "react";

export interface ProgressBarInterface {
    value: number;
    color?: string;
    colorSync?: boolean;
    className?: string;
}

const ProgressBar = ({value, color = "bg-gray-900", colorSync = false, className = ""}: ProgressBarInterface) => {

    const [valueState, setValueState] = useState((value > 100) ? 100 : (value < 0) ? 0 : value);

    useEffect(() => setValueState((value > 100) ? 100 : (value < 0) ? 0 : value), [value]);

    const getSyncColor = (value: number): string => {
        let color: string;
        if (value <= 5) {
            color = "bg-red-500";
        } else if (value <= 10) {
            color = "bg-red-400";
        } else if (value <= 15) {
            color = "bg-red-300";
        } else if (value <= 20) {
            color = "bg-red-200";
        } else if (value <= 25) {
            color = "bg-red-100";
        } else if (value <= 30) {
            color = "bg-yellow-500";
        } else if (value <= 35) {
            color = "bg-yellow-400";
        } else if (value <= 40) {   
            color = "bg-yellow-300";
        } else if (value <= 45) {
            color = "bg-yellow-200";
        } else if (value <= 50) {
            color = "bg-yellow-100";
        } else if (value <= 55) {
            color = "bg-green-500";
        } else if (value <= 60) {
            color = "bg-green-400";
        } else if (value <= 65) {
            color = "bg-green-300";
        } else if (value <= 70) {
            color = "bg-green-200";
        } else if (value <= 75) {
            color = "bg-green-100";
        } else if (value <= 80) {
            color = "bg-blue-500";
        } else if (value <= 85) {
            color = "bg-blue-400";
        } else if (value <= 90) {
            color = "bg-blue-300";
        } else if (value <= 95) {
            color = "bg-blue-200";
        } else {
            color = "bg-blue-100";
        }
        return color;
    }

    return (
         <div className={cn("flex-start flex h-2.5 w-full overflow-hidden rounded-full bg-blue-gray-50 font-sans text-xs font-medium bg-slate-900", className)}>
            <div style={{ width: `${valueState ||0}%` }} className={`transition-all duration-700 flex h-full items-center justify-center overflow-hidden break-all rounded-full ${!colorSync ? color : getSyncColor(valueState)} text-white`}></div>
        </div>
    );
}

export default ProgressBar;