"use client";

import { useEffect, useState } from "react";
import { Container, Text, Button, Stack } from "@yakad/ui";
import QRCode from "qrcode";

export default function QrCodeStep({ onNext }: { onNext: () => void }) {
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);
    const [secret, setSecret] = useState<string>("");

    useEffect(() => {
        // تولید یه secret تصادفی ساده برای دمو
        const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        let fakeSecret = "";
        for (let i = 0; i < 16; i++) {
            fakeSecret += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setSecret(fakeSecret);

        // ساخت otpauth URL
        const appName = "MyDemoApp";
        const account = "demo@example.com";
        const otpauth = `otpauth://totp/${appName}:${account}?secret=${fakeSecret}&issuer=${appName}`;

        // ساخت QR base64
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
