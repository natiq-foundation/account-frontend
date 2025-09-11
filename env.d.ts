import { ThemeColor } from "@yakad/ui";

namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: "development" | "production" | "test";
        API_URL: string;
        THEME_COLOR?: ThemeColor;
        COOKIE_DOMAIN?: string;
    }
}
