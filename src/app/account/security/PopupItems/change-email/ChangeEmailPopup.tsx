"use client";

import { Container } from "@yakad/ui";
import { useSearchParams, useRouter } from "next/navigation";
import CurrentEmailStep from "./steps/CurrentEmailStep";
import VerifyOldEmailStep from "./steps/VerifyOldEmailStep";
import NewEmailStep from "./steps/NewEmailStep";
import VerifyNewEmailStep from "./steps/VerifyNewEmailStep";
import SuccessStep from "./steps/SuccessStep";

export default function ChangeEmailPopup() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const step = searchParams.get("step") || "current";
    const email = searchParams.get("email") || "user@example.com";

    const goToStep = (nextStep: string, nextEmail?: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", nextStep);
        if (nextEmail) params.set("email", nextEmail);
        router.replace(`?${params.toString()}`);
    };

    return (
        <Container align="center" size="sm">
            {step === "current" && <CurrentEmailStep email={email} onNext={() => goToStep("verify-old")} />}
            {step === "verify-old" && <VerifyOldEmailStep email={email} onNext={() => goToStep("new")} />}
            {step === "new" && <NewEmailStep onNext={(newEmail) => goToStep("verify-new", newEmail)} />}
            {step === "verify-new" && <VerifyNewEmailStep email={email} onNext={() => goToStep("success")} />}
            {step === "success" && <SuccessStep />}
        </Container>
    );
}
