import { Material } from "@yakad/symbols";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegisterEmailFormProps {
    email: string;
    onEmailChange: (email: string) => void;
    onContinue: () => void;
}

export default function RegisterEmailForm({
    email,
    onEmailChange,
    onContinue,
}: RegisterEmailFormProps) {
    const isValidEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    return (
        <div className="space-y-5">
            <div className="space-y-2">
                <Label htmlFor="register-email">
                    Email address
                </Label>

                <div className="relative">
                    <Material
                        icon="mail"
                        className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground"
                    />

                    <Input
                        id="register-email"
                        type="email"
                        value={email}
                        onChange={(event) =>
                            onEmailChange(event.target.value)
                        }
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-11 pl-9"
                    />
                </div>
            </div>

            <Button
                type="button"
                className="h-11 w-full"
                disabled={!isValidEmail}
                onClick={onContinue}
            >
                Continue
            </Button>
        </div>
    );
}