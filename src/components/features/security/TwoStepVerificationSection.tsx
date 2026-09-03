// src/components/features/security/TwoStepVerificationSection.tsx
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    KeyRound,
    ShieldCheck,
    ShieldAlert,
    CheckCircle2,
    MinusCircle,
    Smartphone,
} from "lucide-react";
import { SecurityRow } from "@/components/modules/security/SecurityRow";
import { SecuritySection } from "@/components/modules/security/SecuritySection";

export interface TwoStepVerificationSectionProps {
    readonly isTwoFactorEnabled: boolean;
    readonly isRecoveryConfigured?: boolean;
    readonly recoveryCodesCount?: number;
    readonly onToggle: () => void;
}

export const TwoStepVerificationSection: React.FC<
    TwoStepVerificationSectionProps
> = ({
    isTwoFactorEnabled,
    isRecoveryConfigured = false,
    recoveryCodesCount = 0,
    onToggle,
}) => {
    return (
        <SecuritySection
            title="Two-Step Verification"
            description="Protect your account with an extra verification step during sign in."
        >
            <SecurityRow
                title="2-Step Verification"
                description={
                    isTwoFactorEnabled
                        ? "2-Step verification is active and protecting your account."
                        : "Turn on two-step verification to protect your account with SMS / Email confirmation."
                }
                status={
                    <Badge
                        variant="outline"
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors ${
                            isTwoFactorEnabled
                                ? "border-emerald-800/80 bg-emerald-950/40 text-emerald-300"
                                : "border-zinc-800 bg-zinc-900 text-zinc-400"
                        }`}
                    >
                        {isTwoFactorEnabled ? (
                            <ShieldCheck className="mr-1.5 h-3.5 w-3.5 text-emerald-400" />
                        ) : (
                            <ShieldAlert className="mr-1.5 h-3.5 w-3.5 text-zinc-400" />
                        )}
                        {isTwoFactorEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                }
                action={
                    <div
                        className="flex items-center"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Switch
                            checked={isTwoFactorEnabled}
                            onCheckedChange={onToggle}
                        />
                    </div>
                }
            />

            <SecurityRow
                title="Security verification method"
                description="Receive one-time passcodes via SMS or verified email on each sign-in attempt."
                status={
                    <Badge
                        variant="outline"
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-all ${
                            isTwoFactorEnabled
                                ? "border-emerald-800/80 bg-emerald-950/40 text-emerald-300"
                                : "border-zinc-800 bg-zinc-900 text-zinc-400"
                        }`}
                    >
                        <Smartphone className="mr-1.5 h-3.5 w-3.5" />
                        {isTwoFactorEnabled
                            ? "Active & Linked"
                            : "Not configured"}
                    </Badge>
                }
                action={
                    <div className="flex select-none items-center text-xs font-medium">
                        {isTwoFactorEnabled ? (
                            <span className="flex items-center text-emerald-400">
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                                Enabled
                            </span>
                        ) : (
                            <span className="flex items-center text-zinc-500">
                                <MinusCircle className="mr-1 h-4 w-4" />
                                Inactive
                            </span>
                        )}
                    </div>
                }
            />

            <SecurityRow
                title="Backup recovery codes"
                description="Emergency recovery codes to access your account if your device is unavailable."
                status={
                    <Badge
                        variant="outline"
                        className={`rounded-full px-2.5 py-0.5 text-xs font-medium transition-all ${
                            isTwoFactorEnabled
                                ? "border-emerald-800/80 bg-emerald-950/40 text-emerald-300"
                                : "border-zinc-800 bg-zinc-900 text-zinc-400"
                        }`}
                    >
                        <KeyRound className="mr-1.5 h-3.5 w-3.5" />
                        {isTwoFactorEnabled
                            ? isRecoveryConfigured
                                ? `${recoveryCodesCount} codes ready`
                                : "Active"
                            : "Not configured"}
                    </Badge>
                }
                action={
                    <div className="flex select-none items-center text-xs font-medium">
                        {isTwoFactorEnabled ? (
                            <span className="flex items-center text-emerald-400">
                                <CheckCircle2 className="mr-1 h-4 w-4" />
                                Ready
                            </span>
                        ) : (
                            <span className="flex items-center text-zinc-500">
                                <MinusCircle className="mr-1 h-4 w-4" />
                                Inactive
                            </span>
                        )}
                    </div>
                }
            />
        </SecuritySection>
    );
};

export default TwoStepVerificationSection;
