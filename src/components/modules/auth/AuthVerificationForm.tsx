import { type FormEvent, useEffect, useRef, useState } from "react";

import { Material } from "@yakad/symbols";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthVerificationFormProps {
    onVerify: (code: string) => void;
    onBack: () => void;
}

export default function AuthVerificationForm({
    onVerify,
    onBack,
}: AuthVerificationFormProps) {
    const [code, setCode] = useState("");
    const [seconds, setSeconds] = useState(120);

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const isValidCode = /^\d{6}$/.test(code);

    useEffect(() => {
        if (seconds === 0) {
            return;
        }

        const timer = window.setInterval(() => {
            setSeconds((current) => (current > 0 ? current - 1 : 0));
        }, 1000);

        return () => {
            window.clearInterval(timer);
        };
    }, [seconds]);

    function handleChange(index: number, value: string) {
        const digit = value.replace(/\D/g, "");

        const chars = code.padEnd(6, " ").split("");

        if (!digit) {
            chars[index] = " ";
            setCode(chars.join("").trimEnd());
            return;
        }
        chars[index] = digit.slice(-1);

        const newCode = chars.join("").trimEnd();
        setCode(newCode);

        if (index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(
        index: number,
        event: React.KeyboardEvent<HTMLInputElement>,
    ) {
        if (event.key === "Backspace") {
            const chars = code.padEnd(6, " ").split("");

            if (chars[index] && chars[index] !== " ") {
                chars[index] = " ";
                setCode(chars.join("").trimEnd());
            } else if (index > 0) {
                chars[index - 1] = " ";
                setCode(chars.join("").trimEnd());
                inputRefs.current[index - 1]?.focus();
            }
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!isValidCode) {
            return;
        }

        onVerify(code);
    }

    function handleResend() {
        if (seconds > 0) {
            return;
        }

        setSeconds(120);
        setCode("");

        inputRefs.current[0]?.focus();

        console.log("Verification code resent");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-7">
            <div className="space-y-3">
                <label className="text-sm font-medium">Verification code</label>

                <div className="flex justify-center gap-3">
                    {Array.from({
                        length: 6,
                    }).map((_, index) => (
                        <Input
                            key={index}
                            ref={(element) => {
                                inputRefs.current[index] = element;
                            }}
                            type="text"
                            inputMode="numeric"
                            autoComplete={index === 0 ? "one-time-code" : "off"}
                            maxLength={1}
                            value={
                                code[index] && code[index] !== " "
                                    ? code[index]
                                    : ""
                            }
                            onChange={(event) =>
                                handleChange(index, event.target.value)
                            }
                            onKeyDown={(event) => handleKeyDown(index, event)}
                            autoFocus={index === 0}
                            className="focus:ring-foreground/10 size-12 rounded-xl border-border bg-background text-center text-xl font-semibold shadow-sm !outline-none !ring-0 transition-all focus:border-foreground focus:ring-2"
                        />
                    ))}
                </div>

                <p className="text-center text-xs text-muted-foreground">
                    Enter the 6-digit code we sent you.
                </p>
            </div>

            <Button
                type="submit"
                disabled={!isValidCode}
                className="h-11 w-full rounded-xl font-medium"
            >
                Verify
            </Button>

            <div className="text-center text-sm">
                <span className="text-muted-foreground">
                    Didn't receive the code?{" "}
                </span>

                {seconds > 0 ? (
                    <span className="text-muted-foreground">
                        Resend in {seconds}s
                    </span>
                ) : (
                    <button
                        type="button"
                        onClick={handleResend}
                        className="font-medium text-foreground hover:underline"
                    >
                        Resend code
                    </button>
                )}
            </div>

            <button
                type="button"
                onClick={onBack}
                className="flex w-full items-center justify-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
                <Material icon="arrow_back" className="size-4" />
                Back
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Material icon="verified_user" className="size-4" />

                <span>Your verification is secure.</span>
            </div>
        </form>
    );
}
