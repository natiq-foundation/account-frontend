"use client";

import { Container } from "@yakad/ui";
import { useSearchParams, useRouter } from "next/navigation";
import CurrentPasswordStep from "./steps/CurrentPasswordStep";
import NewPasswordStep from "./steps/NewPasswordStep";
import SuccessStep from "./steps/SuccessStep";

export default function ChangePasswordPopup() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const step = searchParams.get("step") || "current";

    const goToStep = (nextStep: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", nextStep);
        router.replace(`?${params.toString()}`);
    };

    return (
        <Container align="center" size="sm">
            {step === "current" && <CurrentPasswordStep onNext={() => goToStep("new")} />}
            {step === "new" && <NewPasswordStep onNext={() => goToStep("success")} />}
            {step === "success" && <SuccessStep />}
        </Container>
    );
}
