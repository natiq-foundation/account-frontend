"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChangePasswordDialogProps {
    isOpen: boolean;
    onClose: () => void;
    verifyCurrentPassword?: (password: string) => Promise<boolean>; // optional
    changePassword: (newPassword: string) => Promise<void>;
}

export function ChangePasswordDialog({
    isOpen,
    onClose,
    verifyCurrentPassword,
    changePassword,
}: ChangePasswordDialogProps) {
    type Step = "verifyCurrent" | "newPassword" | "confirmPassword";
    const [step, setStep] = useState<Step>("verifyCurrent");

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleNext = async () => {
        setLoading(true);
        try {
            if (step === "verifyCurrent") {
                const verified = verifyCurrentPassword
                    ? await verifyCurrentPassword(currentPassword)
                    : true; // default always passes
                if (verified) {
                    setStep("newPassword");
                }
            } else if (step === "newPassword") {
                if (!newPassword) return;
                setStep("confirmPassword");
            } else if (step === "confirmPassword") {
                if (newPassword !== confirmPassword) return;
                await changePassword(newPassword);
                onClose();
                resetDialog();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const resetDialog = () => {
        setStep("verifyCurrent");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    if (!isOpen) return null;

    return (
        <div className="flex flex-col gap-4">
            {step === "verifyCurrent" && (
                <Input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Current password"
                />
            )}
            {step === "newPassword" && (
                <Input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                />
            )}
            {step === "confirmPassword" && (
                <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                />
            )}

            <Button onClick={handleNext} disabled={loading}>
                {step === "confirmPassword" ? "Confirm & Change Password" : "Next"}
            </Button>
        </div>
    );
}
