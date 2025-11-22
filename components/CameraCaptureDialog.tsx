"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    onCapture: (img: string) => void;
    onCancel: () => void;
}

export default function CameraCaptureDialog({ onCapture, onCancel }: Props) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach((t) => t.stop());
            setStream(null);
        }
    }, [stream]);

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

        video.style.display = "none";
        stopCamera();
        onCapture(img);
    };

    useEffect(() => {
        let mounted = true;

        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((mediaStream) => {
                if (!mounted) return;
                setStream(mediaStream);
                if (videoRef.current) videoRef.current.srcObject = mediaStream;
            });

        return () => {
            mounted = false;
            stopCamera();
        };
    }, [stopCamera]);

    return (
        <div className="p-4 space-y-4">
            <video ref={videoRef} autoPlay playsInline className="rounded-lg w-full" />

            <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={() => { stopCamera(); onCancel(); }}>
                    Cancel
                </Button>
                <Button onClick={takePhoto}>
                    Capture
                </Button>
            </div>
        </div>
    );
}
