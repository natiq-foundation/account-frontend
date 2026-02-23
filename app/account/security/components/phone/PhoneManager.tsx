"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { usePhoneManager } from "@/features/security/phone/hooks/usePhoneManager";

export function PhoneManager() {
    const {
        phones,
        loading,
        removePhone,
        setPrimary,
        startPhoneVerification,
        confirmPhone,
        pendingNumber,
    } = usePhoneManager();

    const [newPhone, setNewPhone] = useState("");
    const [codeInput, setCodeInput] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="space-y-4">
            <h2 className="text-lg font-semibold">Phone Numbers</h2>

            {/* Phone List */}
            {phones.map((p) => (
                <div
                    key={p.id}
                    className="border rounded-lg p-3 flex justify-between items-center"
                >
                    <div>
                        <p className="font-medium">{p.number}</p>
                        <div className="text-sm text-gray-500">
                            {p.primary ? "Primary" : "Verified"}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        {!p.primary && (
                            <Button size="sm" variant="outline" onClick={() => setPrimary(p.id)}>
                                Make Primary
                            </Button>
                        )}
                        {!p.primary && (
                            <Button size="sm" variant="destructive" onClick={() => removePhone(p.id)}>
                                Remove
                            </Button>
                        )}
                    </div>
                </div>
            ))}

            {/* Add Phone */}
            {!pendingNumber && (
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add new phone"
                        value={newPhone}
                        onChange={(e) => setNewPhone(e.target.value)}
                        className="border p-2 rounded flex-1"
                    />
                    <Button
                        onClick={() => {
                            startPhoneVerification(newPhone);
                            setNewPhone("");
                        }}
                        disabled={!newPhone || loading}
                    >
                        Send Code
                    </Button>
                </div>
            )}

            {/* Verify Code */}
            {pendingNumber && (
                <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                        Enter verification code sent to {pendingNumber}
                    </p>

                    <div className="flex gap-2">
                        <input
                            type="text"
                            placeholder="6-digit code"
                            value={codeInput}
                            onChange={(e) => setCodeInput(e.target.value)}
                            className="border p-2 rounded flex-1"
                        />
                        <Button
                            onClick={async () => {
                                const success = await confirmPhone(codeInput);
                                if (!success) {
                                    setError("Invalid verification code");
                                } else {
                                    setCodeInput("");
                                    setError("");
                                }
                            }}
                        >
                            Verify
                        </Button>
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                </div>
            )}
        </div>
    );
}