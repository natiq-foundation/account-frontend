import { useTranslation } from "react-i18next";

export default function Apps() {
    const { t } = useTranslation();

    return (
        <div className="w-full max-w-xl mt-10 flex flex-col gap-5">
            <h1 className="text-2xl font-semibold text-on-surface">
                {t("launcher.profile")}
            </h1>
        </div>
    );
}
