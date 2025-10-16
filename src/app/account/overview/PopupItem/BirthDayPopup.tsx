import { InputField, Button, Container } from "@yakad/ui";

export default function BirthDayPopup() {
    return (
        <Container align="center">
            <InputField type="date" />
            <Button variant="filled" >Save</Button>
        </Container>
    );
}