"use client";

import { ChevronRight } from "lucide-react";

export function SecurityItem({
    label,
    value,
    onClick,
}: {
    label: string;
    value?: string | number;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between py-3 px-3 text-left hover:bg-accent border-b transition"
        >
            <div className="flex flex-col">
                <span className="font-medium">{label}</span>
                {value && (
                    <span className="text-sm text-muted-foreground">{value}</span>
                )}
            </div>

            <ChevronRight className="size-5 text-muted-foreground" />
        </button>
    );
}
