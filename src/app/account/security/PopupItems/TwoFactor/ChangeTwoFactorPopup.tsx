"use client";

import { Container } from "@yakad/ui";
import { useSearchParams, useRouter } from "next/navigation";
import PasswordStep from "./steps/PasswordStep";
import InstructionsStep from "./steps/InstructionsStep";
import QrCodeStep from "./steps/QrCodeStep";
import VerifyCodeStep from "./steps/VerifyCodeStep";
import SuccessStep from "./steps/SuccessStep";

export default function ChangeTwoFactorPopup() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const step = searchParams.get("step") || "password";

    const goToStep = (nextStep: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("step", nextStep);
        router.replace(`?${params.toString()}`);
    };

    return (
        <Container align="center" size="sm">
            {step === "password" && <PasswordStep onNext={() => goToStep("instructions")} />}
            {step === "instructions" && <InstructionsStep onNext={() => goToStep("qrcode")} />}
            {step === "qrcode" && <QrCodeStep onNext={() => goToStep("verify-code")} />}
            {step === "verify-code" && <VerifyCodeStep onNext={() => goToStep("success")} />}
            {step === "success" && <SuccessStep onDone={() => router.back()} />}
        </Container>
    );
}
