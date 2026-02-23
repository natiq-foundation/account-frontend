"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Smartphone, Shield, KeyRound } from "lucide-react"

import { SecurityItem } from "@/app/account/security/components/SecurityItem"
import { SecuritySection } from "@/app/account/security/components/SecuritySection"
import { SecurityActivity } from "@/app/account/security/components/SecurityActivity"
import { SecurityNotificationItem } from "@/app/account/security/components/SecurityNotification"

import { EmailManager } from "@/app/account/security/components/email/EmailManager"
import { PhoneManager } from "@/app/account/security/components/phone/PhoneManager"
import { ChangePasswordDialog } from "@/app/account/security/components/passwords/Changepassword"
import { TwoStepManager } from "@/app/account/security/components/two-step/TwoStepManager"
import { ActiveSessionsManager } from "@/app/account/security/components/sessions/ActiveSessionsManager"

export default function SecurityPage() {
    const [openEmail, setOpenEmail] = useState(false)
    const [openPhone, setOpenPhone] = useState(false)
    const [openPassword, setOpenPassword] = useState(false)
    const [openTwoStep, setOpenTwoStep] = useState(false)
    const [openSessions, setOpenSessions] = useState(false)

    return (
        <div className="w-full max-w-3xl mx-auto space-y-12 px-4 py-8">

            {/* ================= HEADER ================= */}
            <div className="space-y-1">
                <h1 className="text-2xl font-bold">Security</h1>
                <p className="text-sm text-muted-foreground">
                    Manage your account authentication methods and activity.
                </p>
            </div>

            {/* ================= EMAIL & PHONE ================= */}
            <SecuritySection title="Email & Phone Numbers">
                <SecurityItem
                    label="Email"
                    value="example@example.com"
                    onClick={() => setOpenEmail(true)}
                />
                <SecurityItem
                    label="Phone Number"
                    value="+123456789"
                    onClick={() => setOpenPhone(true)}
                />
            </SecuritySection>

            {/* Email Dialog */}
            <Dialog open={openEmail} onOpenChange={setOpenEmail}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Email Management</DialogTitle>
                    </DialogHeader>
                    <EmailManager />
                </DialogContent>
            </Dialog>

            {/* Phone Dialog */}
            <Dialog open={openPhone} onOpenChange={setOpenPhone}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>Phone Management</DialogTitle>
                    </DialogHeader>
                    <PhoneManager />
                </DialogContent>
            </Dialog>

            {/* ================= SECURITY SETTINGS ================= */}
            <SecuritySection title="Security">
                <SecurityItem
                    label="Change Password"
                    onClick={() => setOpenPassword(true)}
                />
                <SecurityItem
                    label="Two-Step Verification"
                    value="Authenticator • Backup Codes"
                    onClick={() => setOpenTwoStep(true)}
                />
                <SecurityItem
                    label="Active Sessions"
                    value="2 devices"
                    onClick={() => setOpenSessions(true)}
                />
            </SecuritySection>

            {/* Change Password Dialog */}
            <Dialog open={openPassword} onOpenChange={setOpenPassword}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                    </DialogHeader>
                    <ChangePasswordDialog onSuccess={() => setOpenPassword(false)} />
                </DialogContent>
            </Dialog>

            {/* Two-Step Verification Dialog */}
            <Dialog open={openTwoStep} onOpenChange={setOpenTwoStep}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Two-Step Verification</DialogTitle>
                    </DialogHeader>
                    <TwoStepManager
                        onClose={() => setOpenTwoStep(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* Active Sessions Dialog */}
            <Dialog open={openSessions} onOpenChange={setOpenSessions}>
                <DialogContent className="max-w-xl">
                    <DialogHeader>
                        <DialogTitle>Active Sessions</DialogTitle>
                    </DialogHeader>
                    <ActiveSessionsManager />
                </DialogContent>
            </Dialog>

            {/* ================= SECURITY NOTIFICATIONS ================= */}
            <SecuritySection title="Security Notifications">
                <SecurityNotificationItem />
            </SecuritySection>

            {/* ================= LAST ACTIVITY ================= */}
            <SecuritySection title="Last Activity">
                <div className="rounded-lg border divide-y">
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
                        title="Password changed"
                        subtitle="Aug 17, 2024 · IP 54.201.12.4"
                    />
                </div>
            </SecuritySection>

        </div>
    )
}
