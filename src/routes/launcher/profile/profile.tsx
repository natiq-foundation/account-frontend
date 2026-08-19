import { MapPin, CalendarDays } from "lucide-react";
import { useState } from "react";

import { useProfile } from "@/context/profileContext";

import ProfileHeader from "./profileHeader";
import EditProfileDialog from "./editProfileDialog";

export default function Profile() {
    const [profile, setProfile] = useProfile();

    const [editOpen, setEditOpen] = useState(false);

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="space-y-6">
                <ProfileHeader
                    fullName={profile.fullName}
                    Username={profile.Username}
                    avatar={profile.avatar}
                    onEdit={() => setEditOpen(true)}
                />

                <section className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                                <MapPin className="size-5 text-muted-foreground" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Region
                                </p>

                                <p className="font-medium">
                                    {profile.Region || "Not set"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-card p-5">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
                                <CalendarDays className="size-5 text-muted-foreground" />
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">
                                    Birthday
                                </p>

                                <p className="font-medium">
                                    {profile.Birthday
                                        ? profile.Birthday.toLocaleDateString()
                                        : "Not set"}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <EditProfileDialog
                    open={editOpen}
                    onOpenChange={setEditOpen}
                    fullName={profile.fullName}
                    Username={profile.Username}
                    avatar={profile.avatar}
                    Birthday={profile.Birthday}
                    onSave={(data) => {
                        setProfile((prev) => ({
                            ...prev,

                            fullName: data.fullName,

                            Username: data.Username,

                            avatar: data.avatar,

                            Birthday: data.Birthday,
                        }));
                    }}
                />
            </div>
        </main>
    );
}
