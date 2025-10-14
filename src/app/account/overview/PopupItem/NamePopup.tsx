import { Popup, InputField, Button, Stack, Container } from "@yakad/ui";

export default function NamePopup() {
    return (
        <Container align="center" >
            <InputField placeholder="First Name" />
            <InputField placeholder=" Last Name" />
            <Button variant="filled" >Save</Button>
        </Container >
    );
}