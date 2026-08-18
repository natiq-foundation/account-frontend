import { CalendarDays, MapPin } from "lucide-react";

import { useProfile } from "@/context/profileContext";

import ProfileHeader from "./profileHeader";

export default function Profile() {
    const [profile] = useProfile();

    const birthday = profile.Birthday
        ? profile.Birthday.toLocaleDateString()
        : "Not set";

    const region = profile.Region || "Not set";

    return (
        <main className="mx-auto w-full max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="space-y-6">
                <ProfileHeader
                    fullName={profile.fullName}
                    Username={profile.Username}
                    avatar={profile.avatar}
                />

                <section className="grid gap-4 sm:grid-cols-2">
                    <InfoCard
                        icon={<MapPin className="size-5" />}
                        label="Region"
                        value={region}
                    />

                    <InfoCard
                        icon={<CalendarDays className="size-5" />}
                        label="Birthday"
                        value={birthday}
                    />
                </section>
            </div>
        </main>
    );
}

interface InfoCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
    return (
        <div className="rounded-xl border bg-card p-5">
            <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    {icon}
                </div>

                <div className="min-w-0">
                    <p className="text-sm text-muted-foreground">
                        {label}
                    </p>

                    <p className="truncate font-medium">
                        {value}
                    </p>
                </div>
            </div>
        </div>
    );
}