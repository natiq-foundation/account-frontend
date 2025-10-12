"use client";

import {
    Avatar,
    Button,
    Container,
    H3,
    H5,
    H6,
    Popup,
    Row,
    Stack,
    WithOverlay,
} from "@yakad/ui";
import InfoGroup, { ListItem } from "./InfoGroup";
import PopupItem from "./PopupItem";

export default function Page() {
    const basicItems: ListItem[] = [
        { label: "Name", value: "example Name" },
        { label: "Birth Day", value: 1998 },
        { label: "Gender", value: "Male" },
    ]
        ;
    const contactItems: ListItem[] = [
        { label: "Email", value: "example@example.com" },
        { label: "Phone", value: 98123456789 },
    ];


    return (
        <Container size="sm" align="start">
            <Row>
                <WithOverlay overlay={<Popup heading="Change Your Profile Picture">
                    <PopupItem />
                </Popup>}>
                    <Avatar />
                </WithOverlay>

                <Stack>
                    <H5>First Name</H5>
                    <H6>example@example.com</H6>
                </Stack>
            </Row>


            <Container size="sm" align="start">
                <H3 variant="heading5"> Basic Info</H3>
                <InfoGroup list={basicItems} />

                <H3 variant="heading5"> Contact Info</H3>
                <InfoGroup list={contactItems} />
            </Container>


            <Container size="sm" align="center" style={{ marginTop: "1rem" }}>
                <Button>Delete Account</Button>
            </Container>
        </Container>
    );
}
