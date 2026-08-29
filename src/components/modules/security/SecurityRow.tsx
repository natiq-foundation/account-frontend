import type { ReactNode } from "react";

type SecurityRowProps = {
    title: string;
    description: string;
    action?: ReactNode;
    status?: ReactNode;
};

export const SecurityRow = ({
    title,
    description,
    action,
    status,
}: SecurityRowProps) => {
    return (
        <div className="flex flex-col gap-4 border-b border-zinc-800 py-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-medium text-zinc-100">
                        {title}
                    </h3>

                    {status ? status : null}
                </div>

                <p className="mt-1 max-w-2xl text-sm leading-6 text-zinc-400">
                    {description}
                </p>
            </div>

            {action ? <div className="shrink-0">{action}</div> : null}
        </div>
    );
};
