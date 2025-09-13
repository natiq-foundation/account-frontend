import { ThemeColor, DarkStyle } from "@yakad/ui";
import { createLocalStorageContext } from "@yakad/lib";

interface Preferences {
    darkStyle: DarkStyle;
    themeColor: ThemeColor;
    zoom?: number;
    language: string;
}

const defaultPreferences: Preferences = {
    darkStyle: "system",
    themeColor: (process.env.THEME_COLOR as ThemeColor) || "blue",
    zoom: 100,
    language: "en",
};

const [PreferencesProvider, usePreferences] =
    createLocalStorageContext<Preferences>("preferences", defaultPreferences);

export { PreferencesProvider, usePreferences };
