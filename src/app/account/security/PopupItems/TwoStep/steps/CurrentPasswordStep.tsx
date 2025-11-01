"use client";

import { Text, InputField, Button, Container } from "@yakad/ui";
import { useRef, useState } from "react";

export default function CurrentPasswordStep({
    onNext,
}: {
    onNext: () => void;
}) {
    const passRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleNext = async () => {
        const password = passRef.current?.value.trim() || "";
        if (!password) {
            setError("Please enter your password");
            return;
        }

        setError("");
        setIsLoading(true);

        // Demo: simulate password verification
        setTimeout(() => {
            setIsLoading(false);
            onNext(); // Always proceed to email step in demo
        }, 1000);
    };

    return (
        <Container align="center">
            <Text>Enter your password to continue</Text>
            <InputField ref={passRef} type="password" placeholder="Your password" />
            {error && <Text style={{ color: "red" }}>{error}</Text>}
            <Button variant="filled" onClick={handleNext} disabled={isLoading}>
                {isLoading ? "Verifying..." : "Next"}
            </Button>
        </Container>
    );
}
