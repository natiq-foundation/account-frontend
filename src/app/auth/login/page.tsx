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
            <H1 variant="heading5">Login</H1>
            <Form align="center">
                <InputField name="username" placeholder="Username" />
                <InputField
                    name="password"
                    placeholder="Password"
                    type="password"
                />
                <Link href="/auth/login/2fa">
                    <Button variant="filled">Submit</Button>
                </Link>
            </Form>
            <Hr />
            <Row>
                <Link href="/auth/register">
                    <Button size="small" variant="link">
                        Register
                    </Button>
                </Link>
                <Spacer />
                <Link href="/auth/forget_password">
                    <Button size="small" variant="link">
                        Forget Password
                    </Button>
                </Link>
            </Row>
        </Stack>
    );
}
