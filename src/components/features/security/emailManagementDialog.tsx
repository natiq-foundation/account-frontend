import { useMemo, useState } from "react";
import type { FormEvent } from "react";

export type EmailItem = {
    id: string;
    address: string;
    isPrimary: boolean;
    isVerified: boolean;
    notificationsEnabled: boolean;
};

type EmailManagementDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    emails: EmailItem[];
    onAddEmail: (email: string) => void;
    onRemoveEmail: (id: string) => void;
    onSetPrimary: (id: string) => void;
    onToggleNotifications: (id: string) => void;
    onResendVerification: (id: string) => void;
};

export const EmailManagementDialog = ({
    isOpen,
    onClose,
    emails,
    onAddEmail,
    onRemoveEmail,
    onSetPrimary,
    onToggleNotifications,
    onResendVerification,
}: EmailManagementDialogProps) => {
    const [newEmail, setNewEmail] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const sortedEmails = useMemo(() => {
        return [...emails].sort(
            (a, b) => (b.isPrimary ? 1 : 0) - (a.isPrimary ? 1 : 0),
        );
    }, [emails]);

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        const trimmed = newEmail.trim().toLowerCase();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!trimmed) {
            setError("Please enter an email address.");
            return;
        }

        if (!emailRegex.test(trimmed)) {
            setError("Please enter a valid email address.");
            return;
        }

        const alreadyExists = emails.some(
            (item) => item.address.toLowerCase() === trimmed,
        );

        if (alreadyExists) {
            setError("This email address is already added.");
            return;
        }

        onAddEmail(trimmed);
        setNewEmail("");
        setSuccessMessage("Verification link sent to your email.");
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm duration-200 animate-in fade-in">
            <div
                className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl transition-all"
                role="dialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-100">
                            Manage Email Addresses
                        </h2>
                        <p className="mt-0.5 text-xs text-zinc-400">
                            Add or remove emails and configure alerts.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-1.5 text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
                    >
                        ✕
                    </button>
                </div>

                <div className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-5">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <label className="block text-xs font-medium text-zinc-300">
                            Add new email address
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={newEmail}
                                onChange={(e) => {
                                    setNewEmail(e.target.value);
                                    if (error) setError("");
                                }}
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 active:scale-95"
                            >
                                Add
                            </button>
                        </div>

                        {error && (
                            <p className="text-xs text-rose-400">{error}</p>
                        )}
                        {successMessage && (
                            <p className="text-xs text-emerald-400">
                                {successMessage}
                            </p>
                        )}
                    </form>

                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Connected Emails ({sortedEmails.length})
                        </h3>

                        <div className="space-y-2.5">
                            {sortedEmails.map((email) => (
                                <div
                                    key={email.id}
                                    className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-3.5 transition hover:border-zinc-700"
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="truncate text-sm font-medium text-zinc-200">
                                                    {email.address}
                                                </span>
                                                {email.isPrimary && (
                                                    <span className="rounded-md border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300">
                                                        Primary
                                                    </span>
                                                )}
                                                {email.isVerified ? (
                                                    <span className="rounded-md border border-emerald-900/60 bg-emerald-950/40 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400">
                                                        Verified
                                                    </span>
                                                ) : (
                                                    <span className="rounded-md border border-amber-900/60 bg-amber-950/40 px-1.5 py-0.5 text-[10px] font-medium text-amber-400">
                                                        Pending
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex shrink-0 items-center gap-2">
                                            {!email.isVerified && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onResendVerification(
                                                            email.id,
                                                        )
                                                    }
                                                    className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-200"
                                                >
                                                    Resend
                                                </button>
                                            )}

                                            {!email.isPrimary &&
                                                email.isVerified && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onSetPrimary(
                                                                email.id,
                                                            )
                                                        }
                                                        className="rounded-lg border border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
                                                    >
                                                        Make primary
                                                    </button>
                                                )}

                                            {!email.isPrimary && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        onRemoveEmail(email.id)
                                                    }
                                                    className="rounded-lg p-1 text-zinc-500 transition hover:bg-rose-950/40 hover:text-rose-400"
                                                    title="Remove email"
                                                >
                                                    <svg
                                                        className="h-4 w-4"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                        />
                                                    </svg>
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {email.isVerified && (
                                        <div className="mt-3 flex items-center justify-between border-t border-zinc-900 pt-2.5">
                                            <span className="text-xs text-zinc-400">
                                                Receive optional security &
                                                account alerts
                                            </span>
                                            <button
                                                type="button"
                                                role="switch"
                                                aria-checked={
                                                    email.notificationsEnabled
                                                }
                                                onClick={() =>
                                                    onToggleNotifications(
                                                        email.id,
                                                    )
                                                }
                                                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                                                    email.notificationsEnabled
                                                        ? "bg-emerald-600"
                                                        : "bg-zinc-700"
                                                }`}
                                            >
                                                <span
                                                    className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                                                        email.notificationsEnabled
                                                            ? "translate-x-4"
                                                            : "translate-x-0"
                                                    }`}
                                                />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end border-t border-zinc-800 bg-zinc-900/50 px-6 py-3.5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
