"use client";

import { forwardRef, useState } from "react";
import { Button, ButtonProps } from "@yakad/ui";

export const ResetButton = forwardRef<HTMLButtonElement, ButtonProps>(
    function ResetButton({ children, onClick, ...restProps }, ref) {
        const [reseting, setReseting] = useState(false);

        const handleReset = () => {
            setReseting(true);
            localStorage.clear();
            window.location.reload();
            window.location.href = "/";
        };

        return (
            <Button
                ref={ref}
                {...restProps}
                onClick={(e) => {
                    onClick?.(e);
                    handleReset();
                }}
                disabled={reseting}
            >
                {children || reseting ? "Resetting..." : "Reset everything"}
            </Button>
        );
    }
);
