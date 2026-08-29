import { useState } from "react";
import type { ComponentProps } from "react";

import { Material, Flag } from "@yakad/symbols";

import { useProfile } from "@/context/profileContext";

import ProfileHeader from "./profileHeader";
import EditProfileDialog from "./editProfileDialog";

type FlagCode = ComponentProps<typeof Flag>["code"];

export default function Profile() {
    const [profile, setProfile] = useProfile();

    const [editOpen, setEditOpen] = useState(false);

    const birthday = profile.Birthday ? new Date(profile.Birthday) : undefined;

    return (
        <main className="mx-auto w-full max-w-5xl px-4 pb-20 pt-6 sm:px-6 sm:pb-24 lg:px-8">
            <div className="space-y-6">
                <ProfileHeader
                    fullName={profile.fullName}
                    Username={profile.Username}
                    avatar={profile.avatar}
                    onEdit={() => setEditOpen(true)}
                />

                <section className="grid gap-4 sm:grid-cols-2">
                    <div className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="bg-muted/50 flex size-14 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-transform duration-200 group-hover:scale-105">
                                <Material
                                    icon="location_on"
                                    className="size-6 text-muted-foreground"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Country
                                </p>

                                <div className="mt-1 flex items-center gap-2">
                                    <p
                                        className={
                                            profile.Region
                                                ? "truncate text-lg font-semibold tracking-tight"
                                                : "text-lg font-semibold tracking-tight text-muted-foreground"
                                        }
                                    >
                                        {profile.Region || "Not set"}
                                    </p>

                                    {profile.RegionCode && (
                                        <div className="flex shrink-0 items-center">
                                            <Flag
                                                code={
                                                    profile.RegionCode as FlagCode
                                                }
                                                className="size-5"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                        <div className="flex items-center gap-4">
                            <div className="bg-muted/50 flex size-14 shrink-0 items-center justify-center rounded-xl border shadow-sm transition-transform duration-200 group-hover:scale-105">
                                <Material
                                    icon="calendar_today"
                                    className="size-6 text-muted-foreground"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Birthday
                                </p>

                                <p className="mt-1 truncate text-lg font-semibold tracking-tight">
                                    {birthday
                                        ? birthday.toLocaleDateString()
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
                    Birthday={birthday}
                    Region={profile.Region}
                    RegionCode={profile.RegionCode}
                    onSave={(data) => {
                        setProfile((prev) => ({
                            ...prev,
                            fullName: data.fullName,
                            Username: data.Username,
                            avatar: data.avatar,
                            Birthday: data.Birthday,
                            Region: data.Region,
                            RegionCode: data.RegionCode,
                        }));
                    }}
                />
            </div>
        </main>
    );
}
