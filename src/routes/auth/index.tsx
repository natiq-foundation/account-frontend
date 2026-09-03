import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import AuthEmailForm from "@/components/modules/auth/AuthEmailForm";
import AuthPasswordForm from "@/components/modules/auth/AuthPasswordForm";
import AuthPhoneForm from "@/components/modules/auth/AuthPhoneForm";
import AuthVerificationForm from "@/components/modules/auth/AuthVerificationForm";

import logo from "@/assets/Logo.png";

type AuthTab = "email" | "phone" | "password";
type VerificationMethod = "email" | "phone";

const tabs = {
    email: true,
    phone: true,
    password: true,
} satisfies Record<AuthTab, boolean>;

const tabLabels: Record<AuthTab, string> = {
    email: "Email",
    phone: "Phone",
    password: "Password",
};

const tabIcons: Record<AuthTab, string> = {
    email: "mail",
    phone: "phone",
    password: "lock",
};

interface MaterialIconProps {
    readonly icon: string;
    readonly className?: string;
}

const MaterialIcon = ({ icon, className }: MaterialIconProps) => {
    return (
        <span className={`material-symbols-outlined ${className || ""}`}>
            {icon}
        </span>
    );
};

export default function AuthPage() {
    const enabledTabs = (Object.keys(tabs) as AuthTab[]).filter(
        (tab) => tabs[tab],
    );

    const [activeTab, setActiveTab] = useState<AuthTab>("email");
    const [verificationMethod, setVerificationMethod] =
        useState<VerificationMethod | null>(null);
    const [verificationValue, setVerificationValue] = useState("");

    const visibleActiveTab = tabs[activeTab]
        ? activeTab
        : (enabledTabs[0] ?? null);

    function handleTabChange(tab: string) {
        const targetTab = tab as AuthTab;
        if (!tabs[targetTab]) return;
        setActiveTab(targetTab);
        setVerificationMethod(null);
        setVerificationValue("");
    }

    function handleEmailContinue(email: string) {
        console.log("Email:", email);
        setVerificationMethod("email");
        setVerificationValue(email);
    }

    function handlePhoneContinue(phone: string) {
        console.log("Phone:", phone);
        setVerificationMethod("phone");
        setVerificationValue(phone);
    }

    function handlePasswordSubmit(username: string, password: string) {
        console.log("Username:", username);
        console.log("Password:", password);
    }

    function handleVerify(code: string) {
        console.log("Verification code:", code);
        console.log("Verification method:", verificationMethod);
        console.log("Verification value:", verificationValue);
    }

    function handleVerificationBack() {
        setVerificationMethod(null);
        setVerificationValue("");
    }

    const isVerifying = verificationMethod !== null;

    return (
        <main className="flex min-h-screen w-full items-center justify-center bg-background px-4 py-10">
            <section className="w-full max-w-[420px]">
                <header className="mb-8 text-center">
                    <div className="mb-6 flex justify-center">
                        <div className="border-border/50 flex size-14 items-center justify-center rounded-2xl border bg-card p-2.5 shadow-sm">
                            <img
                                src={logo}
                                alt="Logo"
                                className="size-full object-contain"
                            />
                        </div>
                    </div>

                    <h1 className="text-[28px] font-bold tracking-tight text-foreground">
                        Welcome
                    </h1>

                    <p className="mx-auto mt-2 max-w-[320px] text-sm leading-6 text-muted-foreground">
                        Sign in or create an account to continue.
                    </p>
                </header>

                <Card className="border-border/80 overflow-hidden rounded-2xl bg-card p-0 shadow-sm">
                    {!isVerifying && enabledTabs.length > 1 && (
                        <div className="border-border/60 bg-muted/40 border-b p-1.5">
                            <Tabs
                                value={visibleActiveTab ?? undefined}
                                onValueChange={handleTabChange}
                                className="w-full"
                            >
                                <TabsList className="grid h-auto w-full auto-cols-fr grid-flow-col gap-1 bg-transparent p-0">
                                    {enabledTabs.map((tab) => (
                                        <TabsTrigger
                                            key={tab}
                                            value={tab}
                                            className="hover:bg-background/50 data-[state=active]:ring-border/40 flex h-10 items-center justify-center gap-2 rounded-xl text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm data-[state=active]:ring-1"
                                        >
                                            <MaterialIcon
                                                icon={tabIcons[tab]}
                                                className="text-[18px]"
                                            />
                                            {tabLabels[tab]}
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </Tabs>
                        </div>
                    )}

                    <CardContent className="px-6 py-7 sm:px-8 sm:py-8">
                        {isVerifying && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold text-foreground">
                                        Verify your account
                                    </h2>

                                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                                        We sent a verification code to your{" "}
                                        {verificationMethod === "email"
                                            ? "email address"
                                            : "phone number"}
                                        .
                                    </p>

                                    <p className="bg-muted/60 mt-2 inline-block rounded-md px-2.5 py-1 font-mono text-sm font-semibold text-foreground">
                                        {verificationValue}
                                    </p>
                                </div>

                                <AuthVerificationForm
                                    onVerify={handleVerify}
                                    onBack={handleVerificationBack}
                                />
                            </div>
                        )}

                        {!isVerifying &&
                            visibleActiveTab === "email" &&
                            tabs.email && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">
                                            Continue with email
                                        </h2>

                                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                                            Enter your email address and we'll
                                            send you a verification code.
                                        </p>
                                    </div>

                                    <AuthEmailForm
                                        onContinue={handleEmailContinue}
                                    />
                                </div>
                            )}

                        {!isVerifying &&
                            visibleActiveTab === "phone" &&
                            tabs.phone && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">
                                            Continue with phone
                                        </h2>

                                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                                            Enter your phone number to sign in
                                            or register.
                                        </p>
                                    </div>

                                    <AuthPhoneForm
                                        onContinue={handlePhoneContinue}
                                    />
                                </div>
                            )}

                        {!isVerifying &&
                            visibleActiveTab === "password" &&
                            tabs.password && (
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-foreground">
                                            Sign in with password
                                        </h2>

                                        <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                                            Enter your username and password to
                                            continue.
                                        </p>
                                    </div>

                                    <AuthPasswordForm
                                        onSubmit={handlePasswordSubmit}
                                    />
                                </div>
                            )}

                        {!isVerifying && visibleActiveTab === null && (
                            <div className="py-6 text-center">
                                <h2 className="text-lg font-semibold text-foreground">
                                    No sign-in method is available
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Please enable at least one authentication
                                    method.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
                    By continuing, you agree to our{" "}
                    <Button
                        variant="link"
                        className="h-auto p-0 text-xs font-medium text-foreground underline-offset-4 hover:underline"
                    >
                        Terms
                    </Button>{" "}
                    and{" "}
                    <Button
                        variant="link"
                        className="h-auto p-0 text-xs font-medium text-foreground underline-offset-4 hover:underline"
                    >
                        Privacy Policy
                    </Button>
                    .
                </p>
            </section>
        </main>
    );
}
