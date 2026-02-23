import { useState } from "react";
import {
    verifyCurrentPassword,
    changePassword,
} from "../services/password.service";

export const useChangePassword = (onSuccess?: () => void) => {
    const [step, setStep] = useState<"verify" | "change">("verify");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const verify = async (currentPassword: string) => {
        setLoading(true);
        setError(null);

        const isValid = await verifyCurrentPassword(currentPassword);

        if (!isValid) {
            setError("Current password is incorrect.");
            setLoading(false);
            return false;
        }

        setStep("change");
        setLoading(false);
        return true;
    };

    const updatePassword = async (
        currentPassword: string,
        newPassword: string,
        confirmPassword: string
    ) => {
        setError(null);

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters.");
            return false;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        setLoading(true);

        await changePassword({
            currentPassword,
            newPassword,
        });

        setLoading(false);
        onSuccess?.();

        return true;
    };

    return {
        step,
        loading,
        error,
        verify,
        updatePassword,
    };
};