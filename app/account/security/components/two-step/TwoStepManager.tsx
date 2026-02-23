"use client"

import { Button } from "@/components/ui/button"
import { useTwoStep } from "@/features/security/two-step/hooks/useTwoStep"
import { AuthenticatorSetup } from "./AuthenticatorSetup"
import { BackupCodesSetup } from "./BackupCodesSetup"
import { EmailSetup } from "./EmailSetup"
import { SmsSetup } from "./SmsSetup"
import { useState } from "react"

type Step = "manage" | "email" | "sms" | "backup" | "app"

export function TwoStepManager({ onClose }: { onClose: () => void }) {
    const [step, setStep] = useState<Step>("manage")


    const {
        methods,
        qrCodeUrl,
        secret,
        startAuthenticatorSetup,
        verifyMethod,
        activate,
    } = useTwoStep()

    if (step === "email")
        return (
            <EmailSetup
                onSuccess={() => {
                    verifyMethod("email", "123456")
                    setStep("manage")
                }}
                onBack={() => setStep("manage")}
            />
        )

    if (step === "sms")
        return (
            <SmsSetup
                onSuccess={() => {
                    verifyMethod("sms", "123456")
                    setStep("manage")
                }}
                onBack={() => setStep("manage")}
            />
        )

    if (step === "backup")
        return (
            <BackupCodesSetup
                onSuccess={() => {
                    verifyMethod("backupCodes", "123456")
                    setStep("manage")
                }}
                onBack={() => setStep("manage")}
            />
        )

    if (step === "app")
        return (
            <AuthenticatorSetup
                qrUrl={qrCodeUrl}
                secret={secret}
                onStart={() => startAuthenticatorSetup("user@example.com")}
                onVerify={async (code) => {
                    await verifyMethod("authenticator", code)
                    setStep("manage")
                }}
                onBack={() => setStep("manage")}
            />
        )

    const activeCount = Object.values(methods).filter(
        (v) => v === "verified"
    ).length

    return (
        <div className="space-y-4">
            <MethodRow
                title="Email"
                enabled={methods.email === "verified"}
                onClick={() => setStep("email")}
            />
            <MethodRow
                title="SMS"
                enabled={methods.sms === "verified"}
                onClick={() => setStep("sms")}
            />
            <MethodRow
                title="Backup Codes"
                enabled={methods.backupCodes === "verified"}
                onClick={() => setStep("backup")}
            />
            <MethodRow
                title="Authenticator App"
                enabled={methods.authenticator === "verified"}
                onClick={() => setStep("app")}
            />

            <Button
                disabled={activeCount < 3}
                className="w-full mt-4"
                onClick={() => {
                    activate()
                    onClose()
                }}
            >
                Activate
            </Button>
        </div>
    )
}

function MethodRow({
    title,
    enabled,
    onClick,
}: {
    title: string
    enabled: boolean
    onClick: () => void
}) {
    return (
        <div className="flex justify-between border p-3 rounded">
            <span>{title}</span>
            {!enabled && (
                <Button size="sm" onClick={onClick}>
                    Enable
                </Button>
            )}
            {enabled && (
                <span className="text-green-600 text-sm">
                    Enabled
                </span>
            )}
        </div>
    )
}