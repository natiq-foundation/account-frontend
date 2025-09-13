"use client";

import { forwardRef } from "react";
import { LangCodeType, langName } from "@yakad/lib";
import { Select, SelectProps } from "@yakad/ui";
import { usePreferences } from "@/contexts/preferencesContext";

const acceptedLangCodes: LangCodeType[] = ["en", "ar", "fa", "tr"];

export const LanguageSelect = forwardRef<
    HTMLSelectElement,
    Omit<SelectProps, "name" | "value">
>(function LanguageSelect({ placeholder, onChange, ...restProps }, ref) {
    const [preferences, setPreferences] = usePreferences();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPreferences((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <Select
            ref={ref}
            name="language"
            placeholder={placeholder || "Language"}
            value={preferences.language}
            onChange={(e) => {
                handleChange(e);
                onChange?.(e);
            }}
            {...restProps}
        >
            {acceptedLangCodes.map((value) => (
                <option key={value} value={value}>
                    {langName(value)}
                </option>
            ))}
        </Select>
    );
});
