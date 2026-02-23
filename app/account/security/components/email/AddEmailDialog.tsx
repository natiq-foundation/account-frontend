"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { EmailItem } from "./type";

interface AddEmailDialogProps {
    open: boolean;
    onClose: () => void;
    onSuccess: (newEmail: EmailItem) => void;
}

export function AddEmailDialog({ open, onClose, onSuccess }: AddEmailDialogProps) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");

    const reset = () => {
        setStep(1);
        setEmail("");
        setCode("");
        onClose();
    };

    const sendCode = () => setStep(2);

    const verifyCode = () => {
        const newEmail: EmailItem = {
            id: Date.now().toString(),
            email,
            verified: true,
            primary: false,
        };
        onSuccess(newEmail);
        setStep(3);
    };

    return (
        <Dialog open={open} onOpenChange={reset}>
            <DialogContent className="space-y-6">
                <DialogHeader>
                    <DialogTitle>Add Email</DialogTitle>
                </DialogHeader>

                {step === 1 && (
                    <div className="space-y-4">
                        <Input
                            placeholder="Enter new email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Button disabled={!email} onClick={sendCode}>Send verification code</Button>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <InputOTP value={code} onChange={setCode} maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
                            <InputOTPGroup>
                                {[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} />)}
                            </InputOTPGroup>
                        </InputOTP>
                        <Button disabled={code.length !== 6} onClick={verifyCode}>Verify</Button>
                    </div>
                )}

                {step === 3 && <div className="text-green-600 font-medium text-center">Email added successfully</div>}
            </DialogContent>
        </Dialog>
    );
}
