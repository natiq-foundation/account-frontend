import Link from "next/link";
import {
    AppBar,
    Spacer,
    Button,
    SvgIcon,
    Display,
    AppBarProps,
} from "@yakad/ui";
import { Symbol } from "@yakad/symbols";
import LogoIcon from "@/assets/svg/natiqLogoIcon";

export default function AppBarWrapper({ ...restProps }: AppBarProps) {
    return (
        <AppBar {...restProps}>
            <SvgIcon size={5}>
                <LogoIcon />
            </SvgIcon>
            <h1
                style={{
                    fontFamily: "arial",
                    fontSize: "2.4rem",
                    fontWeight: "normal",
                    letterSpacing: "0.1rem",
                }}
            >
                Natiq
            </h1>
            <Spacer />
            <Link href="/discover/search" passHref>
                <Button variant="outlined" icon={<Symbol icon="search" />}>
                    <Display minWidth="xs">Search</Display>
                </Button>
            </Link>
        </AppBar>
    );
}
