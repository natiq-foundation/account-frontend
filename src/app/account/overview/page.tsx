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
import AvatarPopup from "./PopupItem/AvatarPopup";
import NamePopup from "./PopupItem/NamePopup";
import BirthDayPopup from "./PopupItem/BirthDayPopup";
import GenderPopup from "./PopupItem/GenderPopup";

export default function Page() {
    const basicItems: ListItem[] = [
        {
            label: "Name",
            value: "example Name",
            icon: "chevron_right",
            popup: <NamePopup />,
            popuoHeadin: "Change Your Name"
        },
        {
            label: "Birth Day",
            value: 1998,
            icon: "chevron_right",
            popup: <BirthDayPopup />,
            popuoHeadin: "Update Your Birth Day"

        },
        {
            label: "Gender",
            value: "Male",
            icon: "chevron_right",
            popup: <GenderPopup />,
            popuoHeadin: "What is Your Gender?"

        },
    ]
        ;


    return (
        <Container size="sm" align="start">
            <Row>
                <WithOverlay overlay={<Popup heading="Change Your Profile Picture">
                    <AvatarPopup />
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
            </Container>

        </Container>
    );
}
