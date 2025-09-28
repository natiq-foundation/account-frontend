import { Symbol, type IconCode } from "@yakad/symbols";
import {
  Card,
  Container,
  Hr,
  H5,
  H6,
  Row,
  Spacer,
  Button,
  Stack,
  Span,
} from "@yakad/ui";

export default function Page() {
  // Email & Phone
  const contactItems: { label: string; icon: IconCode }[] = [
    { label: "example@example.com", icon: "chevron_right" },
    { label: "+123456789", icon: "chevron_right" },
  ];

  // Security
  const securityItems: { label: string; icon: IconCode }[] = [
    { label: "Change Password", icon: "chevron_right" },
    { label: "two-step Verify Code", icon: "chevron_right" },
    { label: "two-factor Verify Authenticator Code", icon: "chevron_right" },
    { label: "Recovery Code", icon: "chevron_right" },
  ];

  // Security Notifications
  const securityNotifs: { label: string; icon: IconCode }[] = [
    { label: "Active Security Notifications", icon: "notifications_active" },
  ];

  // Sessions
  const sessions: { label: string; value: string }[] = [
    { label: "Active Sessions", value: "2" },
  ];

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
      {/* Email & Phone */}
      <H5>Email & Phone Numbers</H5>
      <Card>
        {contactItems.map((item, index) => (
          <div key={index}>
            <Row>
              <H6>{item.label}</H6>
              <Spacer />
              <Button icon={<Symbol icon={item.icon} />} />
            </Row>
            {index < contactItems.length - 1 && (
              <Hr style={{ borderTop: ".1rem solid rgb(138 135 140)" }} />
            )}
          </div>
        ))}
      </Card>

      {/* Security */}
      <H5>Security</H5>
      <Card>
        {securityItems.map((item, index) => (
          <div key={index}>
            <Row>
              <H6>{item.label}</H6>
              <Spacer />
              <Button icon={<Symbol icon={item.icon} />} />
            </Row>
            {index < securityItems.length - 1 && (
              <Hr style={{ borderTop: ".1rem solid rgb(138 135 140)" }} />
            )}
          </div>
        ))}
      </Card>

      {/* Security Notifications */}
      <H5>Security Notifications</H5>
      <Card>
        {securityNotifs.map((item, index) => (
          <Row key={index}>
            <H6>{item.label}</H6>
            <Spacer />
            <Button icon={<Symbol icon={item.icon} />} />
          </Row>
        ))}
      </Card>

      {/* Sessions */}
      <H5>Sessions</H5>
      <Card>
        {sessions.map((item, index) => (
          <Row key={index}>
            <H6>{item.label}</H6>
            <Spacer />
            <Button>{item.value}</Button>
          </Row>
        ))}
      </Card>

      {/* Last Activate */}
      <H5>Last Activate</H5>
      <Card style={{ gap: "1rem" }}>
        {lastActivates.map((item, index) => (
          <Row key={index}>
            <Button icon={<Symbol icon={item.icon} />} />
            <Stack style={{ gap: "0" }}>
              <H6>{item.title}</H6>
              <Span variant="caption">{item.subtitle}</Span>
            </Stack>
            <Spacer />
            <Button icon={<Symbol icon={"chevron_right" as IconCode} />} />
          </Row>
        ))}
      </Card>
    </Container>
  );
}
