"use client";

import { Button } from "@/components/ui/button";
import { SessionItem } from "./SessionItem";
import { useSessions } from "@/features/security/sessions/hooks/useSessions";

export function ActiveSessionsManager() {
    const { sessions, loading, terminate, terminateAll } = useSessions();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Active Sessions</h3>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={terminateAll}
                    disabled={loading}
                >
                    Terminate All Other Sessions
                </Button>
            </div>

            {loading && (
                <p className="text-sm text-muted-foreground">
                    Loading sessions...
                </p>
            )}

            <div className="space-y-3">
                {sessions.map((session) => (
                    <SessionItem
                        key={session.id}
                        session={session}
                        onTerminate={terminate}
                        terminating={false}
                    />
                ))}

            </div>
        </div>
    );
}