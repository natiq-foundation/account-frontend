import { Symbol, type IconCode } from "@yakad/symbols";
import {
    Card,
    Container,
    Row,
    Spacer,
    Button,
    Stack,
    Span,
    H3,
    Text,
} from "@yakad/ui";
import ButtonGroup, { ListItem } from "./ButtonGroup";

export default function Page() {
    // Email & Phone
    const contactItems: ListItem[] = [
        { label: "example@example.com", icon: "chevron_right" },
        { label: "+123456789", icon: "chevron_right" },
    ];

    // Security
    const securityItems: ListItem[] = [
        { label: "Change Password", icon: "chevron_right" },
        { label: "two-step Verify Code", icon: "chevron_right" },
        {
            label: "two-factor Verify Authenticator Code",
            icon: "chevron_right",
        },
        { label: "Recovery Code", icon: "chevron_right" },
    ];

    // Security Notifications
    const securityNotifs: ListItem[] = [
        {
            label: "Active Security Notifications",
            icon: "notifications_active",
        },
    ];

    // Sessions
    const sessions: ListItem[] = [{ label: "Active Sessions", value: 2 }];

    // Last Activate
    const lastActivates: {
        icon: IconCode;
        title: string;
        subtitle: string;
    }[] = [
        {
            icon: "phone_android",
            title: "Security Login",
            subtitle: "Aug 15, 2024, from IP 123,45,678,9",
        },
        {
            icon: "report_gmailerrorred",
            title: "Security Login",
            subtitle: "Aug 16, 2024, from IP 123,45,678,9",
        },
        {
            icon: "password",
            title: "Password Changed",
            subtitle: "Aug 17, 2024, from IP 123,45,678,9",
        },
    ];

    return (
        <Container size="sm" align="start">
            <H3 variant="heading5">Email & Phone Numbers</H3>
            <ButtonGroup list={contactItems} />

            <H3 variant="heading5">Security</H3>
            <ButtonGroup list={securityItems} />

            <H3 variant="heading5">Security Notifications</H3>
            <ButtonGroup list={securityNotifs} />

            <H3 variant="heading5">Sessions</H3>
            <ButtonGroup list={sessions} />

            <H3 variant="heading5">Last Activate</H3>
            <Card style={{ gap: "1rem" }}>
                {lastActivates.map((item, index) => (
                    <Row key={index}>
                        <Button icon={<Symbol icon={item.icon} />} />
                        <Stack style={{ gap: "0" }}>
                            <Text variant="heading6">{item.title}</Text>
                            <Span variant="caption">{item.subtitle}</Span>
                        </Stack>
                        <Spacer />
                        <Button
                            icon={<Symbol icon={"chevron_right" as IconCode} />}
                        />
                    </Row>
                ))}
            </Card>
        </Container>
    );
}
