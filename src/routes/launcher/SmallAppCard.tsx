export default function SmallAppCard() {
    return (
        <div className="flex w-full items-center justify-between rounded-[24px] bg-surface-container p-4">
            <div className="flex flex-col items-start text-left">
                <span className="text-on-surface text-sm font-medium">App</span>
                <span className="text-on-surface-variant text-xs">
                    Coming soon
                </span>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-container-high">
                <div className="bg-on-surface-variant/30 h-5 w-5 rounded-md" />
            </div>
        </div>
    );
}
