import { MouseEventHandler, useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";
import { FaCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import Button from "@/components/inputs/button";

export interface CopyButtonProps {
    stringToCopy: string;
}

const CopyButton = ({ stringToCopy }: CopyButtonProps) => {

    const [copied, setCopied] = useState<boolean>(false);

    const onCopy: MouseEventHandler<HTMLButtonElement> = () => {
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
                <Button onClick={onCopy}
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
            </div>
        </div>
    );
}

export default CopyButton;