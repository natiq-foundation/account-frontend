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
                className="
                    !fixed
                    !inset-0
                    !left-0
                    !top-0
                    !translate-x-0
                    !translate-y-0

                    !flex
                    !h-screen
                    !w-screen
                    !max-w-none

                    !items-center
                    !justify-center

                    !rounded-none
                    !border-none

                    !bg-black/70
                    !p-0
                    !shadow-none

                    !transform-none

                    backdrop-blur-sm
                "
                onInteractOutside={() => onOpenChange(false)}
            >
                <button
                    onClick={() => onOpenChange(false)}
                    className="
                        absolute
                        top-6
                        right-6
                        z-50
                        rounded-full
                        bg-white/5
                        p-2.5
                        text-white/70
                        transition-all
                        duration-200
                        hover:bg-white/15
                        hover:text-white
                        hover:scale-105
                        active:scale-95
                        focus:outline-none
                        focus:ring-2
                        focus:ring-white/30
                    "
                >
                    <Material icon="close" className="size-5" />

                    <span className="sr-only">بستن</span>
                </button>

                <div className="relative">
                    <img
                        src={avatar ?? ""}
                        alt={name}
                        className="
                            size-72
                            rounded-2xl
                            object-cover
                            shadow-2xl
                            ring-1
                            ring-white/10
                            sm:size-96
                            transition-all
                            duration-300
                        "
                    />

                    <p
                        className="
                            absolute
                            -bottom-10
                            left-1/2
                            -translate-x-1/2
                            text-white/50
                            text-sm
                            font-light
                            tracking-wide
                        "
                    >
                        {name}
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
