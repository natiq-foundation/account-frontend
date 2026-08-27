"use client";

import {
    type ChangeEvent,
    type ComponentProps,
    type FormEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { getCountries, type Country } from "@yakad/lib";
import { Flag, Material } from "@yakad/symbols";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type AuthPhoneFormProps = {
    onContinue: (phone: string, countryCode: string) => void;
    isLoading?: boolean;

    error?: string;

    defaultCountryCode?: string;
    className?: string;
};

type FlagCode = ComponentProps<typeof Flag>["code"];

const MIN_PHONE_LENGTH = 8;
const MAX_PHONE_LENGTH = 15;

export default function AuthPhoneForm({
    onContinue,
    isLoading = false,
    error,
    defaultCountryCode = "IR",
    className,
}: AuthPhoneFormProps) {
    const phoneInputRef = useRef<HTMLInputElement>(null);
    const countrySearchRef = useRef<HTMLInputElement>(null);

    const countries = useMemo(() => getCountries(), []);

    const initialCountry = useMemo(() => {
        return (
            countries.find(
                (item) =>
                    item.alpha2Code.toUpperCase() ===
                    defaultCountryCode.toUpperCase(),
            ) ?? countries[0]
        );
    }, [countries, defaultCountryCode]);

    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState<Country | undefined>(initialCountry);
    const [countrySearch, setCountrySearch] = useState("");
    const [submitError, setSubmitError] = useState<string | null>(null);

    const [hasEditedAfterServerError, setHasEditedAfterServerError] =
        useState(false);

    useEffect(() => {
        setCountry(initialCountry);
    }, [initialCountry]);

    const filteredCountries = useMemo(() => {
        const query = countrySearch.trim().toLowerCase();

        if (!query) {
            return countries;
        }

        return countries.filter((item) => {
            const name = String(item.name).toLowerCase();
            const alpha2 = String(item.alpha2Code).toLowerCase();
            const dialingCode = String(item.dialingCode).toLowerCase();

            return (
                name.includes(query) ||
                alpha2.includes(query) ||
                dialingCode.includes(query) ||
                `+${dialingCode}`.includes(query)
            );
        });
    }, [countries, countrySearch]);

    const serverError = error && !hasEditedAfterServerError ? error : null;

    const displayedError = serverError ?? submitError;
    const hasError = Boolean(displayedError);

    const isPhoneValid =
        phone.length >= MIN_PHONE_LENGTH && phone.length <= MAX_PHONE_LENGTH;

    function handlePhoneChange(event: ChangeEvent<HTMLInputElement>) {
        const digitsOnly = event.target.value.replace(/\D/g, "");

        setPhone(digitsOnly.slice(0, MAX_PHONE_LENGTH));
        setSubmitError(null);
        setHasEditedAfterServerError(true);
    }

    function handleCountryChange(alpha2Code: string) {
        const selectedCountry = countries.find(
            (item) => item.alpha2Code === alpha2Code,
        );

        if (!selectedCountry) {
            return;
        }

        setCountry(selectedCountry);
        setCountrySearch("");
        setSubmitError(null);
        setHasEditedAfterServerError(true);

        requestAnimationFrame(() => {
            phoneInputRef.current?.focus();
        });
    }

    function handleClearPhone() {
        setPhone("");
        setSubmitError(null);
        setHasEditedAfterServerError(true);

        requestAnimationFrame(() => {
            phoneInputRef.current?.focus();
        });
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (isLoading) {
            return;
        }

        if (!country) {
            setSubmitError("Please select a country.");
            return;
        }

        if (phone.trim().length === 0) {
            setSubmitError("Enter your phone number.");
            phoneInputRef.current?.focus();
            return;
        }

        if (!isPhoneValid) {
            setSubmitError(
                `Enter a valid phone number between ${MIN_PHONE_LENGTH} and ${MAX_PHONE_LENGTH} digits.`,
            );
            phoneInputRef.current?.focus();
            return;
        }

        setSubmitError(null);

        onContinue(phone, String(country.dialingCode));
    }

    return (
        <form
            noValidate
            onSubmit={handleSubmit}
            className={cn("mx-auto w-full max-w-sm space-y-6", className)}
        >
            <header className="space-y-2">
                <h1 className="text-xl font-semibold tracking-tight">
                    Continue with phone
                </h1>

                <p className="text-sm leading-5 text-muted-foreground">
                    Enter your phone number and we&apos;ll send you a
                    verification code.
                </p>
            </header>

            <div className="space-y-2">
                <label htmlFor="phone-number" className="text-sm font-medium">
                    Phone Number
                </label>

                <div
                    className={cn(
                        "flex h-12 items-center overflow-hidden rounded-md border bg-background transition-colors",
                        "focus-within:ring-primary/20 focus-within:border-primary focus-within:ring-2",
                        hasError &&
                            "focus-within:ring-destructive/20 border-destructive focus-within:border-destructive",
                    )}
                >
                    <Select
                        value={country?.alpha2Code}
                        onValueChange={handleCountryChange}
                        onOpenChange={(isOpen) => {
                            if (!isOpen) {
                                setCountrySearch("");
                                return;
                            }

                            requestAnimationFrame(() => {
                                countrySearchRef.current?.focus();
                            });
                        }}
                        disabled={isLoading}
                    >
                        <SelectTrigger
                            aria-label="Select country"
                            className={cn(
                                "h-full w-[130px] shrink-0 rounded-none border-0 px-3",
                                "hover:bg-muted/60 shadow-none focus:ring-0",
                            )}
                        >
                            <SelectValue placeholder="Country">
                                {country && (
                                    <span className="flex items-center gap-2">
                                        <span className="size-5 overflow-hidden rounded-full border bg-muted">
                                            <Flag
                                                code={
                                                    country.alpha2Code.toLowerCase() as FlagCode
                                                }
                                                className="size-full object-cover"
                                            />
                                        </span>

                                        <span className="font-mono text-xs">
                                            +{country.dialingCode}
                                        </span>
                                    </span>
                                )}
                            </SelectValue>
                        </SelectTrigger>

                        <SelectContent
                            side="top"
                            align="start"
                            sideOffset={8}
                            onCloseAutoFocus={(event) => {
                                event.preventDefault();

                                requestAnimationFrame(() => {
                                    phoneInputRef.current?.focus();
                                });
                            }}
                            className={cn(
                                "w-[300px] overflow-hidden rounded-xl p-1.5",
                                "border border-border bg-popover shadow-xl",
                            )}
                        >
                            <div className="sticky top-0 z-10 -mx-1.5 -mt-1.5 mb-1.5 border-b border-zinc-800 bg-zinc-950 p-2">
                                <div className="relative flex items-center">
                                    <Material
                                        icon="search"
                                        className="pointer-events-none absolute left-2.5 size-4 text-zinc-400"
                                    />

                                    <Input
                                        ref={countrySearchRef}
                                        value={countrySearch}
                                        onChange={(event) =>
                                            setCountrySearch(event.target.value)
                                        }
                                        onKeyDown={(event) => {
                                            event.stopPropagation();
                                        }}
                                        onPointerDown={(event) => {
                                            event.stopPropagation();
                                        }}
                                        placeholder="Search country or code..."
                                        aria-label="Search country"
                                        className={cn(
                                            "h-8 w-full rounded-md border border-zinc-800 bg-black pl-8 pr-2.5 text-xs text-zinc-100",
                                            "shadow-none placeholder:text-zinc-500",
                                            "focus-visible:border-zinc-700 focus-visible:ring-1 focus-visible:ring-zinc-700",
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="max-h-64 overflow-y-auto">
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((item) => (
                                        <SelectItem
                                            key={item.alpha2Code}
                                            value={item.alpha2Code}
                                            className={cn(
                                                "cursor-pointer rounded-lg px-2.5 py-2 text-sm outline-none",
                                                "hover:bg-accent focus:bg-accent",
                                                "data-[state=checked]:bg-accent/60",
                                            )}
                                        >
                                            <div className="flex w-full items-center gap-3">
                                                <span className="size-5 shrink-0 overflow-hidden rounded-full border bg-muted">
                                                    <Flag
                                                        code={
                                                            item.alpha2Code.toLowerCase() as FlagCode
                                                        }
                                                        className="size-full object-cover"
                                                    />
                                                </span>

                                                <span className="min-w-0 flex-1 truncate text-xs">
                                                    {item.name}
                                                </span>

                                                <span className="shrink-0 rounded bg-muted px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
                                                    +{item.dialingCode}
                                                </span>
                                            </div>
                                        </SelectItem>
                                    ))
                                ) : (
                                    <div className="px-3 py-6 text-center text-xs text-muted-foreground">
                                        No country found
                                    </div>
                                )}
                            </div>
                        </SelectContent>
                    </Select>

                    <div className="h-6 w-px shrink-0 bg-border" />

                    <Input
                        ref={phoneInputRef}
                        id="phone-number"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        placeholder="Enter number"
                        value={phone}
                        onChange={handlePhoneChange}
                        aria-invalid={hasError}
                        aria-describedby={
                            hasError ? "phone-number-error" : undefined
                        }
                        disabled={isLoading}
                        maxLength={MAX_PHONE_LENGTH}
                        className={cn(
                            "h-full flex-1 rounded-none border-0 px-3",
                            "font-mono text-sm tracking-wide shadow-none",
                            "focus-visible:ring-0",
                            "placeholder:font-sans placeholder:tracking-normal",
                        )}
                    />

                    {phone && !isLoading && (
                        <button
                            type="button"
                            onClick={handleClearPhone}
                            aria-label="Clear phone number"
                            className={cn(
                                "mr-2 flex size-7 shrink-0 items-center justify-center rounded-md",
                                "text-muted-foreground hover:bg-muted hover:text-foreground",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            )}
                        >
                            <Material icon="close" className="size-4" />
                        </button>
                    )}
                </div>

                {hasError && (
                    <p
                        id="phone-number-error"
                        role="alert"
                        className="flex items-center gap-1.5 text-xs text-destructive"
                    >
                        <Material icon="warning" className="size-4 shrink-0" />
                        {displayedError}
                    </p>
                )}
            </div>

            <Button
                type="submit"
                disabled={!country || !isPhoneValid || isLoading}
                className="h-11 w-full rounded-md font-medium"
            >
                {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                        <Material
                            icon="progress_activity"
                            className="size-4 animate-spin"
                        />
                        Sending code...
                    </span>
                ) : (
                    "Continue"
                )}
            </Button>

            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                <Material icon="verified_user" className="size-4" />
                <span>Your account is securely protected.</span>
            </div>
        </form>
    );
}
