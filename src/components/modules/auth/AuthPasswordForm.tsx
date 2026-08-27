"use client";

import { type ChangeEvent, type FormEvent, useRef, useState } from "react";

import { Material } from "@yakad/symbols";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface AuthPasswordFormProps {
    onSubmit: (username: string, password: string) => void;

    isLoading?: boolean;

    error?: string;

    className?: string;
}

export default function AuthPasswordForm({
    onSubmit,
    isLoading = false,
    error,
    className,
}: AuthPasswordFormProps) {
    const usernameInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [submitError, setSubmitError] = useState<string | null>(null);

    const [hasEditedAfterServerError, setHasEditedAfterServerError] =
        useState(false);

    const normalizedUsername = username.trim();

    const isUsernameValid = normalizedUsername.length > 0;
    const isPasswordValid = password.length > 0;

    const isValid = isUsernameValid && isPasswordValid;

    const serverError = error && !hasEditedAfterServerError ? error : null;

    const displayedError = serverError ?? submitError;
    const hasError = Boolean(displayedError);

    function clearErrorsOnEdit() {
        setSubmitError(null);
        setHasEditedAfterServerError(true);
    }

    function handleUsernameChange(event: ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
        clearErrorsOnEdit();
    }

    function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
        clearErrorsOnEdit();
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        if (!isUsernameValid) {
            setSubmitError("Enter your username.");
            usernameInputRef.current?.focus();
            return;
        }

        if (!isPasswordValid) {
            setSubmitError("Enter your password.");
            passwordInputRef.current?.focus();
            return;
        }

        setSubmitError(null);

        onSubmit(normalizedUsername, password);
    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit}
            className={cn("space-y-5", className)}
        >
            <div className="space-y-2">
                <label htmlFor="auth-username" className="text-sm font-medium">
                    Username
                </label>

                <div className="relative">
                    <Material
                        icon="person"
                        className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        ref={usernameInputRef}
                        id="auth-username"
                        name="username"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Username"
                        autoComplete="username"
                        autoFocus
                        disabled={isLoading}
                        aria-invalid={hasError}
                        aria-describedby={
                            hasError ? "auth-password-error" : undefined
                        }
                        className={cn(
                            "h-11 rounded-xl border-border bg-background pl-10",
                            "!outline-none !ring-0 !ring-transparent !ring-offset-0",
                            "focus:!border-muted-foreground focus:!bg-background",
                            "focus:!outline-none focus:!ring-0 focus:!ring-transparent focus:!ring-offset-0",
                            "focus-visible:!border-muted-foreground focus-visible:!bg-background",
                            "focus-visible:!outline-none focus-visible:!ring-0",
                            "focus-visible:!ring-transparent focus-visible:!ring-offset-0",
                            hasError &&
                                "!border-destructive focus:!border-destructive focus-visible:!border-destructive",
                        )}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="auth-password" className="text-sm font-medium">
                    Password
                </label>

                <div className="relative">
                    <Material
                        icon="lock"
                        className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        ref={passwordInputRef}
                        id="auth-password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={handlePasswordChange}
                        placeholder="Password"
                        autoComplete="current-password"
                        disabled={isLoading}
                        aria-invalid={hasError}
                        aria-describedby={
                            hasError ? "auth-password-error" : undefined
                        }
                        className={cn(
                            "h-11 rounded-xl border-border bg-background pl-10 pr-11",
                            "!outline-none !ring-0 !ring-transparent !ring-offset-0",
                            "focus:!border-muted-foreground focus:!bg-background",
                            "focus:!outline-none focus:!ring-0 focus:!ring-transparent focus:!ring-offset-0",
                            "focus-visible:!border-muted-foreground focus-visible:!bg-background",
                            "focus-visible:!outline-none focus-visible:!ring-0",
                            "focus-visible:!ring-transparent focus-visible:!ring-offset-0",
                            hasError &&
                                "!border-destructive focus:!border-destructive focus-visible:!border-destructive",
                        )}
                    />

                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => setShowPassword((current) => !current)}
                        aria-label={
                            showPassword ? "Hide password" : "Show password"
                        }
                        className={cn(
                            "absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md",
                            "text-muted-foreground transition-colors",
                            "hover:bg-muted hover:text-foreground",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            "disabled:pointer-events-none disabled:opacity-50",
                        )}
                    >
                        <Material
                            icon={
                                showPassword ? "visibility_off" : "visibility"
                            }
                            className="size-4"
                        />
                    </button>
                </div>
            </div>

            {hasError && (
                <p
                    id="auth-password-error"
                    role="alert"
                    className="flex items-center gap-1.5 text-xs text-destructive"
                >
                    <Material icon="warning" className="size-4 shrink-0" />
                    {displayedError}
                </p>
            )}

            <Button
                type="submit"
                disabled={!isValid || isLoading}
                className="h-11 w-full rounded-xl"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <Material
                            icon="progress_activity"
                            className="size-4 animate-spin"
                        />
                        Signing in...
                    </span>
                ) : (
                    "Sign in"
                )}
            </Button>
        </form>
    );
}
