"use client";

import { useEffect, useState } from "react";
import { Container, Text, Button, Stack } from "@yakad/ui";
import QRCode from "qrcode";
import { authenticator } from "otplib";

export default function QrCodeStep({ onNext }: { onNext: () => void }) {
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const [secret, setSecret] = useState<string>("");

    useEffect(() => {
        const newSecret = authenticator.generateSecret();
        setSecret(newSecret);

        const otpauth = authenticator.keyuri("user@example.com", "MyAppName", newSecret);

        QRCode.toDataURL(otpauth).then(setQrCodeData);
    }, []);

    return (
        <Container align="center">
            <Stack align="center">
                <Text variant="heading5">Scan this QR Code</Text>

                <Stack>
                    <Text>1. Open the Google Authenticator app</Text>
                    <Text>2. Tap “Add account”</Text>
                    <Text>3. Choose “Scan QR code”</Text>
                </Stack>

                {qrCodeData ? (
                    <img
                        src={qrCodeData}
                        alt="Google Authenticator QR"
                        width={200}
                        height={200}
                    />
                ) : (
                    <Text>Generating QR...</Text>
                )}

                <Stack align="center">
                    <Text>Can’t scan? Use this code instead:</Text>
                    <Text>{secret}</Text>
                </Stack>

                <Button variant="filled" onClick={onNext}>
                    Next
                </Button>
            </Stack>
        </Container>
    );
}
