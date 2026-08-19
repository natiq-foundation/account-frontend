import { CalendarIcon } from "lucide-react";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";

import { format } from "date-fns";

interface BirthdayPickerProps {
    value: Date | undefined;
    onChange: (date: Date | undefined) => void;
}

export default function BirthdayPicker({
    value,
    onChange,
}: BirthdayPickerProps) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className="
                        w-full
                        justify-start
                        text-left
                        font-normal
                    "
                >
                    <CalendarIcon className="mr-2 size-4" />

                    {value ? format(value, "PPP") : "Select birthday"}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    captionLayout="dropdown"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                    disabled={(date) => date > new Date()}
                />
            </PopoverContent>
        </Popover>
    );
}
