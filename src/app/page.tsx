import Link from "next/link";
import { Screen, } from "@yakad/ui";



export default function Account() {


    return (
        <Screen align="center">
            <Link href="/auth/login">Login</Link>
            <Link href="/account/overview">Account</Link>
        </Screen>
    );
}