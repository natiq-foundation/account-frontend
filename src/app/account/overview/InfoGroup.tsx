import { Card, Hr, Row, Spacer, Text } from "@yakad/ui";

export type ListItem = { label: string; value?: string | number; };

export default function InfoGroup({ list }: { list: ListItem[] }) {
    return (
        <Card>
            {list.map((item, index) => (
                <div key={index}>
                    <Row>

                        <Text variant="heading6">{item.label}</Text>
                        <Spacer />
                        <Text variant="heading6">{item.value}</Text>
                    </Row>
                    {index < list.length - 1 && (
                        <Hr
                            style={{
                                borderTop: ".1rem solid rgb(138 135 140)",
                            }}
                        />
                    )}
                </div>
            ))}
        </Card>
    );
}
