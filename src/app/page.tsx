import Link from "next/link";
import { Button, List, ListItem, Screen, } from "@yakad/ui";
import { Xpanel } from "@yakad/x";



export default function Account() {


    return (
        <Screen align="center">
            <Link href="/auth/login">Login</Link>
            <Link href="/account/overview">Account</Link>
        </Screen>
    );
}