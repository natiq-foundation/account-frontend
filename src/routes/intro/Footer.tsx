import { Button } from "@/components/ui/button";
import { openApp } from "@/lib/appLink";
import { links } from "@/links";
import { useTranslation } from "react-i18next";

export default function AppFooter() {
    const { t } = useTranslation();

    return (
        <footer className="safari-footer px-6">
            <div className="elevation-1 mx-auto max-w-7xl rounded-t-[28px] bg-surface-container px-8 py-6">
                <div className="flex flex-col-reverse items-center gap-4 text-sm text-muted-foreground md:grid md:grid-cols-3">
                    <div className="flex justify-start">
                        <Button
                            variant="link"
                            className="px-0"
                            onClick={() =>
                                window.open(links.privacyPolicy, "_blank")
                            }
                        >
                            {t("footer.privacyPolicy")}
                        </Button>
                    </div>

                    <div />

                    <div className="flex flex-col justify-end gap-3 md:flex-row md:gap-4">
                        <Button
                            variant="link"
                            className="px-0"
                            onClick={() => openApp("dev")}
                        >
                            {t("footer.devTools")}
                        </Button>

                        <Button
                            variant="link"
                            className="px-0"
                            onClick={() => openApp("sponsor")}
                        >
                            {t("footer.sponsor")}
                        </Button>

                        <Button
                            variant="link"
                            className="px-0"
                            onClick={() => openApp("blog")}
                        >
                            {t("footer.blog")}
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
