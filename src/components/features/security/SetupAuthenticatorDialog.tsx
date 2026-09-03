import React, { useEffect, useMemo, useRef, useState } from "react";
import * as OTPAuth from "otpauth";

import {
    AlertTriangle,
    ArrowLeft,
    Check,
    Copy,
    KeyRound,
    Loader2,
    Mail,
    Phone,
    ShieldAlert,
    ShieldCheck,
    Smartphone,
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
import { Input } from "@/components/ui/input";

export interface SetupAuthenticatorDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onSuccess: () => void;
    readonly userEmail?: string;
    readonly userPhone?: string;
}

type DialogStep = "method" | "identity_otp" | "authenticator";

type VerificationMethod = "email" | "sms";

const OTP_LENGTH = 6;

const DEMO_IDENTITY_CODE = "123456";

const SECRET_KEY = "JBSWY3DPEHPK3PXP";

const createEmptyOtp = (): string[] =>
    Array.from({ length: OTP_LENGTH }, () => "");

export const SetupAuthenticatorDialog: React.FC<
    SetupAuthenticatorDialogProps
> = ({ isOpen, onClose, onSuccess, userEmail = "", userPhone = "" }) => {
    const [step, setStep] = useState<DialogStep>("method");
    const [method, setMethod] = useState<VerificationMethod>(
        userEmail ? "email" : "sms",
    );

    const [identityOtp, setIdentityOtp] = useState<string[]>(createEmptyOtp());
    const [identityOtpError, setIdentityOtpError] = useState("");

    const [authenticatorOtp, setAuthenticatorOtp] =
        useState<string[]>(createEmptyOtp());
    const [authenticatorOtpError, setAuthenticatorOtpError] = useState("");

    const [loading, setLoading] = useState(false);
    const [showManualKey, setShowManualKey] = useState(false);
    const [copied, setCopied] = useState(false);

    const identityInputRefs = useRef<Array<HTMLInputElement | null>>([]);
    const authenticatorInputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const totp = useMemo(() => {
        return new OTPAuth.TOTP({
            issuer: "AmirPWA",
            label: userEmail || "UserAccount",
            algorithm: "SHA1",
            digits: OTP_LENGTH,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(SECRET_KEY),
        });
    }, [userEmail]);

    const otpAuthUri = useMemo(() => {
        return totp.toString();
    }, [totp]);

    const qrCodeUrl = useMemo(() => {
        return (
            "https://api.qrserver.com/v1/create-qr-code/" +
            `?size=220x220&data=${encodeURIComponent(otpAuthUri)}`
        );
    }, [otpAuthUri]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setStep("method");
        setMethod(userEmail ? "email" : "sms");
        setIdentityOtp(createEmptyOtp());
        setAuthenticatorOtp(createEmptyOtp());
        setIdentityOtpError("");
        setAuthenticatorOtpError("");
        setLoading(false);
        setShowManualKey(false);
        setCopied(false);
    }, [isOpen, userEmail]);

    useEffect(() => {
        if (!isOpen) return;

        const timer = window.setTimeout(() => {
            if (step === "identity_otp") {
                identityInputRefs.current[0]?.focus();
            } else if (step === "authenticator") {
                authenticatorInputRefs.current[0]?.focus();
            }
        }, 100);

        return () => window.clearTimeout(timer);
    }, [isOpen, step]);

    const handleSendOtp = (): void => {
        if (loading) return;

        setLoading(true);
        setIdentityOtpError("");

        window.setTimeout(() => {
            setLoading(false);
            setIdentityOtp(createEmptyOtp());
            setStep("identity_otp");
        }, 600);
    };

    const handleIdentityOtpChange = (index: number, value: string): void => {
        setIdentityOtpError("");
        const cleaned = value.replace(/\D/g, "").slice(0, OTP_LENGTH);

        if (!cleaned) {
            const next = [...identityOtp];
            next[index] = "";
            setIdentityOtp(next);
            return;
        }

        if (cleaned.length > 1) {
            const digits = cleaned.slice(0, OTP_LENGTH).split("");
            const next = createEmptyOtp();
            digits.forEach((digit, digitIndex) => {
                next[digitIndex] = digit;
            });
            setIdentityOtp(next);
            identityInputRefs.current[
                Math.min(digits.length, OTP_LENGTH - 1)
            ]?.focus();
            return;
        }

        const next = [...identityOtp];
        next[index] = cleaned;
        setIdentityOtp(next);

        if (index < OTP_LENGTH - 1) {
            identityInputRefs.current[index + 1]?.focus();
        }
    };

    const handleIdentityOtpPaste = (
        event: React.ClipboardEvent<HTMLDivElement>,
    ): void => {
        event.preventDefault();
        const pasted = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);

        if (!pasted) return;

        const next = createEmptyOtp();
        pasted.split("").forEach((digit, index) => {
            next[index] = digit;
        });

        setIdentityOtp(next);
        setIdentityOtpError("");
        identityInputRefs.current[
            Math.min(pasted.length, OTP_LENGTH - 1)
        ]?.focus();
    };

    const handleIdentityOtpKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ): void => {
        if (event.key === "Backspace" && !identityOtp[index] && index > 0) {
            identityInputRefs.current[index - 1]?.focus();
            return;
        }
        if (event.key === "ArrowLeft" && index > 0) {
            event.preventDefault();
            identityInputRefs.current[index - 1]?.focus();
            return;
        }
        if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            event.preventDefault();
            identityInputRefs.current[index + 1]?.focus();
        }
    };

    const handleVerifyIdentity = (): void => {
        if (loading) return;

        const code = identityOtp.join("");
        setIdentityOtpError("");

        if (code.length !== OTP_LENGTH) {
            setIdentityOtpError(
                "Please enter the complete 6-digit verification code.",
            );
            return;
        }

        setLoading(true);

        window.setTimeout(() => {
            if (code !== DEMO_IDENTITY_CODE) {
                setIdentityOtpError(
                    "Invalid verification code. Please try again.",
                );
                setLoading(false);
                return;
            }

            setLoading(false);
            setIdentityOtp(createEmptyOtp());
            setStep("authenticator");
        }, 600);
    };

    const handleAuthenticatorOtpChange = (
        index: number,
        value: string,
    ): void => {
        setAuthenticatorOtpError("");
        const cleaned = value.replace(/\D/g, "").slice(0, OTP_LENGTH);

        if (!cleaned) {
            const next = [...authenticatorOtp];
            next[index] = "";
            setAuthenticatorOtp(next);
            return;
        }

        if (cleaned.length > 1) {
            const digits = cleaned.slice(0, OTP_LENGTH).split("");
            const next = createEmptyOtp();
            digits.forEach((digit, digitIndex) => {
                next[digitIndex] = digit;
            });
            setAuthenticatorOtp(next);
            authenticatorInputRefs.current[
                Math.min(digits.length, OTP_LENGTH - 1)
            ]?.focus();
            return;
        }

        const next = [...authenticatorOtp];
        next[index] = cleaned;
        setAuthenticatorOtp(next);

        if (index < OTP_LENGTH - 1) {
            authenticatorInputRefs.current[index + 1]?.focus();
        }
    };

    const handleAuthenticatorOtpPaste = (
        event: React.ClipboardEvent<HTMLDivElement>,
    ): void => {
        event.preventDefault();
        const pasted = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);

        if (!pasted) return;

        const next = createEmptyOtp();
        pasted.split("").forEach((digit, index) => {
            next[index] = digit;
        });

        setAuthenticatorOtp(next);
        setAuthenticatorOtpError("");
        authenticatorInputRefs.current[
            Math.min(pasted.length, OTP_LENGTH - 1)
        ]?.focus();
    };

    const handleAuthenticatorOtpKeyDown = (
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ): void => {
        if (
            event.key === "Backspace" &&
            !authenticatorOtp[index] &&
            index > 0
        ) {
            authenticatorInputRefs.current[index - 1]?.focus();
            return;
        }
        if (event.key === "ArrowLeft" && index > 0) {
            event.preventDefault();
            authenticatorInputRefs.current[index - 1]?.focus();
            return;
        }
        if (event.key === "ArrowRight" && index < OTP_LENGTH - 1) {
            event.preventDefault();
            authenticatorInputRefs.current[index + 1]?.focus();
        }
    };

    const handleVerifyAuthenticator = (): void => {
        if (loading) return;

        const code = authenticatorOtp.join("");
        setAuthenticatorOtpError("");

        if (code.length !== OTP_LENGTH) {
            setAuthenticatorOtpError(
                "Please enter the complete 6-digit authenticator code.",
            );
            return;
        }

        setLoading(true);

        try {
            const delta = totp.validate({
                token: code,
                window: 1,
            });

            if (delta === null) {
                setAuthenticatorOtpError(
                    "Invalid authenticator code. Please enter the current code from your authenticator app.",
                );
                setLoading(false);
                return;
            }

            setLoading(false);
            setAuthenticatorOtp(createEmptyOtp());
            onSuccess();
            onClose();
        } catch {
            setAuthenticatorOtpError(
                "Unable to verify the authenticator code.",
            );
            setLoading(false);
        }
    };

    const handleCopySecret = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(SECRET_KEY);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };

    const handleBack = (): void => {
        if (loading) return;

        if (step === "identity_otp") {
            setStep("method");
            setIdentityOtp(createEmptyOtp());
            setIdentityOtpError("");
            return;
        }

        if (step === "authenticator") {
            setStep("identity_otp");
            setAuthenticatorOtp(createEmptyOtp());
            setAuthenticatorOtpError("");
        }
    };

    const handleClose = (): void => {
        if (loading) return;
        onClose();
    };

    const identityOtpComplete = identityOtp.join("").length === OTP_LENGTH;
    const authenticatorOtpComplete =
        authenticatorOtp.join("").length === OTP_LENGTH;
    const target =
        method === "email"
            ? userEmail || "Registered email"
            : userPhone || "Registered phone";

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) handleClose();
            }}
        >
            <DialogContent
                showCloseButton={false}
                className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-100 shadow-2xl sm:p-6"
            >
                {/* Header */}
                <DialogHeader className="flex flex-row items-start justify-between gap-3 border-b border-zinc-800 pb-4 text-left">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                            {step === "authenticator" ? (
                                <Smartphone className="h-4.5 w-4.5 text-zinc-300" />
                            ) : (
                                <ShieldCheck className="h-4.5 w-4.5 text-zinc-300" />
                            )}
                        </div>

                        <div>
                            <DialogTitle className="text-base font-semibold text-zinc-100">
                                {step === "method"
                                    ? "Security Verification"
                                    : step === "identity_otp"
                                      ? "Enter Verification Code"
                                      : "Set up Authenticator"}
                            </DialogTitle>

                            <DialogDescription className="mt-1 text-xs text-zinc-400">
                                {step === "method"
                                    ? "Verify your identity before setting up a new authenticator."
                                    : step === "identity_otp"
                                      ? "Enter the code sent to your registered contact."
                                      : "Connect your authenticator app and verify the generated code."}
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

                <div className="flex items-center gap-2">
                    <div
                        className={`flex h-7 flex-1 items-center justify-center rounded-lg text-[10px] font-medium ${
                            step === "method"
                                ? "bg-zinc-100 text-zinc-950"
                                : "bg-emerald-500/10 text-emerald-400"
                        }`}
                    >
                        {step !== "method" && (
                            <Check className="mr-1 h-3.5 w-3.5" />
                        )}
                        1. Verify identity
                    </div>

                    <div
                        className={`h-px w-4 ${
                            step === "authenticator"
                                ? "bg-emerald-500/50"
                                : "bg-zinc-800"
                        }`}
                    />

                    <div
                        className={`flex h-7 flex-1 items-center justify-center rounded-lg text-[10px] font-medium ${
                            step === "authenticator"
                                ? "bg-zinc-100 text-zinc-950"
                                : "bg-zinc-900 text-zinc-600"
                        }`}
                    >
                        2. Authenticator
                    </div>
                </div>

                {step === "method" && (
                    <div className="space-y-4">
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
                            <div className="flex items-start gap-2.5">
                                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />
                                <p className="text-xs leading-5 text-zinc-500">
                                    For your security, we need to verify your
                                    identity before displaying the authenticator
                                    setup information.
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
                                }`}
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
                                            {userEmail || "No email registered"}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`h-4 w-4 rounded-full border ${
                                        method === "email"
                                            ? "border-zinc-200 bg-zinc-200"
                                            : "border-zinc-700"
                                    }`}
                                />
                            </button>

                            <button
                                type="button"
                                onClick={() => setMethod("sms")}
                                className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${
                                    method === "sms"
                                        ? "border-zinc-500 bg-zinc-900"
                                        : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700"
                                }`}
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
                                            {userPhone || "No phone registered"}
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className={`h-4 w-4 rounded-full border ${
                                        method === "sms"
                                            ? "border-zinc-200 bg-zinc-200"
                                            : "border-zinc-700"
                                    }`}
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

                {step === "identity_otp" && (
                    <div className="space-y-4">
                        {identityOtpError && (
                            <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{identityOtpError}</span>
                            </div>
                        )}

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-3">
                            <p className="text-xs text-zinc-400">
                                Verification code sent to:
                            </p>
                            <p className="mt-1 text-xs font-medium text-zinc-200">
                                {target}
                            </p>
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs font-medium text-zinc-300">
                                Enter your 6-digit verification code
                            </p>

                            <div
                                dir="ltr"
                                onPaste={handleIdentityOtpPaste}
                                className="flex justify-center gap-2"
                            >
                                {identityOtp.map((value, index) => (
                                    <Input
                                        key={index}
                                        ref={(element) => {
                                            identityInputRefs.current[index] =
                                                element;
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
                                            handleIdentityOtpChange(
                                                index,
                                                event.target.value,
                                            )
                                        }
                                        onKeyDown={(event) =>
                                            handleIdentityOtpKeyDown(
                                                index,
                                                event,
                                            )
                                        }
                                        onFocus={(event) =>
                                            event.currentTarget.select()
                                        }
                                        className="h-11 w-9 rounded-xl border-zinc-800 bg-zinc-900 text-center font-mono text-lg font-bold text-zinc-100 focus-visible:ring-1 sm:h-12 sm:w-11"
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
                                onClick={handleVerifyIdentity}
                                disabled={!identityOtpComplete || loading}
                                className="w-2/3 rounded-xl bg-zinc-100 text-xs font-medium text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify & Continue"
                                )}
                            </Button>
                        </DialogFooter>
                    </div>
                )}

                {step === "authenticator" && (
                    <div className="space-y-5">
                        {authenticatorOtpError && (
                            <div className="flex items-start gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                                <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
                                <span>{authenticatorOtpError}</span>
                            </div>
                        )}

                        <div className="space-y-2">
                            <p className="text-xs font-medium text-zinc-300">
                                Scan this QR code
                            </p>

                            <div className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                                <div className="rounded-xl bg-white p-3 shadow-lg">
                                    <img
                                        src={qrCodeUrl}
                                        alt="Authenticator QR code"
                                        width={180}
                                        height={180}
                                        className="h-[180px] w-[180px] object-contain"
                                    />
                                </div>

                                <p className="mt-3 text-center text-[11px] leading-5 text-zinc-500">
                                    Open your authenticator app and scan this
                                    code.
                                </p>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    onClick={() =>
                                        setShowManualKey(
                                            (previous) => !previous,
                                        )
                                    }
                                    className="mt-2 h-auto p-0 text-[11px] text-zinc-500 underline underline-offset-4 hover:bg-transparent hover:text-zinc-300"
                                >
                                    {showManualKey
                                        ? "Hide manual key"
                                        : "Can't scan the QR code?"}
                                </Button>

                                {showManualKey && (
                                    <div className="mt-3 flex w-full items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 p-2">
                                        <KeyRound className="h-4 w-4 shrink-0 text-zinc-500" />
                                        <span className="min-w-0 flex-1 select-all truncate font-mono text-[11px] tracking-wider text-zinc-300">
                                            {SECRET_KEY}
                                        </span>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleCopySecret}
                                            className="h-7 shrink-0 gap-1 px-2 text-[11px] text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                                                    <span className="text-emerald-400">
                                                        Copied
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="h-3.5 w-3.5" />
                                                    <span>Copy</span>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-2.5">
                            <div>
                                <p className="text-xs font-medium text-zinc-300">
                                    Enter the authenticator code
                                </p>
                                <p className="mt-1 text-[11px] leading-5 text-zinc-500">
                                    Enter the current 6-digit code from your
                                    authenticator app.
                                </p>
                            </div>

                            <div
                                dir="ltr"
                                onPaste={handleAuthenticatorOtpPaste}
                                className="flex justify-center gap-2"
                            >
                                {authenticatorOtp.map((value, index) => (
                                    <Input
                                        key={index}
                                        ref={(element) => {
                                            authenticatorInputRefs.current[
                                                index
                                            ] = element;
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
                                            handleAuthenticatorOtpChange(
                                                index,
                                                event.target.value,
                                            )
                                        }
                                        onKeyDown={(event) =>
                                            handleAuthenticatorOtpKeyDown(
                                                index,
                                                event,
                                            )
                                        }
                                        onFocus={(event) =>
                                            event.currentTarget.select()
                                        }
                                        className="h-11 w-9 rounded-xl border-zinc-800 bg-zinc-900 text-center font-mono text-lg font-bold text-zinc-100 focus-visible:ring-1 sm:h-12 sm:w-11"
                                    />
                                ))}
                            </div>
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
                                onClick={handleVerifyAuthenticator}
                                disabled={!authenticatorOtpComplete || loading}
                                className="w-2/3 rounded-xl bg-zinc-100 text-xs font-medium text-zinc-950 hover:bg-zinc-200 disabled:opacity-50"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    "Verify & Activate"
                                )}
                            </Button>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SetupAuthenticatorDialog;
