"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AuthenticatorSetup } from "./AuthenticatorSetup";
import { BackupCodes } from "./BackupCodes";

export function TwoStepManager() {
    const [enabled, setEnabled] = useState(false);
    const [setupOpen, setSetupOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-lg font-semibold">Two-Step Verification</h2>
                <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account.
                </p>
            </div>

            {/* Authenticator */}
            <div className="flex justify-between items-center border p-4 rounded-lg">
                <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-muted-foreground">
                        Use an app like Google Authenticator
                    </p>
                </div>

                {enabled ? (
                    <Button variant="secondary">Configured</Button>
                ) : (
                    <Button onClick={() => setSetupOpen(true)}>Set up</Button>
                )}
            </div>

            {/* Backup Codes */}
            <Dialog>
                <DialogTrigger asChild>
                    <div className="flex justify-between items-center border p-4 rounded-lg cursor-pointer">
                        <div>
                            <p className="font-medium">Backup verification codes</p>
                            <p className="text-sm text-muted-foreground">
                                Use backup codes if you lose access
                            </p>
                        </div>
                        <Button>Set up</Button>
                    </div>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Backup Codes</DialogTitle>
                    </DialogHeader>
                    <BackupCodes />
                </DialogContent>
            </Dialog>

            {/* Phone (disabled) */}
            <div className="flex justify-between items-center border p-4 rounded-lg opacity-50">
                <div>
                    <p className="font-medium">Phone number</p>
                    <p className="text-sm text-muted-foreground">
                        Receive codes via SMS
                    </p>
                </div>
                <Button disabled>Not available</Button>
            </div>

            {/* Turn off */}
            <Button variant="destructive">Turn off two-step verification</Button>

            {/* Authenticator Setup */}
            {setupOpen && (
                <AuthenticatorSetup
                    onComplete={() => {
                        setEnabled(true);
                        setSetupOpen(false);
                    }}
                    onCancel={() => setSetupOpen(false)}
                />
            )}
        </div>
    );
}
