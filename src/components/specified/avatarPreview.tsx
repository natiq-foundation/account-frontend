import { Dialog, DialogContent } from "@/components/ui/dialog";

import { Material } from "@yakad/symbols";

interface AvatarPreviewProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    avatar: string | null;
    name: string;
}

export default function AvatarPreview({
    open,
    onOpenChange,
    avatar,
    name,
}: AvatarPreviewProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent
                showCloseButton={false}
                className="!fixed !inset-0 !left-0 !top-0 !flex !h-screen !w-screen !max-w-none !translate-x-0 !translate-y-0 !transform-none !items-center !justify-center !rounded-none !border-none !bg-black/70 !p-0 !shadow-none backdrop-blur-sm"
                onInteractOutside={() => onOpenChange(false)}
            >
                <button
                    onClick={() => onOpenChange(false)}
                    className="absolute right-6 top-6 z-50 rounded-full bg-white/5 p-2.5 text-white/70 transition-all duration-200 hover:scale-105 hover:bg-white/15 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/30 active:scale-95"
                >
                    <Material icon="close" className="size-5" />

                    <span className="sr-only">بستن</span>
                </button>

                <div className="relative">
                    <img
                        src={avatar ?? ""}
                        alt={name}
                        className="size-72 rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 transition-all duration-300 sm:size-96"
                    />

                    <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-sm font-light tracking-wide text-white/50">
                        {name}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
