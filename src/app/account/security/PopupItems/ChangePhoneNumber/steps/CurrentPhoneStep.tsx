"use client";

import { Button, Container, Text } from "@yakad/ui";

export default function CurrentPhoneStep({ phone, onNext }: { phone: string; onNext: () => void }) {
    return (
        <Container align="center">
            <Text variant="heading5">{phone}</Text>
            <Button variant="filled" onClick={onNext}>
                Change Phone Number
            </Button>
        </Container>
    );
}
