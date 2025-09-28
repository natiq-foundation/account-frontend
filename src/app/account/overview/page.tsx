import { Button, Card, Container, H5, H6, Hr, Row, Spacer, Stack } from "@yakad/ui";
import { Symbol } from "@yakad/symbols";

export default function Page() {
    const sections = [
        {
            title: "Basic Info",
            items: [
                { label: "Name", value: "example Name" },
                { label: "Birth Day", value: "1234" },
                { label: "Gender", value: "Male" },
            ],
        },
        {
            title: "Contact Info",
            items: [
                { label: "Email", value: "example@example.com" },
                { label: "Phone", value: "+98123456789" },
            ],
        },
    ];

    return (
        <Container size="sm" align="start">
            <Row>
                <Button icon={<Symbol size={10} icon="account_circle" />} />
                <Stack>
                    <H5>First Name</H5>
                    <H6>example@example.com</H6>
                </Stack>
            </Row>

            {sections.map((section) => (
                <Container key={section.title} size="sm" align="start">
                    <H5>{section.title}</H5>
                    <Card>
                        {section.items.map((item, index) => (
                            <>
                                <Row key={item.label}>
                                    <H6>{item.label}</H6>
                                    <Spacer />
                                    <H6>{item.value}</H6>
                                </Row>
                                {index < section.items.length - 1 && (
                                    <Hr style={{ borderTop: ".1rem solid rgb(138 135 140)" }} />
                                )}
                            </>
                        ))}
                    </Card>
                </Container>
            ))}

            <Container size="sm" align="center" style={{ marginTop: "1rem" }}>
                <Button>Delete Account</Button>
            </Container>
        </Container>
    );
}
