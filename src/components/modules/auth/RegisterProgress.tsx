import { Material } from "@yakad/symbols";

type RegisterStep = 1 | 2 | 3;

interface RegisterProgressProps {
    step: RegisterStep;
}

export default function RegisterProgress({
    step,
}: RegisterProgressProps) {
    const steps = [
        {
            number: 1,
            title: "Email",
        },
        {
            number: 2,
            title: "Verification",
        },
        {
            number: 3,
            title: "Profile",
        },
    ] as const;

    return (
        <div className="grid w-full grid-cols-3">
            {steps.map((item, index) => {
                const completed = step > item.number;
                const active = step === item.number;

                return (
                    <div
                        key={item.number}
                        className="relative flex flex-col items-center"
                    >
                        {index < steps.length - 1 && (
                            <div className="absolute left-1/2 top-5 h-px w-full">
                                <div className="absolute inset-0 bg-border" />

                                <div
                                    className={`absolute left-0 top-0 h-px transition-all duration-500 ${
                                        completed
                                            ? "w-full bg-primary"
                                            : "w-0"
                                    }`}
                                />
                            </div>
                        )}

                        <div
                            className={`
                                relative z-10
                                flex
                                size-10
                                items-center
                                justify-center
                                rounded-full
                                border-2
                                bg-background
                                text-sm
                                font-medium
                                transition-all
                                duration-300
                                ${
                                    completed
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : active
                                          ? "border-primary bg-primary/10 text-primary"
                                          : "border-border text-muted-foreground"
                                }
                            `}
                        >
                            {completed ? (
                                <Material
                                    icon="check"
                                    className="size-4"
                                />
                            ) : (
                                item.number
                            )}
                        </div>

                        <span
                            className={`
                                mt-2
                                whitespace-nowrap
                                text-xs
                                font-medium
                                transition-colors
                                ${
                                    active || completed
                                        ? "text-foreground"
                                        : "text-muted-foreground"
                                }
                            `}
                        >
                            {item.title}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}