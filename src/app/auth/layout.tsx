"use client"; //remove this in future

import { XloginBox } from "@yakad/x";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <XloginBox>{children}</XloginBox>;
}
