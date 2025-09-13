"use client";

import { ReactNode } from "react";
import { PreferencesProvider } from "@/contexts/preferencesContext";

export default function Providers({ children }: { children: ReactNode }) {
    return <PreferencesProvider>{children}</PreferencesProvider>;
}
