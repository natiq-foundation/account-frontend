"use client";

import { Symbol } from "@yakad/symbols";
import { Text, Button, Container } from "@yakad/ui";
import { useRouter } from "next/navigation";

export default function SuccessStep() {
    const router = useRouter();

    const handleDone = () => {
        router.push("/account/security");
    };

    return (
        <Container align="center">
            <Symbol icon="check_circle" size={20} color="green" />
            <Text>Password Changed Successfully!</Text>
            <Button variant="filled" onClick={handleDone}>
                Done
            </Button>
        </Container>
    );
}
