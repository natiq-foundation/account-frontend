"use client";

import { useState } from "react";
import { Container, Card, Row, Stack, Spacer, Button, Text, Span, H3, WithOverlay, Popup } from "@yakad/ui";
import { Symbol } from "@yakad/symbols";

type SessionItem = {
    id: string;
    deviceType: "mobile" | "desktop";
    model: string;
    ip: string;
    date: string;
    current?: boolean;
};

export default function ActiveSessionsPopup() {
    const [sessions, setSessions] = useState<SessionItem[]>([
        {
            id: "1",
            deviceType: "desktop",
            model: "MacBook Pro 16”",
            ip: "123.45.678.9",
            date: "Oct 19, 2025, 02:14 AM",
            current: true,
        },
        {
            id: "2",
            deviceType: "mobile",
            model: "iPhone 14 Pro",
            ip: "123.45.678.9",
            date: "Oct 18, 2025, 22:34 PM",
        },
        {
            id: "3",
            deviceType: "desktop",
            model: "Windows 11 PC",
            ip: "98.34.21.19",
            date: "Oct 17, 2025, 19:42 PM",
        },
    ]);

    const [confirmLogout, setConfirmLogout] = useState<string | null>(null);

    const handleLogout = (id: string) => {
        setSessions((prev) => prev.filter((s) => s.id !== id));
        setConfirmLogout(null);
    };

    return (
        <Container title="Active Sessions">
            <Container style={{ gap: "1.5rem", width: "100%", maxWidth: 480 }}>

                <Stack style={{ gap: "0.75rem" }}>
                    <H3>This Device</H3>
                    {sessions
                        .filter((s) => s.current)
                        .map((item) => (
                            <Card key={item.id}>
                                <Row align="center">
                                    <Button
                                        icon={<Symbol icon={item.deviceType === "mobile" ? "mobile" : "laptop_windows"} />}

                                    />
                                    <Stack style={{ gap: "0" }}>
                                        <Text variant="heading6">{item.model}</Text>
                                        <Span variant="caption">
                                            {item.ip} — {item.date}
                                        </Span>
                                    </Stack>
                                </Row>
                            </Card>
                        ))}
                    <Button  >
                        Log out of all other devices
                    </Button>
                </Stack>

                <Stack style={{ gap: "0.75rem" }}>
                    <H3>Active Sessions</H3>
                    {sessions
                        .filter((s) => !s.current)
                        .map((item) => (
                            <Card key={item.id}>
                                <Row align="center">
                                    <Button
                                        icon={<Symbol icon={item.deviceType === "mobile" ? "mobile" : "laptop_windows"} />}

                                    />
                                    <Stack style={{ gap: "0" }}>
                                        <Text variant="heading6">{item.model}</Text>
                                        <Span variant="caption">
                                            {item.ip} — {item.date}
                                        </Span>
                                    </Stack>
                                    <Spacer />
                                    <Button
                                        icon={<Symbol icon="logout" />}
                                        onClick={() => setConfirmLogout(item.id)}
                                    />
                                </Row>
                            </Card>
                        ))}
                </Stack>
            </Container>

            {confirmLogout && (
                <WithOverlay>
                    <Popup onClose={() => setConfirmLogout(null)}>


                        <Stack align="center" style={{ gap: "1rem", padding: "1rem" }}>
                            <Text>Do you want to log out this session?</Text>
                            <Row style={{ gap: "1rem" }}>
                                <Button onClick={() => setConfirmLogout(null)}>
                                    Cancel
                                </Button>
                                <Button onClick={() => handleLogout(confirmLogout)}>
                                    Log out
                                </Button>
                            </Row>
                        </Stack>
                    </Popup>
                </WithOverlay>
            )}
        </Container>
    );
}
