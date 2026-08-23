import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RegisterVerificationFormProps {
    email: string;
    verificationCode: string;
    onCodeChange: (code: string) => void;
    onVerify: () => void;
    onBack: () => void;
}

const CODE_LENGTH = 6;
const RESEND_TIME = 120;

export default function RegisterVerificationForm({
    email,
    verificationCode,
    onCodeChange,
    onVerify,
    onBack,
}: RegisterVerificationFormProps) {
    const [remainingTime, setRemainingTime] =
        useState(RESEND_TIME);

    const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

    useEffect(() => {
        if (remainingTime <= 0) {
            return;
        }

        const timer = window.setTimeout(() => {
            setRemainingTime((previous) => previous - 1);
        }, 1000);

        return () => {
            window.clearTimeout(timer);
        };
    }, [remainingTime]);

    function handleChange(index: number, value: string) {
        const digits = value.replace(/\D/g, "");

        if (!digits) {
            return;
        }

        const code = verificationCode
            .split("")
            .slice(0, CODE_LENGTH);

        digits
            .slice(0, CODE_LENGTH - index)
            .split("")
            .forEach((digit, offset) => {
                code[index + offset] = digit;
            });

        const nextCode = code.join("").slice(0, CODE_LENGTH);

        onCodeChange(nextCode);

        const nextIndex = Math.min(
            index + digits.length,
            CODE_LENGTH - 1,
        );

        inputRefs.current[nextIndex]?.focus();
    }

    function handleKeyDown(
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ) {
        if (event.key !== "Backspace") {
            return;
        }

        event.preventDefault();

        const code = verificationCode.split("");

        if (code[index]) {
            code[index] = "";

            onCodeChange(code.join("").slice(0, CODE_LENGTH));

            return;
        }

        if (index > 0) {
            const previousIndex = index - 1;

            code[previousIndex] = "";

            onCodeChange(
                code.join("").slice(0, CODE_LENGTH),
            );

            inputRefs.current[previousIndex]?.focus();
        }
    }

    function handleResend() {
        if (remainingTime > 0) {
            return;
        }

        console.log("Resend verification code");

        onCodeChange("");
        setRemainingTime(RESEND_TIME);

        inputRefs.current[0]?.focus();
    }

    const isCodeComplete =
        verificationCode.length === CODE_LENGTH;

    return (
        <div className="space-y-6">
            <div className="text-center">
                <h2 className="text-lg font-semibold">
                    Verify your email
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    We've sent a verification code to your email address.
                </p>

                <p className="mt-1 text-sm font-medium">
                    {email}
                </p>
            </div>

            <div className="space-y-3">
                <label
                    htmlFor="verification-code-0"
                    className="text-sm font-medium"
                >
                    Enter verification code
                </label>

                <div className="flex justify-center gap-2 sm:gap-3">
                    {Array.from({ length: CODE_LENGTH }).map(
                        (_, index) => (
                            <Input
                                key={index}
                                ref={(element) => {
                                    inputRefs.current[index] =
                                        element;
                                }}
                                id={`verification-code-${index}`}
                                type="text"
                                inputMode="numeric"
                                autoComplete={
                                    index === 0
                                        ? "one-time-code"
                                        : "off"
                                }
                                maxLength={CODE_LENGTH}
                                value={
                                    verificationCode[index] ?? ""
                                }
                                onChange={(event) =>
                                    handleChange(
                                        index,
                                        event.target.value,
                                    )
                                }
                                onKeyDown={(event) =>
                                    handleKeyDown(index, event)
                                }
                                className="size-12 p-0 text-center text-lg font-semibold sm:size-14"
                            />
                        ),
                    )}
                </div>
            </div>

            <div className="text-center text-sm">
                {remainingTime > 0 ? (
                    <p className="text-muted-foreground">
                        Resend code{" "}
                        <span className="font-medium text-foreground">
                            in {remainingTime}s
                        </span>
                    </p>
                ) : (
                    <button
                        type="button"
                        onClick={handleResend}
                        className="font-medium text-primary hover:underline"
                    >
                        Resend code
                    </button>
                )}
            </div>

            <div className="flex gap-3">
                <Button
                    type="button"
                    variant="outline"
                    className="h-11 flex-1"
                    onClick={onBack}
                >
                    Back
                </Button>

                <Button
                    type="button"
                    className="h-11 flex-1"
                    disabled={!isCodeComplete}
                    onClick={onVerify}
                >
                    Verify
                </Button>
            </div>
        </div>
    );
}