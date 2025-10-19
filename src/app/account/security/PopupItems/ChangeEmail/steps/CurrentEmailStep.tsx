"use client";

import { Button, Container, Text } from "@yakad/ui";

export default function CurrentEmailStep({ email, onNext }: { email: string; onNext: () => void }) {
    return (
        <Container align="center">
            <Text variant="heading5">{email}</Text>
            <Button variant="filled" onClick={onNext}>
                Change Email
            </Button>
        </Container>
    );
}
