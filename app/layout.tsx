import "@/app/globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account App",
  description: "Account management demo built with shadcn/ui and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
