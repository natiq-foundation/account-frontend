import { Popup, InputField, Button, Stack, Container } from "@yakad/ui";

export default function BirthDayPopup() {
    return (
        <Container>
            <InputField type="date" />
            <Button variant="filled" >Save</Button>
        </Container>
    );
}