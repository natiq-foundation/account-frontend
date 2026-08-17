import { ThemeProvider } from "@/components/ui/theme-provider";
import InstallPrompt from "@/components/features/installPrompt/InstallPrompt";
import { LanguageSync } from "@/components/features/languageSync/LanguageSync";
import IOSGuide from "@/routes/launcher/IOSGuide";
import Router from "./router";
import { SettingsProvider } from "./context/settingsContext";
import { ProfileProvider } from "./context/profileContext";

export default function App() {
    return (
        <SettingsProvider>
            <ProfileProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <LanguageSync />

                    <div className="bg-background text-foreground">
                        <Router />

                        {/* PWA prompts */}
                        <IOSGuide />
                        <InstallPrompt />
                    </div>
                </ThemeProvider>
            </ProfileProvider>
        </SettingsProvider>
    );
}
