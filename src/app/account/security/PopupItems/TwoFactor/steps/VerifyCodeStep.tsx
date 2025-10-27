"use client";

import { Container, Text, Button, CodeField } from "@yakad/ui";
import { useRef, useState } from "react";

export default function VerifyCodeStep({ onNext }: { onNext: () => void }) {
    const codeRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");

    const handleVerify = () => {
        const code = codeRef.current?.value || "";
        if (!code.trim()) {
            setError("Please enter the verification code");
            return;
        }

        if (code.length < 6) {
            setError("Code must be 6 digits");
            return;
        }

        setError("");
        onNext();
    };

    return (
        <Container align="center">
            <Text variant="heading5">Verify Authenticator Code</Text>
            <CodeField ref={codeRef} placeholder="Enter 6-digit code" />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <Button variant="filled" onClick={handleVerify}>
                Verify
            </Button>
        </Container>
    );
}
