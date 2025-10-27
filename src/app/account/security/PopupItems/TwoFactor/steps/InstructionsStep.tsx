"use client";

import { Container, Text, Button, } from "@yakad/ui";

export default function InstructionsStep({ onNext }: { onNext: () => void }) {
    return (
        <Container align="center">
            <Text variant="heading5">Set up Authenticator</Text>
            <Text >
                To enable two-factor authentication, first download{" "}
                <strong>Google Authenticator</strong> from the App Store or Google Play.
            </Text>
            <Button variant="filled" onClick={onNext}>
                Set Up
            </Button>
        </Container>
    );
}
