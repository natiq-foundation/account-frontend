import { useRef, type ChangeEvent } from "react";

interface AvatarProps {
    value: string | null;
    onChange: (value: string | null) => void;
}

export default function Avatar({ value, onChange }: AvatarProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
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
                    <img src={value} alt="Profile avatar" />
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
                onChange={handleChange}
                hidden
            />
        </div>
    );
}
