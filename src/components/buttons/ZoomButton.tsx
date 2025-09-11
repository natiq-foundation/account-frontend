"use client";

import { forwardRef } from "react";
import classNames from "classnames";
import { Button, ButtonProps } from "@yakad/ui";
import { IconCode, Symbol } from "@yakad/symbols";
import { useStorage } from "@/contexts/storageContext";

const order: number[] = [75, 90, 100, 110, 125];

const optionsMap: Record<
    number,
    { name: string; title: string; icon: IconCode }
> = {
    75: {
        name: "75%",
        title: "Switch to 90%",
        icon: "zoom_in",
    },
    90: {
        name: "90%",
        title: "Switch to 100%",
        icon: "zoom_in",
    },
    100: {
        name: "100%",
        title: "Switch to 110%",
        icon: "zoom_in",
    },
    110: {
        name: "110%",
        title: "Switch to 125%",
        icon: "zoom_in",
    },
    125: {
        name: "125%",
        title: "Switch to 75%",
        icon: "zoom_out",
    },
};

export const ZoomButton = forwardRef<HTMLButtonElement, ButtonProps>(
    function ZoomButton(
        { title, icon, onClick, children, className, ...restProps },
        ref
    ) {
        const { storage, setStorage } = useStorage();

        const currentOption: number = storage?.settings?.zoom || 100;

        const toggleOption = () => {
            const currentIndex = order.indexOf(currentOption);
            const nextIndex = (currentIndex + 1) % order.length;
            const nextOption = order[nextIndex];

            setStorage((prev) => ({
                ...prev,
                settings: {
                    ...prev.settings,
                    zoom: nextOption,
                },
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
