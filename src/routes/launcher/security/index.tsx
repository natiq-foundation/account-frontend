// src/pages/settings/SecurityPage.tsx
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { LastActivityList } from "@/components/modules/security/LastActivityList";
import { PhoneManagementDialog } from "@/components/modules/security/PhoneManagementDialog";
import type { PhoneItem } from "@/components/modules/security/PhoneManagementDialog";
import { ResetPasswordFlowDialog } from "@/components/modules/security/ResetPasswordFlowDialog";
import { SecurityRow } from "@/components/modules/security/SecurityRow";
import { SecuritySection } from "@/components/modules/security/SecuritySection";

import { ActiveSessionsDialog } from "@/components/features/security/ActiveSessionsDialog";
import { EmailManagementDialog } from "@/components/features/security/emailManagementDialog";
import type { EmailItem } from "@/components/features/security/emailManagementDialog";
import { RecoveryCodesDialog } from "@/components/features/security/RecoveryCodesDialog";
import { SetupAuthenticatorDialog } from "@/components/features/security/SetupAuthenticatorDialog";
import { TwoStepVerificationSection } from "@/components/features/security/TwoStepVerificationSection";

export interface ActivityItem {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly date: string;
}

const INITIAL_EMAILS: readonly EmailItem[] = [
    {
        id: "email-1",
        address: "amir.work@company.com",
        isPrimary: true,
        isVerified: true,
        notificationsEnabled: true,
    },
    {
        id: "email-2",
        address: "amjrhosseinhemmt@gmail.com",
        isPrimary: false,
        isVerified: false,
        notificationsEnabled: false,
    },
];

const INITIAL_PHONES: readonly PhoneItem[] = [
    {
        id: "phone-1",
        number: "+98 912 345 6789",
        isPrimary: true,
        isVerified: true,
    },
];

const INITIAL_ACTIVITIES: readonly ActivityItem[] = [
    {
        id: "activity-1",
        title: "Security settings viewed",
        description: "You opened your account security settings.",
        date: "Just now",
    },
    {
        id: "activity-2",
        title: "Signed in to your account",
        description:
            "A successful sign-in was detected from your current device.",
        date: "Today",
    },
    {
        id: "activity-3",
        title: "Password changed",
        description: "Your account password was changed successfully.",
        date: "Aug 24, 2026",
    },
];

