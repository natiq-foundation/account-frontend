import { useState } from "react";

import { Material } from "@yakad/symbols";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AuthEmailFormProps {
    onContinue: (email: string) => void;
}

export default function AuthEmailForm({ onContinue }: AuthEmailFormProps) {
    const [email, setEmail] = useState("");

    const normalizedEmail = email.trim();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!isValidEmail) {
            return;
        }

        onContinue(normalizedEmail);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
                <label htmlFor="auth-email" className="text-sm font-medium">
                    Email address
                </label>

                <div className="relative">
                    <Material
                        icon="mail"
                        className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        id="auth-email"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        autoFocus
                        className="h-11 rounded-xl border-border bg-background pl-10 !outline-none !ring-0 !ring-transparent !ring-offset-0 focus:!border-muted-foreground focus:!bg-background focus:!outline-none focus:!ring-0 focus:!ring-transparent focus:!ring-offset-0 focus-visible:!border-muted-foreground focus-visible:!bg-background focus-visible:!outline-none focus-visible:!ring-0 focus-visible:!ring-transparent focus-visible:!ring-offset-0"
                    />
                </div>

                {email.length > 0 && !isValidEmail && (
                    <p className="text-xs text-destructive">
                        Please enter a valid email address.
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={!isValidEmail}
                className="h-11 w-full rounded-xl"
            >
                Continue
            </Button>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <Material icon="verified_user" className="size-3.5" />

                <span>We'll never share your email address.</span>
            </div>
        </form>
    );
}
