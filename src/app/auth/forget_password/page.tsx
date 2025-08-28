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
            <H1 variant="heading5">Forget Password</H1>
            <Form align="center">
                <InputField name="username" placeholder="Username" />
                <Button variant="filled">Recover Password</Button>
            </Form>
            <Hr />
            <Row>
                <Link href="/auth/register">
                    <Button size="small" variant="link">
                        Register
                    </Button>
                </Link>
                <Spacer />
                <Link href="/auth/login">
                    <Button size="small" variant="link">
                        Login
                    </Button>
                </Link>
            </Row>
        </Stack>
    );
}
