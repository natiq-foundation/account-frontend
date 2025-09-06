"use client"; //remove this in future

import { XloginBox } from "@yakad/x";
import { StorageProvider } from "@/contexts/storageContext";
import ThemeWrapper from "../ThemeWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <StorageProvider>
                    <ThemeWrapper>
                        <XloginBox>{children}</XloginBox>
                    </ThemeWrapper>
                </StorageProvider>
            </body>
        </html>
    );
}
