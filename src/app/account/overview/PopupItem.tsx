import { Symbol } from "@yakad/symbols";
import { Button, Container, Hr, Row, Stack, Text } from "@yakad/ui";

export default function PopupItem() {
    return (
        <Container size="sm" align="center">
            <Symbol size={20} icon="account_circle" />
            <Stack align="center">
                <Text>
                    Drag photo here
                </Text>
                <Hr variant="shortLine" />
                <Row align="center">

                    <Button variant="elevated" icon={<Symbol icon="file_upload" />}
                        iconPosition="start">
                        Upload
                    </Button>

                    <Button variant="elevated" icon={<Symbol icon="camera_enhance" />}
                        iconPosition="start">
                        Take Photo
                    </Button>


                </Row>
            </Stack>
        </Container>

    )

}