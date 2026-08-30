import { useState } from "react";
import { Monitor, Smartphone, Laptop, LogOut, X } from "lucide-react";

interface ActiveSessionsDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

interface Session {
    id: string;
    device: string;
    type: "desktop" | "mobile" | "laptop";
    location: string;
    lastActive: string;
    isCurrent: boolean;
}

export const ActiveSessionsDialog = ({
    isOpen,
    onClose,
}: ActiveSessionsDialogProps) => {
    const [sessions, setSessions] = useState<Session[]>([
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
    ]);

    const [loadingId, setLoadingId] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSignOut = (id: string) => {
        setLoadingId(id);
        setTimeout(() => {
            setSessions((prev) => prev.filter((s) => s.id !== id));
            setLoadingId(null);
        }, 800);
    };

    const getIcon = (type: Session["type"]) => {
        if (type === "mobile")
            return <Smartphone className="h-5 w-5 text-blue-400" />;
        if (type === "laptop")
            return <Laptop className="h-5 w-5 text-purple-400" />;
        return <Monitor className="h-5 w-5 text-emerald-400" />;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-lg space-y-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-100">
                            Active Sessions
                        </h2>
                        <p className="mt-0.5 text-xs text-zinc-400">
                            Devices currently logged into your account
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

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
                                <button
                                    onClick={() => handleSignOut(session.id)}
                                    disabled={loadingId === session.id}
                                    className="flex items-center gap-1.5 rounded-lg border border-zinc-800 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-rose-900/50 hover:bg-rose-950/30 hover:text-rose-400 disabled:opacity-50"
                                >
                                    <LogOut className="h-3.5 w-3.5" />
                                    <span>
                                        {loadingId === session.id
                                            ? "..."
                                            : "Sign out"}
                                    </span>
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end pt-2">
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-zinc-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
