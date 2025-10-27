"use client";

import { Container } from "@yakad/ui";
import { useSearchParams, useRouter } from "next/navigation";
import VerifyPasswordStep from "./steps/VerifyPasswordStep";
import ManageRecoveryStep from "./steps/ManageRecoveryStep";
import AddEmailStep from "./steps/AddEmailStep";
import VerifyEmailStep from "./steps/VerifyEmailStep";
import AddPhoneStep from "./steps/AddPhoneStep";
import VerifyPhoneStep from "./steps/VerifyPhoneStep";
import SuccessStep from "./steps/SuccessStep";

export default function ChangeRecoveryPopup() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const step = searchParams.get("step") || "verify-password";
    const value = searchParams.get("value") || "";

    const goToStep = (nextStep: string, extra?: Record<string, string>) => {
        const params = new URLSearchParams();
        params.set("step", nextStep);
        if (extra) {
            for (const [key, val] of Object.entries(extra)) {
                params.set(key, val);
            }
        }
        router.replace(`?${params.toString()}`);
    };

    return (
        <Container align="center" size="sm">
            {step === "verify-password" && (
                <VerifyPasswordStep onNext={() => goToStep("manage")} />
            )}
            {step === "manage" && (
                <ManageRecoveryStep
                    onAddEmail={() => goToStep("add-email")}
                    onAddPhone={() => goToStep("add-phone")}
                />
            )}
            {step === "add-email" && (
                <AddEmailStep onNext={(email) => goToStep("verify-email", { value: email })} />
            )}
            {step === "verify-email" && (
                <VerifyEmailStep email={value} onNext={() => goToStep("success")} />
            )}
            {step === "add-phone" && (
                <AddPhoneStep onNext={(phone) => goToStep("verify-phone", { value: phone })} />
            )}
            {step === "verify-phone" && (
                <VerifyPhoneStep phone={value} onNext={() => goToStep("success")} />
            )}
            {step === "success" && (
                <SuccessStep onDone={() => router.replace("?step=manage")} />
            )}
        </Container>
    );
}
