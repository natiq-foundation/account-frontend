"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";

interface PhoneManagerProps {
    onClose: () => void;
}

export function PhoneManager({ onClose }: PhoneManagerProps) {
    const [phone, setPhone] = useState("+123456789");
    const [newPhone, setNewPhone] = useState("");
    const [step, setStep] = useState<"form" | "verify" | "success">("form");
    const [otp, setOtp] = useState("");

    const handleSendCode = () => {
        if (!newPhone) return alert("Phone required");

        console.log("Sending OTP to:", newPhone);
        setStep("verify");
    };

    const handleVerify = () => {
        console.log("Verifying OTP:", otp);

        setPhone(newPhone);
        setNewPhone("");
        setOtp("");
        setStep("success");

        setTimeout(() => {
            onClose();
            setStep("form");
        }, 2000);
    };

    return (
        <div className="space-y-4">

            {step === "form" && (
                <>
                    <div className="text-sm">
                        Current Phone Number: <b>{phone}</b>
                    </div>

                    <Input
                        placeholder="New phone number"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                    />

                    <Button onClick={handleSendCode}>Send Verification Code</Button>
                </>
            )}

            {step === "verify" && (
                <>
                    <div className="text-sm">
                        Code sent to <b>{newPhone}</b>
                    </div>

                    <InputOTP
                        maxLength={6}
                        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                        value={otp}
                        onChange={setOtp}
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

                    <Button onClick={handleVerify}>Verify & Save</Button>
                </>
            )}

            {step === "success" && (
                <div className="p-4 bg-green-100 text-green-800 rounded-md text-center">
                    Phone number updated successfully!
                </div>
            )}

        </div>
    );
}
