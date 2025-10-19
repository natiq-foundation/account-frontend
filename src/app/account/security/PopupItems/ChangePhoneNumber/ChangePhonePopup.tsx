"use client";

import { Container } from "@yakad/ui";
import { useSearchParams, useRouter } from "next/navigation";
import CurrentPhoneStep from "./steps/CurrentPhoneStep";
import NewPhoneStep from "./steps/NewPhoneStep";
import VerifyNewPhoneStep from "./steps/VerifyNewPhoneStep";
import SuccessStep from "./steps/SuccessStep";

export default function ChangePhonePopup() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const step = searchParams.get("step") || "current";
    const phone = searchParams.get("phone") || "+989123456789";

    const goToStep = (nextStep: string, nextPhone?: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", nextStep);
        if (nextPhone) params.set("phone", nextPhone);
        router.replace(`?${params.toString()}`);
    };

    return (
        <Container align="center" size="sm">
            {step === "current" && <CurrentPhoneStep phone={phone} onNext={() => goToStep("new")} />}
            {step === "new" && <NewPhoneStep onNext={(newPhone) => goToStep("verify-new", newPhone)} />}
            {step === "verify-new" && <VerifyNewPhoneStep phone={phone} onNext={() => goToStep("success")} />}
            {step === "success" && <SuccessStep />}
        </Container>
    );
}
