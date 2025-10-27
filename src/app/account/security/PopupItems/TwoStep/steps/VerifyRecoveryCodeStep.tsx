"use client";

import { Text, CodeField, Button, Container } from "@yakad/ui";
import { useRef, useState } from "react";

export default function VerifyRecoveryCodeStep({
    email,
    onNext,
}: {
    email: string;
    onNext: () => void;
}) {
    const codeRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = async () => {
        const code = codeRef.current?.value.trim() || "";

        if (!code) {
            setError("Enter verification code");
            return;
        }

        if (code.length < 4) {
            setError("Code must be at least 4 digits");
            return;
        }

        setError("");
        setIsLoading(true);

        // Demo: accept any 4+ digit code as valid
        setTimeout(() => {
            setIsLoading(false);
            console.log(`Demo: Code ${code} verified successfully`);
            onNext();
        }, 1000);
    };

    return (
        <Container align="center">
            <Text>Verify your recovery email</Text>
            <Text>We sent a code to {email}</Text>
            <CodeField ref={codeRef} />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <Button variant="filled" onClick={handleVerify} disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
            </Button>
        </Container>
    );
}
