"use client";

import { Text, InputField, Button, Container } from "@yakad/ui";
import { useRef, useState } from "react";

export default function CurrentPasswordStep({ onNext }: { onNext: () => void }) {
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleVerify = async () => {
        const password = passwordRef.current?.value.trim() || "";

        if (!password) {
            setError("Please enter your current password");
            return;
        }

        setError("");
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            onNext();
        }, 1000);
    };

    return (
        <Container align="center">
            <Text>Enter your current password</Text>
            <InputField
                ref={passwordRef}
                type="password"
                placeholder="Current password"
            />
            {error && <Text style={{ color: "red", fontSize: "0.875rem" }}>{error}</Text>}
            <Button variant="filled" onClick={handleVerify} disabled={isLoading}>
                {isLoading ? "Verifying..." : "Next"}
            </Button>
        </Container>
    );
}
