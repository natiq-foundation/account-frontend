"use client";

import { Container, Button, InputField, Text } from "@yakad/ui";
import { useRef, useState } from "react";

export default function VerifyPasswordStep({ onNext }: { onNext: () => void }) {
    const passRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");

    const handleNext = () => {
        const pass = passRef.current?.value || "";
        if (!pass.trim()) return setError("Please enter your password");
        setError("");
        setTimeout(() => onNext(), 700);
    };

    return (
        <Container align="center">
            <Text>Enter your password to continue</Text>
            <InputField ref={passRef} type="password" placeholder="Enter password" />
            {error && <Text style={{ color: "red", fontSize: 13 }}>{error}</Text>}
            <Button variant="filled" onClick={handleNext}>Verify</Button>
        </Container>
    );
}
