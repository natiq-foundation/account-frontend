"use client";

import { Symbol } from "@yakad/symbols";
import { Container, Text, Button } from "@yakad/ui";

type SuccessStepProps = {
    onDone: () => void;
};

export default function SuccessStep({ onDone }: SuccessStepProps) {
    return (
        <Container align="center">
            <Symbol icon="check_circle" size={24} color="green" />
            <Text variant="heading5">Two-Factor Authentication Enabled</Text>
            <Text >
                Your account is now protected with an additional layer of security.
            </Text>
            <Button variant="filled" onClick={onDone}>
                Done
            </Button>
        </Container>
    );
}
