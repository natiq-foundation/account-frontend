"use client";

import { useEffect, useState } from "react";
import { Check, ChevronDown, Search, X } from "lucide-react";
import { Flag } from "@yakad/symbols";
import { getCountries } from "@yakad/lib";

import { validateProfile } from "@/lib/validation/profile";

import BirthdayPicker from "@/components/specified/birthDateSelect";
import AvatarUploader from "@/components/specified/avatar";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditProfileDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    fullName: string;
    Username: string;
    avatar: string | null;
    Birthday?: Date | undefined;

    Region?: string;
    RegionCode?: string;

    onSave: (data: {
        fullName: string;
        Username: string;
        avatar: string | null;
        Birthday: Date | undefined;
        Region: string;
        RegionCode: string;
    }) => void;
}

function CountryPicker({
    value,
    onChange,
}: {
    value: string;
    onChange: (country: { name: string; alpha2Code: string }) => void;
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const countries = getCountries();

    const selectedCountry = countries.find(
        (country) => country.alpha2Code === value,
    );

    const filteredCountries = countries.filter((country) => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return true;
        }

        return (
            country.name.toLowerCase().includes(query) ||
            country.alpha2Code.toLowerCase().includes(query)
        );
    });

    function handleRemove() {
        onChange({
            name: "",
            alpha2Code: "",
        });

        setOpen(false);
        setSearch("");
    }

    return (
        <div className="relative">
            <button
                type="button"
                onClick={() => {
                    setOpen((prev) => !prev);
                    setSearch("");
                }}
                className="shadow-xs hover:bg-muted/40 focus:ring-ring/20 flex h-12 w-full items-center gap-3 rounded-xl border border-input bg-background px-3 text-left outline-none transition focus:border-ring focus:ring-2"
            >
                {selectedCountry ? (
                    <>
                        <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
                            <Flag
                                code={selectedCountry.alpha2Code}
                                className="size-6"
                            />
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                                {selectedCountry.name}
                            </p>

                            <p className="text-xs text-muted-foreground">
                                {selectedCountry.alpha2Code}
                            </p>
                        </div>
                    </>
                ) : (
                    <span className="flex-1 text-sm text-muted-foreground">
                        Select your country
                    </span>
                )}

                <ChevronDown
                    className={`size-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""} `}
                />
            </button>

            {open && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setOpen(false)}
                    />

                    <div className="absolute bottom-[calc(100%+8px)] left-0 right-0 z-50 overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-xl ring-1 ring-black/5">
                        <div className="border-b p-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                                <Input
                                    autoFocus
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search country..."
                                    className="h-10 rounded-xl pl-9"
                                />
                            </div>
                        </div>

                        <div className="max-h-64 overflow-y-auto p-2">
                            {selectedCountry && (
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    className="border-destructive/20 bg-destructive/5 hover:bg-destructive/10 mb-2 flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-left text-destructive transition"
                                >
                                    <div className="bg-destructive/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                                        <X className="size-4" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-medium">
                                            Remove country
                                        </p>

                                        <p className="text-xs opacity-70">
                                            Clear your selected country
                                        </p>
                                    </div>
                                </button>
                            )}

                            {filteredCountries.length === 0 ? (
                                <div className="py-8 text-center">
                                    <p className="text-sm font-medium">
                                        No country found
                                    </p>

                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Try another search
                                    </p>
                                </div>
                            ) : (
                                filteredCountries.map((country) => {
                                    const selected =
                                        country.alpha2Code === value;

                                    return (
                                        <button
                                            key={country.alpha2Code}
                                            type="button"
                                            onClick={() => {
                                                onChange({
                                                    name: country.name,
                                                    alpha2Code:
                                                        country.alpha2Code,
                                                });

                                                setOpen(false);
                                                setSearch("");
                                            }}
                                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                                                selected
                                                    ? "bg-primary/10 text-primary"
                                                    : "hover:bg-muted"
                                            } `}
                                        >
                                            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
                                                <Flag
                                                    code={country.alpha2Code}
                                                    className="size-6"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium">
                                                    {country.name}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {country.alpha2Code}
                                                </p>
                                            </div>

                                            {selected && (
                                                <Check className="size-4 shrink-0" />
                                            )}
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default function EditProfileDialog({
    open,
    onOpenChange,
    fullName,
    Username,
    avatar,
    Birthday,
    Region,
    RegionCode,
    onSave,
}: EditProfileDialogProps) {
    const [name, setName] = useState(fullName);
    const [username, setUsername] = useState(Username);
    const [avatarValue, setAvatarValue] = useState<string | null>(avatar);
    const [birthday, setBirthday] = useState<Date | undefined>(Birthday);

    const [region, setRegion] = useState(Region ?? "");
    const [regionCode, setRegionCode] = useState(RegionCode ?? "");

    const [errors, setErrors] = useState<{
        fullName?: string;
        Username?: string;
    }>({});

    useEffect(() => {
        if (!open) {
            return;
        }

        setName(fullName);
        setUsername(Username);
        setAvatarValue(avatar);
        setBirthday(Birthday);
        setRegion(Region ?? "");
        setRegionCode(RegionCode ?? "");
        setErrors({});
    }, [open, fullName, Username, avatar, Birthday, Region, RegionCode]);

    function handleSave() {
        const validationErrors = validateProfile(name, username);

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        onSave({
            fullName: name.trim(),
            Username: username.trim(),
            avatar: avatarValue,
            Birthday: birthday,
            Region: region,
            RegionCode: regionCode,
        });

        onOpenChange(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>

                <div className="space-y-5">
                    <div className="flex justify-center">
                        <AvatarUploader
                            value={avatarValue}
                            onChange={setAvatarValue}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Full Name</Label>

                        <Input
                            value={name}
                            onChange={(event) => {
                                setName(event.target.value);

                                setErrors((prev) => ({
                                    ...prev,
                                    fullName: "",
                                }));
                            }}
                            placeholder="Enter your name"
                        />

                        {errors.fullName && (
                            <p className="text-sm text-destructive">
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Username</Label>

                        <Input
                            value={username}
                            onChange={(event) => {
                                setUsername(event.target.value);

                                setErrors((prev) => ({
                                    ...prev,
                                    Username: "",
                                }));
                            }}
                            placeholder="Enter username"
                        />

                        {errors.Username && (
                            <p className="text-sm text-destructive">
                                {errors.Username}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Country</Label>

                        <CountryPicker
                            value={regionCode}
                            onChange={(country) => {
                                setRegion(country.name);
                                setRegionCode(country.alpha2Code);
                            }}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Birthday</Label>

                        <BirthdayPicker
                            value={birthday}
                            onChange={setBirthday}
                        />
                    </div>

                    <Button
                        type="button"
                        className="w-full"
                        onClick={handleSave}
                    >
                        Save Changes
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
