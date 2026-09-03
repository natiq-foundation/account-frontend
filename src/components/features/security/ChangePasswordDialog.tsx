import { useState } from "react";
import type { FormEvent } from "react";

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

export interface ChangePasswordDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onSuccess?: (newDateStr: string) => void;
}

export const ChangePasswordDialog = ({
    isOpen,
    onClose,
    onSuccess,
}: ChangePasswordDialogProps) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        setError(null);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setIsLoading(false);
        onClose();
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (
            !currentPassword.trim() ||
            !newPassword.trim() ||
            !confirmPassword.trim()
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            const formattedDate = new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }).format(new Date());

            if (onSuccess) {
                onSuccess(formattedDate);
            }

            handleClose();
        }, 600);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent
                showCloseButton={false}
                className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl transition-all sm:p-8"
            >
                <DialogHeader className="text-left">
                    <DialogTitle className="text-xl font-semibold text-zinc-100">
                        Change password
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-sm text-zinc-400">
                        Choose a strong password and don't reuse it for other
                        accounts.
                    </DialogDescription>
                </DialogHeader>

                {error && (
                    <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label
                            htmlFor="current-password"
                            className="block text-xs font-medium text-zinc-300"
                        >
                            Current password
                        </label>
                        <Input
                            id="current-password"
                            type="password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="Enter current password"
                            className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="new-password"
                            className="block text-xs font-medium text-zinc-300"
                        >
                            New password
                        </label>
                        <Input
                            id="new-password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block text-xs font-medium text-zinc-300"
                        >
                            Confirm new password
                        </label>
                        <Input
                            id="confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                            className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-zinc-900/60 px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus-visible:border-zinc-500 focus-visible:ring-1 focus-visible:ring-zinc-500"
                        />
                    </div>

                    <DialogFooter className="mt-8 flex flex-row items-center justify-end gap-3 border-t border-zinc-800/80 pt-4 sm:justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleClose}
                            className="rounded-xl px-4 py-2 text-xs font-medium text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-xl bg-white px-5 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
                        >
                            {isLoading ? "Updating..." : "Change password"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};
