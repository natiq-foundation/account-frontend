import "@/src/app/global.css"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
    title: "Account Frontend",
    description: "Manage your account easily with modern UI.",
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={cn(inter.className, "bg-background text-foreground min-h-screen")}>
                {children}
            </body>
        </html>
    )
}
