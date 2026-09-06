// src/pages/settings/SecurityPage.tsx

import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { LastActivityList } from "@/components/modules/security/LastActivityList";
import {
    PhoneManagementDialog,
    type PhoneItem,
} from "@/components/modules/security/PhoneManagementDialog";
import { ResetPasswordFlowDialog } from "@/components/modules/security/ResetPasswordFlowDialog";
import { SecurityRow } from "@/components/modules/security/SecurityRow";
import { SecuritySection } from "@/components/modules/security/SecuritySection";

import { ActiveSessionsDialog } from "@/components/features/security/ActiveSessionsDialog";
import {
    EmailManagementDialog,
    type EmailItem,
} from "@/components/features/security/emailManagementDialog";
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

const ACTION_BUTTON_CLASS = "w-full sm:w-auto";

const SecurityPage = () => {
    const [emails, setEmails] = useState<EmailItem[]>([...INITIAL_EMAILS]);
    const [phones, setPhones] = useState<PhoneItem[]>([...INITIAL_PHONES]);
    const [activities, setActivities] = useState<ActivityItem[]>([
        ...INITIAL_ACTIVITIES,
    ]);
    const [passwordLastChanged, setPasswordLastChanged] =
        useState<string>("Aug 24, 2026");

    const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
    const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
    const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
    const [isActiveSessionsDialogOpen, setIsActiveSessionsDialogOpen] =
        useState(false);

    const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
    const [isAuthenticatorDialogOpen, setIsAuthenticatorDialogOpen] =
        useState(false);
    const [isRecoveryCodesDialogOpen, setIsRecoveryCodesDialogOpen] =
        useState(false);
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);

    const isRecoveryConfigured = recoveryCodes.length > 0;

    const primaryEmail =
        emails.find((email) => email.isPrimary)?.address ||
        emails[0]?.address ||
        "";

    const primaryPhone =
        phones.find((phone) => phone.isPrimary)?.number ||
        phones[0]?.number ||
        "";

    const activePhone = phones.find((phone) => phone.isPrimary);

    const handleAddEmail = (newAddress: string) => {
        const newEntry: EmailItem = {
            id: `email-${Date.now()}`,
            address: newAddress,
            isPrimary: emails.length === 0,
            isVerified: false,
            notificationsEnabled: false,
        };

        setEmails((previousEmails) => [...previousEmails, newEntry]);

        setActivities((previousActivities) => [
            {
                id: `activity-${Date.now()}`,
                title: "New email added",
                description: `Added ${newAddress} as a secondary email address.`,
                date: "Just now",
            },
            ...previousActivities,
        ]);
    };

    const handleRemoveEmail = (id: string) => {
        const emailToRemove = emails.find((email) => email.id === id);

        setEmails((previousEmails) =>
            previousEmails.filter((email) => email.id !== id),
        );

        if (!emailToRemove) {
            return;
        }

        setActivities((previousActivities) => [
            {
                id: `activity-${Date.now()}`,
                title: "Email removed",
                description: `Removed ${emailToRemove.address} from your account.`,
                date: "Just now",
            },
            ...previousActivities,
        ]);
    };

    const handleSetPrimaryEmail = (id: string) => {
        setEmails((previousEmails) =>
            previousEmails.map((email) => ({
                ...email,
                isPrimary: email.id === id,
            })),
        );
    };

    const handleToggleNotifications = (id: string) => {
        setEmails((previousEmails) =>
            previousEmails.map((email) =>
                email.id === id
                    ? {
                          ...email,
                          notificationsEnabled:
                              !email.notificationsEnabled,
                      }
                    : email,
            ),
        );
    };

    const handleResendVerificationEmail = (id: string) => {
        setTimeout(() => {
            setEmails((previousEmails) =>
                previousEmails.map((email) =>
                    email.id === id
                        ? {
                              ...email,
                              isVerified: true,
                          }
                        : email,
                ),
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

        setPhones((previousPhones) => [...previousPhones, newEntry]);

        setActivities((previousActivities) => [
            {
                id: `activity-${Date.now()}`,
                title: "Phone number added",
                description: `Added ${newNumber} to your account.`,
                date: "Just now",
            },
            ...previousActivities,
        ]);
    };

    const handleRemovePhone = (id: string) => {
        const phoneToRemove = phones.find((phone) => phone.id === id);

        setPhones((previousPhones) =>
            previousPhones.filter((phone) => phone.id !== id),
        );

        if (!phoneToRemove) {
            return;
        }

        setActivities((previousActivities) => [
            {
                id: `activity-${Date.now()}`,
                title: "Phone number removed",
                description: `Removed ${phoneToRemove.number} from your account.`,
                date: "Just now",
            },
            ...previousActivities,
        ]);
    };

    const handleSetPrimaryPhone = (id: string) => {
        setPhones((previousPhones) =>
            previousPhones.map((phone) => ({
                ...phone,
                isPrimary: phone.id === id,
            })),
        );
    };

    const handleVerifyPhone = (id: string) => {
        setPhones((previousPhones) =>
            previousPhones.map((phone) =>
                phone.id === id
                    ? {
                          ...phone,
                          isVerified: true,
                      }
                    : phone,
            ),
        );

        setActivities((previousActivities) => [
            {
                id: `activity-${Date.now()}`,
                title: "Phone number verified",
                description: "Your phone number was verified successfully.",
                date: "Just now",
            },
            ...previousActivities,
        ]);
    };

    const handlePasswordChangeSuccess = () => {
        const formattedDate = new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });

        setPasswordLastChanged(formattedDate);

        setActivities((previousActivities) => [
            {
                id: `activity-${Date.now()}`,
                title: "Password changed",
                description: "Your account password was changed successfully.",
                date: "Just now",
            },
            ...previousActivities,
        ]);
    };

    const handleEnable2FA = () => {
        setIsTwoFactorEnabled(true);

        setActivities((previousActivities) => [
            {
                id: `activity-${Date.now()}`,
                title: "Two-step verification enabled",
                description: "Authenticator app was linked to your account.",
                date: "Just now",
            },
            ...previousActivities,
        ]);
    };

    const handleDisable2FA = () => {
        setIsTwoFactorEnabled(false);

        setActivities((previousActivities) => [
            {
                id: `activity-${Date.now()}`,
                title: "Two-step verification disabled",
                description:
                    "Two-step verification was turned off for your account.",
                date: "Just now",
            },
            ...previousActivities,
        ]);
    };

    const handleToggle2FA = () => {
        if (isTwoFactorEnabled) {
            handleDisable2FA();
            return;
        }

        setIsAuthenticatorDialogOpen(true);
    };

    const handleGenerateRecoveryCodes = (codes: string[]) => {
        const wasAlreadyConfigured = recoveryCodes.length > 0;

        setRecoveryCodes(codes);

        setActivities((previousActivities) => [
            {
                id: `activity-${Date.now()}`,
                title: wasAlreadyConfigured
                    ? "Recovery codes regenerated"
                    : "Recovery codes configured",
                description: "New backup recovery codes were generated.",
                date: "Just now",
            },
            ...previousActivities,
        ]);
    };

    const handleDisableRecoveryCodes = () => {
        setRecoveryCodes([]);

        setActivities((previousActivities) => [
            {
                id: `activity-${Date.now()}`,
                title: "Recovery codes disabled",
                description:
                    "Backup recovery codes were turned off and invalidated.",
                date: "Just now",
            },
            ...previousActivities,
        ]);
    };

    return (
        <main className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-10">
            <header className="mb-8">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    Security
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
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
                            <Badge variant="secondary">
                                Verified
                            </Badge>
                        }
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                className={ACTION_BUTTON_CLASS}
                                onClick={() => setIsEmailDialogOpen(true)}
                            >
                                Manage
                            </Button>
                        }
                    />

                    <SecurityRow
                        title="Phone number"
                        description={
                            activePhone
                                ? `${activePhone.number} is your primary phone number (${phones.length} total).`
                                : "No phone number has been added to your account yet."
                        }
                        status={
                            activePhone ? (
                                <Badge
                                    variant={
                                        activePhone.isVerified
                                            ? "secondary"
                                            : "outline"
                                    }
                                >
                                    {activePhone.isVerified
                                        ? "Verified"
                                        : "Pending"}
                                </Badge>
                            ) : undefined
                        }
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                className={ACTION_BUTTON_CLASS}
                                onClick={() => setIsPhoneDialogOpen(true)}
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
                                className={ACTION_BUTTON_CLASS}
                                onClick={() =>
                                    setIsPasswordDialogOpen(true)
                                }
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
                                variant={
                                    isTwoFactorEnabled
                                        ? "secondary"
                                        : "outline"
                                }
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
                                className={ACTION_BUTTON_CLASS}
                                onClick={() =>
                                    setIsAuthenticatorDialogOpen(true)
                                }
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
                                variant={
                                    isRecoveryConfigured
                                        ? "secondary"
                                        : "outline"
                                }
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
                                className={ACTION_BUTTON_CLASS}
                                onClick={() =>
                                    setIsRecoveryCodesDialogOpen(true)
                                }
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
                                className={ACTION_BUTTON_CLASS}
                                onClick={() =>
                                    setIsActiveSessionsDialogOpen(true)
                                }
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
                    onManageApp={() =>
                        setIsAuthenticatorDialogOpen(true)
                    }
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
                        status={<Badge variant="secondary">Always on</Badge>}
                    />

                    <SecurityRow
                        title="Optional email notifications"
                        description="Control optional account updates separately for each verified email address."
                        action={
                            <Button
                                type="button"
                                variant="outline"
                                className={ACTION_BUTTON_CLASS}
                                onClick={() => setIsEmailDialogOpen(true)}
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
