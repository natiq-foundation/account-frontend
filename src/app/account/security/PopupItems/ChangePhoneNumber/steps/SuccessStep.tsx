"use client";

import { Symbol } from "@yakad/symbols";
import { Text, Button, Container } from "@yakad/ui";
import { useRouter } from "next/navigation";

export default function SuccessStep() {
    const router = useRouter();

    return (
        <Container align="center">
            <Symbol icon="check_circle" size={20} color="green" />
            <Text>Phone Number Changed Successfully!</Text>
            <Button variant="filled" onClick={() => router.back()}>
                Done
            </Button>
        </Container>
    );
}
