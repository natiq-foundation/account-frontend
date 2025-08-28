import { Button, CodeField, Form, H1, Row, Stack } from "@yakad/ui";
import { GoBackButton } from "@/components";

export default function Page() {
    return (
        <Stack>
            <Row>
                <GoBackButton />
                <H1 variant="heading5">Verify Email</H1>
            </Row>
            <Form align="center">
                <CodeField placeholder="Verify code" />
                <Button variant="filled">Submit</Button>
            </Form>
        </Stack>
    );
}
