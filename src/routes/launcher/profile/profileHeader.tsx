import { Camera, Pencil } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ProfileHeaderProps {
    fullName: string;
    Username: string;
    avatar: string | null;
    onEdit?: () => void;
}

function getInitials(fullName: string) {
    return (
        fullName
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .slice(0, 2)
            .map((name) => name.charAt(0).toUpperCase())
            .join("") || "U"
    );
}

export default function ProfileHeader({
    fullName,
    Username,
    avatar,
    onEdit,
}: ProfileHeaderProps) {
    return (
        <Card className="overflow-hidden">
            <div className="h-28 bg-muted sm:h-36" />

            <CardContent className="px-4 pb-5 sm:px-6 sm:pb-6">
                <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex min-w-0 flex-col items-center gap-4 sm:flex-row sm:items-end">
                        <div className="relative shrink-0">
                            <Avatar className="size-28 border-4 border-background shadow-md sm:size-32">
                                <AvatarImage
                                    src={avatar ?? undefined}
                                    alt={fullName}
                                />

                                <AvatarFallback className="text-2xl font-semibold">
                                    {getInitials(fullName)}
                                </AvatarFallback>
                            </Avatar>

                            <Button
                                type="button"
                                size="icon"
                                variant="secondary"
                                className="absolute bottom-0 right-0 size-9 rounded-full border shadow-sm"
                                aria-label="Change avatar"
                            >
                                <Camera className="size-4" />
                            </Button>
                        </div>

                        <div className="min-w-0 text-center sm:pb-2 sm:text-left">
                            <h1 className="truncate text-2xl font-semibold tracking-tight">
                                {fullName}
                            </h1>

                            <p className="mt-1 truncate text-sm text-muted-foreground">
                                @{Username}
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={onEdit}
                    >
                        <Pencil className="size-4" />
                        Edit Profile
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
