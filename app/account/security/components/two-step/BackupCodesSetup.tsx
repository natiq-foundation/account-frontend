"use client"

import { Button } from "@/components/ui/button"

interface Props {
    onSuccess: () => void
    onBack: () => void
}

export function BackupCodesSetup({ onSuccess, onBack }: Props) {
    const codes = [
        "ABCD-1234",
        "EFGH-5678",
        "IJKL-9012",
        "MNOP-3456",
        "QRST-7890",
        "UVWX-1122",
        "YZAB-3344",
        "CDEF-5566",
        "GHIJ-7788",
        "KLMN-9900",
    ]

    return (
        <div className="space-y-4">
            <p className="text-sm">
                Print a list of codes to keep with you that you can enter to sign in.
                Keep these backup codes somewhere safe but accessible.
            </p>

            <div className="grid grid-cols-2 gap-2 font-mono text-sm border rounded p-4">
                {codes.map((c) => (
                    <div key={c}>{c}</div>
                ))}
            </div>

            <div className="flex gap-2">
                <Button variant="outline" className="w-full">
                    Download
                </Button>
                <Button variant="outline" className="w-full">
                    Print
                </Button>
            </div>

            <Button className="w-full" onClick={onSuccess}>
                Done
            </Button>

            <Button variant="ghost" className="w-full" onClick={onBack}>
                Back
            </Button>
        </div>
    )
}