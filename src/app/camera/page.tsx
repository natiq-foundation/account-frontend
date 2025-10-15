"use client";
import { useEffect, useRef } from "react";
import { Button, Stack } from "@yakad/ui";
import { useRouter } from "next/navigation";

export default function CameraPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const router = useRouter();

    useEffect(() => {
        let stream: MediaStream;

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Cannot access camera:", err);
            }
        };

        startCamera();

        return () => {

            stream?.getTracks().forEach(track => track.stop());
        };
    }, []);

    return (
        <Stack align="center" >
            <h1>Camera Page</h1>
            <video ref={videoRef} autoPlay playsInline style={{ width: "100%", maxWidth: 400 }} />
            <Button onClick={() => router.back()}>Back</Button> {/* دکمه برگشت */}
        </Stack>
    );
}
