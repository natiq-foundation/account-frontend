"use client";

import { Container, Text, InputField, Button } from "@yakad/ui";
import { useRef, useState } from "react";

export default function PasswordStep({ onNext }: { onNext: () => void }) {
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");

    const handleNext = () => {
        const value = passwordRef.current?.value || "";
        if (!value.trim()) {
            setError("Please enter your password");
            return;
        }

        setError("");
        onNext();
    };

    return (
        <Container align="center">
            <Text variant="heading5">Verify Your Password</Text>
            <InputField ref={passwordRef} placeholder="Enter your password" type="password" />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <Button variant="filled" onClick={handleNext}>
                Next
            </Button>
        </Container>
    );
}