const SecurityPage = () => {
    const [emails, setEmails] = useState<EmailItem[]>([...INITIAL_EMAILS]);
    const [phones, setPhones] = useState<PhoneItem[]>([...INITIAL_PHONES]);
    const [activities, setActivities] = useState<ActivityItem[]>([
        ...INITIAL_ACTIVITIES,
    ]);
    const [passwordLastChanged, setPasswordLastChanged] =
        useState<string>("Aug 24, 2026");

    const [isEmailDialogOpen, setIsEmailDialogOpen] = useState<boolean>(false);
    const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState<boolean>(false);
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] =
        useState<boolean>(false);
    const [isActiveSessionsDialogOpen, setIsActiveSessionsDialogOpen] =
        useState<boolean>(false);

    const [isTwoFactorEnabled, setIsTwoFactorEnabled] =
        useState<boolean>(false);
    const [isAuthenticatorDialogOpen, setIsAuthenticatorDialogOpen] =
        useState<boolean>(false);
    const [isRecoveryCodesDialogOpen, setIsRecoveryCodesDialogOpen] =
        useState<boolean>(false);
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

    const isRecoveryConfigured = recoveryCodes.length > 0;

    const primaryEmail =
        emails.find((e) => e.isPrimary)?.address || emails[0]?.address || "";
    const primaryPhone =
        phones.find((p) => p.isPrimary)?.number || phones[0]?.number || "";

    const handleAddEmail = (newAddress: string) => {
        const newEntry: EmailItem = {
            id: `email-${Date.now()}`,
            address: newAddress,
            isPrimary: emails.length === 0,
            isVerified: false,
            notificationsEnabled: false,
        };
        setEmails((prev) => [...prev, newEntry]);
        setActivities((prev) => [
            {
                id: `activity-${Date.now()}`,
                title: "New email added",
                description: `Added ${newAddress} as a secondary email address.`,
                date: "Just now",
            },
            ...prev,
        ]);
    };

    const handleRemoveEmail = (id: string) => {
        const emailToRemove = emails.find((e) => e.id === id);
        setEmails((prev) => prev.filter((e) => e.id !== id));
        if (emailToRemove) {
            setActivities((prev) => [
                {
                    id: `activity-${Date.now()}`,
                    title: "Email removed",
                    description: `Removed ${emailToRemove.address} from your account.`,
                    date: "Just now",
                },
                ...prev,
            ]);
        }
    };

    const handleSetPrimaryEmail = (id: string) => {
        setEmails((prev) =>
            prev.map((e) => ({
                ...e,
                isPrimary: e.id === id,
            })),
        );
    };

    const handleToggleNotifications = (id: string) => {
        setEmails((prev) =>
            prev.map((e) =>
                e.id === id
                    ? { ...e, notificationsEnabled: !e.notificationsEnabled }
                    : e,
            ),
        );
    };

    const handleResendVerificationEmail = (id: string) => {
        setTimeout(() => {
            setEmails((prev) =>
                prev.map((e) => (e.id === id ? { ...e, isVerified: true } : e)),
            );
        }, 1200);
    };

    const handleAddPhone = (newNumber: string) => {
        const newEntry: PhoneItem = {
            id: `phone-${Date.now()}`,
            number: newNumber,
            isPrimary: phones.length === 0,
            isVerified: false,
        };
        setPhones((prev) => [...prev, newEntry]);
        setActivities((prev) => [
            {
                id: `activity-${Date.now()}`,
                title: "Phone number added",
                description: `Added ${newNumber} to your account.`,
                date: "Just now",
            },
            ...prev,
        ]);
    };

    const handleRemovePhone = (id: string) => {
        const phoneToRemove = phones.find((p) => p.id === id);
        setPhones((prev) => prev.filter((p) => p.id !== id));
        if (phoneToRemove) {
            setActivities((prev) => [
                {
                    id: `activity-${Date.now()}`,
                    title: "Phone number removed",
                    description: `Removed ${phoneToRemove.number} from your account.`,
                    date: "Just now",
                },
                ...prev,
            ]);
        }
    };

    const handleSetPrimaryPhone = (id: string) => {
        setPhones((prev) =>
            prev.map((p) => ({
                ...p,
                isPrimary: p.id === id,
            })),
        );
    };

    const handleVerifyPhone = (id: string) => {
        setPhones((prev) =>
            prev.map((p) => (p.id === id ? { ...p, isVerified: true } : p)),
        );
        setActivities((prev) => [
            {
                id: `activity-${Date.now()}`,
                title: "Phone number verified",
                description: "Your phone number was verified successfully.",
                date: "Just now",
            },
            ...prev,
        ]);
    };

    const handlePasswordChangeSuccess = () => {
        const formattedDate = new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
        setPasswordLastChanged(formattedDate);
        setActivities((prev) => [
            {
                id: `activity-${Date.now()}`,
                title: "Password changed",
                description: "Your account password was changed successfully.",
                date: "Just now",
            },
            ...prev,
        ]);
    };

    const handleEnable2FA = () => {
        setIsTwoFactorEnabled(true);
        setActivities((prev) => [
            {
                id: `activity-${Date.now()}`,
                title: "Two-step verification enabled",
                description: "Authenticator app was linked to your account.",
                date: "Just now",
            },
            ...prev,
        ]);
    };

    const handleDisable2FA = () => {
        setIsTwoFactorEnabled(false);
        setActivities((prev) => [
            {
                id: `activity-${Date.now()}`,
                title: "Two-step verification disabled",
                description:
                    "Two-step verification was turned off for your account.",
                date: "Just now",
            },
            ...prev,
        ]);
    };

    const handleToggle2FA = () => {
        if (isTwoFactorEnabled) {
            handleDisable2FA();
        } else {
            setIsAuthenticatorDialogOpen(true);
        }
    };

    const handleGenerateRecoveryCodes = (codes: string[]) => {
        setRecoveryCodes(codes);
        setActivities((prev) => [
            {
                id: `activity-${Date.now()}`,
                title: isRecoveryConfigured
                    ? "Recovery codes regenerated"
                    : "Recovery codes configured",
                description: "New backup recovery codes were generated.",
                date: "Just now",
            },
            ...prev,
        ]);
    };

    const handleDisableRecoveryCodes = () => {
        setRecoveryCodes([]);
        setActivities((prev) => [
            {
                id: `activity-${Date.now()}`,
                title: "Recovery codes disabled",
                description:
                    "Backup recovery codes were turned off and invalidated.",
                date: "Just now",
            },
            ...prev,
        ]);
    };

    const activePhoneObj = phones.find((p) => p.isPrimary);

    return (
        <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
            <header className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-100 sm:text-3xl">
                    Security
                </h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
                    Manage your account access, verification methods,
                    notifications, and recent security activity.
                </p>
            </header>

            <div className="space-y-5">
                <SecuritySection
                    title="Email & Phone Numbers"
                    description="Manage the contact methods connected to your account."
                >
                    <SecurityRow
                        title="Email addresses"
                        description={`${primaryEmail || "No primary email"} is your primary email address (${emails.length} total).`}
                        status={
                            <Badge
                                variant="outline"
                                className="rounded-full border-emerald-900/70 bg-emerald-950/50 px-2 py-0.5 text-xs font-medium text-emerald-300 hover:bg-emerald-950/50"
                            >
                                Verified
                            </Badge>
                        }
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEmailDialogOpen(true)}
                                className="w-full rounded-xl border-zinc-700 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 sm:w-auto"
                            >
                                Manage
                            </Button>
                        }
                    />

                    <SecurityRow
                        title="Phone number"
                        description={
                            activePhoneObj
                                ? `${activePhoneObj.number} is your primary phone number (${phones.length} total).`
                                : "No phone number has been added to your account yet."
                        }
                        status={
                            activePhoneObj ? (
                                <Badge
                                    variant="outline"
                                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                        activePhoneObj.isVerified
                                            ? "border-emerald-900/70 bg-emerald-950/50 text-emerald-300 hover:bg-emerald-950/50"
                                            : "border-amber-900/70 bg-amber-950/50 text-amber-300 hover:bg-amber-950/50"
                                    }`}
                                >
                                    {activePhoneObj.isVerified
                                        ? "Verified"
                                        : "Pending"}
                                </Badge>
                            ) : undefined
                        }
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsPhoneDialogOpen(true)}
                                className="w-full rounded-xl border-zinc-700 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 sm:w-auto"
                            >
                                {phones.length > 0 ? "Manage" : "Add phone"}
                            </Button>
                        }
                    />
                </SecuritySection>

                <SecuritySection
                    title="Security"
                    description="Strengthen access protection for your account."
                >
                    <SecurityRow
                        title="Password"
                        description={`Last changed on ${passwordLastChanged}.`}
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsPasswordDialogOpen(true)}
                                className="w-full rounded-xl border-zinc-700 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 sm:w-auto"
                            >
                                Change password
                            </Button>
                        }
                    />

                    <SecurityRow
                        title="Authenticator app"
                        description="Use Google Authenticator, Authy, or Microsoft Authenticator."
                        status={
                            <Badge
                                variant="outline"
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                    isTwoFactorEnabled
                                        ? "border-emerald-900/70 bg-emerald-950/50 text-emerald-300 hover:bg-emerald-950/50"
                                        : "border-zinc-700 bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800/60"
                                }`}
                            >
                                {isTwoFactorEnabled
                                    ? "Configured"
                                    : "Not configured"}
                            </Badge>
                        }
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setIsAuthenticatorDialogOpen(true)
                                }
                                className="w-full rounded-xl border-zinc-700 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 sm:w-auto"
                            >
                                {isTwoFactorEnabled ? "Manage" : "Set up"}
                            </Button>
                        }
                    />

                    <SecurityRow
                        title="Backup codes"
                        description="Keep 10 single-use codes available in case you lose access to your verification method."
                        status={
                            <Badge
                                variant="outline"
                                className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                    isRecoveryConfigured
                                        ? "border-emerald-900/70 bg-emerald-950/50 text-emerald-300 hover:bg-emerald-950/50"
                                        : "border-zinc-700 bg-zinc-800/60 text-zinc-400 hover:bg-zinc-800/60"
                                }`}
                            >
                                {isRecoveryConfigured
                                    ? `${recoveryCodes.length} codes remaining`
                                    : "Not configured"}
                            </Badge>
                        }
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setIsRecoveryCodesDialogOpen(true)
                                }
                                className="w-full rounded-xl border-zinc-700 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 sm:w-auto"
                            >
                                {isRecoveryConfigured ? "Manage" : "Set up"}
                            </Button>
                        }
                    />

                    <SecurityRow
                        title="Active sessions"
                        description="Review the devices currently signed in to your account."
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() =>
                                    setIsActiveSessionsDialogOpen(true)
                                }
                                className="w-full rounded-xl border-zinc-700 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 sm:w-auto"
                            >
                                View sessions
                            </Button>
                        }
                    />
                </SecuritySection>

                <TwoStepVerificationSection
                    isTwoFactorEnabled={isTwoFactorEnabled}
                    isEnabled={isTwoFactorEnabled}
                    onToggle={handleToggle2FA}
                    onDisable={handleDisable2FA}
                    isRecoveryConfigured={isRecoveryConfigured}
                    recoveryCodesCount={recoveryCodes.length}
                    backupCodesCount={recoveryCodes.length}
                    onOpenAuthenticatorDialog={() =>
                        setIsAuthenticatorDialogOpen(true)
                    }
                    onOpenRecoveryCodesDialog={() =>
                        setIsRecoveryCodesDialogOpen(true)
                    }
                    onManageApp={() => setIsAuthenticatorDialogOpen(true)}
                    onManageBackupCodes={() =>
                        setIsRecoveryCodesDialogOpen(true)
                    }
                />

                <SecuritySection
                    title="Security Notifications"
                    description="Choose how you want to receive security-related account alerts."
                >
                    <SecurityRow
                        title="Security email alerts"
                        description="Important security emails are always sent to your primary email address."
                        status={
                            <Badge
                                variant="outline"
                                className="rounded-full border-zinc-700 bg-zinc-800 px-2 py-0.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
                            >
                                Always on
                            </Badge>
                        }
                    />

                    <SecurityRow
                        title="Optional email notifications"
                        description="Control optional account updates separately for each verified email address."
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsEmailDialogOpen(true)}
                                className="w-full rounded-xl border-zinc-700 bg-transparent px-4 py-2.5 text-sm font-medium text-zinc-100 hover:border-zinc-500 hover:bg-zinc-800 hover:text-zinc-100 sm:w-auto"
                            >
                                Manage emails
                            </Button>
                        }
                    />
                </SecuritySection>

                <SecuritySection
                    title="Last Activity"
                    description="Recent security-related actions on your account."
                >
                    <LastActivityList activities={activities} />
                </SecuritySection>
            </div>

            <EmailManagementDialog
                isOpen={isEmailDialogOpen}
                onClose={() => setIsEmailDialogOpen(false)}
                emails={emails}
                onAddEmail={handleAddEmail}
                onRemoveEmail={handleRemoveEmail}
                onSetPrimary={handleSetPrimaryEmail}
                onToggleNotifications={handleToggleNotifications}
                onResendVerification={handleResendVerificationEmail}
            />

            <PhoneManagementDialog
                isOpen={isPhoneDialogOpen}
                onClose={() => setIsPhoneDialogOpen(false)}
                phones={phones}
                onAddPhone={handleAddPhone}
                onRemovePhone={handleRemovePhone}
                onSetPrimary={handleSetPrimaryPhone}
                onVerifyPhone={handleVerifyPhone}
            />

            <ResetPasswordFlowDialog
                isOpen={isPasswordDialogOpen}
                onClose={() => setIsPasswordDialogOpen(false)}
                userEmail={primaryEmail}
                userPhone={primaryPhone}
                onPasswordUpdated={handlePasswordChangeSuccess}
            />

            <ActiveSessionsDialog
                isOpen={isActiveSessionsDialogOpen}
                onClose={() => setIsActiveSessionsDialogOpen(false)}
            />

            <SetupAuthenticatorDialog
                isOpen={isAuthenticatorDialogOpen}
                onClose={() => setIsAuthenticatorDialogOpen(false)}
                onSuccess={handleEnable2FA}
                userEmail={primaryEmail}
                userPhone={primaryPhone}
            />

            <RecoveryCodesDialog
                isOpen={isRecoveryCodesDialogOpen}
                onClose={() => setIsRecoveryCodesDialogOpen(false)}
                userEmail={primaryEmail}
                userPhone={primaryPhone}
                isConfigured={isRecoveryConfigured}
                onGenerate={handleGenerateRecoveryCodes}
                onDelete={handleDisableRecoveryCodes}
            />
        </main>
    );
};

export default SecurityPage;
