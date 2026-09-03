import React, { useEffect, useRef, useState } from "react";

import {
    AlertTriangle,
    ArrowLeft,
    Check,
    Copy,
    Download,
    KeyRound,
    Loader2,
    Mail,
    Phone,
    RefreshCw,
    ShieldAlert,
    ShieldCheck,
    Trash2,
    X,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export interface RecoveryCodesDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onSaved?: (codes: readonly string[]) => void;
    readonly onDisable?: () => void;
    readonly initialCodes?: readonly string[];
    readonly userEmail?: string;
    readonly userPhone?: string;
}

type DialogStep = "method" | "otp" | "codes" | "delete_confirm";

type VerificationMethod = "email" | "sms";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 120;

const DEMO_VERIFICATION_CODE = "123456";

const DEFAULT_CODES: readonly string[] = [
    "8F4K-9L2P-1A3C",
    "7B2M-4K9L-0P1X",
    "3D5N-8V2M-9Q4L",
    "1X8P-3K5M-7L2N",
    "9L4C-2A8F-4K9L",
    "6P1X-7B2M-3D5N",
    "2M9Q-4L1X-8P3K",
    "5M7L-2N9L-4C2A",
    "4K9L-0P1X-7B2M",
    "6V3C-8N5P-2Q7L",
];

const createEmptyOtp = (): string[] =>
    Array.from({ length: OTP_LENGTH }, () => "");

const generateSegment = (): string => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

    let result = "";

    for (let i = 0; i < 4; i += 1) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return result;
};

