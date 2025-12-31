import { Button } from "@/components/ui/button";
import { Laptop, Smartphone } from "lucide-react";
import { Session } from "./types";

export function SessionItem({
    session,
    onTerminate,
}: {
    session: Session;
    onTerminate: (id: string) => void;
}) {
    const Icon = session.device.toLowerCase().includes("mobile")
        ? Smartphone
        : Laptop;

    return (
        <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex gap-3 items-start">
                <Icon className="w-5 h-5 mt-1 text-muted-foreground" />
                <div>
                    <p className="font-medium">
                        {session.device}
                        {session.isCurrent && (
                            <span className="ml-2 text-xs text-green-500">(Current)</span>
                        )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {session.location} · {session.ip}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Last active: {session.lastActive}
                    </p>
                </div>
            </div>

            {!session.isCurrent && (
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onTerminate(session.id)}
                >
                    Terminate
                </Button>
            )}
        </div>
    );
}
