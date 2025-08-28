import Link from "next/link";
import {
    Button,
    Form,
    H1,
    Hr,
    InputField,
    Row,
    Spacer,
    Stack,
} from "@yakad/ui";

export default function Page() {
    return (
        <Stack>
            <H1 variant="heading5">Register</H1>
            <Form align="center">
                <InputField name="username" placeholder="Username" />
                <InputField
                    name="password"
                    placeholder="Password"
                    type="password"
                />
                <InputField
                    name="repeatpassword"
                    placeholder="Repeat Password"
                    type="password"
                />
                <Link href="/auth/register/verify">
                    <Button variant="filled">Submit</Button>
                </Link>
            </Form>
            <Hr />
            <Row>
                <Link href="/auth/login">
                    <Button size="small" variant="link">
                        Login
                    </Button>
                </Link>
            </Row>
        </Stack>
    );
}
