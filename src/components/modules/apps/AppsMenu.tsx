import { openApp } from "@/lib/appLink";
import LogoIcon from "@/assets/icons/logoicon.svg?react";
import { useTranslation } from "react-i18next";

type AppSubdomain = Parameters<typeof openApp>[0];

type AppItem = {
    name?: string;
    subdomain?: AppSubdomain;
    icon?: React.ComponentType<{ className?: string }>;
    description?: string;
    featured?: boolean;
};

const apps: AppItem[] = [
    {
        name: "Quran",
        subdomain: "quran",
        icon: LogoIcon,
        description: "Read and listen to the Holy Quran",
        featured: true,
    },
    {},
    {},
    {},
    {},
];

export default function AppsMenu() {
    const { t } = useTranslation();

    const featured = apps.find((a) => a.featured);
    const secondary = apps.filter((a) => !a.featured);

    return (
        <div className="flex flex-col gap-3">
            {featured && (
                <button
                    onClick={() =>
                        featured.subdomain && openApp(featured.subdomain)
                    }
                    className="elevation-2 hover:elevation-3 flex w-full items-center justify-between rounded-[24px] bg-surface-container p-5 transition-all"
                >
                    <div className="flex flex-col items-start gap-0.5 text-left">
                        <span className="text-on-surface text-base font-semibold">
                            {featured.name}
                        </span>
                        {featured.description && (
                            <span className="text-on-surface-variant text-xs">
                                {featured.description}
                            </span>
                        )}
                    </div>
                    <div className="bg-primary-container flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl">
                        {featured.icon && (
                            <featured.icon className="text-on-primary-container h-7 w-7" />
                        )}
                    </div>
                </button>
            )}

            <div className="grid grid-cols-2 gap-2">
                {secondary.map((app, i) => {
                    const isPlaceholder = !app.subdomain;
                    return (
                        <button
                            key={i}
                            disabled={isPlaceholder}
                            onClick={() =>
                                app.subdomain && openApp(app.subdomain)
                            }
                            className={`flex w-full items-center justify-between gap-2 rounded-[20px] bg-surface-container p-3.5 transition-all ${isPlaceholder ? "cursor-default opacity-40" : "hover:elevation-2"} `}
                        >
                            <div className="flex min-w-0 flex-col items-start text-left">
                                <span className="text-on-surface truncate text-sm font-medium">
                                    {isPlaceholder ? "App" : app.name}
                                </span>
                                <span className="text-on-surface-variant truncate text-xs">
                                    {isPlaceholder
                                        ? t("launcher.comingSoon")
                                        : app.description}
                                </span>
                            </div>
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-surface-container-high">
                                {isPlaceholder ? (
                                    <div className="bg-on-surface-variant/30 h-4 w-4 rounded-md" />
                                ) : (
                                    app.icon && <app.icon className="h-4 w-4" />
                                )}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
