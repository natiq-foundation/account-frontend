import { Card, Row, Spacer, Button, Stack, Text, Span } from "@yakad/ui";
import { Symbol, type IconCode } from "@yakad/symbols";

export type ActivityItem = {
    icon: IconCode;
    title: string;
    subtitle: string;
};

export default function ActivityGroup({ list }: { list: ActivityItem[] }) {
    return (
        <Card style={{ gap: "1rem" }}>
            {list.map((item, index) => (
                <Row key={index}>
                    <Button icon={<Symbol icon={item.icon} />} />
                    <Stack style={{ gap: "0" }}>
                        <Text variant="heading6">{item.title}</Text>
                        <Span variant="caption">{item.subtitle}</Span>
                    </Stack>
                    <Spacer />
                    <Button icon={<Symbol icon={"chevron_right"} />} />
                </Row>
            ))}
        </Card>
    );
}
