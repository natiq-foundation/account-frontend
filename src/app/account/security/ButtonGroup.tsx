import { Card, Hr, Spacer, Button, WithOverlay, Popup, Row, } from "@yakad/ui";
import { IconCode, Symbol } from "@yakad/symbols";

export type ListItem = {
    label: string;
    icon?: IconCode;
    value?: string | number;
    popup?: React.ReactNode// Change to AllowedOverlays from yakad type ;
    popuoHeadin?: string
};

export default function ButtonGroup({ list }: { list: ListItem[] }) {
    return (
        <Card>
            {list.map((item, index) => {
                const content = (
                    <>
                        <Row>
                            <Button
                                icon={item.icon && <Symbol icon={item.icon} />}
                                iconPosition="end"
                                style={{
                                    width: "100%",
                                    justifyContent: "space-between",
                                }}
                            >
                                {item.label}
                                <Spacer />
                                {item.value}
                            </Button>
                        </Row>

                        {index < list.length - 1 && (
                            <Hr style={{ borderTop: ".1rem solid rgb(138 135 140)" }} />
                        )}
                    </>
                );

                return item.popup ? (
                    <WithOverlay key={index} overlay={
                        <Popup heading={item.popuoHeadin}>
                            {item.popup}
                        </Popup>}>
                        <div style={{ width: "100%" }}>{content}</div>
                    </WithOverlay>
                ) : (
                    <div key={index}>{content}</div>
                );
            })}
        </Card>
    );
}
