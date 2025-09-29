import metadataJson from "./metadata.json";
import ThemeWrapper from "./ThemeWrapper";
import Providers from "./Providers";

export const runtime = "edge";

export const metadata = {
    title: metadataJson.title,
    description: metadataJson.description,
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <ThemeWrapper>{children}</ThemeWrapper>
                </Providers>
            </body>
        </html>
    );
}
