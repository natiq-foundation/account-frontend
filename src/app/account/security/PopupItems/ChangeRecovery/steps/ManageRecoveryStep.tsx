"use client";

import { Container, Row, Button, Text } from "@yakad/ui";
import { useState } from "react";

export default function ManageRecoveryStep({
    onAddEmail,
    onAddPhone,
}: {
    onAddEmail: () => void;
    onAddPhone: () => void;
}) {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    return (
        <Container align="start">
            <Text variant="heading5">Manage Recovery</Text>

            <Text variant="heading6" style={{ marginTop: 16 }}>Recovery Email</Text>
            <Row  >
                <Text>{email || "No recovery email set"}</Text>
                {!email && <Button variant="filled" onClick={onAddEmail}>Add</Button>}
            </Row>

            <Text variant="heading6" style={{ marginTop: 24 }}>Recovery Phone</Text>
            <Row align="center" >
                <Text>{phone || "No recovery phone set"}</Text>
                {!phone && <Button variant="filled" onClick={onAddPhone}>Add</Button>}
            </Row>
        </Container>
    );
}
