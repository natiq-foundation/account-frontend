import { format } from "date-fns";

import { Material } from "@yakad/symbols";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";

interface BirthdayPickerProps {
    value?: Date;
    onChange: (date?: Date) => void;
}

export default function BirthdayPicker({
    value,
    onChange,
}: BirthdayPickerProps) {
    const currentYear = new Date().getFullYear();

    const startMonth = new Date(1900, 0, 1);
    const endMonth = new Date(currentYear, 11, 31);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                    )}
                >
                    <Material icon="calendar_month" className="mr-2 size-4" />

                    {value ? format(value, "PPP") : "Select birthday"}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value}
                    onSelect={onChange}
                    captionLayout="dropdown"
                    startMonth={startMonth}
                    endMonth={endMonth}
                    disabled={(date) => date > new Date()}
                    className="p-2"
                />

                {value && (
                    <div className="border-t p-2">
                        <Button
                            type="button"
                            variant="ghost"
                            className="hover:bg-destructive/10 w-full justify-center text-destructive hover:text-destructive"
                            onClick={() => onChange(undefined)}
                        >
                            <Material icon="delete" className="mr-2 size-4" />
                            Remove birthday
                        </Button>
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
