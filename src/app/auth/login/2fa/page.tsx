import { Button, CodeField, Form, H1, Row, Stack } from "@yakad/ui";
import { GoBackButton } from "@/components";

export default function Page() {
    return (
        <Stack>
            <Row>
                <GoBackButton />
                <H1 variant="heading5">Two Step Verfying</H1>
            </Row>
            <Form align="center">
                <CodeField placeholder="2FA Code" />
                <Button variant="filled">Submit</Button>
            </Form>
        </Stack>
    );
}
