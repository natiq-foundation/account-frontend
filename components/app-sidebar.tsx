"use client";

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
} from "@/components/ui/sidebar";

import { useEffect } from "react";
import { useSidebar } from "@/components/ui/sidebar";

import { Home, Settings, LockIcon } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
    const { isMobile, setOpen, setOpenMobile } = useSidebar();

    useEffect(() => {
        if (isMobile) {
            setOpenMobile(false);
        } else {
            setOpen(true);
        }
    }, [isMobile, setOpen, setOpenMobile]);

    return (
        <Sidebar>
            <SidebarHeader>
                <div className="font-bold text-lg">Natiq Account</div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/account/home">
                                <Home className="size-4" />
                                <span>Home</span>
                            </Link>

                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/account/security">
                                <LockIcon className="size-4" />
                                <span>Security</span>
                            </Link>

                        </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <a href="/account/settings">
                                <Settings className="size-4" />
                                <span>Settings</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    );
}
