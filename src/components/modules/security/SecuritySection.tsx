import type { ReactNode } from "react";

interface SecuritySectionProps {
    title: string;
    description?: string;
    children: ReactNode;
}

export const SecuritySection = ({
    title,
    description,
    children,
}: SecuritySectionProps) => {
    return (
        <div className="space-y-2">
            <div>
                <h3 className="text-base font-semibold text-white">{title}</h3>
                {description && (
                    <p className="mt-0.5 text-sm text-neutral-400">
                        {description}
                    </p>
                )}
            </div>

            <div className="space-y-4 rounded-2xl border border-neutral-800 bg-[#16171a]/80 p-4">
                {children}
            </div>
        </div>
    );
};
