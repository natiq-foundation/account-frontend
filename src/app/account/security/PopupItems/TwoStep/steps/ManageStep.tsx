"use client";

import { Button, Container, Text } from "@yakad/ui";
import { useState } from "react";

type ManageStepProps = {
    onDisable: () => void;
    onChangeEmail: () => void;
};

export default function ManageStep({ onDisable, onChangeEmail }: ManageStepProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isDisabling, setIsDisabling] = useState(false);
    const [message, setMessage] = useState("");

    // Demo: disable two-step verification
    const handleDisable = async () => {
        setIsDisabling(true);
        setMessage("");

        // Demo: simulate API delay
        setTimeout(() => {
            setIsDisabling(false);
            setMessage("Two-Step Verification has been disabled. You can re-enable it anytime.");
            console.log("Demo: Two-step authentication disabled");
            onDisable(); // Restart the flow from password step
        }, 1000);
    };

    // Demo: change recovery email
    const handleChangeEmail = async () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log("Demo: Changing recovery email");
            onChangeEmail(); // Go to email input step
        }, 500);
    };

    return (
        <Container align="center" size="sm">
            <Text variant="heading5" style={{ marginBottom: 10 }}>
                Two-Step Verification is Enabled
            </Text>

            <Text style={{ textAlign: "center", marginBottom: 20 }}>
                You can change your recovery email or disable two-step verification below.
            </Text>

            <Button
                variant="filled"
                onClick={handleChangeEmail}
                disabled={isLoading || isDisabling}
                style={{ marginBottom: 10 }}
            >
                {isLoading ? "Loading..." : "Change Recovery Email"}
            </Button>

            <Button
                variant="outlined"
                color="red"
                onClick={handleDisable}
                disabled={isDisabling || isLoading}
            >
                {isDisabling ? "Disabling..." : "Disable Two-Step Verification"}
            </Button>

            {message && (
                <Text style={{ color: "green", marginTop: 15, fontSize: "0.875rem" }}>
                    {message}
                </Text>
            )}
        </Container>
    );
}
