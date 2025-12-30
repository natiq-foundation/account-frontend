"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BackupCodes() {
    const [codes, setCodes] = useState<string[]>([]);

    const generateCodes = () => {
        const newCodes = Array.from({ length: 10 }).map(() =>
            Math.random().toString(36).slice(2, 10).toUpperCase()
        );
        setCodes(newCodes);
    };

    const downloadCodes = () => {
        const text = codes.join("\n");
        const blob = new Blob([text], { type: "text/plain" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "backup-codes.txt";
        a.click();
    };

    return (
        <div className="space-y-4 p-4">
            <h2 className="text-lg font-bold">Backup Codes</h2>

            <p className="text-sm text-gray-600">
                Use these codes if you lose access to your authenticator app.
            </p>

            <Button onClick={generateCodes}>
                Generate New Codes
            </Button>

            {codes.length > 0 && (
                <div className="mt-4 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        {codes.map((c, i) => (
                            <div
                                key={i}
                                className="font-mono text-sm p-2 border rounded bg-gray-100 text-black"
                            >
                                {c}
                            </div>
                        ))}
                    </div>

                    <Button variant="secondary" onClick={downloadCodes}>
                        Download Codes
                    </Button>
                </div>
            )}
        </div>
    );
}
