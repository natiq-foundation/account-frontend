import Avatar from "@/components/specified/avatar";
import { useProfile } from "@/context/profileContext";
import { Button } from "@/components/ui/button";

export default function ProfileHeader() {
    const [profile, setProfile] = useProfile();

    return (
        <section className="flex flex-col items-center gap-4">
            <Avatar
                value={profile.avatar}
                onChange={(avatar) => {
                    setProfile({
                        ...profile,
                        avatar,
                    });
                }}
            />

            <div className="text-center">
                <h1 className="text-2xl font-semibold">{profile.fullName}</h1>

                <p className="text-muted-foreground">@{profile.Username}</p>
            </div>

            <Button>Edit Profile</Button>
        </section>
    );
}
