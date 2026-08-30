import { useEffect, useMemo, useState } from "react";
import * as OTPAuth from "otpauth";

interface AuthenticatorAppDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
    readonly onSuccess: () => void;
}

export const AuthenticatorAppDialog = ({
    isOpen,
    onClose,
    onSuccess,
}: AuthenticatorAppDialogProps) => {
    const [code, setCode] = useState("");
    const [error, setError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);

    const secretKey = "JBSWY3DPEHPK3PXP";

    const otp = useMemo(() => {
        return new OTPAuth.TOTP({
            issuer: "AmirPWA",
            label: "AmirAccount",
            algorithm: "SHA1",
            digits: 6,
            period: 30,
            secret: OTPAuth.Secret.fromBase32(secretKey),
        });
    }, []);

    const otpauthUri = useMemo(() => {
        return otp.toString();
    }, [otp]);

    const qrCodeUrl = useMemo(() => {
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
            otpauthUri,
        )}`;
    }, [otpauthUri]);

    useEffect(() => {
        if (!isOpen) {
            setCode("");
            setError("");
            setIsVerifying(false);
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 6);

        setCode(value);
        setError("");
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (code.length !== 6) {
            setError("Enter the 6-digit verification code.");
            return;
        }

        setIsVerifying(true);
        setError("");

        try {
            const delta = otp.validate({
                token: code,
                window: 1,
            });

            if (delta === null) {
                setError("Invalid verification code.");
                setIsVerifying(false);
                return;
            }

            onSuccess();
            setCode("");
            setError("");
            onClose();
        } catch {
            setError("Unable to verify the code.");
            setIsVerifying(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="authenticator-dialog-title"
        >
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h2
                        id="authenticator-dialog-title"
                        className="text-lg font-semibold text-zinc-100"
                    >
                        Set up Authenticator app
                    </h2>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="rounded-lg px-2 py-1 text-lg text-zinc-400 transition-colors hover:bg-zinc-900 hover:text-zinc-100"
                    >
                        ✕
                    </button>
                </div>

                <p className="text-sm leading-6 text-zinc-400">
                    Scan this QR code using Google Authenticator, Microsoft
                    Authenticator, 1Password, or another compatible
                    authenticator app.
                </p>

                {/* QR Code */}
                <div className="my-5 flex flex-col items-center justify-center rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                    <div className="rounded-xl bg-white p-3 shadow-md">
                        <img
                            src={qrCodeUrl}
                            alt="Authenticator QR Code"
                            className="h-40 w-40"
                            width={160}
                            height={160}
                        />
                    </div>

                    <div className="mt-4 w-full text-center">
                        <span className="text-xs text-zinc-500">
                            Can't scan the QR code?
                        </span>

                        <p className="mt-1 text-xs text-zinc-500">
                            Enter this key manually:
                        </p>

                        <div className="mt-2 select-all rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 font-mono text-xs tracking-wider text-zinc-300">
                            {secretKey}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="authenticator-code"
                            className="block text-xs font-medium text-zinc-300"
                        >
                            6-digit verification code
                        </label>

                        <input
                            id="authenticator-code"
                            type="text"
                            inputMode="numeric"
                            autoComplete="one-time-code"
                            maxLength={6}
                            value={code}
                            onChange={handleCodeChange}
                            placeholder="000000"
                            disabled={isVerifying}
                            className={`mt-1.5 w-full rounded-xl border bg-zinc-900 px-4 py-2.5 text-center font-mono text-lg tracking-[0.4em] text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 ${
                                error
                                    ? "border-red-500/60 focus:border-red-500"
                                    : "border-zinc-800 focus:border-zinc-600"
                            } disabled:cursor-not-allowed disabled:opacity-60`}
                        />

                        {error && (
                            <p className="mt-2 text-xs text-red-400">{error}</p>
                        )}
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isVerifying}
                            className="w-1/2 rounded-xl border border-zinc-800 px-4 py-2.5 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={code.length !== 6 || isVerifying}
                            className="w-1/2 rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isVerifying ? "Verifying..." : "Verify & Enable"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
