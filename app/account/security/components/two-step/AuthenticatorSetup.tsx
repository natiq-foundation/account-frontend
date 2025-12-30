"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
    onComplete: () => void;
    onCancel: () => void;
};

export function AuthenticatorSetup({ onComplete, onCancel }: Props) {
    const [step, setStep] = useState<1 | 2>(1);
    const [qrUrl, setQrUrl] = useState<string>("");
    const [secret] = useState("JBSWY3DPEHPK3PXP");
    const [code, setCode] = useState("");

    useEffect(() => {
        const otpauthUrl = `otpauth://totp/YourApp:user@example.com?secret=${secret}&issuer=YourApp`;
        QRCode.toDataURL(otpauthUrl).then(setQrUrl);
    }, [secret]);

    return (
        <Dialog open onOpenChange={onCancel}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Set up authenticator app</DialogTitle>
                </DialogHeader>

                {step === 1 && (
                    <div className="space-y-4">
                        <ol className="list-decimal ml-4 text-sm space-y-1">
                            <li>Install Google Authenticator or compatible app</li>
                            <li>Open the app and tap the + button</li>
                            <li>Choose “Scan a QR code”</li>
                        </ol>

                        <div className="flex flex-col items-center space-y-3 mt-4">
                            {qrUrl && <img src={qrUrl} alt="QR Code" className="w-40 h-40" />}
                            <button
                                className="text-sm text-blue-500 underline"
                                onClick={() => alert(`Your secret code: ${secret}`)}
                            >
                                Can’t scan the QR code?
                            </button>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                            <Button variant="ghost" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button onClick={() => setStep(2)}>Next</Button>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <p className="text-sm">Enter the 6-digit code from your authenticator app</p>
                        <Input
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="123456"
                            maxLength={6}
                        />

                        <div className="flex justify-end gap-2 mt-2">
                            <Button variant="ghost" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button
                                onClick={() => {
                                    onComplete();
                                }}
                            >
                                Verify
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
