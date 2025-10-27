"use client";

import { Container, Text, Button, Stack } from "@yakad/ui";

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

                {/* Demo QR Code */}
                <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=otpauth://totp/Example:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=DemoApp"
                    alt="Authenticator QR Code"
                    style={{ borderRadius: 8, marginTop: 10 }}
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
