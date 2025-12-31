"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SessionItem } from "./SessionItem";
import { Session } from "./types";

export function ActiveSessionsManager() {
    const [sessions, setSessions] = useState<Session[]>([
        {
            id: "1",
            device: "Chrome on Windows",
            location: "Tehran, Iran",
            ip: "185.12.34.56",
            lastActive: "Just now",
            isCurrent: true,
        },
        {
            id: "2",
            device: "Mobile App",
            location: "Tabriz, Iran",
            ip: "5.160.88.21",
            lastActive: "2 hours ago",
            isCurrent: false,
        },
    ]);

    const terminateSession = (id: string) => {
        setSessions((prev) => prev.filter((s) => s.id !== id));
    };

    const terminateAll = () => {
        setSessions((prev) => prev.filter((s) => s.isCurrent));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Active Sessions</h3>
                <Button variant="destructive" size="sm" onClick={terminateAll}>
                    Terminate All Other Sessions
                </Button>
            </div>

            <div className="space-y-3">
                {sessions.map((session) => (
                    <SessionItem
                        key={session.id}
                        session={session}
                        onTerminate={terminateSession}
                    />
                ))}
            </div>
        </div>
    );
}
