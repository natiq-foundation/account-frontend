"use client";

import { Text, InputField, Button, Container } from "@yakad/ui";
import { useRef, useState } from "react";

export default function NewPasswordStep({ onNext }: { onNext: () => void }) {
    const passRef = useRef<HTMLInputElement>(null);
    const confirmRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const isStrongPassword = (password: string) => {
        // حداقل ۸ کاراکتر، شامل عدد و حرف
        return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=-]{8,}$/.test(password);
    };

    const handleChangePassword = async () => {
        const password = passRef.current?.value.trim() || "";
        const confirm = confirmRef.current?.value.trim() || "";

        if (!password || !confirm) {
            setError("Please fill out both fields");
            return;
        }

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        if (!isStrongPassword(password)) {
            setError("Password must be at least 8 characters and include a number");
            return;
        }

        setError("");
        setIsLoading(true);

        // simulate API update
        setTimeout(() => {
            setIsLoading(false);
            onNext();
        }, 1000);
    };

    return (
        <Container align="center">
            <Text>Create a new password</Text>
            <InputField
                ref={passRef}
                type="password"
                placeholder="New password"
            />
            <InputField
                ref={confirmRef}
                type="password"
                placeholder="Confirm new password"
            />
            {error && <Text style={{ color: "red", fontSize: "0.875rem" }}>{error}</Text>}
            <Button
                variant="filled"
                onClick={handleChangePassword}
                disabled={isLoading}
            >
                {isLoading ? "Changing..." : "Change Password"}
            </Button>
        </Container>
    );
}
