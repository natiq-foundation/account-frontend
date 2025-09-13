"use client";

import { forwardRef } from "react";
import classNames from "classnames";
import { Button, ButtonProps, DarkStyle } from "@yakad/ui";
import { IconCode, Symbol } from "@yakad/symbols";
import { usePreferences } from "@/contexts/preferencesContext";

const order: DarkStyle[] = ["system", "light", "dark"];

const optionsMap: Record<
    DarkStyle,
    { name: string; title: string; icon: IconCode }
> = {
    system: {
        name: "System",
        title: "Switch to Light Mode",
        icon: "brightness_6",
    },
    light: {
        name: "Light",
        title: "Switch to Dark Mode",
        icon: "light_mode",
    },
    dark: {
        name: "Dark",
        title: "Switch to System Mode",
        icon: "dark_mode",
    },
};

export const DarkStyleButton = forwardRef<HTMLButtonElement, ButtonProps>(
    function DarkStyleButton(
        { title, icon, onClick, children, className, ...restProps },
        ref
    ) {
        const [preferences, setPreferences] = usePreferences();

        const currentOption: DarkStyle = preferences.darkStyle || "system";

        const toggleOption = () => {
            const currentIndex = order.indexOf(currentOption);
            const nextIndex = (currentIndex + 1) % order.length;
            const nextOption = order[nextIndex];

            setPreferences((prev) => ({
                ...prev,
                darkStyle: nextOption,
            }));
        };

        const joinedClassNames = classNames("fullWidthLover", className);

        return (
            <Button
                ref={ref}
                className={joinedClassNames}
                title={title || optionsMap[currentOption].title}
                icon={icon || <Symbol icon={optionsMap[currentOption].icon} />}
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
