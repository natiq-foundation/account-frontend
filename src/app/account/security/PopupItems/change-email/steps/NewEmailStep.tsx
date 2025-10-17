"use client";

import { Text, InputField, Button, Container } from "@yakad/ui";
import { useRef, useState } from "react";

export default function NewEmailStep({ onNext }: { onNext: (newEmail: string) => void }) {
    const emailRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleNext = async () => {
        const newEmail = emailRef.current?.value || "";

        if (!newEmail.trim()) {
            setError("Please enter a new email address");
            return;
        }

        if (!isValidEmail(newEmail)) {
            setError("Please enter a valid email address");
            return;
        }

        setIsLoading(true);
        setError("");

        // Simulate API call to send verification code
        setTimeout(() => {
            setIsLoading(false);
            onNext(newEmail);
        }, 1000);
    };

    return (
        <Container align="center" >

            <Text>Enter New Email</Text>
            <InputField
                ref={emailRef}
                placeholder="Enter your new email"
                type="email"
            />
            {error && <Text style={{ color: "red", fontSize: "0.875rem" }}>{error}</Text>}
            <Button
                variant="filled"
                onClick={handleNext}
                disabled={isLoading}
            >
                {isLoading ? "Sending..." : "Next"}
            </Button>
        </Container>
    );
}
