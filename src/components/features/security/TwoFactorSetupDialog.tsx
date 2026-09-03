import * as React from "react";
import { Copy, Check, QrCode, ShieldCheck, KeyRound } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TwoFactorSetupDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly isEnabled: boolean;
    readonly onSuccess: () => void;
    readonly onDisable?: () => void;
}

const MOCK_SECRET_KEY = "HXDM-4729-PLKQ-9921-ABCD";
const MOCK_QR_CODE_URL =
    "https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=otpauth://totp/AmirAccount:amir@example.com?secret=HXDM4729PLKQ9921ABCD&issuer=AmirApp";

export const TwoFactorSetupDialog: React.FC<TwoFactorSetupDialogProps> = ({
    isOpen,
    onClose,
    isEnabled,
    onSuccess,
    onDisable,
}) => {
    const [step, setStep] = React.useState<"setup" | "verify" | "active">(
        "setup",
    );
    const [code, setCode] = React.useState<string>("");
    const [copied, setCopied] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");

    React.useEffect(() => {
        if (isOpen) {
            setStep(isEnabled ? "active" : "setup");
            setCode("");
            setError("");
            setCopied(false);
        }
    }, [isOpen, isEnabled]);

    const handleCopySecret = async () => {
        try {
            await navigator.clipboard.writeText(MOCK_SECRET_KEY);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // در صورت عدم دسترسی به clipboard
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        if (code.length < 6) {
            setError("Please enter the complete 6-digit verification code.");
            return;
        }
        setError("");
        onSuccess();
        setStep("active");
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="rounded-2xl border-zinc-800 bg-[#121316] p-6 text-zinc-100 shadow-2xl sm:max-w-[460px]">
                <DialogHeader className="space-y-2 text-left">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-800/80 text-zinc-200">
                            <QrCode className="h-5 w-5" />
                        </div>
                        <DialogTitle className="text-lg font-semibold text-zinc-100">
                            Authenticator app
                        </DialogTitle>
                    </div>
                    <DialogDescription className="text-sm text-zinc-400">
                        {step === "active"
                            ? "Your account is secured with two-factor authentication."
                            : "Scan the QR code with your authenticator app to enable 2FA."}
                    </DialogDescription>
                </DialogHeader>

                {step === "active" ? (
                    <div className="mt-4 space-y-5">
                        <div className="flex items-center gap-3 rounded-xl border border-emerald-900/50 bg-emerald-950/20 p-4">
                            <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-400" />
                            <div>
                                <p className="text-sm font-medium text-emerald-300">
                                    Authenticator is active
                                </p>
                                <p className="mt-0.5 text-xs text-zinc-400">
                                    Verification codes will be required during
                                    sensitive actions.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
                            {onDisable && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        onDisable();
                                        onClose();
                                    }}
                                    className="rounded-xl border-red-900/60 bg-transparent text-red-400 hover:bg-red-950/40 hover:text-red-300"
                                >
                                    Turn off
                                </Button>
                            )}
                            <Button
                                type="button"
                                onClick={onClose}
                                className="rounded-xl bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                            >
                                Done
                            </Button>
                        </div>
                    </div>
                ) : step === "setup" ? (
                    <div className="mt-4 space-y-5">
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
                            <div className="rounded-xl bg-white p-3 shadow-inner">
                                <img
                                    src={MOCK_QR_CODE_URL}
                                    alt="2FA QR Code"
                                    className="h-40 w-40 object-contain"
                                />
                            </div>
                            <p className="mt-3 text-center text-xs text-zinc-400">
                                Scan with Google Authenticator, Microsoft
                                Authenticator or 1Password
                            </p>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-zinc-400">
                                Can't scan? Use secret key:
                            </label>
                            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2 font-mono text-xs text-zinc-300">
                                <span className="select-all tracking-wider">
                                    {MOCK_SECRET_KEY}
                                </span>
                                <button
                                    type="button"
                                    onClick={handleCopySecret}
                                    className="ml-2 inline-flex items-center gap-1 rounded-md bg-zinc-800 px-2 py-1 font-sans text-[11px] text-zinc-300 transition-colors hover:bg-zinc-700"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 text-emerald-400" />{" "}
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3.5 w-3.5" />{" "}
                                            Copy
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={onClose}
                                className="rounded-xl border-zinc-800 bg-transparent text-zinc-300 hover:bg-zinc-800"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={() => setStep("verify")}
                                className="rounded-xl bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleVerify} className="mt-4 space-y-5">
                        <div className="space-y-2">
                            <label className="flex items-center gap-1.5 text-xs font-medium text-zinc-300">
                                <KeyRound className="h-4 w-4 text-zinc-400" />
                                Enter 6-digit verification code
                            </label>
                            <Input
                                type="text"
                                maxLength={6}
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value.replace(/\D/g, ""));
                                    setError("");
                                }}
                                placeholder="123456"
                                className="rounded-xl border-zinc-800 bg-zinc-900/60 text-center font-mono text-lg tracking-widest text-zinc-100 focus:border-zinc-500"
                                autoFocus
                            />
                            {error && (
                                <p className="text-xs text-red-400">{error}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setError("");
                                    setStep("setup");
                                }}
                                className="rounded-xl border-zinc-800 bg-transparent text-zinc-300 hover:bg-zinc-800"
                            >
                                Back
                            </Button>
                            <Button
                                type="submit"
                                className="rounded-xl bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                            >
                                Verify & Activate
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
};
