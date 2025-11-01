"use client";

import { Container, Text, CodeField, Button } from "@yakad/ui";
import { useRef, useState } from "react";

export default function VerifyPhoneStep({ phone, onNext }: { phone: string; onNext: () => void }) {
    const codeRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");

    const handleVerify = () => {
        const code = codeRef.current?.value || "";
        if (code.length < 4) return setError("Code must be at least 4 digits");
        setError("");
        setTimeout(() => onNext(), 600);
    };

    return (
        <Container align="center">
            <Text>Verification code sent to {phone}</Text>
            <CodeField ref={codeRef} />
            {error && <Text style={{ color: "red", fontSize: 13 }}>{error}</Text>}
            <Button variant="filled" onClick={handleVerify}>Verify</Button>
        </Container>
    );
}
