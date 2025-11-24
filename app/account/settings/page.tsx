"use client";

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";


export default function ThemeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <div className="flex items-center justify-between w-full py-3 px-4 border rounded-md hover:bg-accent transition">
            <Label>Dark Mode</Label>
            <Switch checked={darkMode} onCheckedChange={() => setDarkMode(!darkMode)} />
        </div>
    );
}
