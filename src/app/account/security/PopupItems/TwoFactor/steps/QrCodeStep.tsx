"use client";

import { Container, Text, Button, Stack } from "@yakad/ui";
import Image from "next/image";

export default function QrCodeStep({ onNext }: { onNext: () => void }) {
    const demoSecret = "JBSWY3DPEHPK3PXP"; // fake demo secret key

    return (
        <Container align="center">
            <Stack align="center" >
                <Text variant="heading5">Scan this QR Code</Text>

                <Stack >
                    <Text>1. Open the Google Authenticator app</Text>
                    <Text>2. Tap “Add account”</Text>
                    <Text>3. Choose “Scan QR code”</Text>
                </Stack>

                <Image
                    src="/images/Qr-2.png"
                    alt="QR code"
                    width={200}
                    height={200}
                />

                <Stack align="center" >
                    <Text>Can’t scan? Use this code instead:</Text>
                    <Text>{demoSecret}</Text>
                </Stack>

                <Button variant="filled" onClick={onNext}>
                    Next
                </Button>
            </Stack>
        </Container>
    );
}
