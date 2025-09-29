"use client";

import { forwardRef } from "react";
import classNames from "classnames";
import { Button, ButtonProps, ThemeColor } from "@yakad/ui";
import { Symbol } from "@yakad/symbols";
import { usePreferences } from "@/contexts/preferencesContext";

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
        title: "Switch to purple",
    },
    purple: {
        name: "Purple",
        title: "Switch to blue",
    },
};

export const ColorButton = forwardRef<HTMLButtonElement, ButtonProps>(
    function ColorButton(
        { title, icon, onClick, children, className, ...restProps },
        ref
    ) {
        const [preferences, setPreferences] = usePreferences();

        const currentOption: ThemeColor = preferences.themeColor || "green";

        const toggleOption = () => {
            const currentIndex = order.indexOf(currentOption);
            const nextIndex = (currentIndex + 1) % order.length;
            const nextOption = order[nextIndex];

            setPreferences((prev) => ({
                ...prev,
                themeColor: nextOption,
            }));
        };

        const joinedClassNames = classNames("fullWidthLover", className);

        return (
            <Button
                ref={ref}
                className={joinedClassNames}
                title={title || optionsMap[currentOption].title}
                icon={icon || <Symbol icon="circle" />}
                onClick={(e) => {
                    toggleOption();
                    onClick?.(e);
                }}
                {...restProps}
            >
                {children || optionsMap[currentOption].name}
            </Button>
        );
    }
);
