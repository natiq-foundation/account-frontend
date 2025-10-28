"use client";

import { useState } from "react";
import { Card, Hr, Spacer, Button, WithOverlay, Popup, Row } from "@yakad/ui";
import { IconCode, Symbol } from "@yakad/symbols";

export type ListItem = {
    label: string;
    icon?: IconCode;
    value?: string | number;
    popup?: React.ReactNode;
    popuoHeadin?: string;
    onClick?: () => void;
    toggleable?: boolean;
    activeIcon?: IconCode;
    inactiveIcon?: IconCode;
};

export default function ButtonGroup({ list }: { list: ListItem[] }) {

    const [activeStates, setActiveStates] = useState<boolean[]>(
        list.map(() => false)
    );

    const handleToggle = (index: number, item: ListItem) => {
        if (item.toggleable) {
            setActiveStates((prev) =>
                prev.map((val, i) => (i === index ? !val : val))
            );
        }
        if (item.onClick) item.onClick();
    };

    return (
        <Card>
            {list.map((item, index) => {
                const isActive = activeStates[index];
                const currentIcon =
                    item.toggleable && item.activeIcon && item.inactiveIcon
                        ? isActive
                            ? item.activeIcon
                            : item.inactiveIcon
                        : item.icon;

                const content = (
                    <>
                        <Row>
                            <Button
                                icon={<Symbol icon={currentIcon!} />}
                                iconPosition="end"
                                onClick={() => handleToggle(index, item)}
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
                    <WithOverlay
                        key={index}
                        overlay={<Popup heading={item.popuoHeadin}>{item.popup}</Popup>}
                    >
                        <div style={{ width: "100%" }}>{content}</div>
                    </WithOverlay>
                ) : (
                    <div key={index}>{content}</div>
                );
            })}
        </Card>
    );
}
