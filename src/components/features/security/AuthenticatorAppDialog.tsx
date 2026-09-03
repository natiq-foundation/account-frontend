import { useEffect, useMemo, useRef, useState } from "react";
import type { ClipboardEvent, KeyboardEvent } from "react";

import * as OTPAuth from "otpauth";
import {
    Check,
    Copy,
    KeyRound,
    ShieldAlert,
    Smartphone,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export interface AuthenticatorAppDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onSuccess: () => void;
}

const OTP_LENGTH = 6;

const SECRET_KEY = "JBSWY3DPEHPK3PXP";

const EMPTY_OTP = (): string[] => Array.from({ length: OTP_LENGTH }, () => "");

export const AuthenticatorAppDialog = ({
    isOpen,
    onClose,
    onSuccess,
}: AuthenticatorAppDialogProps) => {
    const [otpCode, setOtpCode] = useState<string[]>(EMPTY_OTP());

    const [errorMessage, setErrorMessage] = useState("");

    const [isVerifying, setIsVerifying] = useState(false);

    const [isCopied, setIsCopied] = useState(false);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    const otp = useMemo(() => {
        return new OTPAuth.TOTP({
            issuer: "AmirPWA",
            label: "AmirAccount",
            algorithm: "SHA1",
            digits: OTP_LENGTH,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(SECRET_KEY),
        });
    }, []);

    const otpauthUri = useMemo(() => {
        return otp.toString();
    }, [otp]);

    const qrCodeUrl = useMemo(() => {
        return (
            "https://api.qrserver.com/v1/create-qr-code/" +
            `?size=200x200&data=${encodeURIComponent(otpauthUri)}`
        );
    }, [otpauthUri]);

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        setOtpCode(EMPTY_OTP());
        setErrorMessage("");
        setIsVerifying(false);
        setIsCopied(false);

        const timer = window.setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 150);

        return () => {
            window.clearTimeout(timer);
        };
    }, [isOpen]);

    const handleCopySecret = async (): Promise<void> => {
        try {
            await navigator.clipboard.writeText(SECRET_KEY);

            setIsCopied(true);

            window.setTimeout(() => {
                setIsCopied(false);
            }, 2000);
        } catch {
            setIsCopied(false);
        }
    };

    const handleOtpChange = (index: number, value: string): void => {
        setErrorMessage("");

        const cleaned = value.replace(/\D/g, "");

        if (!cleaned) {
            const nextOtp = [...otpCode];

            nextOtp[index] = "";

            setOtpCode(nextOtp);

            return;
        }

        if (cleaned.length > 1) {
            const digits = cleaned.slice(0, OTP_LENGTH).split("");

            const nextOtp = EMPTY_OTP();

            digits.forEach((digit, digitIndex) => {
                nextOtp[digitIndex] = digit;
            });

            setOtpCode(nextOtp);

            const focusIndex = Math.min(digits.length, OTP_LENGTH - 1);

            inputRefs.current[focusIndex]?.focus();

            return;
        }

        const nextOtp = [...otpCode];

        nextOtp[index] = cleaned;

        setOtpCode(nextOtp);

        if (index < OTP_LENGTH - 1) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpPaste = (event: ClipboardEvent<HTMLDivElement>): void => {
        event.preventDefault();

        const pastedCode = event.clipboardData
            .getData("text")
            .replace(/\D/g, "")
            .slice(0, OTP_LENGTH);

        if (!pastedCode) {
            return;
        }

        const nextOtp = EMPTY_OTP();

        pastedCode.split("").forEach((digit, index) => {
            nextOtp[index] = digit;
        });

        setOtpCode(nextOtp);
        setErrorMessage("");

        const focusIndex = Math.min(pastedCode.length, OTP_LENGTH - 1);

        inputRefs.current[focusIndex]?.focus();
    };

    const handleOtpKeyDown = (
        index: number,
        event: KeyboardEvent<HTMLInputElement>,
    ): void => {
        if (event.key === "Backspace") {
            if (otpCode[index]) {
                const nextOtp = [...otpCode];

                nextOtp[index] = "";

                setOtpCode(nextOtp);

                return;
            }

            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }

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

    const isOtpComplete =
        otpCode.length === OTP_LENGTH &&
        otpCode.every((digit) => digit.length === 1);

    const handleVerify = (): void => {
        if (isVerifying) {
            return;
        }

        setErrorMessage("");

        const fullCode = otpCode.join("");

        if (fullCode.length !== OTP_LENGTH) {
            setErrorMessage("Please enter all 6 digits.");

            return;
        }

        setIsVerifying(true);

        try {
            const delta = otp.validate({
                token: fullCode,
                window: 1,
            });

            if (delta === null) {
                setErrorMessage(
                    "Invalid verification code. Please enter the current code from your authenticator app.",
                );

                setIsVerifying(false);

                return;
            }

            setIsVerifying(false);
            setOtpCode(EMPTY_OTP());
            setErrorMessage("");

            onSuccess();
            onClose();
        } catch {
            setErrorMessage("Unable to verify the verification code.");

            setIsVerifying(false);
        }
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open && !isVerifying) {
                    onClose();
                }
            }}
        >
            <DialogContent
                showCloseButton={false}
                className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-zinc-100 shadow-2xl sm:p-6"
            >
                <DialogHeader className="flex flex-row items-center justify-between gap-3 border-b border-zinc-800 pb-4 text-left">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                            <Smartphone className="h-4 w-4 text-zinc-300" />
                        </div>

                        <div>
                            <DialogTitle className="text-base font-semibold text-zinc-100">
                                Set up Authenticator App
                            </DialogTitle>

                            <DialogDescription className="mt-0.5 text-xs text-zinc-400">
                                Secure your account with two-factor
                                authentication.
                            </DialogDescription>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onClose}
                        disabled={isVerifying}
                        aria-label="Close"
                        className="h-8 w-8 rounded-lg text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogHeader>

                {errorMessage && (
                    <div className="flex items-start gap-2 rounded-xl border border-red-900/60 bg-red-950/30 p-3 text-xs text-red-300">
                        <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />

                        <span>{errorMessage}</span>
                    </div>
                )}

                <section className="space-y-3">
                    <div>
                        <p className="text-xs font-medium text-zinc-300">
                            1. Scan the QR code
                        </p>

                        <p className="mt-1 text-[11px] text-zinc-500">
                            Scan this code using Google Authenticator or another
                            compatible app.
                        </p>
                    </div>

                    <div className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
                        <div className="rounded-xl bg-white p-3">
                            <img
                                src={qrCodeUrl}
                                alt="Authenticator QR Code"
                                width={160}
                                height={160}
                                className="h-40 w-40 object-contain"
                            />
                        </div>

                        <div className="mt-4 w-full">
                            <p className="text-center text-[11px] text-zinc-500">
                                Can't scan the QR code?
                            </p>

                            <p className="mt-1 text-center text-[11px] text-zinc-500">
                                Enter this key manually:
                            </p>

                            <div className="mt-2 flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2">
                                <KeyRound className="h-3.5 w-3.5 shrink-0 text-zinc-500" />

                                <span className="min-w-0 flex-1 select-all truncate font-mono text-xs tracking-wider text-zinc-300">
                                    {SECRET_KEY}
                                </span>

                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCopySecret}
                                    className="h-7 shrink-0 gap-1 px-2 text-[11px] text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100"
                                >
                                    {isCopied ? (
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
                        </div>
                    </div>
                </section>

                <section className="space-y-3">
                    <div>
                        <p className="text-xs font-medium text-zinc-300">
                            2. Enter the 6-digit code
                        </p>

                        <p className="mt-1 text-[11px] text-zinc-500">
                            Enter the current code shown in your authenticator
                            app.
                        </p>
                    </div>

                    <div
                        dir="ltr"
                        onPaste={handleOtpPaste}
                        className="flex justify-center gap-1.5 sm:gap-2"
                    >
                        {otpCode.map((digit, index) => (
                            <Input
                                key={index}
                                ref={(element) => {
                                    inputRefs.current[index] = element;
                                }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                disabled={isVerifying}
                                onChange={(event) =>
                                    handleOtpChange(index, event.target.value)
                                }
                                onKeyDown={(event) =>
                                    handleOtpKeyDown(index, event)
                                }
                                onFocus={(event) =>
                                    event.currentTarget.select()
                                }
                                aria-label={`Verification digit ${index + 1}`}
                                className="h-11 w-9 rounded-xl border-zinc-800 bg-zinc-900 text-center font-mono text-lg font-bold text-zinc-100 focus-visible:border-zinc-400 focus-visible:ring-1 focus-visible:ring-zinc-400 sm:h-12 sm:w-11"
                            />
                        ))}
                    </div>
                </section>

                <div className="flex gap-3 pt-1">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isVerifying}
                        className="w-1/2 rounded-xl border-zinc-800 bg-transparent text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={handleVerify}
                        disabled={!isOtpComplete || isVerifying}
                        className="w-1/2 rounded-xl bg-zinc-100 text-sm font-medium text-zinc-950 hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isVerifying ? "Verifying..." : "Verify & Enable"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AuthenticatorAppDialog;
