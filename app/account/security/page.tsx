"use client";

import { useState } from "react";
import { SecurityItem } from "@/app/account/security/components/SecurityItem";
import { SecuritySection } from "@/app/account/security/components/SecuritySection";
import { SecurityActivity } from "@/app/account/security/components/SecurityActivity";
import { SecurityNotificationItem } from "@/app/account/security/components/SecurityNotification";
import { EmailManager } from "@/app/account/security/components/email/EmailManager";
import { PhoneManager } from "@/app/account/security/components/phone/PhoneManager";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Smartphone, Shield, KeyRound } from "lucide-react";

export default function SecurityPage() {
    const [openEmailDialog, setOpenEmailDialog] = useState(false);
    const [openPhoneDialog, setOpenPhoneDialog] = useState(false);

    return (
        <div className="w-full max-w-3xl mx-auto space-y-10 px-4 py-6">

            {/* ================= EMAIL & PHONE ================= */}
            <SecuritySection title="Email & Phone Numbers">

                {/* Email */}
                <SecurityItem
                    label="Email"
                    value="example@example.com"
                    onClick={() => setOpenEmailDialog(true)}
                />

                {/* Phone */}
                <SecurityItem
                    label="Phone Number"
                    value="+123456789"
                    onClick={() => setOpenPhoneDialog(true)}
                />

                {/* Email Dialog */}
                <Dialog open={openEmailDialog} onOpenChange={setOpenEmailDialog}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Email Management</DialogTitle>
                        </DialogHeader>
                        <EmailManager />
                    </DialogContent>
                </Dialog>

                {/* Phone Dialog */}
                <Dialog open={openPhoneDialog} onOpenChange={setOpenPhoneDialog}>
                    <DialogContent className="max-w-lg">
                        <DialogHeader>
                            <DialogTitle>Phone Management</DialogTitle>
                        </DialogHeader>
                        <PhoneManager onClose={() => setOpenPhoneDialog(false)} />
                    </DialogContent>
                </Dialog>


            </SecuritySection>

            {/* ================= SECURITY SETTINGS ================= */}
            <SecuritySection title="Security">
                <SecurityItem label="Change Password" onClick={() => { }} />
                <SecurityItem label="Two-Step Verification" onClick={() => { }} />
                <SecurityItem label="Authenticator App" onClick={() => { }} />
                <SecurityItem label="Recovery Codes" onClick={() => { }} />
            </SecuritySection>

            {/* ================= SECURITY NOTIFICATIONS ================= */}
            <SecuritySection title="Security Notifications">
                <SecurityNotificationItem />
            </SecuritySection>

            {/* ================= ACTIVE SESSIONS ================= */}
            <SecuritySection title="Active Sessions">
                <SecurityItem
                    label="Active Sessions"
                    value="2 devices"
                    onClick={() => { }}
                />
            </SecuritySection>

            {/* ================= LAST ACTIVITY ================= */}
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
