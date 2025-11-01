"use client";

import { Container, Text, InputField, Button } from "@yakad/ui";
import { useRef, useState } from "react";

export default function AddEmailStep({ onNext }: { onNext: (email: string) => void }) {
    const ref = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");

    const handleNext = () => {
        const email = ref.current?.value || "";
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            return setError("Invalid email");
        }
        setError("");
        setTimeout(() => onNext(email), 500);
    };

    return (
        <Container align="center">
            <Text>Enter recovery email</Text>
            <InputField ref={ref} placeholder="Enter email" />
            {error && <Text style={{ color: "red", fontSize: 13 }}>{error}</Text>}
            <Button variant="filled" onClick={handleNext}>Next</Button>
        </Container>
    );
}
