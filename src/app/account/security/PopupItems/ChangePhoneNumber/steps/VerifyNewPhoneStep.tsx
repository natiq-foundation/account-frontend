"use client";

import { Text, Button, Container, CodeField } from "@yakad/ui";
import { useRef, useState } from "react";

export default function VerifyNewPhoneStep({ phone, onNext }: { phone: string; onNext: () => void }) {
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
            setError("Code must be at least 4 digits");
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
        <Container align="center">
            <Text>Verify Your New Phone Number</Text>
            <Text>We sent a code to {phone}</Text>
            <CodeField ref={codeRef} />
            {error && <Text style={{ color: "red", fontSize: "0.875rem" }}>{error}</Text>}
            <Button variant="filled" onClick={handleVerify} disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
            </Button>
        </Container>
    );
}
