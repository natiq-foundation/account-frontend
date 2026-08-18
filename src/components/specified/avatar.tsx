import { useRef, type ChangeEvent } from "react";

interface AvatarUploaderProps {
    value: string | null;
    onChange: (value: string | null) => void;
}

export default function AvatarUploader({
    value,
    onChange,
}: AvatarUploaderProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const imageUrl = URL.createObjectURL(file);

        onChange(imageUrl);
    }

    return (
        <div>
            <div>
                {value ? (
                    <img src={value} alt="Avatar" />
                ) : (
                    <div>No Avatar</div>
                )}
            </div>

            <button type="button" onClick={() => inputRef.current?.click()}>
                Change Avatar
            </button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                hidden
            />
        </div>
    );
}
