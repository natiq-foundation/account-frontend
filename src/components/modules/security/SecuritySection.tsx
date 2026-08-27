import type { ReactNode } from "react";

type SecuritySectionProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export const SecuritySection = ({
  title,
  description,
  children,
}: SecuritySectionProps) => {
  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60">
      <div className="border-b border-zinc-800 px-4 py-4 sm:px-6">
        <h2 className="text-base font-semibold text-zinc-100 sm:text-lg">
          {title}
        </h2>

        {description ? (
          <p className="mt-1 text-sm leading-6 text-zinc-400">{description}</p>
        ) : null}
      </div>

      <div className="px-4 sm:px-6">{children}</div>
    </section>
  );
};
