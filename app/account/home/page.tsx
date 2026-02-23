"use client";
import AvatarUploadDialog from "@/components/AvatarUploadDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProfile } from "@/features/account/profile/hooks/useProfile";

export default function ProfilePage() {
    const { profile, loading } = useProfile();

    if (loading || !profile) return <p>Loading...</p>;

    const basicItems = [
        { label: "Age", value: profile.age || "24" },
        { label: "Country", value: profile.country || "Iran" },
        { label: "City", value: profile.city || "Tehran" },
    ];

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-sm space-y-6">

                <div className="flex items-center gap-4">
                    <AvatarUploadDialog />
                    <div className="flex flex-col">
                        <p className="text-lg font-semibold">{profile.firstName}</p>
                        <p className="text-sm text-muted-foreground">{profile.email}</p>
                    </div>
                </div>

                <Separator />

                <div className="space-y-4">
                    <h3 className="text-base font-medium">Basic Info</h3>
                    <Card>
                        <CardContent className="p-4 space-y-3">
                            {basicItems.map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <span className="text-sm text-muted-foreground">{item.label}</span>
                                    <span className="text-sm font-medium">{item.value}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
}