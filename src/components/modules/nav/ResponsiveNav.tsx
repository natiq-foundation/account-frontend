import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type ItemProps = {
    icon: ReactNode;
    label: string;
    to: string;
};

export function NavItem({ icon, label, to }: ItemProps) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex flex-col items-center justify-center gap-1 transition ${isActive ? "text-primary" : "text-on-surface-variant"} `
            }
        >
            <div className="text-xl">{icon}</div>
            <span className="text-xs">{label}</span>
        </NavLink>
    );
}

type ResponsiveMenuProps = {
    children: ReactNode;
    open?: boolean;
};

export default function ResponsiveMenu({
    children,
    open,
}: ResponsiveMenuProps) {
    return (
        <>
            {/* Desktop side menu */}
            <div
                className={`elevation-2 fixed left-4 top-20 z-40 hidden flex-col gap-3 rounded-2xl bg-surface-container p-2 transition-all duration-200 md:flex ${open ? "translate-x-0 opacity-100" : "pointer-events-none -translate-x-4 opacity-0"}`}
            >
                {children}
            </div>

            {/* Mobile bottom bar */}
            <div className="border-outline-variant fixed bottom-0 left-0 right-0 z-40 border-t bg-surface md:hidden">
                <div className="flex h-16 items-center justify-around">
                    {children}
                </div>
            </div>
        </>
    );
}
