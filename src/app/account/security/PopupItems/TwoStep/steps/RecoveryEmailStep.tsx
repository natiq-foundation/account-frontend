"use client";

import { Text, InputField, Button, Container } from "@yakad/ui";
import { useRef, useState } from "react";

export default function RecoveryEmailStep({
    onNext,
}: {
    onNext: (email: string) => void;
}) {
    const emailRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isValidEmail = (email: string) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSend = async () => {
        const email = emailRef.current?.value.trim() || "";

        if (!email) {
            setError("Please enter your recovery email");
            return;
        }

        if (!isValidEmail(email)) {
            setError("Invalid email address");
            return;
        }

        setError("");
        setIsLoading(true);

        // Demo: simulate sending recovery code
        setTimeout(() => {
            setIsLoading(false);
            // Show demo code in console for testing
            console.log(`Demo: Recovery code sent to ${email}. Use code: 1234`);
            onNext(email);
        }, 1000);
    };

    return (
        <Container align="center">
            <Text>Enter recovery email</Text>
            <InputField ref={emailRef} placeholder="you@example.com" type="email" />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <Button variant="filled" onClick={handleSend} disabled={isLoading}>
                {isLoading ? "Sending..." : "Next"}
            </Button>
        </Container>
    );
}
