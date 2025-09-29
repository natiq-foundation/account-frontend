"use client"; //remove this in future

import { XloginBox } from "@yakad/x";
import ThemeWrapper from "../ThemeWrapper";
import Providers from "../Providers";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html>
            <body>
                <Providers>
                    <ThemeWrapper>
                        <XloginBox>{children}</XloginBox>
                    </ThemeWrapper>
                </Providers>
            </body>
        </html>
    );
}
