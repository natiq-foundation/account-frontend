import { createLocalStorageContext } from "@yakad/lib";

export interface Profile {
    fullName: string;
    Username: string;
    Birthday: Date | undefined;
    Region: string | undefined;
    avatar: string | null;
}

const defaultProfile: Profile = {
    fullName: "Name",
    Username: "UserName",
    Birthday: undefined,
    Region: undefined,
    avatar: null,
};

export const [ProfileProvider, useProfile] = createLocalStorageContext<Profile>(
    "profile",
    defaultProfile,
);
