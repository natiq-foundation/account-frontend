"use client";

import { Button, Container, Text, CodeField } from "@yakad/ui";
import { useRef, useState } from "react";

export default function VerifyOldEmailStep({ email, onNext }: { email: string; onNext: () => void }) {
    const codeRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleVerify = async () => {
        const code = codeRef.current?.value || "";

        if (!code.trim()) {
            setError("Please enter verification code");
            return;
        }

        if (code.length < 4) {
            setError("Verification code must be at least 4 digits");
            return;
        }

        setIsLoading(true);
        setError("");

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            onNext();
        }, 1000);
    };

    return (
        <Container align="center" >
            <Text>Verify your current email</Text>
            <Text>{email}</Text>
            <CodeField
                ref={codeRef}
            />
            {error && <Text style={{ color: "red", fontSize: "0.875rem" }}>{error}</Text>}
            <Button
                variant="filled"
                onClick={handleVerify}
                disabled={isLoading}
            >
                {isLoading ? "Verifying..." : "Verify"}
            </Button>
        </Container>
    );
}
