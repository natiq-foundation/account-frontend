"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
    onSuccess: () => void
    onBack: () => void
}

export function SmsSetup({ onSuccess, onBack }: Props) {
    const [code, setCode] = useState("")

    const verify = () => {
        if (!code) return
        onSuccess()
    }

    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
                We sent a verification code to your primary phone number.
                Enter it below.
            </p>

            <Input
                placeholder="Enter SMS code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
            />

            <Button className="w-full" onClick={verify}>
                Verify & Enable
            </Button>

            <Button variant="ghost" className="w-full" onClick={onBack}>
                Back
            </Button>
        </div>
    )
}