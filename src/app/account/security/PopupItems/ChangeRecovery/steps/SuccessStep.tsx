"use client";

import { Container, Text, Button } from "@yakad/ui";
import { Symbol } from "@yakad/symbols";

export default function SuccessStep({ onDone }: { onDone: () => void }) {


    return (
        <Container align="center">
            <Symbol icon="check_circle" size={24} color="green" />
            <Text>Recovery updated successfully!</Text>
            <Button variant="filled" onClick={onDone}>Done</Button>
        </Container>
    );
}
