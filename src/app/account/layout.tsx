import { Button, List, ListItem } from "@yakad/ui";
import { Xpanel } from "@yakad/x";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Xpanel
            name="Natiq Quran"
            navigationchildren={<NavList />}
            appbarchildren={<Button>Sing out</Button>}
        >
            {children}
        </Xpanel>
    );
}

const NavList = () => (
    <List direction="column" style={{ paddingInlineEnd: "2rem" }}>
        <ListItem>
            <Link href="/account/overview">
                <Button
                    variant="text"
                    borderstyle="semi"
                    style={{ width: "100%" }}
                >
                    Overview
                </Button>
            </Link>
        </ListItem>
        <ListItem>
            <Link href="/account/security">
                <Button
                    variant="text"
                    borderstyle="semi"
                    style={{ width: "100%" }}
                >
                    Security
                </Button>
            </Link>
        </ListItem>
        <ListItem>
            <Link href="/account/settings">
                <Button
                    variant="text"
                    borderstyle="semi"
                    style={{ width: "100%" }}
                >
                    Settings
                </Button>
            </Link>
        </ListItem>
    </List>
);
