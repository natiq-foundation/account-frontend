import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider defaultOpen>
            <AppSidebar />
            <SidebarInset>
                <div className="p-2 md:hidden">
                    <SidebarTrigger />
                </div>

                <div className="flex-1 flex items-center justify-center min-h-[calc(100vh-4rem)]">
                    <div className="w-full max-w-xl">{children}</div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
