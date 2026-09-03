import { useState } from "react";

import { Laptop, LogOut, Monitor, Smartphone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

export interface ActiveSessionsDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

export interface Session {
    readonly id: string;
    readonly device: string;
    readonly type: "desktop" | "mobile" | "laptop";
    readonly location: string;
    readonly lastActive: string;
    readonly isCurrent: boolean;
}

const INITIAL_SESSIONS: readonly Session[] = [
    {
        id: "1",
        device: "Chrome on macOS",
        type: "desktop",
        location: "Tehran, Iran",
        lastActive: "Just now",
        isCurrent: true,
    },
    {
        id: "2",
        device: "iPhone 15 Pro",
        type: "mobile",
        location: "Tehran, Iran",
        lastActive: "2 hours ago",
        isCurrent: false,
    },
];

export const ActiveSessionsDialog = ({
    isOpen,
    onClose,
}: ActiveSessionsDialogProps) => {
    const [sessions, setSessions] =
        useState<readonly Session[]>(INITIAL_SESSIONS);
    const [loadingId, setLoadingId] = useState<string | null>(null);

    const handleSignOut = (id: string) => {
        setLoadingId(id);
        setTimeout(() => {
            setSessions((prev) => prev.filter((s) => s.id !== id));
            setLoadingId(null);
        }, 800);
    };

    const getIcon = (type: Session["type"]) => {
        if (type === "mobile") {
            return <Smartphone className="h-5 w-5 text-blue-400" />;
        }
        if (type === "laptop") {
            return <Laptop className="h-5 w-5 text-purple-400" />;
        }
        return <Monitor className="h-5 w-5 text-emerald-400" />;
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                showCloseButton={false}
                className="w-full max-w-lg space-y-5 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl transition-all"
            >
                <DialogHeader className="flex flex-row items-center justify-between border-b border-zinc-800 pb-4 text-left">
                    <div>
                        <DialogTitle className="text-lg font-semibold text-zinc-100">
                            Active Sessions
                        </DialogTitle>
                        <DialogDescription className="mt-0.5 text-xs text-zinc-400">
                            Devices currently logged into your account
                        </DialogDescription>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        aria-label="Close"
                        className="h-8 w-8 rounded-lg text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </DialogHeader>

                <div className="max-h-80 space-y-3 overflow-y-auto pr-1">
                    {sessions.map((session) => (
                        <div
                            key={session.id}
                            className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-3.5"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-700/50 bg-zinc-800">
                                    {getIcon(session.type)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-medium text-zinc-200">
                                            {session.device}
                                        </p>
                                        {session.isCurrent && (
                                            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-xs text-zinc-500">
                                        {session.location} •{" "}
                                        {session.lastActive}
                                    </p>
                                </div>
                            </div>

                            {!session.isCurrent && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleSignOut(session.id)}
                                    disabled={loadingId === session.id}
                                    className="flex h-auto items-center gap-1.5 rounded-lg border-zinc-800 bg-transparent px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-rose-900/50 hover:bg-rose-950/30 hover:text-rose-400 disabled:opacity-50"
                                >
                                    <LogOut className="h-3.5 w-3.5" />
                                    <span>
                                        {loadingId === session.id
                                            ? "..."
                                            : "Sign out"}
                                    </span>
                                </Button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-2">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                        className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700 hover:text-white"
                    >
                        Close
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
