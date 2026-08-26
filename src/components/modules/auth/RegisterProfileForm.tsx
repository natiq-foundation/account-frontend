import { Material } from "@yakad/symbols";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegisterProfileFormProps {
    fullName: string;
    username: string;
    onFullNameChange: (value: string) => void;
    onUsernameChange: (value: string) => void;
    onBack: () => void;
    onSubmit: () => void;
}

export default function RegisterProfileForm({
    fullName,
    username,
    onFullNameChange,
    onUsernameChange,
    onBack,
    onSubmit,
}: RegisterProfileFormProps) {
    const isValid =
        fullName.trim().length > 0 &&
        username.trim().length > 0;

    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="register-full-name">
                    Full Name
                </Label>

                <div className="relative">
                    <Material
                        icon="person"
                        className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        id="register-full-name"
                        type="text"
                        value={fullName}
                        onChange={(event) =>
                            onFullNameChange(event.target.value)
                        }
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className="h-11 pl-9"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="register-username">
                    Username
                </Label>

                <div className="relative">
                    <Material
                        icon="alternate_email"
                        className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        id="register-username"
                        type="text"
                        value={username}
                        onChange={(event) =>
                            onUsernameChange(event.target.value)
                        }
                        placeholder="Choose a username"
                        autoComplete="username"
                        className="h-11 pl-9"
                    />
                </div>

                <p className="text-xs text-muted-foreground">
                    Your username will be used to identify your account.
                </p>
            </div>

            <div className="flex gap-3 pt-1">
                <Button
                    type="button"
                    variant="outline"
                    className="h-11 flex-1"
                    onClick={onBack}
                >
                    Back
                </Button>

                <Button
                    type="button"
                    className="h-11 flex-1"
                    disabled={!isValid}
                    onClick={onSubmit}
                >
                    Create Account
                </Button>
            </div>
        </div>
    );
}