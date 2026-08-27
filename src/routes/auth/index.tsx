import { useState } from "react";

import logo from "@/assets/Logo.png";

import AuthEmailForm from "@/components/modules/auth/AuthEmailForm";
import AuthPasswordForm from "@/components/modules/auth/AuthPasswordForm";
import AuthPhoneForm from "@/components/modules/auth/AuthPhoneForm";
import AuthVerificationForm from "@/components/modules/auth/AuthVerificationForm";

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

const MaterialIcon = ({
    icon,
    className,
}: {
    icon: string;
    className?: string;
}) => {
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

    function handleTabChange(tab: AuthTab) {
        if (!tabs[tab]) return;
        setActiveTab(tab);
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
                        <img
                            src={logo}
                            alt="Logo"
                            className="size-12 object-contain"
                        />
                    </div>

                    <h1 className="text-[28px] font-semibold tracking-tight">
                        Welcome
                    </h1>

                    <p className="mx-auto mt-2 max-w-[320px] text-sm leading-6 text-muted-foreground">
                        Sign in or create an account to continue.
                    </p>
                </header>

                <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
                    {!isVerifying && enabledTabs.length > 1 && (
                        <div className="border-b p-2">
                            <div
                                role="tablist"
                                aria-label="Authentication method"
                                className="flex w-full gap-1"
                            >
                                {enabledTabs.map((tab) => {
                                    const active = visibleActiveTab === tab;

                                    return (
                                        <button
                                            key={tab}
                                            type="button"
                                            role="tab"
                                            aria-selected={active}
                                            onClick={() => handleTabChange(tab)}
                                            className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                active
                                                    ? "bg-foreground text-background shadow-sm"
                                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                            } `}
                                        >
                                            <MaterialIcon
                                                icon={tabIcons[tab]}
                                                className="size-4"
                                            />
                                            {tabLabels[tab]}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    <div className="px-6 py-7 sm:px-8 sm:py-8">
                        {isVerifying && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-lg font-semibold">
                                        Verify your account
                                    </h2>

                                    <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
                                        We sent a verification code to your{" "}
                                        {verificationMethod === "email"
                                            ? "email address"
                                            : "phone number"}
                                        .
                                    </p>

                                    <p className="mt-2 break-all text-sm font-medium text-foreground">
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
                                        <h2 className="text-lg font-semibold">
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
                                        <h2 className="text-lg font-semibold">
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
                            <div className="py-4 text-center">
                                <h2 className="text-lg font-semibold">
                                    No sign-in method is available
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                    Please enable at least one authentication
                                    method.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <p className="mt-6 text-center text-xs leading-5 text-muted-foreground">
                    By continuing, you agree to our{" "}
                    <button
                        type="button"
                        className="font-medium text-foreground hover:underline"
                    >
                        Terms
                    </button>{" "}
                    and{" "}
                    <button
                        type="button"
                        className="font-medium text-foreground hover:underline"
                    >
                        Privacy Policy
                    </button>
                    .
                </p>
            </section>
        </main>
    );
}
