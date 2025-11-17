export function SecuritySection({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="space-y-3">
            <h3 className="text-lg font-semibold">{title}</h3>

            <div className="rounded-lg border overflow-hidden">
                {children}
            </div>
        </section>
    );
}
