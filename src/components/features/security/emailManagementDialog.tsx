import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";

import { Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export type EmailItem = {
    readonly id: string;
    readonly address: string;
    readonly isPrimary: boolean;
    readonly isVerified: boolean;
    readonly notificationsEnabled: boolean;
};

export interface EmailManagementDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly emails: readonly EmailItem[];
    readonly onAddEmail: (email: string) => void;
    readonly onRemoveEmail: (id: string) => void;
    readonly onSetPrimary: (id: string) => void;
    readonly onToggleNotifications: (id: string) => void;
    readonly onResendVerification: (id: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    useEffect(() => {
        if (!isOpen) {
            setError("");
            setSuccessMessage("");
            setNewEmail("");
        }
    }, [isOpen]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        const trimmed = newEmail.trim().toLowerCase();

        if (!trimmed) {
            setError("Please enter an email address.");
            return;
        }

        if (!EMAIL_REGEX.test(trimmed)) {
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
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent
                showCloseButton={false}
                className="max-w-lg overflow-hidden border-zinc-800 bg-zinc-900 p-0 text-zinc-100 shadow-2xl sm:rounded-2xl"
            >
                <DialogHeader className="flex flex-row items-center justify-between border-b border-zinc-800 px-6 py-4 text-left">
                    <div>
                        <DialogTitle className="text-lg font-semibold text-zinc-100">
                            Manage Email Addresses
                        </DialogTitle>
                        <DialogDescription className="mt-0.5 text-xs text-zinc-400">
                            Add or remove emails and configure alerts.
                        </DialogDescription>
                    </div>
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="h-8 w-8 rounded-lg text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                <div className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-5">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <label
                            htmlFor="new-email-input"
                            className="block text-xs font-medium text-zinc-300"
                        >
                            Add new email address
                        </label>
                        <div className="flex gap-2">
                            <Input
                                id="new-email-input"
                                type="email"
                                placeholder="name@example.com"
                                value={newEmail}
                                onChange={(e) => {
                                    setNewEmail(e.target.value);
                                    if (error) setError("");
                                    if (successMessage) setSuccessMessage("");
                                }}
                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500"
                            />
                            <Button
                                type="submit"
                                className="shrink-0 rounded-xl bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 active:scale-95"
                            >
                                Add
                            </Button>
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
                                                <Button
                                                    type="button"
                                                    variant="link"
                                                    onClick={() =>
                                                        onResendVerification(
                                                            email.id,
                                                        )
                                                    }
                                                    className="h-auto p-0 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-200"
                                                >
                                                    Resend
                                                </Button>
                                            )}

                                            {!email.isPrimary &&
                                                email.isVerified && (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() =>
                                                            onSetPrimary(
                                                                email.id,
                                                            )
                                                        }
                                                        className="h-auto rounded-lg border border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
                                                    >
                                                        Make primary
                                                    </Button>
                                                )}

                                            {!email.isPrimary && (
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        onRemoveEmail(email.id)
                                                    }
                                                    className="h-7 w-7 rounded-lg p-1 text-zinc-500 transition hover:bg-rose-950/40 hover:text-rose-400"
                                                    title="Remove email"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>

                                    {email.isVerified && (
                                        <div className="mt-3 flex items-center justify-between border-t border-zinc-900 pt-2.5">
                                            <span className="text-xs text-zinc-400">
                                                Receive optional security &amp;
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
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-zinc-100"
                    >
                        Done
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
