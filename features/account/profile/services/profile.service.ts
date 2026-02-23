import { Profile } from "../models/profile.model";


export async function fetchProfile(): Promise<Profile> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: "1",
                firstName: "First Name",
                email: "example@example.com",
                avatar: "https://github.com/shadcn.png",
                age: "24",
                country: "Iran",
                city: "Tehran",
            });
        }, 500);
    });
}

export async function updateAvatar(file: File | string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // در حالت واقعی: upload فایل و return URL
            if (typeof file === "string") resolve(file);
            else resolve(URL.createObjectURL(file));
        }, 500);
    });
}