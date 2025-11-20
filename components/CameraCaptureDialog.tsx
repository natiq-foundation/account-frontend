"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export default function CameraCapture({
    onCapture,
    onCancel,
}: {
    onCapture: (img: string) => void;
    onCancel: () => void;
}) {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);

    // Start camera
    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                const s = await navigator.mediaDevices.getUserMedia({ video: true });
                if (!mounted) return;

                setStream(s);
                if (videoRef.current) {
                    videoRef.current.srcObject = s;
                    videoRef.current.play().catch(() => { });
                }
            } catch (err) {
                console.log("Camera access denied:", err);
            }
        })();

        return () => {
            mounted = false;
            stopCamera();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach((track) => track.stop());
            setStream(null);
        }
    };

    const takePhoto = () => {
        const video = videoRef.current;
        if (!video || !stream) return;

        // 1️⃣ فوراً UI رو به حالت عکس گرفته شده تغییر بده
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.drawImage(video, 0, 0);
        const img = canvas.toDataURL("image/png");

        // 2️⃣ فوراً video رو مخفی کن
        if (videoRef.current) {
            videoRef.current.style.display = "none";
        }

        // 3️⃣ Trackها رو بعد از تغییر UI قطع کن
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);

        // 4️⃣ عکس رو برگردون
        onCapture(img);
    };


    const handleCancel = () => {
        if (videoRef.current) videoRef.current.style.display = "none";
        stream?.getTracks().forEach((t) => t.stop());
        setStream(null);
        onCancel();
    };



    return (
        <div className="p-4 space-y-4">
            <video ref={videoRef} className="w-full rounded-lg border" />

            <div className="flex justify-end gap-3">
                <Button variant="ghost" onClick={handleCancel}>
                    Cancel
                </Button>

                <Button onClick={takePhoto}>
                    Capture
                </Button>
            </div>
        </div>
    );
}
