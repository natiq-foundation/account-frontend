"use client";

import { Text, InputField, Button, Container } from "@yakad/ui";
import { useRef, useState } from "react";

export default function NewPhoneStep({ onNext }: { onNext: (newPhone: string) => void }) {
    const phoneRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const isValidPhone = (phone: string): boolean => /^\+\d{8,15}$/.test(phone);

    const handleNext = async () => {
        const newPhone = phoneRef.current?.value.trim() || "";

        if (!newPhone) {
            setError("Please enter a phone number");
            return;
        }

        if (!isValidPhone(newPhone)) {
            setError("Please enter a valid international phone number (e.g. +12025550123)");
            return;
        }

        setIsLoading(true);
        setError("");

        // Simulate API call to send code
        setTimeout(() => {
            setIsLoading(false);
            onNext(newPhone);
        }, 1000);
    };

    return (
        <Container align="center">
            <Text>Enter New Phone Number</Text>
            <InputField
                ref={phoneRef}
                placeholder="+12025550123"
                type="tel"
                inputMode="tel"
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
