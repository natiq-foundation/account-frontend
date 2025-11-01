"use client";

import { Container, Text, InputField, Button } from "@yakad/ui";
import { useRef, useState } from "react";

export default function AddPhoneStep({ onNext }: { onNext: (phone: string) => void }) {
    const ref = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");

    const handleNext = () => {
        const phone = ref.current?.value || "";
        if (!phone.match(/^\+\d{6,15}$/)) return setError("Invalid phone number format (+countrycode...)");
        setError("");
        setTimeout(() => onNext(phone), 600);
    };

    return (
        <Container align="center">
            <Text>Enter recovery phone (with country code)</Text>
            <InputField ref={ref} placeholder="+1 234 567 890" />
            {error && <Text style={{ color: "red", fontSize: 13 }}>{error}</Text>}
            <Button variant="filled" onClick={handleNext}>Next</Button>
        </Container>
    );
}
