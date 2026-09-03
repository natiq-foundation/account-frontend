import { useEffect, useMemo, useRef, useState } from "react";
import type { ClipboardEvent, FormEvent, KeyboardEvent } from "react";

import {
    ArrowLeft,
    Check,
    CheckCircle2,
    Eye,
    EyeOff,
    KeyRound,
    Loader2,
    Lock,
    Mail,
    Phone,
    ShieldAlert,
} from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export interface ResetPasswordFlowDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly userEmail?: string;
    readonly userPhone?: string;
    readonly onPasswordUpdated?: () => void;
}

type ResetStep = "method" | "otp" | "new_password" | "success";
type ResetMethod = "email" | "sms";

const OTP_COUNTDOWN_SECONDS = 120;
const OTP_LENGTH = 6;

export const ResetPasswordFlowDialog = ({
    isOpen,
    onClose,
    userEmail = "",
    userPhone = "",
    onPasswordUpdated,
}: ResetPasswordFlowDialogProps) => {
    const [step, setStep] = useState<ResetStep>("method");
    const [selectedMethod, setSelectedMethod] = useState<ResetMethod>("email");
    const [otpCode, setOtpCode] = useState<string[]>(
        Array(OTP_LENGTH).fill(""),
    );
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(OTP_COUNTDOWN_SECONDS);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const passwordStrength = useMemo(() => {
        if (!newPassword) {
            return {
                score: 0,
                label: "",
                color: "bg-zinc-800",
                text: "text-zinc-500",
            };
        }

        let score = 0;
        if (newPassword.length >= 8) score += 1;
        if (/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword)) score += 1;
        if (/\d/.test(newPassword)) score += 1;
        if (/[^A-Za-z0-9]/.test(newPassword)) score += 1;

        switch (score) {
            case 1:
                return {
                    score: 1,
                    label: "Weak",
                    color: "bg-rose-500",
                    text: "text-rose-400",
                };
            case 2:
                return {
                    score: 2,
                    label: "Fair",
                    color: "bg-amber-500",
                    text: "text-amber-400",
                };
            case 3:
                return {
                    score: 3,
                    label: "Good",
                    color: "bg-blue-500",
                    text: "text-blue-400",
                };
            case 4:
                return {
                    score: 4,
                    label: "Strong",
                    color: "bg-emerald-500",
                    text: "text-emerald-400",
                };
            default:
                return {
                    score: 0,
                    label: "Very Weak",
                    color: "bg-rose-500",
                    text: "text-rose-400",
                };
        }
    }, [newPassword]);

    useEffect(() => {
        if (step !== "otp") return;
        if (timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [step, timeLeft]);

    useEffect(() => {
        if (step === "otp") {
            const timer = setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [step]);

    const formatTimer = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleClose = () => {
        setStep("method");
        setSelectedMethod("email");
        setOtpCode(Array(OTP_LENGTH).fill(""));
        setNewPassword("");
        setConfirmPassword("");
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        setErrorMessage("");
        setIsLoading(false);
        setTimeLeft(OTP_COUNTDOWN_SECONDS);
        onClose();
    };

    const handleSendOtp = () => {
        setErrorMessage("");
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setTimeLeft(OTP_COUNTDOWN_SECONDS);
            setOtpCode(Array(OTP_LENGTH).fill(""));
            setStep("otp");
        }, 800);
    };

    const handleResendOtp = () => {
        if (timeLeft > 0 || isLoading) return;
        setErrorMessage("");
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            setOtpCode(Array(OTP_LENGTH).fill(""));
            setTimeLeft(OTP_COUNTDOWN_SECONDS);
            inputRefs.current[0]?.focus();
        }, 800);
    };

    const handleOtpChange = (index: number, value: string) => {
        const cleaned = value.replace(/\D/g, "");
        if (!cleaned) {
            const nextOtp = [...otpCode];
            nextOtp[index] = "";
            setOtpCode(nextOtp);
            return;
        }

        const nextOtp = [...otpCode];
        if (cleaned.length > 1) {
            const chars = cleaned.slice(0, OTP_LENGTH).split("");
            for (let i = 0; i < OTP_LENGTH; i++) {
                nextOtp[i] = chars[i] || "";
            }
            setOtpCode(nextOtp);
            const focusIndex = Math.min(chars.length, OTP_LENGTH - 1);
            inputRefs.current[focusIndex]?.focus();
            return;
        }

        nextOtp[index] = cleaned[cleaned.length - 1];
        setOtpCode(nextOtp);

        if (index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (
        index: number,
        e: KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key === "Backspace") {
            if (!otpCode[index] && index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpPaste = (e: ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const pastedData = e.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);
        if (!pastedData) return;

        const nextOtp = [...otpCode];
        for (let i = 0; i < OTP_LENGTH; i++) {
            nextOtp[i] = pastedData[i] || "";
        }
        setOtpCode(nextOtp);
        const focusTarget = Math.min(pastedData.length, OTP_LENGTH - 1);
        inputRefs.current[focusTarget]?.focus();
    };

    const isOtpComplete = otpCode.every((digit) => digit.trim() !== "");

    const handleVerifyOtp = () => {
        setErrorMessage("");
        const fullCode = otpCode.join("");
        if (fullCode.length !== OTP_LENGTH) {
            setErrorMessage("Please enter a valid 6-digit code.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep("new_password");
        }, 800);
    };

    const handleSetNewPassword = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");

        if (newPassword.length < 8) {
            setErrorMessage("Password must be at least 8 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setStep("success");
            if (onPasswordUpdated) {
                onPasswordUpdated();
            }
        }, 900);
    };

    const maskedTarget =
        selectedMethod === "email"
            ? userEmail
                ? userEmail.replace(
                      /(.{2})(.*)(?=@)/,
                      (_, a, b) => a + "*".repeat(b.length),
                  )
                : "your email"
            : userPhone
              ? userPhone.replace(/(\d{3})\d+(\d{2})/, "$1****$2")
              : "your phone number";

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogContent className="max-w-md border-zinc-800 bg-zinc-950 p-6 text-zinc-100 shadow-2xl">
                <DialogHeader className="border-b border-zinc-800/80 pb-4">
                    <div className="flex items-center gap-2.5">
                        {step !== "method" && step !== "success" && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    setErrorMessage("");
                                    if (step === "otp") setStep("method");
                                    if (step === "new_password") setStep("otp");
                                }}
                                className="h-8 w-8 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                            >
                                <ArrowLeft className="h-4 w-4" />
                            </Button>
                        )}
                        <DialogTitle className="text-lg font-semibold text-zinc-100">
                            {step === "method" && "Reset Password"}
                            {step === "otp" && "Verification Code"}
                            {step === "new_password" && "Set New Password"}
                            {step === "success" && "Success"}
                        </DialogTitle>
                    </div>
                    <DialogDescription className="sr-only">
                        Password reset and verification modal flow
                    </DialogDescription>
                </DialogHeader>

                {errorMessage && (
                    <Alert
                        variant="destructive"
                        className="border-rose-900/60 bg-rose-950/40 text-rose-300"
                    >
                        <ShieldAlert className="h-4 w-4 text-rose-400" />
                        <AlertDescription className="text-xs">
                            {errorMessage}
                        </AlertDescription>
                    </Alert>
                )}

                <div className="mt-1">
                    {step === "method" && (
                        <div className="space-y-4">
                            <p className="text-xs leading-5 text-zinc-400">
                                Select a verification method to receive a
                                temporary one-time password (OTP):
                            </p>

                            <div className="space-y-2.5">
                                <div
                                    onClick={() => setSelectedMethod("email")}
                                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-colors ${
                                        selectedMethod === "email"
                                            ? "border-zinc-500 bg-zinc-900"
                                            : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                                            <Mail className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-200">
                                                Email Address
                                            </p>
                                            <p className="text-xs text-zinc-400">
                                                {userEmail ||
                                                    "No primary email set"}
                                            </p>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="resetMethod"
                                        value="email"
                                        checked={selectedMethod === "email"}
                                        onChange={() =>
                                            setSelectedMethod("email")
                                        }
                                        className="h-4 w-4 accent-zinc-100"
                                    />
                                </div>

                                <div
                                    onClick={() => setSelectedMethod("sms")}
                                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition-colors ${
                                        selectedMethod === "sms"
                                            ? "border-zinc-500 bg-zinc-900"
                                            : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-200">
                                                SMS / Phone
                                            </p>
                                            <p className="text-xs text-zinc-400">
                                                {userPhone ||
                                                    "No primary phone set"}
                                            </p>
                                        </div>
                                    </div>
                                    <input
                                        type="radio"
                                        name="resetMethod"
                                        value="sms"
                                        checked={selectedMethod === "sms"}
                                        onChange={() =>
                                            setSelectedMethod("sms")
                                        }
                                        className="h-4 w-4 accent-zinc-100"
                                    />
                                </div>
                            </div>

                            <Button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={isLoading}
                                className="w-full rounded-xl bg-zinc-100 py-2.5 text-sm font-medium text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending Code...
                                    </>
                                ) : (
                                    "Continue"
                                )}
                            </Button>
                        </div>
                    )}

                    {step === "otp" && (
                        <div className="space-y-5">
                            <p className="text-center text-xs leading-5 text-zinc-400">
                                Enter the 6-digit verification code sent to{" "}
                                <br />
                                <span className="font-medium text-zinc-200">
                                    {maskedTarget}
                                </span>
                            </p>

                            <div
                                className="flex justify-center gap-2 sm:gap-2.5"
                                dir="ltr"
                                onPaste={handleOtpPaste}
                            >
                                {otpCode.map((digit, index) => (
                                    <Input
                                        key={index}
                                        ref={(el) => {
                                            inputRefs.current[index] = el;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) =>
                                            handleOtpChange(
                                                index,
                                                e.target.value,
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            handleOtpKeyDown(index, e)
                                        }
                                        className={`h-12 w-11 rounded-xl border bg-zinc-900 text-center font-mono text-xl font-bold text-zinc-100 outline-none transition-all sm:h-14 sm:w-12 ${
                                            digit
                                                ? "border-zinc-400 bg-zinc-900/90 shadow-sm"
                                                : "border-zinc-800 hover:border-zinc-700 focus-visible:ring-1 focus-visible:ring-zinc-400"
                                        }`}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center justify-between px-1 text-xs text-zinc-400">
                                <span>Didn't receive the code?</span>
                                {timeLeft > 0 ? (
                                    <span className="font-mono text-zinc-400">
                                        Resend in{" "}
                                        <span className="font-semibold text-zinc-200">
                                            {formatTimer(timeLeft)}
                                        </span>
                                    </span>
                                ) : (
                                    <Button
                                        type="button"
                                        variant="link"
                                        onClick={handleResendOtp}
                                        disabled={isLoading}
                                        className="h-auto p-0 text-xs font-medium text-zinc-300 hover:text-zinc-100 hover:underline"
                                    >
                                        Resend Code
                                    </Button>
                                )}
                            </div>

                            <Button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={isLoading || !isOtpComplete}
                                className="w-full rounded-xl bg-zinc-100 py-2.5 text-sm font-medium text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify Code"
                                )}
                            </Button>
                        </div>
                    )}

                    {step === "new_password" && (
                        <form
                            onSubmit={handleSetNewPassword}
                            className="space-y-4"
                        >
                            <div>
                                <Label className="mb-1.5 block text-xs font-medium text-zinc-300">
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                                    <Input
                                        type={
                                            showNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={newPassword}
                                        onChange={(e) =>
                                            setNewPassword(e.target.value)
                                        }
                                        placeholder="••••••••"
                                        className="rounded-xl border-zinc-800 bg-zinc-900 py-2.5 pl-9 pr-10 text-sm text-zinc-100 focus-visible:ring-1 focus-visible:ring-zinc-500"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            setShowNewPassword(!showNewPassword)
                                        }
                                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-zinc-500 hover:bg-transparent hover:text-zinc-300"
                                    >
                                        {showNewPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>

                                {newPassword && (
                                    <div className="mt-2.5 space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-zinc-400">
                                                Password strength:
                                            </span>
                                            <span
                                                className={`font-medium ${passwordStrength.text}`}
                                            >
                                                {passwordStrength.label}
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-4 gap-1.5">
                                            {[1, 2, 3, 4].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`h-1.5 rounded-full transition-all duration-300 ${
                                                        passwordStrength.score >=
                                                        level
                                                            ? passwordStrength.color
                                                            : "bg-zinc-800"
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div>
                                <Label className="mb-1.5 block text-xs font-medium text-zinc-300">
                                    Confirm New Password
                                </Label>
                                <div className="relative">
                                    <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                                    <Input
                                        type={
                                            showConfirmPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        placeholder="••••••••"
                                        className="rounded-xl border-zinc-800 bg-zinc-900 py-2.5 pl-9 pr-10 text-sm text-zinc-100 focus-visible:ring-1 focus-visible:ring-zinc-500"
                                        required
                                    />
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword,
                                            )
                                        }
                                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 text-zinc-500 hover:bg-transparent hover:text-zinc-300"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-1.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 p-3 text-xs text-zinc-400">
                                <div className="flex items-center gap-1.5">
                                    <div
                                        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${newPassword.length >= 8 ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-500"}`}
                                    >
                                        <Check className="h-2.5 w-2.5" />
                                    </div>
                                    <span
                                        className={
                                            newPassword.length >= 8
                                                ? "text-zinc-200"
                                                : ""
                                        }
                                    >
                                        At least 8 characters
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div
                                        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-500"}`}
                                    >
                                        <Check className="h-2.5 w-2.5" />
                                    </div>
                                    <span
                                        className={
                                            /[A-Z]/.test(newPassword) &&
                                            /[a-z]/.test(newPassword)
                                                ? "text-zinc-200"
                                                : ""
                                        }
                                    >
                                        Uppercase & lowercase letters
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <div
                                        className={`flex h-3.5 w-3.5 items-center justify-center rounded-full ${/\d/.test(newPassword) ? "bg-emerald-500/20 text-emerald-400" : "bg-zinc-800 text-zinc-500"}`}
                                    >
                                        <Check className="h-2.5 w-2.5" />
                                    </div>
                                    <span
                                        className={
                                            /\d/.test(newPassword)
                                                ? "text-zinc-200"
                                                : ""
                                        }
                                    >
                                        At least one number
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={
                                    isLoading ||
                                    newPassword.length < 8 ||
                                    newPassword !== confirmPassword
                                }
                                className="w-full rounded-xl bg-zinc-100 py-2.5 text-sm font-medium text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Password"
                                )}
                            </Button>
                        </form>
                    )}

                    {step === "success" && (
                        <div className="space-y-3 py-3 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-800/80 bg-emerald-950/60 text-emerald-400">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>
                            <h3 className="text-base font-semibold text-zinc-100">
                                Password Updated!
                            </h3>
                            <p className="text-xs text-zinc-400">
                                Your account password has been successfully
                                reset. You can now use your new password to sign
                                in.
                            </p>
                            <Button
                                type="button"
                                onClick={handleClose}
                                className="mt-4 w-full rounded-xl bg-zinc-100 py-2.5 text-sm font-medium text-zinc-950 hover:bg-zinc-200"
                            >
                                Done
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};
