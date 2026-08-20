type LinkProps = {
    label: string;
    href: string;
};

export function SettingsLink({ label, href }: LinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-surface-container-low text-on-surface flex items-center justify-between rounded-2xl px-4 py-3 transition-colors hover:bg-surface-container-high"
        >
            <span className="text-sm font-medium">{label}</span>
        </a>
    );
}
