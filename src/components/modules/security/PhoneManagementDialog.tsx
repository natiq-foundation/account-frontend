import { useState } from "react";
import type { FormEvent } from "react";

import { Check, Phone, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { Label } from "@/components/ui/label";

export interface PhoneItem {
    readonly id: string;
    readonly number: string;
    readonly isPrimary: boolean;
    readonly isVerified: boolean;
}

export interface PhoneManagementDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly phones: readonly PhoneItem[];
    readonly onAddPhone: (phone: string) => void;
    readonly onRemovePhone: (id: string) => void;
    readonly onSetPrimary: (id: string) => void;
    readonly onVerifyPhone: (id: string) => void;
}

export const PhoneManagementDialog = ({
    isOpen,
    onClose,
    phones,
    onAddPhone,
    onRemovePhone,
    onSetPrimary,
    onVerifyPhone,
}: PhoneManagementDialogProps) => {
    const [newPhone, setNewPhone] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");

    const handleClose = () => {
        setNewPhone("");
        setError("");
        setSuccessMessage("");
        onClose();
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        const trimmed = newPhone.trim();
        const phoneRegex = /^(\+?[0-9]{10,14})$/;

        if (!trimmed) {
            setError("Please enter a phone number.");
            return;
        }

        if (!phoneRegex.test(trimmed.replace(/\s+/g, ""))) {
            setError("Please enter a valid phone number (e.g. +989123456789).");
            return;
        }

        const alreadyExists = phones.some(
            (item) =>
                item.number.replace(/\s+/g, "") === trimmed.replace(/\s+/g, ""),
        );

        if (alreadyExists) {
            setError("This phone number is already added.");
            return;
        }

        onAddPhone(trimmed);
        setNewPhone("");
        setSuccessMessage("SMS verification code sent.");
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-lg border-zinc-800 bg-zinc-900 p-0 text-zinc-100 shadow-2xl">
                <DialogHeader className="border-b border-zinc-800 px-6 py-4">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                            <Phone className="h-4 w-4" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-zinc-100">
                                Manage Phone Numbers
                            </DialogTitle>
                            <DialogDescription className="mt-0.5 text-xs text-zinc-400">
                                Used for account recovery and two-step
                                verification.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="max-h-[75vh] space-y-6 overflow-y-auto px-6 py-5">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <Label className="block text-xs font-medium text-zinc-300">
                            Add new phone number
                        </Label>
                        <div className="flex gap-2">
                            <Input
                                type="tel"
                                placeholder="+98 912 345 6789"
                                dir="ltr"
                                value={newPhone}
                                onChange={(e) => {
                                    setNewPhone(e.target.value);
                                    if (error) setError("");
                                }}
                                className="w-full rounded-xl border-zinc-700 bg-zinc-950 px-3.5 py-2 text-sm text-zinc-100 placeholder-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500"
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
                            <p className="flex items-center gap-1.5 text-xs text-emerald-400">
                                <Check className="h-3.5 w-3.5" />
                                {successMessage}
                            </p>
                        )}
                    </form>

                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                            Connected Numbers ({phones.length})
                        </h3>

                        {phones.length === 0 ? (
                            <p className="py-4 text-center text-xs text-zinc-500">
                                No phone number linked to your account yet.
                            </p>
                        ) : (
                            <div className="space-y-2.5">
                                {phones.map((phone) => (
                                    <div
                                        key={phone.id}
                                        className="rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-3.5 transition hover:border-zinc-700"
                                    >
                                        <div className="flex items-center justify-between gap-2">
                                            <div className="min-w-0">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span
                                                        dir="ltr"
                                                        className="font-mono text-sm font-medium text-zinc-200"
                                                    >
                                                        {phone.number}
                                                    </span>
                                                    {phone.isPrimary && (
                                                        <Badge
                                                            variant="secondary"
                                                            className="border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300 hover:bg-zinc-800"
                                                        >
                                                            Primary
                                                        </Badge>
                                                    )}
                                                    {phone.isVerified ? (
                                                        <Badge
                                                            variant="outline"
                                                            className="border-emerald-900/60 bg-emerald-950/40 px-1.5 py-0.5 text-[10px] font-medium text-emerald-400 hover:bg-emerald-950/40"
                                                        >
                                                            Verified
                                                        </Badge>
                                                    ) : (
                                                        <Badge
                                                            variant="outline"
                                                            className="border-amber-900/60 bg-amber-950/40 px-1.5 py-0.5 text-[10px] font-medium text-amber-400 hover:bg-amber-950/40"
                                                        >
                                                            Pending
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex shrink-0 items-center gap-2">
                                                {!phone.isVerified && (
                                                    <Button
                                                        type="button"
                                                        variant="link"
                                                        onClick={() =>
                                                            onVerifyPhone(
                                                                phone.id,
                                                            )
                                                        }
                                                        className="h-auto p-0 text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-200"
                                                    >
                                                        Verify
                                                    </Button>
                                                )}

                                                {!phone.isPrimary &&
                                                    phone.isVerified && (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() =>
                                                                onSetPrimary(
                                                                    phone.id,
                                                                )
                                                            }
                                                            className="h-7 rounded-lg border-zinc-700 bg-transparent px-2.5 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
                                                        >
                                                            Make primary
                                                        </Button>
                                                    )}

                                                {!phone.isPrimary && (
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() =>
                                                            onRemovePhone(
                                                                phone.id,
                                                            )
                                                        }
                                                        className="h-7 w-7 rounded-lg p-1 text-zinc-500 transition hover:bg-rose-950/40 hover:text-rose-400"
                                                        title="Remove phone"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter className="border-t border-zinc-800 bg-zinc-900/50 px-6 py-3.5 sm:justify-end">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClose}
                        className="rounded-xl border-zinc-700 bg-transparent px-4 py-2 text-sm font-medium text-zinc-200 transition hover:bg-zinc-800 hover:text-zinc-100"
                    >
                        Done
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
