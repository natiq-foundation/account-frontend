import { Button, List, ListItem } from "@yakad/ui";
import { Xpanel } from "@yakad/x";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Xpanel
            name="Natiq Quran"
            navigationchildren={<NavList />}
            appbarchildren={
                <Button >Sing out</Button>
            }
        >
            {children}
        </Xpanel>
    );
}

const NavList = () =>
    <List direction="column">
        <ListItem>
            <Link href="/account/overview">
                <Button
                    variant="text"
                    borderstyle="semi"
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
                >
                    Settings
                </Button>
            </Link>
        </ListItem>
    </List>
