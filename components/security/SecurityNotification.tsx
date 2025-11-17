"use client";

import { useState } from "react";
import { Bell, BellOff } from "lucide-react";

export function SecurityNotificationItem({
    label = "Active Security Notifications",
}: {
    label?: string;
}) {
    const [active, setActive] = useState(true);

    const handleToggle = () => {
        setActive((prev) => !prev);
    };

    return (
        <button
            onClick={handleToggle}
            className={`w-full flex items-center justify-between py-3 px-3 rounded-md border hover:bg-accent transition`}
        >
            <span className="font-medium">{label}</span>
            {active ? (
                <Bell className="h-5 w-5 text-primary" />
            ) : (
                <BellOff className="h-5 w-5 text-muted-foreground" />
            )}
        </button>
    );
}
