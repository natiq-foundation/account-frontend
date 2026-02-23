"use client";

import { useRef, useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CameraCapture from "@/components/CameraCaptureDialog";
import { useProfile } from "@/features/account/profile/hooks/useProfile";

export default function AvatarUploadDialog() {
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [dragging, setDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [step, setStep] = useState<"upload" | "camera">("upload");

    const { profile, changeAvatar } = useProfile();

    const openFilePicker = () => fileRef.current?.click();

    const handleSelectedFile = (file: File) => {
        if (!file.type.startsWith("image/")) {
            alert("Only images allowed.");
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleSelectedFile(file);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => setDragging(false);

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleSelectedFile(file);
    };

    const handleSave = async () => {
        if (!preview) return;
        await changeAvatar(preview); // یا فایل واقعی
        setPreview(null);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Avatar className="h-16 w-16 cursor-pointer">
                    <AvatarImage src={preview || profile?.avatar || "https://github.com/shadcn.png"} alt="profile" />
                </Avatar>
            </DialogTrigger>

            <DialogContent className="max-w-sm p-0">
                {/* CAMERA STEP */}
                {step === "camera" && (
                    <>
                        <DialogHeader className="px-4 pt-4 pb-2">
                            <DialogTitle>Take Photo</DialogTitle>
                        </DialogHeader>

                        <CameraCapture
                            onCapture={(img) => {
                                setPreview(img);
                                setStep("upload");
                            }}
                            onCancel={() => setStep("upload")}
                        />
                    </>
                )}

                {/* UPLOAD STEP */}
                {step === "upload" && (
                    <>
                        <DialogHeader className="px-4 pt-4 pb-2">
                            <DialogTitle>Change your profile image</DialogTitle>
                        </DialogHeader>

                        <div className="p-4 space-y-6">

                            {preview && (
                                <div className="flex justify-center">
                                    <Image
                                        src={preview}
                                        alt="preview"
                                        className="w-32 h-32 object-cover rounded-full border"
                                    />
                                </div>
                            )}

                            {!preview && (
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={openFilePicker}
                                    className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer flex items-center justify-center"
                                    style={{
                                        borderColor: dragging ? "#2563eb" : "#ccc",
                                        background: dragging ? "rgba(37,99,235,0.08)" : "transparent",
                                    }}
                                >
                                    <p className="text-sm opacity-70">
                                        Drag image here or click to upload
                                    </p>

                                    <input
                                        ref={fileRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            )}

                            {!preview && (
                                <div className="flex justify-end gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setStep("camera")}
                                    >
                                        Take photo
                                    </Button>

                                    <Button onClick={openFilePicker}>
                                        Upload file
                                    </Button>
                                </div>
                            )}

                            {preview && (
                                <div className="flex justify-end gap-3">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setPreview(null)}
                                    >
                                        Cancel
                                    </Button>

                                    <Button onClick={handleSave}>
                                        Save
                                    </Button>
                                </div>
                            )}

                        </div>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}