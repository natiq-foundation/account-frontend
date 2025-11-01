"use client";

import { Symbol } from "@yakad/symbols";
import { Text, Button, Container } from "@yakad/ui";

type SuccessStepProps = {
    onDone: () => void;
};

export default function SuccessStep({ onDone }: SuccessStepProps) {
    return (
        <Container align="center">
            <Symbol icon="check_circle" size={20} color="green" />
            <Text>Two-Step Verification Enabled Successfully!</Text>
            <Text style={{ fontSize: "0.875rem", color: "#666", marginTop: 8 }}>
                Your recovery email has been verified and two-step authentication is now active.
            </Text>
            <Button variant="filled" onClick={onDone}>
                Done
            </Button>
        </Container>
    );
}
