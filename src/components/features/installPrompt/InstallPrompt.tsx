import { useBeforeInstallPrompt } from "@/hooks/useBeforeInstallPrompt";
import { isPWA, isAndroid, isIOS, pwaInstallPopupEnabled } from "@/lib/isPWA";
import { useSettings } from "@/context/settingsContext";

export default function InstallPrompt() {
    const { canInstall, triggerInstall } = useBeforeInstallPrompt();

    const [settings, setSettings] = useSettings();

    const seen = settings.pwaInstallPopup.seen;

    const showAndroidCard =
        !seen &&
        canInstall &&
        isAndroid() &&
        !isPWA() &&
        pwaInstallPopupEnabled();

    if (!showAndroidCard || isIOS()) return null;

    const onInstall = async () => {
        const result = await triggerInstall();

        if (result.started) {
            setSettings({
                ...settings,
                pwaInstallPopup: {
                    seen: true,
                },
            });
        }
    };

    const dismiss = () => {
        setSettings({
            ...settings,
            pwaInstallPopup: {
                seen: true,
            },
        });
    };

    return (
        <div className="fixed bottom-6 left-6 right-6 z-50 sm:left-auto sm:right-6 sm:w-[360px]">
            <div className="elevation-3 border-outline-variant/30 rounded-[28px] border bg-surface-container p-4">
                <div className="flex items-start gap-3">
                    <div className="bg-primary/20 grid h-10 w-10 place-items-center rounded-full">
                        <span className="text-xl text-primary">⇩</span>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-title-medium text-on-surface mb-1">
                            Install the App
                        </h3>

                        <p className="text-body-medium text-on-surface-variant">
                            For a faster, full-screen experience, install the
                            app on your device.
                        </p>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                        className="text-label-large hover:bg-primary/10 h-10 rounded-full px-4 text-primary"
                        onClick={dismiss}
                    >
                        Later
                    </button>

                    <button
                        className="text-on-primary text-label-large h-10 rounded-full bg-primary px-4 hover:brightness-[0.95]"
                        onClick={onInstall}
                    >
                        Install
                    </button>
                </div>
            </div>
        </div>
    );
}
