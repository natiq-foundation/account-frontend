import { useState } from "react";
import type { FormEvent } from "react";

export type PhoneItem = {
    id: string;
    number: string;
    isPrimary: boolean;
    isVerified: boolean;
};

type PhoneManagementDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    phones: PhoneItem[];
    onAddPhone: (phone: string) => void;
    onRemovePhone: (id: string) => void;
    onSetPrimary: (id: string) => void;
    onVerifyPhone: (id: string) => void;
};

export const PhoneManagementDialog = ({
    isOpen,
    onClose,
    phones,
    onAddPhone,
    onRemovePhone,
    onSetPrimary,
    onVerifyPhone,
}: PhoneManagementDialogProps) => {
    const [newPhone, setNewPhone] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    if (!isOpen) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");

        const trimmed = newPhone.trim();
        // چک فرمت شماره موبایل (ساده یا بین‌المللی)
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
                            Manage Phone Numbers
                        </h2>
                        <p className="mt-0.5 text-xs text-zinc-400">
                            Used for account recovery and two-step verification.
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
                    {/* Add Phone Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <label className="block text-xs font-medium text-zinc-300">
                            Add new phone number
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="tel"
                                placeholder="+98 912 345 6789"
                                dir="ltr"
                                value={newPhone}
                                onChange={(e) => {
                                    setNewPhone(e.target.value);
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

                    {/* Phone List */}
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
                                                <div className="flex items-center gap-2">
                                                    <span
                                                        dir="ltr"
                                                        className="font-mono text-sm font-medium text-zinc-200"
                                                    >
                                                        {phone.number}
                                                    </span>
                                                    {phone.isPrimary && (
                                                        <span className="rounded-md border border-zinc-700 bg-zinc-800 px-1.5 py-0.5 text-[10px] font-medium text-zinc-300">
                                                            Primary
                                                        </span>
                                                    )}
                                                    {phone.isVerified ? (
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

                                            {/* Actions */}
                                            <div className="flex shrink-0 items-center gap-2">
                                                {!phone.isVerified && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onVerifyPhone(
                                                                phone.id,
                                                            )
                                                        }
                                                        className="text-xs text-zinc-400 underline underline-offset-2 hover:text-zinc-200"
                                                    >
                                                        Verify
                                                    </button>
                                                )}

                                                {!phone.isPrimary &&
                                                    phone.isVerified && (
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                onSetPrimary(
                                                                    phone.id,
                                                                )
                                                            }
                                                            className="rounded-lg border border-zinc-700 px-2.5 py-1 text-xs font-medium text-zinc-300 transition hover:bg-zinc-800 hover:text-zinc-100"
                                                        >
                                                            Make primary
                                                        </button>
                                                    )}

                                                {!phone.isPrimary && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            onRemovePhone(
                                                                phone.id,
                                                            )
                                                        }
                                                        className="rounded-lg p-1 text-zinc-500 transition hover:bg-rose-950/40 hover:text-rose-400"
                                                        title="Remove phone"
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
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
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
