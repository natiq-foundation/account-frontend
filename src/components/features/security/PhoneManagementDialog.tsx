import { useEffect, useState } from "react";
import type { FormEvent } from "react";

import { Check, CircleAlert, Mail, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export type EmailItem = {
    readonly id: string;
    readonly email: string;
    readonly isPrimary: boolean;
    readonly isVerified: boolean;
};

export interface EmailManagementDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly emails: readonly EmailItem[];
    readonly onAddEmail: (email: string) => void;
    readonly onRemoveEmail: (id: string) => void;
    readonly onSetPrimary: (id: string) => void;
    readonly onVerifyEmail: (id: string) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const EmailManagementDialog = ({
    isOpen,
    onClose,
    emails,
    onAddEmail,
    onRemoveEmail,
    onSetPrimary,
    onVerifyEmail,
}: EmailManagementDialogProps) => {
    const [newEmail, setNewEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    useEffect(() => {
        if (!isOpen) {
            setNewEmail("");
            setError("");
            setSuccessMessage("");
        }
    }, [isOpen]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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

        if (emails.some((item) => item.email.toLowerCase() === trimmed)) {
            setError("This email is already added.");
            return;
        }

        onAddEmail(trimmed);
        setNewEmail("");
        setSuccessMessage("Verification link sent to your email.");
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-lg border-zinc-800 bg-zinc-900 p-0 text-zinc-100 shadow-2xl sm:rounded-2xl">
                <DialogHeader className="flex flex-row items-center justify-between border-b border-zinc-800 px-6 py-4 text-left">
                    <div>
                        <DialogTitle className="text-lg font-semibold text-zinc-100">
                            Manage Email Addresses
                        </DialogTitle>
                        <DialogDescription className="mt-0.5 text-xs text-zinc-400">
                            Control your contact emails for account security and
                            updates.
                        </DialogDescription>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        className="h-8 w-8 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                </DialogHeader>

                <div className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-5">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <label className="block text-xs font-medium text-zinc-300">
                            Add new email
                        </label>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="flex-1 rounded-xl border-zinc-700 bg-zinc-950 text-sm focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500"
                            />
                            <Button
                                type="submit"
                                className="shrink-0 rounded-xl bg-zinc-100 text-zinc-950 hover:bg-zinc-200"
                            >
                                Add
                            </Button>
                        </div>
                        {error && (
                            <div className="flex items-center gap-1.5 text-xs text-rose-400">
                                <CircleAlert className="h-3.5 w-3.5" />
                                <span>{error}</span>
                            </div>
                        )}
                        {successMessage && (
                            <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                                <Check className="h-3.5 w-3.5" />
                                <span>{successMessage}</span>
                            </div>
                        )}
                    </form>

                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Connected Emails ({emails.length})
                        </h3>
                        {emails.length === 0 ? (
                            <p className="py-4 text-center text-xs text-zinc-500">
                                No email linked to your account yet.
                            </p>
                        ) : (
                            <div className="space-y-2.5">
                                {emails.map((email) => (
                                    <div
                                        key={email.id}
                                        className="flex items-center justify-between rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-3.5"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-zinc-500" />
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-zinc-200">
                                                    {email.email}
                                                </span>
                                                <div className="flex gap-1.5">
                                                    {email.isPrimary && (
                                                        <span className="rounded bg-zinc-800 px-1 text-[10px] text-zinc-400">
                                                            Primary
                                                        </span>
                                                    )}
                                                    <span
                                                        className={`rounded px-1 text-[10px] ${
                                                            email.isVerified
                                                                ? "bg-emerald-950/40 text-emerald-400"
                                                                : "bg-amber-950/40 text-amber-400"
                                                        }`}
                                                    >
                                                        {email.isVerified
                                                            ? "Verified"
                                                            : "Pending"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            {!email.isVerified && (
                                                <Button
                                                    variant="link"
                                                    onClick={() =>
                                                        onVerifyEmail(email.id)
                                                    }
                                                    className="h-auto p-0 text-xs text-zinc-400 underline"
                                                >
                                                    Verify
                                                </Button>
                                            )}
                                            {!email.isPrimary &&
                                                email.isVerified && (
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            onSetPrimary(
                                                                email.id,
                                                            )
                                                        }
                                                        className="h-7 rounded-lg border-zinc-700 text-xs"
                                                    >
                                                        Set Primary
                                                    </Button>
                                                )}
                                            {!email.isPrimary && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() =>
                                                        onRemoveEmail(email.id)
                                                    }
                                                    className="h-7 w-7 rounded-lg text-zinc-500 hover:text-rose-400"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="border-t border-zinc-800 px-6 py-3.5">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="rounded-xl"
                    >
                        Done
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
