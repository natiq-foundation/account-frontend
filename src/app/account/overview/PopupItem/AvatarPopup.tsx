"use client";

import { Symbol } from "@yakad/symbols";
import { Button, Container, Hr, Row, Stack, Text } from "@yakad/ui";
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function AvatarPopup() {
    const router = useRouter();


    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        alert(`Selected: ${file.name}`);
    };

    return (
        <Container size="sm" align="center">
            <Symbol size={20} icon="account_circle" />
            <Stack align="center">
                <Text>Drag photo here</Text>
                <Hr variant="shortLine" />
                <Row align="center">
                    <Button
                        variant="elevated"
                        icon={<Symbol icon="upload_file" />}
                        iconPosition="start"
                        onClick={handleUploadClick}
                    >
                        Upload
                    </Button>

                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <Button
                        variant="elevated"
                        onClick={() => router.push("/camera")}
                        icon={<Symbol icon="photo_camera" />}
                        iconPosition="start"
                    >
                        Take Photo
                    </Button>
                </Row>
            </Stack>
        </Container>
    );
}
