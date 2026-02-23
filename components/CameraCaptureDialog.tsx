"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    onCapture: (img: string) => void;
    onCancel: () => void;
}

export default function CameraCaptureDialog({ onCapture, onCancel }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
    };

    const takePhoto = () => {
        const video = videoRef.current;
        if (!video) return;

        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0);
        const img = canvas.toDataURL("image/png");

        stopCamera();
        onCapture(img);
    };

    useEffect(() => {
        let active = true;

        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "user" } })
            .then((mediaStream) => {
                if (!active) return;

                streamRef.current = mediaStream;

                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            })
            .catch((err) => {
                console.error("Camera error:", err);
            });

        return () => {
            active = false;
            stopCamera();
        };
    }, []);

    return (
        <div className="p-4 space-y-4">
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="rounded-lg w-full"
            />

            <div className="flex justify-end gap-3">
                <Button
                    variant="ghost"
                    onClick={() => {
                        stopCamera();
                        onCancel();
                    }}
                >
                    Cancel
                </Button>
                <Button onClick={takePhoto}>
                    Capture
                </Button>
            </div>
        </div>
    );
}