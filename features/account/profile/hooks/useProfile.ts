"use client";

import { useState, useEffect } from "react";
import { fetchProfile, updateAvatar } from "../services/profile.service";
import { Profile } from "../models/profile.model";

export function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile().then((p) => {
            setProfile(p);
            setLoading(false);
        });
    }, []);

    const changeAvatar = async (file: File | string) => {
        setLoading(true);
        const newUrl = await updateAvatar(file);
        setProfile((prev) => prev ? { ...prev, avatar: newUrl } : null);
        setLoading(false);
    };

    return { profile, loading, changeAvatar };
}