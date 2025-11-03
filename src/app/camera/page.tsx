"use client";
import { useEffect, useRef } from "react";
import { Button, Stack } from "@yakad/ui";
import { useRouter } from "next/navigation";

export default function CameraPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const router = useRouter();

    const stopCamera = async () => {
        const stream = streamRef.current;
        if (!stream) return;

        if (videoRef.current) {
            videoRef.current.srcObject = null;
        }

        const tracks = stream.getTracks();
        await Promise.all(
            tracks.map(
                (track) =>
                    new Promise<void>((resolve) => {
                        track.onended = () => resolve();
                        track.stop();
                        setTimeout(() => resolve(), 200);
                    })
            )
        );

        streamRef.current = null;
    };

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Cannot access camera:", err);
            }
        };

        startCamera();

        return () => {
            stopCamera();
        };
    }, []);

    const handleBack = async () => {
        await stopCamera();
        router.back();
    };

    return (
        <Stack align="center">
            <h1>Camera Page</h1>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: "100%", maxWidth: 400, borderRadius: 8 }}
            />
            <Button onClick={handleBack}>Back</Button>
        </Stack>
    );
}
