import { Main, Screen } from "@yakad/ui";
import { StorageProvider } from "@/contexts/storageContext";
import ThemeWrapper from "./ThemeWrapper";
import AppBarWrapper from "./AppBarWrapper";
import FooterWrapper from "./FooterWrapper";

export const runtime = "edge";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <StorageProvider>
                    <ThemeWrapper>
                        <Screen>
                            <AppBarWrapper />
                            <Main>{children}</Main>
                            <FooterWrapper />
                        </Screen>
                    </ThemeWrapper>
                </StorageProvider>
            </body>
        </html>
    );
}
