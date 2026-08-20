import { useState } from "react";

import { Material } from "@yakad/symbols";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import AvatarPreview from "@/components/specified/avatarPreview";

interface ProfileHeaderProps {
    fullName: string;
    Username: string;
    avatar: string | null;
    onEdit?: () => void;
}

export default function ProfileHeader({
    fullName,
    Username,
    avatar,
    onEdit,
}: ProfileHeaderProps) {
    const initials =
        fullName
            .trim()
            .split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((name) => name[0]?.toUpperCase())
            .join("") || "U";

    const [avatarOpen, setAvatarOpen] = useState(false);

    return (
        <Card className="overflow-hidden">
            <div className="h-32 bg-muted" />

            <CardContent className="relative px-6 pb-6">
                <div className="-mt-16 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-end">
                        <div className="relative">
                            <Avatar
                                className="size-32 cursor-pointer border-4 border-background shadow-md"
                                onClick={() => setAvatarOpen(true)}
                            >
                                <AvatarImage
                                    src={avatar ?? undefined}
                                    alt={fullName}
                                />

                                <AvatarFallback className="text-2xl font-semibold">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                        </div>

                        <div className="text-center sm:pb-2 sm:text-left">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {fullName}
                            </h1>

                            <p className="mt-1 text-sm text-muted-foreground">
                                @{Username}
                            </p>
                        </div>
                    </div>

                    <Button type="button" variant="outline" onClick={onEdit}>
                        <Material icon="edit" className="size-4" />
                        Edit Profile
                    </Button>
                </div>
            </CardContent>

            <AvatarPreview
                open={avatarOpen}
                onOpenChange={setAvatarOpen}
                avatar={avatar}
                name={fullName}
            />
        </Card>
    );
}
