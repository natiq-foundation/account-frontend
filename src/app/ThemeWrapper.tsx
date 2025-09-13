"use client";

import { Theme, ThemeProps } from "@yakad/ui";
import { usePreferences } from "@/contexts/preferencesContext";

export default function ThemeWrapper({
    children,
    ...restProps
}: Omit<ThemeProps, "darkstyle" | "color" | "zoom">) {
    const [preferences] = usePreferences();

    return (
        <Theme
            darkstyle={preferences.darkStyle}
            color={preferences.themeColor}
            zoom={preferences.zoom}
            {...restProps}
        >
            {children}
        </Theme>
    );
}
