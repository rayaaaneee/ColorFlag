"use client";

import { ErrorComponent } from "next/dist/client/components/error-boundary";
import { useEffect } from "react";

export interface CustomErrorBoundaryPropsInterface {
    error: Error & { digest?: string }
    reset?: () => void
}

const CustomErrorBoundary = ({error, reset}: CustomErrorBoundaryPropsInterface) => {

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (<>
    </>);
}

export default CustomErrorBoundary as ErrorComponent;