import { Symbol } from "@yakad/symbols";
import { Button, Container, Hr, Row, Stack, Text } from "@yakad/ui";
import { useRouter } from "next/navigation"

export default function AvatarPopup() {
    const router = useRouter();
    return (
        <Container size="sm" align="center">
            <Symbol size={20} icon="account_circle" />
            <Stack align="center">
                <Text>
                    Drag photo here
                </Text>
                <Hr variant="shortLine" />
                <Row align="center">

                    <Button variant="elevated" icon={<Symbol icon="upload_file" />}
                        iconPosition="start">
                        Upload
                    </Button>

                    <Button variant="elevated" onClick={() => router.push("/camera")} icon={<Symbol icon="photo_camera" />}
                        iconPosition="start">
                        Take Photo
                    </Button>


                </Row>
            </Stack>
        </Container>

    )

}