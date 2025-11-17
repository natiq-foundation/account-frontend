"use client";

import { SecurityItem } from "@/components/security/SecurityItem";
import { SecuritySection } from "@/components/security/SecuritySection";
import { SecurityActivity } from "@/components/security/SecurityActivity";
import { SecurityNotificationItem } from "@/components/security/SecurityNotification";

import { Smartphone, Shield, KeyRound, } from "lucide-react";

export default function SecurityPage() {
    return (
        <div className="w-full max-w-3xl mx-auto space-y-10 px-4 py-6">

            <SecuritySection title="Email & Phone Numbers">
                <SecurityItem
                    label="Email"
                    value="example@example.com"
                    onClick={() => { }}
                />
                <SecurityItem
                    label="Phone Number"
                    value="+123456789"
                    onClick={() => { }}
                />
            </SecuritySection>

            <SecuritySection title="Security">
                <SecurityItem label="Change Password" onClick={() => { }} />
                <SecurityItem label="Two-Step Verify Code" onClick={() => { }} />
                <SecurityItem label="Authenticator App" onClick={() => { }} />
                <SecurityItem label="Recovery Codes" onClick={() => { }} />
            </SecuritySection>

            <SecuritySection title="Security Notifications">
                <SecurityNotificationItem />
            </SecuritySection>

            <SecuritySection title="Active Sessions">
                <SecurityItem
                    label="Active Sessions"
                    value="2 devices"
                    onClick={() => { }}
                />
            </SecuritySection>

            <SecuritySection title="Last Activity">
                <div className="rounded-lg border">
                    <SecurityActivity
                        icon={Smartphone}
                        title="Login from mobile"
                        subtitle="Aug 15, 2024 · IP 123.45.67.89"
                    />
                    <SecurityActivity
                        icon={Shield}
                        title="New device authorized"
                        subtitle="Aug 16, 2024 · IP 99.22.11.4"
                    />
                    <SecurityActivity
                        icon={KeyRound}
                        title="Password Changed"
                        subtitle="Aug 17, 2024 · IP 54.201.12.4"
                    />
                </div>
            </SecuritySection>
        </div>
    );
}
