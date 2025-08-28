import type { Metadata } from "next";
import { StorageProvider } from "@/contexts/storageContext";
import ThemeWrapper from "./ThemeWrapper";

export const runtime = "edge";

export const metadata: Metadata = {
    title: "Natiq",
    description: "Natiq main app",
};

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <html lang="en">
            <body>
                <StorageProvider>
                    <ThemeWrapper>{children}</ThemeWrapper>
                </StorageProvider>
            </body>
        </html>
    );
};

export default Layout;