export const RecoveryCodesDialog: React.FC<RecoveryCodesDialogProps> = ({
    isOpen,
    onClose,
    onSaved,
    onDisable,
    initialCodes = DEFAULT_CODES,
    userEmail = "",
    userPhone = "",
}) => {
    const [step, setStep] = useState<DialogStep>("method");

    const [method, setMethod] = useState<VerificationMethod>("email");

    const [otp, setOtp] = useState<string[]>(createEmptyOtp());

    const [otpError, setOtpError] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(false);

    const [timer, setTimer] = useState<number>(RESEND_SECONDS);

    const [codes, setCodes] = useState<readonly string[]>(initialCodes);

    const [copied, setCopied] = useState<boolean>(false);

    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setStep("method");
        setMethod(userEmail ? "email" : "sms");
        setOtp(createEmptyOtp());
        setOtpError("");
        setLoading(false);
        setTimer(RESEND_SECONDS);
        setCodes(initialCodes);
        setCopied(false);
        setIsConfirmed(false);
    }, [isOpen, initialCodes, userEmail]);

    useEffect(() => {
        if (step !== "otp" || timer <= 0) {
            return;
        }

        const interval = window.setInterval(() => {
            setTimer((previous) => {
                if (previous <= 1) {
                    return 0;
                }

                return previous - 1;
            });
        }, 1000);

        return () => {
            window.clearInterval(interval);
        };
    }, [step, timer]);

    useEffect(() => {
        if (!isOpen || step !== "otp") {
            return;
        }

        const timeout = window.setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 100);

        return () => {
            window.clearTimeout(timeout);
        };
    }, [isOpen, step]);

    const handleSendOtp = (): void => {
        if (loading) {
            return;
        }

        setLoading(true);
        setOtpError("");

        window.setTimeout(() => {
            setLoading(false);
            setTimer(RESEND_SECONDS);
            setOtp(createEmptyOtp());
            setStep("otp");
        }, 600);
    };

    const handleResendOtp = (): void => {
        if (timer > 0 || loading) {
            return;
        }

        setLoading(true);
        setOtpError("");

        window.setTimeout(() => {
            setLoading(false);
            setTimer(RESEND_SECONDS);
            setOtp(createEmptyOtp());

            window.setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 50);
        }, 600);
    };

    const handleOtpChange = (index: number, value: string): void => {
        setOtpError("");

        const cleaned = value.replace(/\D/g, "").slice(0, OTP_LENGTH);

        if (!cleaned) {
            const next = [...otp];

            next[index] = "";

            setOtp(next);

            return;
        }

        if (cleaned.length > 1) {
            const digits = cleaned.split("").slice(0, OTP_LENGTH);

            const next = createEmptyOtp();

            digits.forEach((digit, digitIndex) => {
                next[digitIndex] = digit;
            });

            setOtp(next);

            const focusIndex = Math.min(digits.length, OTP_LENGTH - 1);

            inputRefs.current[focusIndex]?.focus();

            return;
        }

        const next = [...otp];

        next[index] = cleaned;

        setOtp(next);

        if (index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpPaste = (
        event: React.ClipboardEvent<HTMLDivElement>,
    ): void => {
        event.preventDefault();

        const pasted = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);

        if (!pasted) {
            return;
        }

        const next = createEmptyOtp();

        pasted.split("").forEach((digit, index) => {
            next[index] = digit;
        });

        setOtp(next);
        setOtpError("");

        const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);

        inputRefs.current[focusIndex]?.focus();
    };

    const handleOtpKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ): void => {
        if (event.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();

            return;
        }

        if (event.key === "ArrowLeft" && index > 0) {
            event.preventDefault();

            inputRefs.current[index - 1]?.focus();

            return;
        }

        if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            event.preventDefault();

            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleVerifyOtp = (): void => {
        if (loading) {
            return;
        }

        const code = otp.join("");

        setOtpError("");

        if (code.length !== OTP_LENGTH) {
            setOtpError("Please enter the complete 6-digit verification code.");

            return;
        }

        setLoading(true);

        window.setTimeout(() => {
            if (code !== DEMO_VERIFICATION_CODE) {
                setOtpError("Invalid verification code. Please try again.");

                setLoading(false);

                return;
            }

            setLoading(false);

            setOtp(createEmptyOtp());

            setStep("codes");
        }, 600);
    };

    const handleCopyAll = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(codes.join("\n"));

            setCopied(true);

            window.setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch {
            setCopied(false);
        }
    };

    const handleDownload = (): void => {
        const content =
            "Backup Recovery Codes\n\n" +
            codes.map((code, index) => `${index + 1}. ${code}`).join("\n") +
            "\n\nEach code can only be used once.";

        const blob = new Blob([content], {
            type: "text/plain;charset=utf-8",
        });

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = "recovery-codes.txt";

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);
    };

    const handleRegenerate = (): void => {
        const freshCodes = Array.from(
            {
                length: 10,
            },
            () =>
                `${generateSegment()}-${generateSegment()}-${generateSegment()}`,
        );

        setCodes(freshCodes);

        setIsConfirmed(false);

        setCopied(false);
    };

    const handleFinalDone = (): void => {
        if (!isConfirmed) {
            return;
        }

        onSaved?.(codes);

        onClose();
    };

    const handleConfirmDelete = (): void => {
        onDisable?.();

        setIsConfirmed(false);

        onClose();
    };

    const handleBack = (): void => {
        if (loading) {
            return;
        }

        if (step === "otp") {
            setStep("method");

            setOtp(createEmptyOtp());

            setOtpError("");

            return;
        }

        if (step === "delete_confirm") {
            setStep("codes");

            return;
        }
    };

    const handleClose = (): void => {
        if (loading) {
            return;
        }

        onClose();
    };

    const target = method === "email" ? userEmail : userPhone;

    const otpComplete = otp.join("").length === OTP_LENGTH;

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    handleClose();
                }
            }}
        >
            <DialogContent
                showCloseButton={false}
                className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-100 shadow-2xl sm:p-6"
            >
                <DialogHeader className="flex flex-row items-start justify-between gap-3 border-b border-zinc-800 pb-4 text-left">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                            {step === "codes" ? (
                                <KeyRound className="h-4.5 w-4.5 text-zinc-300" />
                            ) : step === "delete_confirm" ? (
                                <Trash2 className="h-4.5 w-4.5 text-red-400" />
                            ) : (
                                <ShieldCheck className="h-4.5 w-4.5 text-zinc-300" />
                            )}
                        </div>

                        <div>
                            <DialogTitle className="text-base font-semibold text-zinc-100">
                                {step === "method"
                                    ? "Security Verification"
                                    : step === "otp"
                                      ? "Enter Verification Code"
                                      : step === "codes"
                                        ? "Backup Recovery Codes"
                                        : "Delete Backup Codes?"}
                            </DialogTitle>

                            <DialogDescription className="mt-1 text-xs text-zinc-400">
                                {step === "method"
                                    ? "Verify your identity before accessing your recovery codes."
                                    : step === "otp"
                                      ? "Enter the code sent to your registered contact."
                                      : step === "codes"
                                        ? "Store these codes in a safe place."
                                        : "This will invalidate your existing recovery codes."}
                            </DialogDescription>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={handleClose}
                        disabled={loading}
                        aria-label="Close"
                        className="h-8 w-8 shrink-0 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                {step !== "delete_confirm" && (
                    <div className="flex items-center gap-2">
                        <div
                            className={`flex h-7 flex-1 items-center justify-center rounded-lg text-[10px] font-medium ${
                                step === "method"
                                    ? "bg-zinc-100 text-zinc-950"
                                    : "bg-emerald-500/10 text-emerald-400"
                            } `}
                        >
                            {step !== "method" && (
                                <Check className="mr-1 h-3.5 w-3.5" />
                            )}
                            1. Verify identity
                        </div>

                        <div
                            className={`h-px w-4 ${
                                step === "codes"
                                    ? "bg-emerald-500/50"
                                    : "bg-zinc-800"
                            } `}
                        />

                        <div
                            className={`flex h-7 flex-1 items-center justify-center rounded-lg text-[10px] font-medium ${
                                step === "codes"
                                    ? "bg-zinc-100 text-zinc-950"
                                    : "bg-zinc-900 text-zinc-600"
                            } `}
                        >
                            2. Recovery codes
                        </div>
                    </div>
                )}

                {step === "method" && (
                    <div className="space-y-4">
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
                            <div className="flex items-start gap-2.5">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />

                                <p className="text-xs leading-5 text-zinc-500">
                                    For your security, verify your identity
                                    before accessing your backup recovery codes.
                                </p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <button
                                type="button"
                                onClick={() => setMethod("email")}
                                className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                                    method === "email"
                                        ? "border-zinc-500 bg-zinc-900"
                                        : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                                } `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800">
                                        <Mail className="h-4 w-4 text-zinc-300" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-200">
                                            Email
                                        </p>

                                        <p className="mt-0.5 text-[11px] text-zinc-500">
                                            {userEmail}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`h-4 w-4 rounded-full border ${
                                        method === "email"
                                            ? "border-zinc-200 bg-zinc-200"
                                            : "border-zinc-700"
                                    } `}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() => setMethod("sms")}
                                className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                                    method === "sms"
                                        ? "border-zinc-500 bg-zinc-900"
                                        : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                                } `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800">
                                        <Phone className="h-4 w-4 text-zinc-300" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-medium text-zinc-200">
                                            SMS
                                        </p>

                                        <p className="mt-0.5 text-[11px] text-zinc-500">
                                            {userPhone}
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`h-4 w-4 rounded-full border ${
                                        method === "sms"
                                            ? "border-zinc-200 bg-zinc-200"
                                            : "border-zinc-700"
                                    } `}
                                />
                            </button>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                onClick={handleSendOtp}
                                disabled={loading}
                                className="w-full rounded-xl bg-zinc-100 text-xs font-medium text-zinc-950 hover:bg-zinc-200"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending code...
                                    </>
                                ) : (
                                    "Send Verification Code"
                                )}
                            </Button>
                        </DialogFooter>
                    </div>
                )}

                {step === "otp" && (
                    <div className="space-y-4">
                        {otpError && (
                            <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

                                <span>{otpError}</span>
                            </div>
                        )}

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
                            <div className="flex items-center gap-2.5">
                                {method === "email" ? (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800">
                                        <Mail className="h-4 w-4 text-zinc-300" />
                                    </div>
                                ) : (
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800">
                                        <Phone className="h-4 w-4 text-zinc-300" />
                                    </div>
                                )}

                                <div>
                                    <p className="text-[11px] text-zinc-500">
                                        Verification code sent to
                                    </p>

                                    <p className="mt-0.5 text-xs font-medium text-zinc-200">
                                        {target}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <div>
                                <p className="text-xs font-medium text-zinc-300">
                                    Enter your 6-digit verification code
                                </p>

                                <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                                    Enter the code you received to continue.
                                </p>
                            </div>

                            <div
                                dir="ltr"
                                onPaste={handleOtpPaste}
                                className="flex justify-center gap-2"
                            >
                                {otp.map((value, index) => (
                                    <Input
                                        key={index}
                                        ref={(element) => {
                                            inputRefs.current[index] = element;
                                        }}
                                        type="text"
                                        inputMode="numeric"
                                        autoComplete={
                                            index === 0
                                                ? "one-time-code"
                                                : "off"
                                        }
                                        maxLength={1}
                                        value={value}
                                        disabled={loading}
                                        onChange={(event) =>
                                            handleOtpChange(
                                                index,
                                                event.target.value,
                                            )
                                        }
                                        onKeyDown={(event) =>
                                            handleOtpKeyDown(index, event)
                                        }
                                        onFocus={(event) =>
                                            event.currentTarget.select()
                                        }
                                        aria-label={`Verification digit ${index + 1}`}
                                        className="h-11 w-9 rounded-xl border-zinc-800 bg-zinc-900 text-center font-mono text-lg font-bold text-zinc-100 focus-visible:ring-1 focus-visible:ring-zinc-400 sm:h-12 sm:w-11"
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3">
                            <div className="flex items-start gap-2">
                                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

                                <p className="text-[11px] leading-5 text-amber-300">
                                    Demo code:
                                    <span className="ml-1 font-mono font-bold">
                                        123456
                                    </span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-zinc-500">
                            <span>Didn't receive the code?</span>

                            {timer > 0 ? (
                                <span className="font-mono text-zinc-300">
                                    Resend in{" "}
                                    {Math.floor(timer / 60)
                                        .toString()
                                        .padStart(2, "0")}
                                    :{(timer % 60).toString().padStart(2, "0")}
                                </span>
                            ) : (
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={handleResendOtp}
                                    disabled={loading}
                                    className="h-auto p-0 text-[11px] text-zinc-300"
                                >
                                    Resend code
                                </Button>
                            )}
                        </div>

                        <DialogFooter className="flex gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                disabled={loading}
                                className="w-1/3 rounded-xl border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800"
                            >
                                <ArrowLeft className="mr-1.5 h-3.5 w-3.5" />
                                Back
                            </Button>

                            <Button
                                type="button"
                                onClick={handleVerifyOtp}
                                disabled={!otpComplete || loading}
                                className="w-2/3 rounded-xl bg-zinc-100 text-xs font-medium text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify & Access Codes"
                                )}
                            </Button>
                        </DialogFooter>
                    </div>
                )}
                {step === "codes" && (
                    <div className="space-y-4">
                        <div className="flex items-start gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-amber-300">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

                            <p className="text-xs leading-4">
                                Each code can only be used once to access your
                                account.
                            </p>
                        </div>

                        <div className="grid max-h-64 grid-cols-1 gap-2 overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 font-mono text-xs sm:grid-cols-2">
                            {codes.map((code, index) => (
                                <div
                                    key={`${code}-${index}`}
                                    className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-zinc-900 px-2.5 py-1.5 text-zinc-200"
                                >
                                    <span>{code}</span>

                                    <span className="ml-2 text-[10px] text-zinc-500">
                                        #{index + 1}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col gap-2 pt-1 sm:flex-row sm:items-center sm:justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleRegenerate}
                                className="h-8 gap-1.5 rounded-lg border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800"
                            >
                                <RefreshCw className="h-3.5 w-3.5" />
                                Generate New
                            </Button>

                            <div className="flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleCopyAll}
                                    className="h-8 gap-1.5 rounded-lg border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800"
                                >
                                    {copied ? (
                                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                                    ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                    )}

                                    {copied ? "Copied" : "Copy"}
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={handleDownload}
                                    className="h-8 gap-1.5 rounded-lg border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800"
                                >
                                    <Download className="h-3.5 w-3.5" />
                                    Download
                                </Button>
                            </div>
                        </div>

                        <div className="border-t border-zinc-800 pt-3">
                            <label className="flex cursor-pointer items-center gap-2.5">
                                <Checkbox
                                    checked={isConfirmed}
                                    onCheckedChange={(checked) =>
                                        setIsConfirmed(checked === true)
                                    }
                                    className="border-zinc-700 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
                                />

                                <span className="text-xs text-zinc-300">
                                    I have saved these recovery codes safely.
                                </span>
                            </label>
                        </div>

                        <DialogFooter className="flex flex-col gap-3 border-t border-zinc-800 pt-3 sm:flex-row sm:items-center sm:justify-between">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setStep("delete_confirm")}
                                className="h-8 w-full gap-1.5 rounded-lg border-red-500/20 bg-red-500/10 text-xs text-red-400 hover:bg-red-500/20 sm:w-auto"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Delete Codes
                            </Button>

                            <div className="flex w-full gap-2 sm:w-auto">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={onClose}
                                    className="h-8 flex-1 rounded-lg border-zinc-800 bg-zinc-900 text-xs text-zinc-400 hover:bg-zinc-800 sm:flex-none"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    type="button"
                                    onClick={handleFinalDone}
                                    disabled={!isConfirmed}
                                    className="h-8 flex-1 rounded-lg bg-zinc-100 text-xs font-medium text-zinc-950 hover:bg-zinc-200 disabled:opacity-50 sm:flex-none"
                                >
                                    Done
                                </Button>
                            </div>
                        </DialogFooter>
                    </div>
                )}

                {step === "delete_confirm" && (
                    <div className="space-y-4">
                        <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs leading-5 text-red-300">
                            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />

                            <p>
                                After deleting these codes, you will no longer
                                be able to use them to recover your account.
                            </p>
                        </div>

                        <DialogFooter className="flex flex-col-reverse gap-2 border-t border-zinc-800 pt-3 sm:flex-row sm:justify-end">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleBack}
                                className="h-8 rounded-lg border-zinc-800 bg-zinc-900 text-xs text-zinc-300 hover:bg-zinc-800"
                            >
                                Cancel
                            </Button>

                            <Button
                                type="button"
                                onClick={handleConfirmDelete}
                                className="h-8 rounded-lg bg-red-600 text-xs font-medium text-white hover:bg-red-500"
                            >
                                <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                                Delete Codes
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default RecoveryCodesDialog;
