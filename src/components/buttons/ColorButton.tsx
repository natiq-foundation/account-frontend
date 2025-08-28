"use client";

import { forwardRef } from "react";
import { Button, ButtonProps, ThemeColor } from "@yakad/ui";
import { Symbol } from "@yakad/symbols";
import { useStorage } from "@/contexts/storageContext";

const order: ThemeColor[] = ["blue", "green", "red", "yellow", "purple"];

const optionsMap: Record<ThemeColor, { name: string; title: string }> = {
    blue: {
        name: "Blue",
        title: "Switch to green",
    },
    green: {
        name: "Green",
        title: "Switch to red",
    },
    red: {
        name: "Red",
        title: "Switch to yellow",
    },
    yellow: {
        name: "Yellow",
        title: "Switch purple",
    },
    purple: {
        name: "Purple",
        title: "Switch to blue",
    },
};

export const ColorButton = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ title, icon, onClick, children, ...restProps }, ref) => {
        const { storage, setStorage } = useStorage();

        const currentOption: ThemeColor =
            storage?.settings?.themeColor || "green";

        const toggleOption = () => {
            const currentIndex = order.indexOf(currentOption);
            const nextIndex = (currentIndex + 1) % order.length;
            const nextOption = order[nextIndex];

            setStorage((prev) => ({
                ...prev,
                settings: {
                    ...prev.settings,
                    themeColor: nextOption,
                },
            }));
        };

        return (
            <Button
                ref={ref}
                {...restProps}
                title={title || optionsMap[currentOption].title}
                icon={icon || <Symbol icon="circle" />}
                onClick={(e) => {
                    toggleOption();
                    onClick?.(e);
                }}
            >
                {children || optionsMap[currentOption].name}
            </Button>
        );
    }
);
ColorButton.displayName = "ColorButton";
