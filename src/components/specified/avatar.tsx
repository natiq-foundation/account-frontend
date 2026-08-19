import { useRef, type ChangeEvent } from "react";
import { Camera, Trash2 } from "lucide-react";

import {
    Avatar as UiAvatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

interface AvatarUploaderProps {
    value: string | null;
    onChange: (value: string | null) => void;
}

export default function AvatarUploader({
    value,
    onChange,
}: AvatarUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            alert("Image size must be less than 2MB");
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            onChange(reader.result as string);
        };

        reader.readAsDataURL(file);

        event.target.value = "";
    }

    return (
        <div className="relative">
            <UiAvatar
                className="
                    size-28
                    border-4
                    border-background
                    shadow-lg
                "
            >
                <AvatarImage src={value ?? undefined} alt="Profile avatar" />

                <AvatarFallback>User</AvatarFallback>
            </UiAvatar>

            <Button
                type="button"
                size="icon"
                variant="secondary"
                className="
                    absolute
                    bottom-0
                    right-0
                    size-9
                    rounded-full
                    border
                    shadow-md
                    transition
                    hover:scale-110
                "
                onClick={() => {
                    if (value) {
                        onChange(null);
                    } else {
                        inputRef.current?.click();
                    }
                }}
            >
                {value ? (
                    <Trash2 className="size-4" />
                ) : (
                    <Camera className="size-4" />
                )}
            </Button>

            <input
                ref={inputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                hidden
                onChange={handleChange}
            />
        </div>
    );
}
