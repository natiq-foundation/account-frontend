"use client";

import { Symbol } from "@yakad/symbols";
import { Button, Container, Hr, Row, Stack, Text } from "@yakad/ui";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AvatarPopup() {
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Only image files are allowed.");
            return;
        }
        alert(`Selected: ${file.name}`);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    return (
        <Container size="sm" align="center">
            <Symbol size={20} icon="account_circle" />
            <Stack align="center" style={{ width: "100%", maxWidth: 320 }}>
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                        border: `2px dashed ${isDragging ? "#2196f3" : "#ccc"}`,
                        borderRadius: 12,
                        padding: "40px 20px",
                        width: "100%",
                        textAlign: "center",
                        transition: "border-color 0.2s ease",
                        background: isDragging ? "rgba(33,150,243,0.05)" : "transparent",
                        cursor: "pointer",
                    }}
                >
                    <Text style={{ opacity: 0.8 }}>
                        Drag photo here or click upload
                    </Text>
                </div>

                <Hr variant="shortLine" />

                <Row align="center" >
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
