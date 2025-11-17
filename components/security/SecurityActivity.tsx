import { LucideIcon } from "lucide-react";

export function SecurityActivity({
    icon: Icon,
    title,
    subtitle,
}: {
    icon: LucideIcon;
    title: string;
    subtitle: string;
}) {
    return (
        <div className="flex items-center gap-3 py-4 border-b">
            <Icon className="h-5 w-5 text-primary" />
            <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
        </div>

    );
}
