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
import { NatiqLogoIcon } from "@/assets/svg/NatiqLogoIcon";

export default function AppBarWrapper({ ...restProps }: AppBarProps) {
    return (
        <AppBar {...restProps}>
            <SvgIcon size={5}>
                <NatiqLogoIcon />
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
            <Link href="/login" passHref>
                <Button
                    variant="outlined"
                    icon={
                        <Display minWidth="xs">
                            <Symbol icon="login" />
                        </Display>
                    }
                >
                    Login
                </Button>
            </Link>
        </AppBar>
    );
}
