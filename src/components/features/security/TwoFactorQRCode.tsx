import { useMemo } from "react";

interface TwoFactorQRCodeProps {
    readonly value: string;
    readonly size?: number;
    readonly className?: string;
}

export function TwoFactorQRCode({
    value,
    size = 180,
    className = "",
}: TwoFactorQRCodeProps) {
    const qrImageSrc = useMemo(() => {
        const encodedData = encodeURIComponent(
            value || "otpauth://totp/App:User?secret=JBSWY3DPEHPK3PXP",
        );
        return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}&format=svg`;
    }, [value, size]);

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="overflow-hidden rounded-xl border border-border bg-white p-3 shadow-sm">
                <img
                    src={qrImageSrc}
                    alt="Two-Factor Authentication QR Code"
                    width={size}
                    height={size}
                    className="block aspect-square object-contain"
                    loading="eager"
                />
            </div>
        </div>
    );
}
