import { useState } from "react";

import { validateProfile } from "@/lib/validation/profile";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    fullName: string;
    Username: string;

    onSave: (data: { fullName: string; Username: string }) => void;
}

export default function EditProfileDialog({
    open,
    onOpenChange,
    fullName,
    Username,
    onSave,
}: EditProfileDialogProps) {
    const [name, setName] = useState(fullName);
    const [username, setUsername] = useState(Username);

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

                    <Button className="w-full" onClick={handleSave}>
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
