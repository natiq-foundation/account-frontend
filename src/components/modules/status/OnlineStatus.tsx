import { useCallback, useEffect, useRef, useState } from "react";

type Status = "online" | "offline" | "connecting" | "disconnected";

type Props = {
    onVisibleChange?: (visible: boolean) => void;
};

const apiUrls: string[] = String(import.meta.env.VITE_API_URLS ?? "")
    .split(",")
    .map((url: string) => url.trim())
    .filter((url: string) => url.length > 0);

const colors: Record<Status, string> = {
    online: "bg-green-500",
    offline: "bg-red-500",
    connecting: "bg-gray-500",
    disconnected: "bg-orange-500",
};

const labels: Record<Status, string> = {
    online: "Online",
    offline: "You're offline",
    connecting: "Connecting…",
    disconnected: "Can't Connect to Server",
};

export default function OnlineStatus({ onVisibleChange }: Props) {
    const [status, setStatus] = useState<Status>("connecting");
    const [visible, setVisible] = useState(false);

    const firstCheck = useRef(true);
    const mountedRef = useRef(true);

    const updateVisible = useCallback(
        (value: boolean) => {
            if (!mountedRef.current) return;

            setVisible(value);
            onVisibleChange?.(value);
        },
        [onVisibleChange],
    );

    const checkConnection = useCallback(
        async (showConnecting = true) => {
            if (!mountedRef.current) return;

            if (showConnecting) {
                setStatus("connecting");
                updateVisible(true);
            }

            if (!navigator.onLine) {
                setStatus("offline");
                updateVisible(true);
                return;
            }

            if (apiUrls.length === 0) {
                setStatus("disconnected");
                updateVisible(true);
                return;
            }

            for (const url of apiUrls) {
                if (!mountedRef.current) return;

                const controller = new AbortController();

                const timeout = window.setTimeout(() => {
                    controller.abort();
                }, 3000);

                try {
                    await fetch(`${url}?v=${Date.now()}`, {
                        method: "HEAD",
                        mode: "no-cors",
                        signal: controller.signal,
                    });

                    window.clearTimeout(timeout);

                    if (!mountedRef.current) return;

                    setStatus("online");
                    updateVisible(true);

                    window.setTimeout(() => {
                        if (mountedRef.current) {
                            updateVisible(false);
                        }
                    }, 1500);

                    return;
                } catch {
                    window.clearTimeout(timeout);
                }
            }

            if (!mountedRef.current) return;

            setStatus("disconnected");
            updateVisible(true);
        },
        [updateVisible],
    );

    useEffect(() => {
        mountedRef.current = true;

        const timer = window.setTimeout(() => {
            void checkConnection(firstCheck.current === false);
            firstCheck.current = false;
        }, 0);

        const handleOffline = () => {
            if (!mountedRef.current) return;

            setStatus("offline");
            updateVisible(true);
        };

        const handleOnline = () => {
            void checkConnection(true);
        };

        window.addEventListener("offline", handleOffline);
        window.addEventListener("online", handleOnline);

        return () => {
            mountedRef.current = false;

            window.clearTimeout(timer);

            window.removeEventListener("offline", handleOffline);
            window.removeEventListener("online", handleOnline);
        };
    }, [checkConnection, updateVisible]);

    if (!visible) {
        return null;
    }

    return (
        <div
            role="status"
            aria-live="polite"
            className={`flex h-5 w-full items-center justify-center text-xs text-white transition-all duration-300 ${colors[status]}`}
        >
            {labels[status]}
        </div>
    );
}
