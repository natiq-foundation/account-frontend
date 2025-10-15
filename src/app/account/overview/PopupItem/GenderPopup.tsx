import { Button, Container, RadioGroup, RadioButton } from "@yakad/ui";

export default function GenderPopup() {
    return (
        <Container align="start">
            <RadioGroup name="male" >
                <RadioButton label="Male" value={1} />
                <RadioButton label="Female" value={2} />
            </RadioGroup>
            <Button variant="filled" >Save</Button>
        </Container>

    );
}