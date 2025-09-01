import { StorageProvider } from "@/contexts/storageContext";
import ThemeWrapper from "./ThemeWrapper";
import metadataJson from "./metadata.json";

export const runtime = "edge";

export const metadata = {
    title: metadataJson.title,
    description: metadataJson.description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <StorageProvider>
                    <ThemeWrapper>{children}</ThemeWrapper>
                </StorageProvider>
            </body>
        </html>
    );
}
