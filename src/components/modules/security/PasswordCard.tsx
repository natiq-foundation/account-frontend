import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export interface SecurityCardProps {
    readonly lastPasswordChange?: string;
    readonly is2FAEnabled?: boolean;
    readonly onChangePassword?: () => void;
    readonly onSetup2FA?: () => void;
    readonly onViewSessions?: () => void;
}

export const SecurityCard = ({
    lastPasswordChange = "Aug 24, 2026",
    is2FAEnabled = false,
    onChangePassword,
    onSetup2FA,
    onViewSessions,
}: SecurityCardProps) => {
    return (
        <div className="w-full space-y-6 rounded-2xl border border-zinc-800/90 bg-zinc-950/80 p-5">
            <div className="space-y-3">
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-100">
                        Password
                    </h3>
                    <p className="text-xs text-zinc-400">
                        Last changed on {lastPasswordChange}.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onChangePassword}
                    className="h-9 w-full border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800"
                >
                    Change password
                </Button>
            </div>

            <Separator className="bg-zinc-800/60" />

            <div className="space-y-3">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-zinc-100">
                            Two-step verification
                        </h3>
                        <Badge
                            variant="outline"
                            className={
                                is2FAEnabled
                                    ? "border-emerald-500/30 bg-emerald-950/40 px-1.5 py-0 text-[10px] text-emerald-400"
                                    : "border-amber-500/30 bg-amber-950/30 px-1.5 py-0 text-[10px] text-amber-500"
                            }
                        >
                            {is2FAEnabled ? "Enabled" : "Not enabled"}
                        </Badge>
                    </div>
                    <p className="text-xs text-zinc-400">
                        Add an additional verification step when signing in.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onSetup2FA}
                    className="h-9 w-full border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800"
                >
                    {is2FAEnabled ? "Manage 2FA" : "Set up"}
                </Button>
            </div>

            <Separator className="bg-zinc-800/60" />

            <div className="space-y-3">
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold text-zinc-100">
                        Active sessions
                    </h3>
                    <p className="text-xs text-zinc-400">
                        Review the devices currently signed in to your account.
                    </p>
                </div>
                <Button
                    type="button"
                    variant="outline"
                    onClick={onViewSessions}
                    className="h-9 w-full border-zinc-800 bg-zinc-900/60 text-xs font-medium text-zinc-200 hover:border-zinc-700 hover:bg-zinc-800"
                >
                    View sessions
                </Button>
            </div>
        </div>
    );
};
