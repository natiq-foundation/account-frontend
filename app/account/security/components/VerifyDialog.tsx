"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";


interface VerifyDialogProps {
    open: boolean;
    onClose: () => void;
    type: "email" | "phone";
}

export function VerifyDialog({ open, onClose, type }: VerifyDialogProps) {

    const [step, setStep] = useState(1);
    const [code, setCode] = useState("");

    const sendCode = () => {
        setStep(2);
    };

    const verifyCode = () => {
        setStep(3);
    };

    const changeValue = () => {
        setStep(4);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="space-y-6">
                <DialogHeader>
                    <DialogTitle>
                        {type === "email" ? "Change Email" : "Change Phone"}
                    </DialogTitle>
                </DialogHeader>

                {step === 1 && (
                    <div className="space-y-4">
                        <p>We will send a verification code to your current {type}.</p>
                        <Button onClick={sendCode}>Send Code</Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        {step === 2 && (
                            <div className="space-y-4">

                                <InputOTP
                                    maxLength={6}
                                    value={code}
                                    onChange={(v) => setCode(v)}
                                    pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>

                                <Button
                                    disabled={code.length !== 6}
                                    onClick={verifyCode}
                                >
                                    Verify
                                </Button>
                            </div>
                        )}

                    </div>
                )}

                {step === 3 && (
                    <div className="space-y-4">
                        <Input
                            placeholder={`Enter new ${type}`}
                        />
                        <Button onClick={changeValue}>Submit</Button>
                    </div>
                )}

                {step === 4 && (
                    <div className="text-green-600 font-medium">
                        Successfully updated.
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
