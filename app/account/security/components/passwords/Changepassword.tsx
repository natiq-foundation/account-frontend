"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useChangePassword } from "@/features/security/password/hooks/useChangePassword";

type Props = {
    onSuccess?: () => void;
};

export function ChangePasswordDialog({ onSuccess }: Props) {
    const { step, loading, error, verify, updatePassword } =
        useChangePassword(onSuccess);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    return (
        <div className="space-y-6">
            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            {step === "verify" && (
                <div className="space-y-4">
                    <div>
                        <Label>Current password</Label>
                        <Input
                            type="password"
                            value={currentPassword}
                            onChange={(e) =>
                                setCurrentPassword(e.target.value)
                            }
                        />
                    </div>

                    <Button
                        onClick={() => verify(currentPassword)}
                        disabled={!currentPassword || loading}
                        className="w-full"
                    >
                        Verify
                    </Button>
                </div>
            )}

            {step === "change" && (
                <div className="space-y-4">
                    <div>
                        <Label>New password</Label>
                        <Input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <Label>Confirm new password</Label>
                        <Input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                        />
                    </div>

                    <Button
                        onClick={() =>
                            updatePassword(
                                currentPassword,
                                newPassword,
                                confirmPassword
                            )
                        }
                        disabled={!newPassword || !confirmPassword || loading}
                        className="w-full"
                    >
                        Save password
                    </Button>
                </div>
            )}
        </div>
    );
}