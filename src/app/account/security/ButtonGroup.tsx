import { Card, Hr, Spacer, Button } from "@yakad/ui";
import { IconCode, Symbol } from "@yakad/symbols";

export type ListItem = { label: string; icon?: IconCode; value?: number };

export default function ButtonGroup({ list }: { list: ListItem[] }) {
    return (
        <Card>
            {list.map((item, index) => (
                <div key={index}>
                    <Button
                        icon={item.icon && <Symbol icon={item.icon} />}
                        iconPosition="end"
                        style={{ width: "100%" }}
                    >
                        {item.label}
                        <Spacer />
                        {item.value}
                    </Button>
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
