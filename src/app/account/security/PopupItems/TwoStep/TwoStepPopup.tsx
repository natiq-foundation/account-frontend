"use client";

import { Container } from "@yakad/ui";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PasswordStep from "./steps/CurrentPasswordStep";
import EmailStep from "./steps/RecoveryEmailStep";
import VerifyEmailStep from "./steps/VerifyRecoveryCodeStep";
import ManageStep from "./steps/ManageStep";
import SuccessStep from "./steps/SuccessStep";

export default function TwoStepPopup() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isTwoStepEnabled, setIsTwoStepEnabled] = useState(false);

    const step = searchParams.get("step") || "";
    const email = searchParams.get("email") || "";

    // Check if two-step is enabled (in real app, this would come from API/context)
    useEffect(() => {
        // Demo: simulate checking if two-step is enabled
        // In real implementation, this would be fetched from your auth context or API
        const enabled = localStorage.getItem("twoStepEnabled") === "true";
        setIsTwoStepEnabled(enabled);
    }, []);

    const goToStep = (nextStep?: string, nextEmail?: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (nextStep) params.set("step", nextStep);
        else params.delete("step"); // Close popup

        if (nextEmail) params.set("email", nextEmail);
        else params.delete("email");

        const newUrl = params.toString() ? `?${params}` : "/account/security";
        router.replace(newUrl);
    };
    const handlePasswordSuccess = () => {
        if (isTwoStepEnabled) {
            // وقتی two-step فعال بود، بره مرحله CurrentPasswordStep قبل از manage
            goToStep("password-for-manage");
        } else {
            goToStep("email");
        }
    };


    const handleDisable = () => {
        setIsTwoStepEnabled(false);
        localStorage.setItem("twoStepEnabled", "false");
        goToStep("password");
    };

    const handleSuccess = () => {
        setIsTwoStepEnabled(true);
        localStorage.setItem("twoStepEnabled", "true");
        goToStep("manage");
    };

    const getInitialStep = () => {
        if (step) return step;
        return isTwoStepEnabled ? "manage" : "password";
    };


    const currentStep = getInitialStep();

    return (
        <Container align="center" size="sm">
            {currentStep === "password" && <PasswordStep onNext={handlePasswordSuccess} />}
            {currentStep === "email" && <EmailStep onNext={(newEmail) => goToStep("verify-email", newEmail)} />}
            {currentStep === "verify-email" && <VerifyEmailStep email={email} onNext={() => goToStep("success")} />}
            {currentStep === "manage" && (<ManageStep onDisable={handleDisable} onChangeEmail={() => goToStep("email")} />)}

            {currentStep === "success" && <SuccessStep onDone={handleSuccess} />}
        </Container>
    );
}
