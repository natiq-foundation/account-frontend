import { useState } from "react";

interface RecoveryCodesDialogProps {
    readonly isOpen: boolean;
    readonly onClose: () => void;
}

const BACKUP_CODES = [
    "8A3F-9K2L",
    "4M9P-7X1Q",
    "6T2V-8W0N",
    "1B5C-3D8E",
    "9F0G-2H4J",
    "7K1L-5M3P",
    "2Q8R-6S4T",
    "5U9V-1W7X",
];

export const RecoveryCodesDialog = ({
    isOpen,
    onClose,
}: RecoveryCodesDialogProps) => {
    const [copied, setCopied] = useState(false);

    if (!isOpen) return null;

    const handleCopy = () => {
        navigator.clipboard.writeText(BACKUP_CODES.join("\n"));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([BACKUP_CODES.join("\n")], {
            type: "text/plain",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "amir-pwa-recovery-codes.txt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-zinc-100">
                        Recovery codes
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-zinc-400 transition-colors hover:text-zinc-100"
                    >
                        ✕
                    </button>
                </div>

                <p className="text-sm text-zinc-400">
                    Use these backup codes to access your account if you lose
                    your phone.
                </p>

                <div className="my-4 grid grid-cols-2 gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 p-4 font-mono text-sm text-zinc-200">
                    {BACKUP_CODES.map((item, idx) => (
                        <div
                            key={idx}
                            className="flex items-center justify-between rounded-lg border border-zinc-800/60 bg-zinc-950/80 px-3 py-2 text-xs"
                        >
                            <span className="text-zinc-500">#{idx + 1}</span>
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                <div className="mb-4 flex gap-3">
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
                    >
                        {copied ? "Copied!" : "Copy codes"}
                    </button>
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="flex-1 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
                    >
                        Download (.txt)
                    </button>
                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="w-full rounded-xl bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
