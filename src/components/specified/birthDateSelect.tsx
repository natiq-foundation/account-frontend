import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                    )}
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
                    className="p-2"
                    classNames={{
                        months: "flex flex-col sm:flex-row gap-3",
                        month: "space-y-3",
                        caption:
                            "flex justify-center pt-1 relative items-center",
                        caption_label: "text-sm font-medium",
                        nav: "flex items-center gap-1",
                        nav_button:
                            "size-7 bg-transparent p-0 opacity-70 hover:opacity-100",
                        table: "w-full border-collapse",
                        head_row: "flex",
                        head_cell:
                            "text-muted-foreground rounded-md w-8 font-normal text-xs",
                        row: "flex w-full mt-1",
                        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
                        day: "size-8 rounded-md text-sm hover:bg-accent hover:text-accent-foreground",
                        day_selected:
                            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                        day_today: "bg-accent text-accent-foreground",
                    }}
                />
            </PopoverContent>
        </Popover>
    );
}
