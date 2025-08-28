"use client";

import { Theme, ThemeProps } from "@yakad/ui";
import { useStorage } from "@/contexts/storageContext";

export default function ThemeWrapper({
    children,
    ...restProps
}: Omit<ThemeProps, "mode" | "color" | "zoom">) {
    const { storage } = useStorage();

    return (
        <Theme
            darkstyle={storage.settings.darkStyle}
            color={storage.settings.themeColor}
            zoom={storage.settings.zoom}
            {...restProps}
        >
            {children}
        </Theme>
    );
}
