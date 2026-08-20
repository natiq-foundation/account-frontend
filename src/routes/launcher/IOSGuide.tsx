import { useState } from "react";
import { isIOS, isPWA, isSafari, pwaInstallPopupEnabled } from "@/lib/isPWA";
import { useSettings } from "@/context/settingsContext";

export default function IOSGuide() {
    const [visible, setVisible] = useState(false);

    const [settings, setSettings] = useSettings();

    const state = settings.pwaInstallPopup;

    const shouldShow =
        !state.seen &&
        isIOS() &&
        isSafari() &&
        !isPWA() &&
        pwaInstallPopupEnabled();

    if (!shouldShow && !visible) return null;

    const dismiss = () => {
        setSettings((prev) => ({
            ...prev,
            pwaInstallPopup: {
                ...prev.pwaInstallPopup,
                seen: true,
            },
        }));

        setVisible(false);
    };

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50">
            <div className="elevation-3 w-[min(420px,calc(100%-32px))] rounded-[28px] bg-surface-container-high p-6">
                <div className="flex items-start gap-4">
                    <div className="bg-primary/20 grid h-10 w-10 shrink-0 place-items-center rounded-full">
                        <span className="text-xl text-primary">★</span>
                    </div>

                    <div className="flex-1">
                        <h2 className="text-title-large text-on-surface mb-1">
                            Install the app
                        </h2>

                        <p className="text-body-medium text-on-surface-variant">
                            To install on iPhone/iPad, in Safari tap the Share
                            button and choose
                            <b> Add to Home Screen</b>
                        </p>

                        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-surface-container p-3">
                            <div className="text-on-primary grid h-6 w-6 place-items-center rounded bg-primary text-[12px]">
                                ↑
                            </div>

                            <span className="text-body-small text-on-surface-variant">
                                Share → Add to Home Screen
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <button
                        className="text-label-large hover:bg-primary/10 h-10 rounded-full px-4 text-primary transition-colors"
                        onClick={dismiss}
                    >
                        Got it
                    </button>
                </div>
            </div>
        </div>
    );
}
