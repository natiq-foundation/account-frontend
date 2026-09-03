import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import { AlertCircle, KeyRound, Loader2, ShieldCheck } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export interface TwoFactorChallengeProps {
    readonly onSuccess: () => void;
    readonly onBack: () => void;
    readonly userIdentifier?: string;
}

export const TwoFactorChallenge = ({
    onSuccess,
    onBack,
    userIdentifier,
}: TwoFactorChallengeProps) => {
    const [code, setCode] = useState("");
    const [isUsingRecoveryCode, setIsUsingRecoveryCode] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        if (isUsingRecoveryCode) {
            setCode(rawValue);
        } else {
            const numericValue = rawValue.replace(/\D/g, "").slice(0, 6);
            setCode(numericValue);
        }
        setError(null);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const cleanCode = code.trim();

        if (!cleanCode) {
            setError(
                isUsingRecoveryCode
                    ? "Please enter a recovery code."
                    : "Please enter the 6-digit code.",
            );
            return;
        }

        if (!isUsingRecoveryCode && cleanCode.length !== 6) {
            setError("The code must be exactly 6 digits.");
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            if (cleanCode === "000000" || cleanCode.toLowerCase() === "error") {
                setError("Invalid verification code. Please try again.");
                return;
            }

            onSuccess();
        }, 600);
    };

    const handleToggleMode = () => {
        setIsUsingRecoveryCode((prev) => !prev);
        setCode("");
        setError(null);
    };

    return (
        <Card className="mx-auto w-full max-w-sm border-zinc-800 bg-zinc-950 text-zinc-100 shadow-2xl">
            <CardHeader className="space-y-3 pb-4 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-zinc-100 shadow-inner">
                    {isUsingRecoveryCode ? (
                        <KeyRound className="size-6 text-zinc-300" />
                    ) : (
                        <ShieldCheck className="size-6 text-zinc-300" />
                    )}
                </div>
                <div className="space-y-1">
                    <CardTitle className="text-lg font-semibold tracking-tight text-zinc-100">
                        {isUsingRecoveryCode
                            ? "Two-Factor Recovery"
                            : "Two-Step Verification"}
                    </CardTitle>
                    <CardDescription className="text-xs text-zinc-400">
                        {isUsingRecoveryCode
                            ? "Enter one of your emergency recovery codes."
                            : `Enter the code sent to your app or ${userIdentifier || "device"}.`}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {error && (
                    <Alert
                        variant="destructive"
                        className="border-red-500/20 bg-red-500/10 py-2.5 text-red-400"
                    >
                        <AlertCircle className="h-4 w-4 stroke-red-400" />
                        <AlertDescription className="ml-2 text-xs text-red-400">
                            {error}
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Input
                            type="text"
                            inputMode={isUsingRecoveryCode ? "text" : "numeric"}
                            maxLength={isUsingRecoveryCode ? 16 : 6}
                            value={code}
                            onChange={handleCodeChange}
                            placeholder={
                                isUsingRecoveryCode ? "XXXX-XXXX" : "000000"
                            }
                            className="h-11 border-zinc-800 bg-zinc-900/60 text-center font-mono text-lg tracking-widest text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-600"
                            autoFocus
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-10 w-full bg-white text-xs font-semibold text-black transition-colors hover:bg-zinc-200"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            "Verify & Continue"
                        )}
                    </Button>
                </form>

                <div className="flex flex-col items-center gap-2 pt-2 text-xs">
                    <Button
                        type="button"
                        variant="link"
                        onClick={handleToggleMode}
                        className="h-auto p-0 text-xs text-zinc-400 hover:text-zinc-100"
                    >
                        {isUsingRecoveryCode
                            ? "Use verification code instead"
                            : "Lost access? Use a recovery code"}
                    </Button>

                    <Button
                        type="button"
                        variant="ghost"
                        onClick={onBack}
                        className="h-auto px-2 py-1 text-xs text-zinc-500 hover:bg-zinc-900 hover:text-zinc-300"
                    >
                        ← Back to login
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
