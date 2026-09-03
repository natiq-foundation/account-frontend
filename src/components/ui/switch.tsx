import * as React from "react";

import { cn } from "@/lib/utils";

export interface SwitchProps extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "onChange"
> {
    readonly checked?: boolean;
    readonly onCheckedChange?: (checked: boolean) => void;
}

export const Switch = ({
    checked = false,
    onCheckedChange,
    className,
    disabled,
    ...props
}: SwitchProps) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (disabled) return;
        onCheckedChange?.(!checked);
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={checked}
            disabled={disabled}
            onClick={handleClick}
            dir="ltr"
            className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:opacity-40",
                checked ? "bg-blue-600" : "bg-zinc-800",
                className,
            )}
            {...props}
        >
            <span
                className={cn(
                    "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-md transition-all duration-200 ease-in-out",
                    checked ? "translate-x-5" : "translate-x-0",
                )}
            />
        </button>
    );
};
