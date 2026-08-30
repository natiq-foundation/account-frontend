import { useEffect, useState } from "react";

type RecoveryCodesDialogProps = {
    isOpen: boolean;
    onClose: () => void;
    isConfigured: boolean;
    onGenerate: (codes: string[]) => void;
    onDisable: () => void;
};

const SAFE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

const generateSingleCode = (): string => {
    let part1 = "";
    let part2 = "";
    for (let i = 0; i < 4; i++) {
        part1 += SAFE_CHARS.charAt(
            Math.floor(Math.random() * SAFE_CHARS.length),
        );
        part2 += SAFE_CHARS.charAt(
            Math.floor(Math.random() * SAFE_CHARS.length),
        );
    }
    return `${part1} ${part2}`;
};

const generateMockCodes = (): string[] => {
    return Array.from({ length: 10 }, () => generateSingleCode());
};

export const RecoveryCodesDialog = ({
    isOpen,
    onClose,
    isConfigured,
    onGenerate,
    onDisable,
}: RecoveryCodesDialogProps) => {
    const [codes, setCodes] = useState<string[]>([]);
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        if (isOpen && codes.length === 0) {
            const initialCodes = generateMockCodes();
            setCodes(initialCodes);
            onGenerate(initialCodes);
        }
    }, [isOpen, codes.length, onGenerate]);

    if (!isOpen) return null;

    const handleGenerateNew = () => {
        const newCodes = generateMockCodes();
        setCodes(newCodes);
        onGenerate(newCodes);
        setCopied(false);
    };

    const handleCopyAll = async () => {
        if (codes.length === 0) return;
        try {
            await navigator.clipboard.writeText(codes.join("\n"));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {}
    };

    const handleDownload = () => {
        if (codes.length === 0) return;
        const textContent =
            `Backup recovery codes\nKeep these codes safe and accessible.\n\n` +
            codes.join("\n");
        const blob = new Blob([textContent], {
            type: "text/plain;charset=utf-8",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "backup-codes.txt";
        a.click();
        URL.revokeObjectURL(url);
    };

    const handlePrint = () => {
        window.print();
    };

    const handleDisable = () => {
        setCodes([]);
        onDisable();
        onClose();
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 transition-opacity"
            onClick={onClose}
        >
            <div
                className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl transition-all sm:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-semibold text-zinc-100">
                            Backup codes
                        </h2>
                        <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                            Keep these backup codes somewhere safe but
                            accessible. Each code can only be used once.
                        </p>
                    </div>
                </div>

                <div className="mt-6 rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                        {codes.map((code, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-3 font-mono text-sm tracking-widest text-zinc-200"
                            >
                                <span className="font-sans text-xs text-zinc-500">
                                    {index + 1}.
                                </span>
                                <span>{code}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-zinc-100">
                    <button
                        type="button"
                        onClick={handleCopyAll}
                        className="transition hover:text-zinc-300 hover:underline"
                    >
                        {copied ? "Codes copied to clipboard!" : "Copy codes"}
                    </button>
                    <span className="text-zinc-500">•</span>
                    <button
                        type="button"
                        onClick={handleDownload}
                        className="transition hover:text-zinc-300 hover:underline"
                    >
                        Download codes
                    </button>
                    <span className="text-zinc-500">•</span>
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="transition hover:text-zinc-300 hover:underline"
                    >
                        Print codes
                    </button>
                    <span className="text-zinc-500">•</span>
                    <button
                        type="button"
                        onClick={handleGenerateNew}
                        className="transition hover:text-zinc-300 hover:underline"
                    >
                        Get new codes
                    </button>
                </div>

                <div className="mt-8 flex items-center justify-between border-t border-zinc-800/80 pt-4">
                    {isConfigured ? (
                        <button
                            type="button"
                            onClick={handleDisable}
                            className="text-xs font-medium text-red-400 transition hover:text-red-300 hover:underline"
                        >
                            Delete backup codes
                        </button>
                    ) : (
                        <div />
                    )}

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-xl bg-white px-6 py-2 text-xs font-semibold text-black transition hover:bg-zinc-200"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
