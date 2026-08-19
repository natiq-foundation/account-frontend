import { useState } from "react";

import { validateProfile } from "@/lib/validation/profile";

import BirthdayPicker from "@/components/specified/birthDateSelect";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AvatarUploader from "@/components/specified/avatar";

interface EditProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    fullName: string;
    Username: string;
    avatar: string | null;
    Birthday?: Date | undefined;

    onSave: (data: {
        fullName: string;
        Username: string;
        avatar: string | null;
        Birthday: Date | undefined;
    }) => void;
}

export default function EditProfileDialog({
    open,
    onOpenChange,
    fullName,
    Username,
    avatar,
    Birthday,
    onSave,
}: EditProfileDialogProps) {
    const [name, setName] = useState(fullName);

    const [username, setUsername] = useState(Username);

    const [avatarValue, setAvatarValue] = useState<string | null>(avatar);

    const [birthday, setBirthday] = useState<Date | undefined>(Birthday);

    const [errors, setErrors] = useState<{
        fullName?: string;
        Username?: string;
    }>({});

    function handleSave() {
        const validationErrors = validateProfile(name, username);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        onSave({
            fullName: name.trim(),

            Username: username.trim(),

            avatar: avatarValue,

            Birthday: birthday,
        });

        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    {/* Avatar */}

                    <div className="flex justify-center">
                        <AvatarUploader
                            value={avatarValue}
                            onChange={setAvatarValue}
                        />
                    </div>

                    {/* Full Name */}

                    <div className="space-y-2">
                        <Label>Full Name</Label>

                        <Input
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);

                                setErrors({
                                    ...errors,
                                    fullName: "",
                                });
                            }}
                            placeholder="Enter your name"
                        />

                        {errors.fullName && (
                            <p className="text-sm text-destructive">
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    {/* Username */}

                    <div className="space-y-2">
                        <Label>Username</Label>

                        <Input
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);

                                setErrors({
                                    ...errors,
                                    Username: "",
                                });
                            }}
                            placeholder="Enter username"
                        />

                        {errors.Username && (
                            <p className="text-sm text-destructive">
                                {errors.Username}
                            </p>
                        )}
                    </div>

                    {/* Birthday */}

                    <div className="space-y-2">
                        <Label>Birthday</Label>

                        <BirthdayPicker
                            value={birthday}
                            onChange={setBirthday}
                        />
                    </div>

                    <Button className="w-full" onClick={handleSave}>
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
