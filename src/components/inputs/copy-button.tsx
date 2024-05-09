import { MouseEventHandler, useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { FaCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import Button from "@/components/inputs/button";
import Tooltip from "../tooltip";

export interface CopyButtonProps {
    stringToCopy: string;
    onCopy?: () => void;
}

const CopyButton = ({ stringToCopy, onCopy = () => {} }: CopyButtonProps) => {

    const [copied, setCopied] = useState<boolean>(false);

    const copyString: MouseEventHandler<HTMLButtonElement> = () => {
        onCopy();
        navigator.clipboard.writeText(stringToCopy);
        setCopied(true);
    }

    useEffect(() => {
        if (copied) {
            const timeout = setTimeout(() => {
                setCopied(false);
                clearTimeout(timeout);
            }, 1000);
        }
    }, [copied]);

    const iconColor: string = "white";
    const iconSize: string = "1.5em";

    return (
        <div>
            <div className="flex items-center gap-x-4">
                <Tooltip text={ copied ? "Copied" : "Copy"}>
                    <Button onClick={copyString}
                        className="h-10 max-h-[40px] w-10 max-w-[40px]"
                    >
                        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                            { copied ? (
                                <FaCheck color={iconColor} size={iconSize} />
                            ) : (
                                <FaCopy color={iconColor} size={iconSize} />
                            ) }
                        </span>
                    </Button>
                </Tooltip>
            </div>
        </div>
    );
}

export default CopyButton;