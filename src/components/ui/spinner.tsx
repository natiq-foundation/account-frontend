import { Material } from "@yakad/symbols";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
    return (
        <span
            role="status"
            aria-label="Loading"
            className={cn(
                "inline-flex size-4 animate-spin items-center justify-center",
                className,
            )}
            {...props}
        >
            <Material icon="progress_activity" className="size-4" />
        </span>
    );
}

export { Spinner };
