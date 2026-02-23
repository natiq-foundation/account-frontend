"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
    onSuccess: () => void
    onBack: () => void
}

export function EmailSetup({ onSuccess, onBack }: Props) {
    const [code, setCode] = useState("")

    const verify = () => {
        if (!code) return
        onSuccess()
    }

    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
                We sent a verification code to your primary email address.
                Enter the code below to confirm.
            </p>

            <Input
                placeholder="Enter verification code"
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